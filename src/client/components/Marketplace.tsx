import React, { useEffect, useState } from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Typography, Box, Grid } from '@mui/material';
import IntegrationCard from './IntegrationCard';

const Marketplace = (props: { userData: UserData; onUninstall: Function }) => {
  const isInstalledList = Object.keys(props.userData.integrations);

  console.log('the following integrations are installed', isInstalledList);

  return (
    <Page>
      <PageItem>
        <Box mb="74px" mt="36px">
          <StatusPaper title="Fusebit handles Authentification for you!" elevation={24}>
            <>
              <Typography>
                Fusebit handles all the overhead of authenticating tenants and wiring up their configurations to a
                specific install for you. Once you’ve installed the app,{' '}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://manage.fusebit.io/"
                  style={{ color: '#333333', fontWeight: 700 }}
                >
                  head on over the fusebit management portal to see it.
                </a>
              </Typography>
              <Box display="flex" alignItems="center" mt="24px">
                <Typography fontWeight={700} sx={{ marginRight: '5px' }}>
                  Note:
                </Typography>
                <Typography>
                  This sample app is currently limited to one integration for demonstration purposes.
                </Typography>
              </Box>
            </>
          </StatusPaper>
        </Box>
      </PageItem>
      <PageItem>
        <Typography fontSize="22px" fontWeight={500} sx={{ marginBottom: '24px' }}>
          Available Integrations
        </Typography>
      </PageItem>
      <PageItem>
        <Grid container spacing={3} sx={{ marginBottom: 6 }}>
          {props.userData.integrationList.available.map((integration) => (
            <Grid item xs={12} sm={6} md={4} key={integration.id}>
              <IntegrationCard
                enabled
                key={integration.id}
                onUninstall={props.onUninstall}
                integration={integration?.envPrefix}
                isInstalled={isInstalledList.includes(integration.id)}
                name={integration?.integrationId}
                imgUrl={integration.largeIcon}
                integrationName={integration?.name}
                docsUrl={integration?.resources?.configureAppDocUrl}
              />
            </Grid>
          ))}
        </Grid>
      </PageItem>
    </Page>
  );
};

export default Marketplace;
