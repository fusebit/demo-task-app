import express from 'express';
import fetch from 'node-fetch';
import { AssertIntegrationName } from '../../constants';

const router = express.Router();

router.get('/:integrationName/install', async (req, res, next) => {
  // Type check on integrationName
  AssertIntegrationName(req.params.integrationName);

  // Update this with your preferred data storage
  const integrationId: string = res.locals.data.getIntegrationId(req.params.integrationName);
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const configuration: Config = res.locals.data.getConfiguration();
  const fusebitJwt: string = configuration.FUSEBIT_JWT;
  const appUrl: string = configuration.APP_URL;
  const baseIntegrationUrl: string = configuration.BASE_INTEGRATION_URL;

  try {
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
    const createSessionResponse = await fetch(`${baseIntegrationUrl}/${integrationId}/session`, {
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
    res.redirect(`${baseIntegrationUrl}/${integrationId}/session/${sessionId}/start`);
  } catch (e) {
    console.log('Error starting Fusebit session', e);
    res.sendStatus(500);
  }
});

router.get('/:integrationName/callback', async (req, res, next) => {
  // Type check on integrationName
  AssertIntegrationName(req.params.integrationName);

  // Update this with your preferred data storage
  const configuration: Config = res.locals.data.getConfiguration();
  const integrationId: string = res.locals.data.getIntegrationId(req.params.integrationName);
  const baseIntegrationUrl: string = configuration.BASE_INTEGRATION_URL;
  const fusebitJwt: string = configuration.FUSEBIT_JWT;

  const sessionId = req.query.session;

  try {
    const sessionPersistResponse = await fetch(`${baseIntegrationUrl}/${integrationId}/session/${sessionId}/commit`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fusebitJwt}`,
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
  // Type check on integrationName
  AssertIntegrationName(req.params.integrationName);

  // Update this with your preferred data storage
  const configuration: Config = res.locals.data.getConfiguration();
  const integrationId: string = res.locals.data.getIntegrationId(req.params.integrationName);
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const baseIntegrationUrl: string = configuration.BASE_INTEGRATION_URL;
  const fusebitJwt: string = configuration.FUSEBIT_JWT;

  try {
    // Get installation
    const lookupResponse = await fetch(
      `${baseIntegrationUrl}/${integrationId}/instance?tag=fusebit.tenantId=${currentUserId}`,
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
    await fetch(`${baseIntegrationUrl}/${integrationId}/instance/${installation.id}`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fusebitJwt}`,
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
