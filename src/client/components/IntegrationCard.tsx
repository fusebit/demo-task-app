import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';

const IntegrationCard = (props: {
  integration?: string;
  isInstalled?: boolean;
  onUninstall?: Function;
  enabled?: boolean;
  imgUrl?: string;
  name?: string;
  integrationName?: string;
  docsUrl?: string;
}) => {
  const installApp = () => (window.location.href = `/api/integration/${props.integration}/install`);
  const uninstallApp = () => props.onUninstall?.(props.integration);

  const handleCta = () => {
    if (props.isInstalled) {
      uninstallApp();
    } else {
      installApp();
    }
  };

  const installTextColor = useMemo(() => {
    if (!props.enabled) {
      return '#959595';
    }

    if (props.isInstalled) {
      return '#F44336';
    }

    return '#3F51B5';
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      mr="10px"
      width="100%"
      minHeight="140px"
      padding="24px"
      borderRadius="4px"
      justifyContent="space-between"
      boxSizing="border-box"
      boxShadow={props.enabled && '0px 20px 48px rgba(52, 72, 123, 0.1)'}
      sx={{
        backgroundColor: !props.enabled && '#F2F2F2',
        pointerEvents: !props.enabled ? 'none' : 'auto',
      }}
    >
      {props.enabled && props.name && (
        <Typography fontSize="12px" fontWeight={500} sx={{ color: '#333333' }}>
          {props.name}
        </Typography>
      )}
      <Box>
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(props.imgUrl)}`}
          onError={(e) => ((e.target as HTMLImageElement).src = '/static/fusebit-logo.svg')}
          height="52"
          style={{ objectFit: 'contain', margin: '8px 0 15px', filter: !props.enabled && 'grayscale(100%)' }}
          alt={props.integrationName || 'Integration App'}
          title={props.integrationName || 'Integration App'}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          fontSize="14px"
          component="a"
          sx={{
            minWidth: 'max-content',
            color: props.enabled ? '#333333' : '#959595',
            letterSpacing: '1.25px',
            textDecoration: 'none',
          }}
          target="_blank"
          rel="noopener noreferrer"
          href={props.docsUrl}
        >
          LEARN MORE
        </Typography>
        <Box
          onClick={handleCta}
          component="button"
          disabled={!props.enabled}
          sx={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <Typography
            fontSize="14px"
            sx={{
              width: 'max-content',
              color: installTextColor,
              letterSpacing: '1.25px',
            }}
          >
            {props.isInstalled ? 'UNINSTALL APP' : 'INSTALL APP'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default IntegrationCard;
