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

  try {
    // Check which integrations are installed
    const integrations = (
      await Promise.all(
        integrationTypes.map(async (integrationType) => {
          // Check if this integrationType is installed
          const integrationId = res.locals.data.getIntegrationId(integrationType);
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
