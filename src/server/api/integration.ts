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


  try {
    const integrationId: string = res.locals.data.getIntegrationId(req.params.integrationName);
    const body = JSON.stringify({
      redirectUrl: `${appUrl}/api/integration/${req.params.integrationName}/callback`,
      tags: {
        'fusebit.tenantId': currentUserId.toString(),
      },
    });
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${fusebitJwt}`,
    };
    const createSessionResponse = await fetch(`${fusebitIntegrationUrl}/${integrationId}/session`, {
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
    res.redirect(`${fusebitIntegrationUrl}/${integrationId}/session/${sessionId}/start`);
  } catch (e) {
    console.log('Error starting Fusebit session', e);
    res.sendStatus(500);
  }
});

router.get('/:integrationName/callback', async (req, res, next) => {
  const integrationName = req.params.integrationName.toUpperCase();

  try {
    // Update this with your preferred data storage
    const configuration: Config = res.locals.data.getConfiguration();
    const integrationId: string = res.locals.data.getIntegrationId(integrationName);
    const fusebitIntegrationUrl: string = configuration.FUSEBIT_INTEGRATION_URL;
    const fusebitJwt: string = configuration.FUSEBIT_JWT;

    const sessionId = req.query.session;
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
  const configuration: Config = res.locals.data.getConfiguration();
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const fusebitIntegrationUrl: string = configuration.FUSEBIT_INTEGRATION_URL;
  const fusebitJwt: string = configuration.FUSEBIT_JWT;

  try {
    const integrationId: string = res.locals.data.getIntegrationId(req.params.integrationName);
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

    res.sendStatus(200);
  } catch (e) {
    console.log('Error deleting Fusebit installation', e);
    res.sendStatus(500);
  }
});

export default router;
