import express from 'express';
import fetch from 'node-fetch';
import Dao from '../data/dao';
import { DataKeyMap } from '../../constants';
const router = express.Router();

router.post('/', async (req, res, next) => {
  const dao = new Dao(req, res);

  // Save task
  const task = req.body;
  const currentUserId = dao.getData(DataKeyMap.currentUserId);
  const tasks = dao.getData(DataKeyMap.tasks) || {};
  const userTasks = tasks[currentUserId] || [];
  userTasks.push(task);
  tasks[currentUserId] = userTasks;
  dao.saveData(DataKeyMap.tasks, tasks);
  res.send(userTasks);

  // Post to Integration
  const users = dao.getData(DataKeyMap.users);
  const currentUser = users[currentUserId];
  const configuration = dao.getData(DataKeyMap.configuration);
  const slackIntegrationId = configuration.INTEGRATION_ID_MAP['slack'];
  try {
    fetch(`${configuration.BASE_INTEGRATION_URL}/${slackIntegrationId}/api/${currentUser.userId}/postSlackMessage`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration.FUSEBIT_JWT}`,
      },
      body: JSON.stringify(task),
    });
  } catch (e) {
    console.log('Error posting message through integration', e);
  }
});

router.get('/', (req, res, next) => {
  const dao = new Dao(req, res);
  const currentUserId = dao.getData(DataKeyMap.currentUserId);
  const tasks = dao.getData(DataKeyMap.tasks) || {};
  const userTasks = tasks[currentUserId] || [];
  res.send(userTasks);
});

export default router;
