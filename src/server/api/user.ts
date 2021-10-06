import express from 'express';
import Dao from '../data/dao';
import { DataKeyMap } from '../../constants';
import fetch from 'node-fetch';
import integration from './integration';
const router = express.Router();

router.post('/login', async (req, res, next) => {
  const dao = new Dao(req, res);
  dao.saveData(DataKeyMap.users, req.body.users);
  dao.saveData(DataKeyMap.currentUserId, req.body.currentUserId);
  res.sendStatus(200);
});

router.delete('/logout', (req, res, next) => {
  const dao = new Dao(req, res);
  dao.clearData();
  res.sendStatus(200);
});

router.get('/me', async (req, res, next) => {
  const dao = new Dao(req, res);
  const currentUserId = dao.getData(DataKeyMap.currentUserId);
  if (!currentUserId) {
    return res.sendStatus(403);
  }
  const users = dao.getData(DataKeyMap.users);

  try {
    // Check if integration is installed
    const configuration = dao.getData(DataKeyMap.configuration);
    const integrationTypes = Object.keys(configuration.INTEGRATION_ID_MAP) as IntegrationType[];
    const integrations = (
      await Promise.all(
        integrationTypes.map(async (integrationType) => {
          const integrationId = configuration.INTEGRATION_ID_MAP[integrationType];
          const response = await fetch(
            `${configuration.BASE_INTEGRATION_URL}/${integrationId}/instance?tag=fusebit.tenantId=${currentUserId}`,
            {
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
              },
            }
          );
          const status = await response.json();
          const integration = status.items?.[0];
          return { integrationType, integration };
        })
      )
    ).reduce<Partial<Record<IntegrationType, any>>>((acc, { integrationType, integration }) => {
      acc[integrationType] = integration;
      return acc;
    }, {});

    res.send({ currentUserId, users, integrations, integrationTypes });
  } catch (e) {
    console.log('Error fetching integration installation status', e);
    res.sendStatus(500);
  }
});

export default router;
