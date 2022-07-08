import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography, PaperProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const DISABLE_HELPERS_LOCALSTORAGE_KEY = 'disableHelpers';

interface Props extends PaperProps {
  title: string;
  children: React.ReactNode;
}

const StatusPaper = ({ title, children, ...props }: Props) => {
  const [open, setOpen] = useState(true);
  const [disableHelpBox, setDisableHelpBox] = useState<boolean>(false);

  const handleClick = () => {
    localStorage.setItem(DISABLE_HELPERS_LOCALSTORAGE_KEY, 'true');
    setOpen(false);
  };

  useEffect(() => {
    const isHelpBoxDisabled = localStorage.getItem(DISABLE_HELPERS_LOCALSTORAGE_KEY) === 'true';
    setDisableHelpBox(isHelpBoxDisabled);
  }, []);

  if (open && !disableHelpBox) {
    return (
      <Paper
        {...props}
        sx={{
          position: 'relative',
          boxShadow: 'none',
          border: '1px solid #99938D',
          borderRadius: '4px',
        }}
      >
        <Box position="absolute" right="24px" top="16px">
          <IconButton aria-label="close" onClick={handleClick}>
            <CloseIcon fontSize="small" sx={{ color: '#333333' }} />
          </IconButton>
        </Box>
        <Box padding="24px">
          <Box display="flex" alignItems="center" mb="20px">
            <img
              src="/static/fusebit-logo.svg"
              alt="Fusebit"
              width="20px"
              height="20px"
              style={{ marginRight: '7px' }}
            />
            <Typography fontSize="20px" lineHeight="24px" fontWeight="600" variant="h6" component="h6">
              {title}
            </Typography>
          </Box>
          <Box style={{ color: '#6F645B', fontSize: '16px', lineHeight: '24px' }}>{children}</Box>
        </Box>
      </Paper>
    );
  }

  return null;
};
export default StatusPaper;
