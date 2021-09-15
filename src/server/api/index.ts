import express from 'express';
import root from './root';
import users from './users';
import integration from './integration';
import task from "./task";

const apiRouter = express();
apiRouter.use('/users', users);
apiRouter.use('/root', root);
apiRouter.use('/integration', integration);
apiRouter.use('/task', task);

export default apiRouter;