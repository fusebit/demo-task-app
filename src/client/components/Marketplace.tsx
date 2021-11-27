import React, { useEffect, useState } from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Typography, Box } from '@mui/material';
import IntegrationCard from './IntegrationCard';
import { IntegrationTypeEnum } from '../../constants';
import { getUserIntegrations, getEnvPrefixFromFeedId, getIntegrationId } from '../utils/getUserIntegrations';

// This represents the integrationsFeed json
const MARKETPLACE_INTEGRATIONS = Object.keys(IntegrationTypeEnum) as IntegrationType[];

const Marketplace = (props: { userData: UserData; onUninstall: Function }) => {
  const [integrations, setIntegrations] = useState<Feed[] | undefined>();
  const isInstalledList = Object.keys(props.userData.integrations);

  console.log('the following integrations are installed', isInstalledList);

  useEffect(() => {
    fetch('https://stage-manage.fusebit.io/feed/integrationsFeed.json').then((res) => {
      res
        .json()
        .then((feed: Feed[]) => {
          setIntegrations(feed);
          console.log(feed);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  const userIntegrations = getUserIntegrations();

  const list = (integrations || []).reduce(
    (acc, curr) => {
      const envPrefix = getEnvPrefixFromFeedId(curr.id);

      if (userIntegrations.includes(curr.id)) {
        acc.available.push({
          ...curr,
          envPrefix,
        });
      } else {
        acc.unavailable.push({
          ...curr,
          envPrefix,
        });
      }
      return acc;
    },
    {
      available: [] as Feed[],
      unavailable: [] as Feed[],
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
        <Box display="flex" flexWrap="wrap">
          {list.available.map((i) => (
            <IntegrationCard
              key={i.id}
              onUninstall={props.onUninstall}
              integration={i.envPrefix}
              isInstalled={isInstalledList.includes(i.envPrefix)}
              enabled
              name={getIntegrationId(i.envPrefix)}
              imgUrl={i.largeIcon}
            />
          ))}
        </Box>

        <Box display="flex" flexWrap="wrap">
          {list.unavailable.map((i) => (
            <IntegrationCard key={i.id} imgUrl={i.largeIcon} />
          ))}
        </Box>
      </PageItem>
    </Page>
  );
};

export default Marketplace;
