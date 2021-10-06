import express from 'express';
import fetch from 'node-fetch';
import Dao from '../data/dao';
import { DataKeyMap } from '../constants';
const router = express.Router();

router.get('/:integrationName/install', async (req, res, next) => {
  const dao = new Dao(req, res);
  try {
    const currentUserId = dao.getData(DataKeyMap.currentUserId);
    const configuration = dao.getData(DataKeyMap.configuration);

    const body = JSON.stringify({
      redirectUrl: `${configuration.APP_URL}/api/${req.params.integrationName}integration/callback`,
      tags: {
        'fusebit.tenantId': currentUserId.toString(),
      },
    });
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
    };
    const createSessionResponse = await fetch(`${configuration.INTEGRATION_URL}/${req.params.integrationName}/session`, {
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
    res.redirect(`${configuration.INTEGRATION_URL}/${req.params.integrationName}/session/${sessionId}/start`);
  } catch (e) {
    console.log('Error starting fusebit session', e);
    res.sendStatus(500);
  }
});

router.get('/:integrationName/callback', async (req, res, next) => {
  const dao = new Dao(req, res);
  const configuration = dao.getData(DataKeyMap.configuration);

  const sessionId = req.query.session;
  const INTEGRATION_URL = configuration.INTEGRATION_URL;

  try {
    const sessionPersistResponse = await fetch(`${INTEGRATION_URL}/${req.params.integrationName}/session/${sessionId}/commit`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
      },
      method: 'POST',
    });

    if (sessionPersistResponse.status > 299) {
      throw 'ERROR: fusebit session did not persist';
    }
    next();
  } catch (e) {
    console.log('Error committing fusebit session', e);
    res.sendStatus(500);
  }
});

router.delete('/:integrationName/install', async (req, res) => {
  const dao = new Dao(req, res);
  const configuration = dao.getData(DataKeyMap.configuration);
  const currentUserId = dao.getData(DataKeyMap.currentUserId);
  try {
    // Get installation
    const lookupResponse = await fetch(
      `${configuration.INTEGRATION_URL}/${req.params.integrationName}/instance?tag=fusebit.tenantId=${currentUserId}`,
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
    await fetch(`${configuration.INTEGRATION_URL}/${req.params.integrationName}/instance/${installation.id}`, {
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
