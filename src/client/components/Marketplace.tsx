import React, { useEffect } from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Typography, Box } from '@mui/material';
import { Marketplace as FusebitMarketplace } from '@fusebit/react-marketplace';
import { useCustomColorsContext } from './useCustomColorsContext';
import tinycolor from 'tinycolor2';

const Marketplace = (props: {
  userData: UserData;
  onUninstall: (integrationId: string) => Promise<void>;
  getInstallUrl: (integrationId: string) => Promise<string>;
  isLoadingIntegrations?: boolean;
}) => {
  const { colors, isUsingCustomColors } = useCustomColorsContext();

  useEffect(() => {
    if (!props.isLoadingIntegrations && isUsingCustomColors) {
      const interval = setInterval(() => {
        const tile = document.querySelector('.tile') as HTMLElement;
        const topContent = document.querySelector('.tile-top-content') as HTMLElement;
        const title = document.querySelector('.tile-title') as HTMLElement;
        const subtitle = document.querySelector('.tile-subtitle') as HTMLElement;
        const button = document.querySelector('.tile-button') as HTMLElement;
        const link = document.querySelector('.tile-link') as HTMLElement;
        if (tile && topContent && tile && button && link && title && subtitle) {
          const mainColor = colors.primary !== '#ffffff' ? colors.primary : colors.secondary;
          const isDark = tinycolor(mainColor).isDark();
          const lightTextColor = '#ffffff';
          const darkTextColor = '#333333';

          tile.style.boxShadow = 'none';
          tile.style.fontFamily = 'Source Sans Pro';
          tile.style.border = `1px solid ${tinycolor(mainColor).setAlpha(0.8).toRgbString()}`;
          topContent.style.background = isDark
            ? tinycolor(mainColor).lighten(18).setAlpha(0.2).toRgbString()
            : tinycolor(mainColor).setAlpha(0.4).toRgbString();
          title.style.color = isDark ? mainColor : darkTextColor;
          title.style.fontWeight = '600';
          subtitle.style.color = isDark
            ? tinycolor(mainColor).darken(15).setAlpha(0.4).toRgbString()
            : tinycolor(darkTextColor).lighten(25).toString();
          button.style.background = mainColor;
          button.style.color = isDark ? lightTextColor : darkTextColor;
          button.style.fontWeight = '600';
          link.style.borderColor = mainColor;
          link.style.color = isDark ? mainColor : darkTextColor;
          link.style.fontWeight = '600';

          clearInterval(interval);
        }
      }, 50);
    }
  }, [colors, isUsingCustomColors, props.isLoadingIntegrations]);

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
          onUninstallClick={props.onUninstall}
          getInstallUrl={props.getInstallUrl}
          getIntegrations={() => props.userData?.list || []}
          classes={{
            card: 'tile',
            topContent: 'tile-top-content',
            title: 'tile-title',
            subtitle: 'tile-subtitle',
            button: 'tile-button',
            link: 'tile-link',
          }}
          isDemo
        />
      </PageItem>
    </Page>
  );
};

export default Marketplace;
