import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Drawer,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link as RouterLink, RouteProps } from 'react-router-dom';
import { getItemName } from '../utils';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const iconStyle = { color: 'white' };

const learnMoreLinks = [
  {
    id: 'docs',
    icon: <InsertDriveFileIcon sx={iconStyle} />,
    text: 'Docs',
    to: 'https://developer.fusebit.io/docs/getting-started',
    target: '_blank',
  },
  { id: 'blog', icon: <SubjectIcon sx={iconStyle} />, text: 'Blog', to: 'https://fusebit.io/blog/', target: '_blank' },
  {
    id: 'github',
    icon: <GitHubIcon sx={iconStyle} />,
    text: 'Github',
    to: 'https://github.com/fusebit/demo-task-app',
    target: '_blank',
  },
];

const StyledLogo = styled.img`
  height: 50px;
  width: auto;
  max-width: 300px;
  object-fit: contain;
`;

const Frame: React.FC<{ userData?: UserData; onLogout: () => void; appToTest: Feed; children?: any } & RouteProps> = (
  props
) => {
  const [logo, setLogo] = useState('');
  if (!props.userData.currentUserId) {
    return <React.Fragment />;
  }
  const currentUser = props.userData.users[props.userData.currentUserId];

  const sampleAppLinks = [
    { id: 'tasks', icon: <InboxIcon sx={iconStyle} />, text: `Your ${getItemName(props.appToTest, true)}`, to: '/' },
    { id: 'marketplace', icon: <StarIcon sx={iconStyle} />, text: 'Integrations Marketplace', to: '/marketplace' },
  ];

  useEffect(() => {
    const logo = localStorage.getItem('logo');
    if (logo) {
      setLogo(logo);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((image: Blob) => {
      const reader = new FileReader();
      reader.onabort = () => alert('file reading was aborted');
      reader.onerror = () => alert('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        localStorage.setItem('logo', String(binaryStr));
        setLogo(String(binaryStr));
      };
      reader.readAsDataURL(image);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpg': [],
      'image/svg+xml': [],
    },
  });

  const dropzoneText = useMemo(() => {
    if (isDragReject) {
      return 'Invalid Image Type';
    } else if (isDragActive) {
      return 'Drop Your Logo Here';
    }

    return 'Drag Your Logo Here';
  }, [isDragActive, isDragReject]);

  return (
    <Box display="flex">
      <Drawer
        sx={{
          width: 310,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 310,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box style={{ backgroundColor: '#333333', height: '100%', padding: '12px 0', color: 'white' }}>
          <List disablePadding>
            <ListItem>
              {logo ? (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Box className="drawer-logo-container" sx={{ width: '260px !important' }}>
                      <Typography fontSize="18px" lineHeight="21px" sx={{ width: 'fit-content' }}>
                        {dropzoneText}
                      </Typography>
                    </Box>
                  ) : (
                    <StyledLogo src={logo} alt="logo" />
                  )}
                </div>
              ) : (
                <Box className="drawer-logo-container" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Typography fontSize="18px" lineHeight="21px" sx={{ width: 'fit-content' }}>
                    {dropzoneText}
                  </Typography>
                </Box>
              )}
            </ListItem>
            <ListItem sx={{ marginBottom: '12px' }}>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: '#BBDEFB' }}>
                  <PersonIcon sx={{ color: '#1F2937' }} />
                </Avatar>
              </ListItemIcon>
              <ListItemText sx={{ color: 'white' }}>{currentUser?.name}</ListItemText>
            </ListItem>
            <ListItem sx={{ marginBottom: '12px' }}>
              <Typography fontWeight="700">Sample App</Typography>
            </ListItem>
            {sampleAppLinks.map((link) => {
              return (
                <RouterLink key={link.id} to={link.to || ''} style={{ textDecoration: 'none', color: 'white' }}>
                  <ListItemButton
                    sx={{ backgroundColor: link.to && link.to === window.location.pathname && 'rgba(255,255,255,0.2)' }}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText>{link.text}</ListItemText>
                  </ListItemButton>
                </RouterLink>
              );
            })}
            <ListItemButton onClick={props.onLogout}>
              <ListItemIcon>
                <ExitToAppIcon sx={iconStyle} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.5)', margin: '20px 0' }} />
            <ListItem sx={{ marginBottom: '12px' }}>
              <Typography fontWeight="700">Learn More</Typography>
            </ListItem>
            {learnMoreLinks.map((link) => {
              return (
                <a
                  rel="noreferrer"
                  target={link.target}
                  key={link.id}
                  href={link.to}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <ListItemButton>
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText>{link.text}</ListItemText>
                  </ListItemButton>
                </a>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Frame;
