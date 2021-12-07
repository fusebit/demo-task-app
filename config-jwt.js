const jwt = require('jsonwebtoken');
const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.config('.env');

exec('fuse token -o raw', (error, stdout, stderr) => {
  const configToken = jwt.sign(
    {
      SLACK_BOT_INTEGRATION_ID: process.env.SLACK_BOT_INTEGRATION_ID,
      FUSEBIT_INTEGRATION_URL: process.env.FUSEBIT_INTEGRATION_URL,
      FUSEBIT_JWT: process.env.FUSEBIT_JWT,
    },
    process.env.SAMPLE_APP_TASK_JWT_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );
  console.log('\n\nConfig Token\n\n', configToken, '\n\n');
  console.log('signed with: ', process.env.SAMPLE_APP_TASK_JWT_SECRET);
});
