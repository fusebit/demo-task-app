import React, { useState } from 'react';
import { Paper, Box, Typography, PaperProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props extends PaperProps {
  title: string;
  children: React.ReactNode;
}

const StatusPaper = ({ title, children, ...props }: Props) => {
  const [open, setOpen] = useState(true);

  if (open) {
    return (
      <Paper {...props}>
        <Box position="absolute" right="5px" top="0">
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon fontSize="small" sx={{ color: '#333333' }} />
          </IconButton>
        </Box>
        <Box padding="20px">
          <Box display="flex" alignItems="center" mb="20px">
            <Box padding="7px" borderRadius="50%" boxShadow="0px 11px 20px rgba(0, 0, 0, 0.1)" mr="14px">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.55383 0.599075C9.35259 -0.199692 10.6476 -0.199692 11.4464 0.599075L19.401 8.55371C20.1998 9.35247 20.1998 10.6475 19.401 11.4463L11.4464 19.4009C10.6477 20.1997 9.35259 20.1997 8.55383 19.4009L0.599197 11.4463C-0.19957 10.6475 -0.19957 9.35247 0.599197 8.5537L8.55383 0.599075ZM3.02686 9.22525C2.59895 9.65316 2.59895 10.3469 3.02686 10.7749C3.45477 11.2028 4.14855 11.2028 4.57646 10.7749L8.03719 7.31412C8.4651 6.88621 8.4651 6.19243 8.03719 5.76452C7.60928 5.33661 6.9155 5.33661 6.48759 5.76452L3.02686 9.22525ZM10.7748 4.5765C10.3469 5.00441 9.65308 5.00445 9.22517 4.57654C8.79726 4.14863 8.7973 3.45481 9.22521 3.0269C9.65312 2.59899 10.3469 2.59895 10.7748 3.02686C11.2028 3.45477 11.2027 4.14859 10.7748 4.5765ZM13.874 6.12615C13.4461 5.69824 12.7523 5.69824 12.3244 6.12615L6.12607 12.3245C5.69816 12.7524 5.69816 13.4462 6.12607 13.8741C6.55398 14.302 7.24776 14.302 7.67567 13.8741L13.874 7.67575C14.3019 7.24784 14.3019 6.55406 13.874 6.12615ZM15.4236 9.22536C15.8515 8.79745 16.5453 8.79745 16.9732 9.22536C17.4011 9.65327 17.4011 10.3471 16.9732 10.775L13.5125 14.2357C13.0846 14.6636 12.3908 14.6636 11.9629 14.2357C11.535 13.8078 11.535 13.114 11.9629 12.6861L15.4236 9.22536ZM10.7749 15.4237C10.347 14.9958 9.65319 14.9958 9.22529 15.4237C8.79738 15.8516 8.79738 16.5453 9.22528 16.9732C9.65319 17.4012 10.347 17.4012 10.7749 16.9733C11.2028 16.5454 11.2028 15.8516 10.7749 15.4237Z"
                  fill="#FB310A"
                />
              </svg>
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
