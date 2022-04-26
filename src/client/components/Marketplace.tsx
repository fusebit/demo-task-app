import React from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Typography, Box } from '@mui/material';
import { Marketplace as FusebitMarketplace } from '@fusebit/react-marketplace';

const Marketplace = (props: {
  userData: UserData;
  onUninstall: (integrationId: string) => Promise<void>;
  getInstallUrl: (integrationId: string) => Promise<string>;
  isLoadingIntegrations?: boolean;
}) => {
  return (
    <Page>
      <PageItem>
        <Box mb="74px" mt="36px">
          <StatusPaper title="Fusebit Marketplace Component" elevation={24}>
            <>
              <Typography>
                Fusebit's {' '}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.npmjs.com/package/@fusebit/react-marketplace"
                  style={{ color: '#333333', fontWeight: 700 }}
                >
                  Marketplace Component
                  </a>  
                 handles all the overhead of authenticating tenants and wiring up their configurations to a
                specific install for you.
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
          onUninstallClick={props.onUninstall}
          getInstallUrl={props.getInstallUrl}
          getIntegrations={() => props.userData?.list || []}
          hideDescription={true}
          classes={{card: "padding: 12;background: rgba(2, 49, 5, 0.1);"}}
          isDemo
        />
      </PageItem>
    </Page>
  );
};


/* classes?: {
  link?: string;
  card?: string;
  topContent?: string;
  bottomContent?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  button?: string;
  imagesWrapper?: string;
  buttonsWrapper?: string;
  spinner?: string;
}; */
export default Marketplace;
