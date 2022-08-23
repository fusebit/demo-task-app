import express from 'express';
import fetch from 'node-fetch';
import { toKebabCase } from '../../constants';
const router = express.Router();

router.post('/login', async (req, res, next) => {
  res.locals.data.setUsers(req.body.users);
  res.locals.data.setCurrentUserId(req.body.currentUserId);
  res.locals.data.setCurrentTenantId(toKebabCase(req.body.currentTenantId));
  res.sendStatus(200);
});

router.delete('/logout', (req, res, next) => {
  res.locals.data.clearData();
  res.sendStatus(200);
});

router.get('/me', async (req, res, next) => {
  // Update this with your preferred data storage=
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const currentTenantId: string = res.locals.data.getCurrentTenantId();
  const users: Users = res.locals.data.getUsers();
  const configuration: Config = res.locals.data.getConfiguration();
  const integrationTypes: IntegrationType[] = res.locals.data.getEnabledIntegrationTypes();
  const fusebitJwt: string = configuration.FUSEBIT_JWT;
  const fusebitBaseUrl: string = configuration.FUSEBIT_BASE_URL;

  if (!currentUserId) {
    return res.sendStatus(403);
  }

  try {
    const integrationsFeedResponse = await fetch(process.env.INTEGRATIONS_FEED_URL);
    const integrationsFeed: Feed[] = await integrationsFeedResponse.json();

    const userIntegrations = Object.keys(configuration)
      .filter((key) => key.endsWith('_INTEGRATION_ID') && !!configuration[key as keyof Config])
      .map((i) => {
        const envPrefix = i.replace('_INTEGRATION_ID', '');

        return {
          feedId: (envPrefix || '').replace(/_/g, '-').toLowerCase(),
          integrationId: configuration[i as keyof Config],
        };
      });

    const installsResponse = await fetch(`${fusebitBaseUrl}/install?tag=fusebit.tenantId=${currentTenantId}`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fusebitJwt}`,
      },
    });

    const installsData = await installsResponse.json();

    const list = integrationsFeed
      .filter((entity) => (userIntegrations || []).find((i) => i.feedId === entity.id))
      .map((entity) => {
        const integrationId = (userIntegrations || []).find((i) => i.feedId === entity.id).integrationId;
        const isInstalled = (installsData?.items || []).find((install: Install) => install.parentId === integrationId);

        return {
          integrationId,
          feedId: entity.id,
          isInstalled: !!isInstalled,
          title: integrationId,
          ...entity,
        };
      });

    res.send({ currentUserId, users, integrationTypes, list });
  } catch (e) {
    console.log('Error fetching the integration', e);
    res.sendStatus(500);
  }
});

export default router;
