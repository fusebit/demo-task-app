import express from 'express';
import apiRouter from './api';
import files from './files';
import Dao from './data/dao';
import jwt from 'jsonwebtoken';
import { DataKeyMap } from '../constants';

const router = express.Router();

router.use(
  '/api',
  (req, res, next) => {
    const dao = new Dao(req, res);
    res.locals.data = dao;

    // Check for Environment Variables, Load if available.
    if (process.env.FUSEBIT_JWT) {
      dao.saveData(DataKeyMap.configuration, {
        SLACK_INTEGRATION_ID: process.env.SLACK_INTEGRATION_ID,
        HUBSPOT_INTEGRATION_ID: process.env.HUBSPOT_INTEGRATION_ID,
        FUSEBIT_JWT: process.env.FUSEBIT_JWT,
        FUSEBIT_INTEGRATION_URL: process.env.FUSEBIT_INTEGRATION_URL,
      });
      return next();
    }

    // Check if config hash exists.  Load if available.
    let jwtError;
    if (req.header('authorization')) {
      try {
        const token = req.header('authorization').split(' ')[1];
        const secret = process.env.SAMPLE_APP_TASK_JWT_SECRET || process.env.SAMPLE_APP_FALLBACK_SECRET;
        const config: Config = jwt.verify(token, secret) as Config;
        dao.saveData(DataKeyMap.configuration, config);
        return next();
      } catch (e) {
        console.log('Unable to verify JWT');
        console.log(e);
        jwtError = e;
        // Continue to test stored configuration
      }
    }

    // Finally, continue if configuration already exists
    if (dao.getData(DataKeyMap.configuration)) {
      return next();
    }

    res.status(403);
    res.send(jwtError);
  },
  apiRouter
);
router.get('/version', (req, res) => {
  res.send(process.env.VERSION_HASH || 'unknown');
});
router.use(files);

export default router;
