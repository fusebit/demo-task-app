import express from 'express';
import apiRouter from './api';
import files from './files';
import Dao from './data/dao';
import jwt from 'jsonwebtoken';
import { DataKeyMap } from './constants';


const router = express.Router();

router.use('/api',
  (req, res, next) => {
    const dao = new Dao(req, res);

    // Check for Environment Variables, Load if available.
    if (
      process.env.FUSEBIT_JWT &&
      process.env.INTEGRATION_URL &&
      process.env.INTEGRATION_NAME &&
      process.env.APP_URL
    ) {
      dao.saveData(DataKeyMap.configuration, {
        FUSEBIT_JWT: process.env.FUSEBIT_JWT,
        INTEGRATION_URL: process.env.INTEGRATION_URL,
        INTEGRATION_NAME: process.env.INTEGRATION_NAME,
        APP_URL: process.env.APP_URL
      });
      return next();
    }

    // Check if config hash exists.  Load if available.
    if (req.header('authorization')) {
      try {
        const token = req.header('authorization').split(' ')[1];
        const config: Config = jwt.verify(token, process.env.JWT_SECRET) as Config;
        dao.saveData(DataKeyMap.configuration, config);
        return next();
      } catch (e) {
        console.log('Unable to verify JWT');
        console.log(e);
        // Continue to test stored configuration
      }
    }

    // Finally, continue if configuration already exists
    if (dao.getData(DataKeyMap.configuration)) {
      return next();
    }

    res.sendStatus(403);

  },
  apiRouter
);
router.use(files);

export default router;
