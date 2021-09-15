import express, {Request, Response, NextFunction} from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import apiRouter from './api';
// @ts-ignore
import config from '../../webpack.config.js';
const compiler = webpack(config);

import session from 'express-session';
declare module 'express-session' {
    interface SessionData {
        tenantId: string;
        name: string;
    }
}

const app = express();
const logger = (req:Request, res:Response, next:NextFunction) => {
    console.log(req.method, req.url);
    next();
}
app.use(
    logger,
    express.json(),
    session({
        secret: 'Fusebit Example',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

app.get('/static/:filePath', (req, res, next) => {
    res.sendFile(path.resolve('public', req.params.filePath));
})

app.get('/*', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.resolve('public/index.html'), { title: 'Express' });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});