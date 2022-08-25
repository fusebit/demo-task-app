import React, { useState } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Drawer,
  IconButton,
  Input,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link as RouterLink, RouteProps } from 'react-router-dom';
import { getItemName } from '../utils';
import { useCustomColorsContext } from './useCustomColorsContext';
import tinycolor from 'tinycolor2';
import DropzoneLogo from './DropzoneLogo';
import useFrameColors from './useFrameColors';

const Frame: React.FC<{ userData?: UserData; onLogout: () => void; appToTest: Feed; children?: any } & RouteProps> = (
  props
) => {
  const currentUser = props.userData.users[props.userData.currentUserId];
  const [isEditingName, setIsEditingName] = useState(false);
  const { colors, isDark, isPrimaryColorWhite } = useCustomColorsContext();
  const { avatarColor, itemHoverColor } = useFrameColors({ userId: currentUser.userId });

  if (!props.userData.currentUserId) {
    return <React.Fragment />;
  }

  const iconStyle = { color: colors.sidebarText, height: '20px', width: '20px' };

  const sampleAppLinks = [
    {
      id: 'tasks',
      icon: <AssignmentOutlinedIcon sx={iconStyle} />,
      text: `Your ${getItemName(props.appToTest, true)}`,
      to: '/',
    },
    {
      id: 'marketplace',
      icon: <LanguageOutlinedIcon sx={iconStyle} />,
      text: 'Integrations Marketplace',
      to: '/marketplace',
    },
  ];

  const sidebarLinks = [
    {
      id: 'github',
      icon: <GitHubIcon sx={iconStyle} />,
      text: `View code on Github`,
      onClick: () => {
        window.open('https://github.com/fusebit/demo-task-app', '_blank');
      },
    },
    {
      id: 'logout',
      icon: <LogoutOutlinedIcon sx={iconStyle} />,
      text: `Logout`,
      onClick: () => {
        props.onLogout();
      },
    },
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
            borderRight: !isPrimaryColorWhite
              ? 'none'
              : `1px solid ${tinycolor(colors.sidebarText).setAlpha(0.1).toRgbString()}`,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{ backgroundColor: colors.primary, height: '100%', padding: '40px 0', color: colors.sidebarText }}
        >
          <List disablePadding>
            <ListItem sx={{ padding: '0 24px' }}>
              <Box mb="48px" width="100%">
                <DropzoneLogo />
              </Box>
            </ListItem>
            <ListItem
              sx={{
                marginBottom: '64px',
                padding: '12px 24px',
                background: tinycolor(colors.primary)
                  .darken(isDark ? 4 : 7)
                  .toString(),
                borderTop: `1px solid ${tinycolor(colors.sidebarText)
                  .setAlpha(isDark ? 0.2 : 0.1)
                  .toRgbString()}`,
              }}
            >
              <ListItemIcon>
                <Avatar sx={{ bgcolor: avatarColor }}>
                  <PersonIcon sx={{ color: tinycolor(avatarColor).isDark() ? '#ffffff' : '#000000' }} />
                </Avatar>
              </ListItemIcon>
              <ListItemText sx={{ color: colors.sidebarText, '& .MuiTypography-root': { fontWeight: '600' } }}>
                {currentUser?.name}
              </ListItemText>
            </ListItem>
            <ListItem sx={{ marginBottom: '16px', paddingTop: 0, paddingBottom: 0 }}>
              <Typography fontSize="14px" fontWeight="600" color={colors.sidebarText}>
                SAMPLE APP
              </Typography>
            </ListItem>
            {sampleAppLinks.map((link) => {
              const isLinkActive = link.to && link.to === window.location.pathname;
              return (
                <RouterLink
                  key={link.id}
                  to={link.to || ''}
                  style={{ textDecoration: 'none', color: colors.sidebarText }}
                >
                  <ListItemButton
                    sx={{
                      backgroundColor: isLinkActive && itemHoverColor,
                      transition: 'all .2s ease-in-out',
                      ':hover': {
                        backgroundColor: itemHoverColor,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 'auto', marginRight: '8px' }}>{link.icon}</ListItemIcon>
                    <ListItemText
                      sx={{
                        '& > span': {
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: isLinkActive && '600',
                        },
                      }}
                    >
                      {link.text}
                    </ListItemText>
                  </ListItemButton>
                </RouterLink>
              );
            })}
          </List>
          <Box display="flex" flexDirection="column" marginTop="auto">
            {sidebarLinks.map((link) => {
              return (
                <div key={link.id}>
                  <Box
                    width="100%"
                    height="1px"
                    sx={{ background: tinycolor(colors.sidebarText).setAlpha(0.1).toRgbString(), margin: '16px 0' }}
                  />
                  <ListItemButton
                    onClick={link.onClick}
                    sx={{
                      height: 'max-content',
                      transition: 'all .2s ease-in-out',
                      ':hover': {
                        backgroundColor: itemHoverColor,
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 'auto', marginRight: '8px' }}>{link.icon}</ListItemIcon>
                    <ListItemText
                      sx={{
                        '& > span': {
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: link.id === 'logout' && '600',
                        },
                      }}
                    >
                      {link.text}
                    </ListItemText>
                  </ListItemButton>
                </div>
              );
            })}
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Frame;
