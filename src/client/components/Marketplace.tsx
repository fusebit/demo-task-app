import React from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Typography, Box } from '@mui/material';
import { Marketplace as FusebitMarketplace } from '@fusebit/react-marketplace';

const Marketplace = (props: {
  userData: UserData;
  onUninstall: (integrationId: string) => Promise<void>;
  onAuthentication: (integrationId: string, session: string) => Promise<void>;
  getInstallUrl: (integrationId: string) => Promise<string>;
  isLoadingIntegrations?: boolean;
}) => {

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
        <FusebitMarketplace
          integrations={props.userData?.list || []}
          onUninstall={props.onUninstall}
          getInstallUrl={props.getInstallUrl}
          onAuthentication={props.onAuthentication}
          isLoadingIntegrations={props.isLoadingIntegrations}
          demo
        />
      </PageItem>
    </Page>
  );
};

export default Marketplace;
