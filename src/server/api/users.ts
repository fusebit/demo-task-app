import {NextFunction, Request, Response} from "express";
import express from 'express';
const router = express.Router();

router.get('/login', async (req: Request, res: Response, next: NextFunction) => {
  // Mock login, pause for 1 sec
  await new Promise(resolve => setTimeout(resolve,1000));
  res.send({testing: 123});
});

export default router;
