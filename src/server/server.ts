import express from 'express';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
dotenv.config();
import router from './router';

const app = express();
app.use(
  cookieSession({
    keys: ['Fusebit Example'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
