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

  const userIntegrations = Object.keys(configuration).filter(key => key.endsWith('_INTEGRATION_ID') && !!configuration[key as keyof Config]).map(i => {
    const envPrefix = i.replace('_INTEGRATION_ID', '')

    return {
      feedId: envPrefix.replaceAll('_', '-').toLowerCase(),
      integrationId: configuration[i as keyof Config],
    }
  })

  if (!currentUserId) {
    return res.sendStatus(403);
  }

  try {
    // Check which integrations are installed
    const integrations = (
      await Promise.all(
        userIntegrations.map(async (integrationType) => {
          // Check if this integrationType is installed
          const response = await fetch(
            `${fusebitIntegrationUrl}/${integrationType.integrationId}/install?tag=fusebit.tenantId=${currentUserId}`,
            {
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${fusebitJwt}`,
              },
            }
          );
          const status = await response.json();
          const integration = status.items?.[0];
          return { integrationType, integration };
        })
      )
    ).reduce<Partial<Record<string, any>>>((acc, { integrationType, integration }) => {
      if (Object.keys(integration || {}).length > 0) {
        acc[integrationType.feedId] = integration;
      }
      return acc;
    }, {});

    const integrationsFeed = await fetch(process.env.INTEGRATIONS_FEED_URL).then((res) =>
      res.json() as Promise<Feed[]>
    );


    const integrationList = (integrationsFeed || []).reduce(
      (acc, curr) => {
        const envPrefix = curr.id.replaceAll('-', '_').toUpperCase();
        const userIntegration = userIntegrations.find(i => i.feedId === curr.id)

        if (userIntegration) {
          acc.available.push({
            ...curr,
            envPrefix,
            integrationId: userIntegration.integrationId
          });
        } else {
          acc.unavailable.push({
            ...curr,
          });
        }
        return acc;
      },
      {
        available: [] as Feed[],
        unavailable: [] as Feed[],
      }
    );

    res.send({ currentUserId, users, integrations, integrationTypes, integrationList });
  } catch (e) {
    console.log('Error fetching integration installation status', e);
    res.sendStatus(500);
  }
});

export default router;
