const jwt = require('jsonwebtoken');
const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.config('.env');

exec('fuse token -o raw', (error, stdout, stderr) => {
  const configToken = jwt.sign(
    {
      SLACK_INTEGRATION_ID: 'slack-integration',
      BASE_INTEGRATION_URL:
        'https://jake.us-west-1.dev.fusebit.io/v2/account/acc-21a4974efd574f87/subscription/sub-eeae7b111e9c4285/integration',
      APP_URL: 'http://sample-app-lb-2056173289.us-west-2.elb.amazonaws.com',
      FUSEBIT_JWT: stdout.trim(),
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );
  console.log('\n\nConfig Token\n\n', configToken, '\n\n');
  console.log('signed with: ', process.env.JWT_SECRET);
});
