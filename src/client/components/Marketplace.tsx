import React, { useEffect, useState } from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Typography, Box } from '@mui/material';
import IntegrationCard from './IntegrationCard';
import { IntegrationTypeEnum, urlOrSvgToImage } from '../../constants';

const Marketplace = (props: { userData: UserData; onUninstall: Function }) => {
  const [integrations, setIntegrations] = useState<Feed[] | undefined>();
  const isInstalledList = Object.keys(props.userData.integrations);

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
        <IntegrationCard
          name="my-integration-842"
          onUninstall={props.onUninstall}
          isInstalled={isInstalledList.includes(IntegrationTypeEnum.SLACK.value)}
          enabled
        />
        <Box display="flex" flexWrap="wrap">
          {integrations?.map((integration) => (
            <IntegrationCard key={integration.id} image={urlOrSvgToImage(integration.largeIcon)} />
          ))}
        </Box>
      </PageItem>
    </Page>
  );
};

export default Marketplace;
