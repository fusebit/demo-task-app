import express, {Request, Response, NextFunction} from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import apiRouter from './api';
// @ts-ignore
import config from '../../webpack.config.js';
const compiler = webpack(config);

const app = express();

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