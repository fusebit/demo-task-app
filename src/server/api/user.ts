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

  if (!currentUserId) {
    return res.sendStatus(403);
  }

  const integrationsFeed = await fetch(process.env.INTEGRATIONS_FEED_URL).then((res) =>
    res.json() as Promise<Feed[]>
  );

  const userIntegrations = Object.keys(configuration).filter(key => key.endsWith('_INTEGRATION_ID') && !!configuration[key as keyof Config]).map(i => {
    const envPrefix = i.replace('_INTEGRATION_ID', '')

    return {
      feedId: (envPrefix || '').replace(/_/g, '-').toLowerCase(),
      integrationId: configuration[i as keyof Config],
    }
  })

  const list = await Promise.all(integrationsFeed.filter(entity => userIntegrations.find(i => i.feedId === entity.id)).map(async (entity) => {
    const integrationId = userIntegrations.find(i => i.feedId === entity.id).integrationId

    const response = await fetch(
      `${fusebitIntegrationUrl}/${integrationId}/install?tag=fusebit.tenantId=${currentUserId}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${fusebitJwt}`,
        },
      }
    );

    const data = await response.json()

    return {
      integrationId: integrationId,
      feedId: entity.id,
      isInstalled: (data.items || []).length > 0,
      title: integrationId,
      ...entity,
    }
  }))

  try {
    // Check which integrations are installed

    res.send({ currentUserId, users, integrationTypes, list });
  } catch (e) {
    console.log('Error fetching integration installation status', e);
    res.sendStatus(500);
  }
});

export default router;
