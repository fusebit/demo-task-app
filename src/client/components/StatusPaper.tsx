import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography, PaperProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props extends PaperProps {
  title: string;
  children: React.ReactNode;
}

const StatusPaper = ({ title, children, ...props }: Props) => {
  const [open, setOpen] = useState(true);
  const [disableHelpBox, setDisableHelpBox] = useState<boolean>(false);
  const localstorageKey = `disable-${title.toLowerCase().replaceAll(' ', '-')}-help-box`;

  const handleClick = () => {
    localStorage.setItem(localstorageKey, 'true');
    setOpen(false);
  };

  useEffect(() => {
    const isHelpBoxDisabled = localStorage.getItem(localstorageKey) === 'true';
    setDisableHelpBox(isHelpBoxDisabled);
  }, []);

  if (open && !disableHelpBox) {
    return (
      <Paper {...props} sx={{ position: 'relative' }}>
        <Box position="absolute" right="5px" top="5px">
          <IconButton aria-label="close" onClick={handleClick}>
            <CloseIcon fontSize="small" sx={{ color: '#333333' }} />
          </IconButton>
        </Box>
        <Box padding="20px">
          <Box display="flex" alignItems="center" mb="20px">
            <Box padding="7px" borderRadius="50%" boxShadow="0px 11px 20px rgba(0, 0, 0, 0.1)" mr="14px">
              <img src="/static/fusebit-logo.svg" alt="Fusebit" width="20px" height="20px" />
            </Box>
            <Typography fontSize="22px" lineHeight="24px" fontWeight="500" variant="h6" component="h6">
              {title}
            </Typography>
          </Box>
          <Box style={{ opacity: 0.54 }}>{children}</Box>
        </Box>
      </Paper>
    );
  }

  return null;
};
export default StatusPaper;
