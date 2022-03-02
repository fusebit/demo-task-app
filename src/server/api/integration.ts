import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/:integrationName/install', async (req, res, next) => {
  // Update this with your preferred data storage
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const configuration: Config = res.locals.data.getConfiguration();
  const fusebitJwt: string = configuration.FUSEBIT_JWT;
  const appUrl: string = `${process.env.SSL_ENABLED ? 'https' : 'http'}://${req.headers.host}`;
  const fusebitIntegrationUrl: string = configuration.FUSEBIT_INTEGRATION_URL;
  const integrationId = req.params.integrationName;

  try {
    const body = JSON.stringify({
      redirectUrl: `${appUrl}/marketplace?integrationId=${integrationId}`,
      tags: {
        'fusebit.tenantId': currentUserId.toString(),
      },
    });
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${fusebitJwt}`,
    };
    const response = await fetch(`${fusebitIntegrationUrl}/${integrationId}/session`, {
      body,
      headers,
      method: 'POST',
    });
    const data = await response.json();
    res.send({ targetUrl: data.targetUrl });
  } catch (e) {
    console.log('Error starting Fusebit session', e);
    res.sendStatus(500);
  }
});

router.get('/:integrationName/:sessionId/callback', async (req, res, next) => {
  const integrationId = req.params.integrationName;
  const sessionId = req.params.sessionId;

  try {
    // Update this with your preferred data storage
    const configuration: Config = res.locals.data.getConfiguration();
    const fusebitIntegrationUrl: string = configuration.FUSEBIT_INTEGRATION_URL;
    const fusebitJwt: string = configuration.FUSEBIT_JWT;
    const sessionPersistResponse = await fetch(
      `${fusebitIntegrationUrl}/${integrationId}/session/${sessionId}/commit`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${fusebitJwt}`,
        },
        method: 'POST',
      }
    );

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
  // Update this with your preferred data storage
  const integrationId = req.params.integrationName;
  const configuration: Config = res.locals.data.getConfiguration();
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const fusebitIntegrationUrl: string = configuration.FUSEBIT_INTEGRATION_URL;
  const fusebitJwt: string = configuration.FUSEBIT_JWT;

  try {
    // Get installation
    const lookupResponse = await fetch(
      `${fusebitIntegrationUrl}/${integrationId}/install?tag=fusebit.tenantId=${currentUserId}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${fusebitJwt}`,
        },
      }
    );
    const status = await lookupResponse.json();
    const installation = status.items?.[0];
    // Delete installation
    await fetch(`${fusebitIntegrationUrl}/${integrationId}/install/${installation.id}`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fusebitJwt}`,
      },
      method: 'DELETE',
    });

    res.locals.data.clearTasks(currentUserId);
    res.send({ ok: true });
  } catch (e) {
    console.log('Error deleting Fusebit installation', e);
    res.sendStatus(500);
  }
});

export default router;
