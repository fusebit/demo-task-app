import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import {root, users} from './routes'

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
const config = require('../webpack.config.js');
const compiler = webpack(config);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const api = express();

api.use('/', root);
api.use('/users', users)

app.use('/api', api);

app.get('/', function(req: Request, res: Response, next: NextFunction) {
    res.sendFile(path.resolve('public/index.html'), { title: 'Express' });
});
app.use('/react', (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json')
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.bundle.js'))
});

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});
