import React from 'react';
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
import { useCustomColorsContext } from './useCustomColorsContext';
import tinycolor from 'tinycolor2';
import DropzoneLogo from './DropzoneLogo';

const Frame: React.FC<{ userData?: UserData; onLogout: () => void; appToTest: Feed; children?: any } & RouteProps> = (
  props
) => {
  const { colors } = useCustomColorsContext();
  if (!props.userData.currentUserId) {
    return <React.Fragment />;
  }
  const currentUser = props.userData.users[props.userData.currentUserId];
  console.log(props.userData);

  const iconStyle = { color: colors.sidebarText };

  const learnMoreLinks = [
    {
      id: 'docs',
      icon: <InsertDriveFileIcon sx={iconStyle} />,
      text: 'Docs',
      to: 'https://developer.fusebit.io/docs/getting-started',
      target: '_blank',
    },
    {
      id: 'blog',
      icon: <SubjectIcon sx={iconStyle} />,
      text: 'Blog',
      to: 'https://fusebit.io/blog/',
      target: '_blank',
    },
    {
      id: 'github',
      icon: <GitHubIcon sx={iconStyle} />,
      text: 'Github',
      to: 'https://github.com/fusebit/demo-task-app',
      target: '_blank',
    },
  ];

  const sampleAppLinks = [
    { id: 'tasks', icon: <InboxIcon sx={iconStyle} />, text: `Your ${getItemName(props.appToTest, true)}`, to: '/' },
    { id: 'marketplace', icon: <StarIcon sx={iconStyle} />, text: 'Integrations Marketplace', to: '/marketplace' },
  ];

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
        <Box style={{ backgroundColor: colors.primary, height: '100%', padding: '12px 0', color: colors.sidebarText }}>
          <List disablePadding>
            <ListItem>
              <Box mt="8px" mb="12px" width="100%">
                <DropzoneLogo />
              </Box>
            </ListItem>
            <ListItem sx={{ marginBottom: '12px' }}>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: currentUser.color }}>
                  <PersonIcon sx={{ color: tinycolor(currentUser.color).isDark() ? '#ffffff' : '#000000' }} />
                </Avatar>
              </ListItemIcon>
              <ListItemText sx={{ color: colors.sidebarText }}>{currentUser?.name}</ListItemText>
            </ListItem>
            <ListItem sx={{ marginBottom: '12px' }}>
              <Typography fontWeight="700">Sample App</Typography>
            </ListItem>
            {sampleAppLinks.map((link) => {
              return (
                <RouterLink
                  key={link.id}
                  to={link.to || ''}
                  style={{ textDecoration: 'none', color: colors.sidebarText }}
                >
                  <ListItemButton
                    sx={{
                      backgroundColor:
                        link.to &&
                        link.to === window.location.pathname &&
                        tinycolor(colors.sidebarText).brighten(100).setAlpha(0.2).toRgbString(),
                    }}
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
            <Divider
              sx={{ borderColor: tinycolor(colors.sidebarText).setAlpha(0.5).toRgbString(), margin: '20px 0' }}
            />
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
                  style={{ textDecoration: 'none', color: colors.sidebarText }}
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
