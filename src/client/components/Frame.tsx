import React from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
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
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 310;
const iconStyle = { color: 'white', marginLeft: '10px' };

const sampleAppLinks = [
  { id: 'tasks', icon: <InboxIcon sx={iconStyle} />, text: 'Your Tasks', to: '/' },
  { id: 'marketplace', icon: <StarIcon sx={iconStyle} />, text: 'Integrations Marketplace', to: '/marketplace' },
  { id: 'logout', icon: <ExitToAppIcon sx={iconStyle} />, text: 'Logout', logout: true },
];

const learnMoreLinks = [
  {
    id: 'docs',
    icon: <InsertDriveFileIcon sx={iconStyle} />,
    text: 'Docs',
    to: 'https://developer.fusebit.io/docs/getting-started',
    target: '_blank',
  },
  { id: 'blog', icon: <SubjectIcon sx={iconStyle} />, text: 'Blog', to: 'https://fusebit.io/blog/', target: '_blank' },
  { id: 'github', icon: <GitHubIcon sx={iconStyle} />, text: 'Github', to: '/github', taget: '_self' },
];

const Frame = (props: React.PropsWithChildren<{ userData?: UserData; onLogout: () => void }>) => {
  if (!props.userData.currentUserId) {
    return <React.Fragment />;
  }
  const currentUser = props.userData.users[props.userData.currentUserId];
  return (
    <Box display="flex">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Paper square className="navigation-drawer full-pointer">
          <List disablePadding>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                border="1px dotted #FFFFFF"
                borderRadius="8px"
                padding="38px 0"
                mb="40px"
              >
                <Typography fontSize="18px" lineHeight="21px" sx={{ width: 'fit-content' }}>
                  Your Logo Here
                </Typography>
              </Box>
            </ListItem>
            <ListItem sx={{ marginBottom: '32px', marginLeft: '10px' }}>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: '#BBDEFB' }}>
                  <PersonIcon sx={{ color: '#1F2937' }} />
                </Avatar>
              </ListItemIcon>
              <ListItemText>{currentUser?.name}</ListItemText>
            </ListItem>
            <ListItem sx={{ marginBottom: '12px', marginLeft: '10px' }}>
              <Typography fontWeight="700">Sample App</Typography>
            </ListItem>
            {sampleAppLinks.map((link) => {
              return (
                <RouterLink key={link.id} to={link.to || ''} style={{ textDecoration: 'none', color: 'white' }}>
                  <ListItemButton
                    sx={{ backgroundColor: link.to && link.to === window.location.pathname && 'rgba(255,255,255,0.2)' }}
                    onClick={link.logout && props.onLogout}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText>{link.text}</ListItemText>
                  </ListItemButton>
                </RouterLink>
              );
            })}
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.5)', margin: '35px 0' }} />
            <ListItem sx={{ marginBottom: '12px', marginLeft: '10px' }}>
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
        </Paper>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Frame;
