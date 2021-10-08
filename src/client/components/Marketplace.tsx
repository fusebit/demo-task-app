import React from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Grid, Typography } from '@mui/material';
import IntegrationCard from './IntegrationCard';
import { IntegrationTypeEnum } from '../../constants';

const Marketplace = (props: { userData: UserData; onUninstall: Function }) => {
  const isInstalledList = Object.keys(props.userData.integrations);
  console.log('the following integrations are installed', isInstalledList);
  return (
    <Page>
      <PageItem>
        <StatusPaper elevation={24}>
          <Typography>Fusebit handles Authentification for you!</Typography>
          <p>
            Fusebit handles all the overhead of authenticating users and wiring up their configurations to a specific
            install for you. Once you've installed the app,{' '}
            <strong>head on over the the Fusebit management portal</strong> to see it.
          </p>
          <p>Note: This sample app is currently limited to one integratino for demonstration purposes.</p>
        </StatusPaper>
      </PageItem>
      <PageItem>
        <Typography>Available Integrations</Typography>
      </PageItem>
      <PageItem>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <IntegrationCard
              onUninstall={props.onUninstall}
              integration={IntegrationTypeEnum.SLACK}
              isInstalled={isInstalledList.includes(IntegrationTypeEnum.SLACK)}
              enabledTypes={props.userData.integrationTypes}
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <IntegrationCard
              onUninstall={() => ({})}
              integration={IntegrationTypeEnum.HUBSPOT}
              isInstalled={isInstalledList.includes(IntegrationTypeEnum.HUBSPOT)}
              enabledTypes={props.userData.integrationTypes}
            />
          </Grid>
        </Grid>
      </PageItem>
    </Page>
  );
};

export default Marketplace;
