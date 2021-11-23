import React from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
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
import CustomButton from './CustomButton';

const drawerWidth = 310;
const iconStyle = { color: 'white', marginLeft: '10px' };

const sampleAppLinks = [
  { id: 'tasks', icon: <InboxIcon style={iconStyle} />, text: 'Your Tasks', to: '/' },
  { id: 'marketplace', icon: <StarIcon style={iconStyle} />, text: 'Integrations Marketplace', to: '/marketplace' },
  { id: 'logout', icon: <ExitToAppIcon style={iconStyle} />, text: 'Logout', logout: true },
];

const learnMoreLinks = [
  { id: 'docs', icon: <InsertDriveFileIcon style={iconStyle} />, text: 'Docs', to: '/docs' },
  { id: 'blog', icon: <SubjectIcon style={iconStyle} />, text: 'Blog', to: '/blog' },
  { id: 'github', icon: <GitHubIcon style={iconStyle} />, text: 'Github', to: '/github' },
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
          <List disablePadding style={{ padding: '0' }}>
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
                <Typography fontSize="18px" lineHeight="21px" style={{ width: 'fit-content' }}>
                  Your Logo Here
                </Typography>
              </Box>
            </ListItem>
            <ListItem style={{ marginBottom: '32px' }}>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: '#BBDEFB' }}>
                  <PersonIcon sx={{ color: '#1F2937' }} />
                </Avatar>
              </ListItemIcon>
              <ListItemText>{currentUser?.name}</ListItemText>
            </ListItem>
            <ListItem style={{ marginBottom: '12px' }}>
              <Typography fontWeight="700">Sample App</Typography>
            </ListItem>
            {sampleAppLinks.map((link) => {
              return (
                <CustomButton key={link.id} to={link.to} onClick={link.logout && props.onLogout}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText>{link.text}</ListItemText>
                </CustomButton>
              );
            })}
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.5)', margin: '35px 0' }} />
            <ListItem style={{ marginBottom: '12px' }}>
              <Typography fontWeight="700">Learn More</Typography>
            </ListItem>
            {learnMoreLinks.map((link) => {
              return (
                <CustomButton key={link.id} to={link.to}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText>{link.text}</ListItemText>
                </CustomButton>
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
