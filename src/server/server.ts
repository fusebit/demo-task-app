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
const port = process.env.SAMPLE_APP_PORT || 3000;
app.listen(port, function () {
  console.log(`Sample App listening on port ${port}!\n`);
});
