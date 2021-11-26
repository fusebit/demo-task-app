import React from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Typography, Box } from '@mui/material';
import IntegrationCard from './IntegrationCard';
import { IntegrationTypeEnum } from '../../constants';
import { getUserIntegrations } from '../utils/getUserIntegrations';

// This represents the integrationsFeed json
const MARKETPLACE_INTEGRATIONS = Object.keys(IntegrationTypeEnum) as IntegrationType[];

const Marketplace = (props: { userData: UserData; onUninstall: Function }) => {
  const isInstalledList = Object.keys(props.userData.integrations);
  console.log('the following integrations are installed', isInstalledList);

  const userIntegrations = getUserIntegrations();

  const list = MARKETPLACE_INTEGRATIONS.reduce(
    (acc, curr) => {
      if (userIntegrations.find((i) => i.feedId === curr)) {
        acc.available.push(curr);
      } else {
        acc.unavailable.push(curr);
      }
      return acc;
    },
    {
      available: [] as IntegrationType[],
      unavailable: [] as IntegrationType[],
    }
  );

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
        {list.available.map((i) => (
          <IntegrationCard
            key={i}
            onUninstall={props.onUninstall}
            integration={IntegrationTypeEnum[i].value}
            isInstalled={isInstalledList.includes(IntegrationTypeEnum[i].value)}
            enabled
          />
        ))}
        <Box display="flex" flexWrap="wrap">
          {list.unavailable.map((i) => (
            <IntegrationCard key={i} onUninstall={props.onUninstall} integration={IntegrationTypeEnum[i].value} />
          ))}
        </Box>
      </PageItem>
    </Page>
  );
};

export default Marketplace;
