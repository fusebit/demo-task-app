import React from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Typography, Box } from '@mui/material';
import { Marketplace as FusebitMarketplace } from '@fusebit/react-marketplace';
import { useCustomColorsContext } from './useCustomColorsContext';
import { DARK_TEXT_COLOR, LIGHT_TEXT_COLOR, TILE_CLASSES } from '../utils';
import useTileContrastColor from './useTileContrastColor';

const Marketplace = (props: {
  userData: UserData;
  onUninstall: (integrationId: string) => Promise<void>;
  getInstallUrl: (integrationId: string) => Promise<string>;
  isLoadingIntegrations?: boolean;
  isInstalled?: boolean;
}) => {
  const { isUsingCustomColors } = useCustomColorsContext();
  const { isDark, mainColor } = useTileContrastColor({
    isInstalled: props.isInstalled,
    isLoadingIntegrations: props.isLoadingIntegrations,
  });

  return (
    <Page>
      <PageItem>
        <Box mb="74px" mt="36px">
          <StatusPaper title="Fusebit Marketplace Component" elevation={24}>
            <>
              <Typography>
                Fusebit's{' '}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.npmjs.com/package/@fusebit/react-marketplace"
                  style={{ color: '#333333', fontWeight: 700 }}
                >
                  Marketplace Component
                </a>{' '}
                handles all the overhead of authenticating tenants and wiring up their configurations to a specific
                install for you.
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
        <Typography fontSize="24px" lineHeight="32px" fontWeight={600}>
          Available Integrations
        </Typography>
      </PageItem>
      <PageItem>
        <FusebitMarketplace
          onUninstallClick={(integrationId) => {
            if (isUsingCustomColors) {
              const button = document.querySelector(`.${TILE_CLASSES.button}`) as HTMLElement;
              button.style.background = mainColor;
              button.style.color = isDark ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR;
            }
            return props.onUninstall(integrationId);
          }}
          getInstallUrl={props.getInstallUrl}
          getIntegrations={() => props.userData?.list || []}
          classes={TILE_CLASSES}
          isDemo
        />
      </PageItem>
    </Page>
  );
};

export default Marketplace;
