import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/login', async (req, res, next) => {
  res.locals.data.setUsers(req.body.users);
  res.locals.data.setCurrentUserId(req.body.currentUserId);
  res.sendStatus(200);
});

router.delete('/logout', (req, res, next) => {
  res.locals.data.clearData();
  res.sendStatus(200);
});

router.get('/me', async (req, res, next) => {
  // Update this with your preferred data storage=
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const users: Users = res.locals.data.getUsers();
  const configuration: Config = res.locals.data.getConfiguration();
  const integrationTypes: IntegrationType[] = res.locals.data.getEnabledIntegrationTypes();
  const fusebitJwt: string = configuration.FUSEBIT_JWT;
  const fusebitIntegrationUrl: string = configuration.FUSEBIT_INTEGRATION_URL;

  const userIntegrations = Object.keys(configuration)
    .filter((key) => key.endsWith('_INTEGRATION_ID') && !!configuration[key as keyof Config])
    .map((i) => {
      const envPrefix = i.replace('_INTEGRATION_ID', '');

      return {
        feedId: (envPrefix || '').replace(/_/g, '-').toLowerCase(),
        integrationId: configuration[i as keyof Config],
      };
    });

  if (!currentUserId) {
    return res.sendStatus(403);
  }

  try {
    const integrationsDataResponse = await fetch(`${fusebitIntegrationUrl}`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${fusebitJwt}`,
      },
    });

    let integrationsData: IntegrationDataResponse = await integrationsDataResponse.json();

    const selectedIntegration: IntegrationData = integrationsData.items.find(
      (integration: IntegrationData) => integration.id === userIntegrations[0].integrationId
    );

    // Check if the integration is installed
    const selectedIntegrationInstallData = await fetch(
      `${fusebitIntegrationUrl}/${selectedIntegration.id}/install?tag=fusebit.tenantId=${currentUserId}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${fusebitJwt}`,
        },
      }
    );

    const selectedIntegrationInstall: InstallResponse = await selectedIntegrationInstallData.json();

    const integration = {
      integrationId: selectedIntegration.id,
      feedId: selectedIntegration.tags['fusebit.feedId'],
      title: selectedIntegration.id,
      isInstalled: !!selectedIntegrationInstall.items?.[0],
    };

    const feedArr = await fetch(process.env.INTEGRATIONS_FEED_URL).then((res) => res.json() as Promise<Feed[]>);

    const feed = feedArr.find((feed) => feed.id === userIntegrations[0].feedId);

    res.send({ currentUserId, users, feed, integrationTypes, integrationList: [integration] });
  } catch (e) {
    console.log('Error fetching integration installation status', e);
    res.sendStatus(500);
  }
});

export default router;
