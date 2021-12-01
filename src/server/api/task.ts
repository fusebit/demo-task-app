import express from 'express';
import fetch from 'node-fetch';
import { DataKeyMap } from '../../constants';
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { integrationId, ...task } = req.body;

  if (!integrationId) {
    res.status(404).send('Integration id is required');

    return
  }

  // Update this with your preferred data storage
  const configuration: Config = res.locals.data.getConfiguration();
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const tasks: TaskMap = res.locals.data.getTasks();
  const userTasks: Task[] = tasks[currentUserId] || [];
  const users: Users = res.locals.data.getData(DataKeyMap.users);
  const currentUser: User = users[currentUserId];


  // Save Task
  userTasks.push(task);
  tasks[currentUserId] = userTasks;
  res.locals.data.setTasks(tasks);

  // Post to Integration
  try {
    const response = await fetch(`${configuration.FUSEBIT_INTEGRATION_URL}/${integrationId}/api/postMessage/${currentUser.userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
      },
      body: JSON.stringify({
        message: `A task has been created within the Sample App. \n\n Task Name: ${task.name} \n Task Description: ${task.description}`,
      }),
    });

    if (!response.ok) {
      const text = await response.text()

      throw new Error(text);
    }

    res.send(userTasks);

  } catch (e) {
    console.log('Error posting message through integration', e);
    res.status(500).send(e)
  }
});

router.get('/', (req, res, next) => {
  // Update this with your preferred data storage
  const currentUserId: string = res.locals.data.getCurrentUserId();
  const userTasks: Task[] = res.locals.data.getTasks()[currentUserId] || [];

  res.send(userTasks);
});

export default router;
