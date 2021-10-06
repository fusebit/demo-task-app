import express from 'express';
import fetch from 'node-fetch';
import Dao from '../data/dao';
import { DataKeyMap, AssertsIsKeyOf } from '../../constants';

const router = express.Router();

router.get('/:integrationName/install', async (req, res, next) => {
  const dao = new Dao(req, res);
  const configuration = dao.getData(DataKeyMap.configuration);
  const INTEGRATION_ID_MAP = configuration.INTEGRATION_ID_MAP;
  AssertsIsKeyOf(req.params.integrationName, INTEGRATION_ID_MAP);
  const integrationId = INTEGRATION_ID_MAP[req.params.integrationName];

  try {
    const currentUserId = dao.getData(DataKeyMap.currentUserId);

    const body = JSON.stringify({
      redirectUrl: `${configuration.APP_URL}/api/${integrationId}integration/callback`,
      tags: {
        'fusebit.tenantId': currentUserId.toString(),
      },
    });
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
    };
    const createSessionResponse = await fetch(`${configuration.BASE_INTEGRATION_URL}/${integrationId}/session`, {
      body,
      headers,
      method: 'POST',
    });
    const session = await createSessionResponse.json();
    if (session.status > 299) {
      res.status(session.status);
      res.send({});
      return;
    }
    const sessionId = session.id;
    res.redirect(`${configuration.BASE_INTEGRATION_URL}/${integrationId}/session/${sessionId}/start`);
  } catch (e) {
    console.log('Error starting Fusebit session', e);
    res.sendStatus(500);
  }
});

router.get('/:integrationName/callback', async (req, res, next) => {
  const dao = new Dao(req, res);
  const configuration = dao.getData(DataKeyMap.configuration);
  const INTEGRATION_ID_MAP = configuration.INTEGRATION_ID_MAP;
  AssertsIsKeyOf(req.params.integrationName, INTEGRATION_ID_MAP);
  const integrationId = INTEGRATION_ID_MAP[req.params.integrationName];

  const sessionId = req.query.session;
  const BASE_INTEGRATION_URL = configuration.BASE_INTEGRATION_URL;

  try {
    const sessionPersistResponse = await fetch(`${BASE_INTEGRATION_URL}/${integrationId}/session/${sessionId}/commit`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
      },
      method: 'POST',
    });

    if (sessionPersistResponse.status > 299) {
      throw 'ERROR: Fusebit session did not persist';
    }
    next();
  } catch (e) {
    console.log('Error committing Fusebit session', e);
    res.sendStatus(500);
  }
});

router.delete('/:integrationName/install', async (req, res) => {
  const dao = new Dao(req, res);
  const configuration = dao.getData(DataKeyMap.configuration);
  const INTEGRATION_ID_MAP = configuration.INTEGRATION_ID_MAP;
  AssertsIsKeyOf(req.params.integrationName, INTEGRATION_ID_MAP);
  const integrationId = INTEGRATION_ID_MAP[req.params.integrationName];

  const currentUserId = dao.getData(DataKeyMap.currentUserId);
  try {
    // Get installation
    const lookupResponse = await fetch(
      `${configuration.BASE_INTEGRATION_URL}/${integrationId}/instance?tag=fusebit.tenantId=${currentUserId}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
        },
      }
    );
    const status = await lookupResponse.json();
    const installation = status.items?.[0];
    // Delete installation
    await fetch(`${configuration.BASE_INTEGRATION_URL}/${integrationId}/instance/${installation.id}`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
      },
      method: 'DELETE',
    });
    res.sendStatus(200);
  } catch (e) {
    console.log('Error deleting Fusebit installation', e);
    res.sendStatus(500);
  }
});

export default router;
