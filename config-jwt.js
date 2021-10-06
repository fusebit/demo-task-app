const jwt = require('jsonwebtoken');
const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.config('.env');

exec('fuse token -o raw', (error, stdout, stderr) => {
  const configToken = jwt.sign(
    {
      INTEGRATION_NAME: 'slack-integration',
      INTEGRATION_URL:
        'https://localhost:3001/v2/account/acc-21a4974efd574f87/subscription/sub-eeae7b111e9c4285/integration/slack-integration',
      APP_URL: 'http://localhost:3000',
      FUSEBIT_JWT: stdout,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );
  console.log('\n\nConfig Token\n\n', configToken);
});
