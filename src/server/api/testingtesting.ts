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
  const fusebitBaseUrl: string = configuration.FUSEBIT_BASE_URL;

  if (!currentUserId) {
    return res.sendStatus(403);
  }

  try {
    const fusebitAuthHeaders = {
      Authorization: `Bearer ${fusebitJwt}`,
      'Content-Type': 'application/json; charset=utf-8',
    };

    // Returns a list of all integrations in your Fusebit  account
    // API Reference: https://developer.fusebit.io/reference/listintegrations
    const integrationsData = await fetch(`${fusebitBaseUrl}/integration`, {
      headers: fusebitAuthHeaders,
    });
    const integrations = await integrationsData.json();

    // Returns installation state of all integrations for the supplied tenantId
    // API Reference: https://developer.fusebit.io/reference/searchinstalls
    const installsResponse = await fetch(`${fusebitBaseUrl}/install?tag=fusebit.tenantId=${currentUserId}`, {
      headers: fusebitAuthHeaders,
    });

    const installsData = await installsResponse.json();

    // Combine the results on integration.id and return one object
    const list = integrations.items.map((integration) => {
      const isInstalled = (installsData?.items || []).find((install: Install) => install.parentId === integration.id);

      return {
        integrationId: integration.id,
        feedId: integration.tags['fusebit.feedId'],
        isInstalled: !!isInstalled,
        title: integration.id,
      };
    });

  //  return integrationsList;

   // console.log(list);

    //const list = [{ integrationId: 'Asana', feedId: 'asana', isInstalled: false, title: 'My Asana' }, { integrationId: 'Asana', feedId: 'githubapp', isInstalled: true, title: 'Anam Mazhar' }];

    res.send({ currentUserId, users, integrationTypes, list });
  } catch (e) {
    console.log('Error fetching the integration', e);
    res.sendStatus(500);
  }
});

export default router;
