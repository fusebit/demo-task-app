import React from 'react';
import { Box, Typography } from '@mui/material';
import { IntegrationTypeEnum } from '../../constants';

const IntegrationCard = (props: {
  integration: IntegrationType;
  isInstalled?: boolean;
  onUninstall: Function;
  enabled?: boolean;
}) => {
  const installApp = () => (window.location.href = `/api/integration/${props.integration}/install`);
  const uninstallApp = () => props.onUninstall(props.integration);

  return (
    <Box
      mr="10px"
      mb="40px"
      width="260px"
      padding="25px"
      borderRadius="4px"
      boxShadow={props.enabled && '0px 20px 48px rgba(52, 72, 123, 0.1)'}
      sx={{ backgroundColor: !props.enabled && '#F2F2F2', cursor: 'default' }}
    >
      {props.enabled && (
        <Typography fontSize="12px" fontWeight={500} sx={{ color: '#333333' }}>
          My-integration-302
        </Typography>
      )}
      <img
        src={`static/${props.integration}.png`}
        height="52" 
        style={{ objectFit: 'contain', margin: '8px 0 15px', filter: !props.enabled && 'grayscale(100%)' }}
      />
      <Box display="flex" alignItems="center">
        <Typography
          fontSize="14px"
          sx={{
            marginRight: '24px',
            color: props.enabled ? '#333333' : '#959595',
            cursor: props.enabled && 'pointer',
            letterSpacing: '1.25px',
          }}
        >
          LEARN MORE
        </Typography>
        {props.isInstalled ? (
          <Box onClick={props.enabled && uninstallApp}>
            <Typography
              fontSize="14px"
              sx={{ color: '#F44336', cursor: props.enabled && 'pointer', letterSpacing: '1.25px' }}
            >
              UNINSTALL APP
            </Typography>
          </Box>
        ) : (
          <Box onClick={props.enabled && installApp}>
            <Typography
              fontSize="14px"
              sx={{
                color: props.enabled ? '#3F51B5' : '#959595',
                cursor: props.enabled && 'pointer',
                letterSpacing: '1.25px',
              }}
            >
              INSTALL APP
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default IntegrationCard;
