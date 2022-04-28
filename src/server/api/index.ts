import express from 'express';
import user from './user';
import testingtesting from './testingtesting';
import integration from './integration';
import task from './task';

const apiRouter = express();
apiRouter.get('/health', (req, res, next) => {
  res.send({ status: 'ok' });
});
//apiRouter.use('/user', user);
apiRouter.use('/user', testingtesting);
apiRouter.use('/integration', integration);
apiRouter.use('/task', task);

export default apiRouter;
