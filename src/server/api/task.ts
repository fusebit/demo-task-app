import express from 'express';
import fetch from 'node-fetch';
import { DataKeyMap } from '../../constants';
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { integrationId, isGetEnabled, ...body } = req.body;

  if (!integrationId) {
    res.status(404).send('Integration id is required');

    return
  }

  // Update this with your preferred data storage
  const configuration: Config = res.locals.data.getConfiguration();
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const users: Users = res.locals.data.getData(DataKeyMap.users);
  const currentUser: User = users[currentUserId];

  // Post to Integration
  try {
    const response = await fetch(`${configuration.FUSEBIT_INTEGRATION_URL}/${integrationId}/api/tenant/${currentUser.userId}/item`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text()

      throw new Error(text);
    }

    if (!isGetEnabled) {
      const tasks: TaskMap = res.locals.data.getTasks();
      const userTasks: Task[] = tasks[currentUserId] || [];

      userTasks.push(body);
      tasks[currentUserId] = userTasks;
      res.locals.data.setTasks(tasks);

      res.status(204).send();
      
      return
    }

    res.status(204).send();
  } catch (e) {
    console.log('Error posting item through integration', e);
    res.status(500).send(e)
  }
});

router.get('/', async (req, res, next) => {
  // Update this with your preferred data storage
  const configuration: Config = res.locals.data.getConfiguration();
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const users: Users = res.locals.data.getData(DataKeyMap.users);
  const currentUser: User = users[currentUserId];
  const { integrationId, isGetEnabled } = req.query;


  // Getting integration items
  try {
    if (!isGetEnabled) {
      const userTasks: Task[] = res.locals.data.getTasks()[currentUserId] || [];

      res.status(200).send(userTasks);

      return;
    }

    const response = await fetch(`${configuration.FUSEBIT_INTEGRATION_URL}/${integrationId}/api/tenant/${currentUser.userId}/items`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
      },
    });

    if (!response.ok) {
      const text = await response.text()

      throw new Error(text);
    }

    const data = await response.json();

    res.status(200).send(data);
  } catch (e) {
    console.log('Error getting integration items', e);
    res.status(500).send(e)
  }
});

export default router;
