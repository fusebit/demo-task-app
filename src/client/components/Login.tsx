import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Grid, ListItemIcon, ListItemText, Paper, Box, Typography, Input } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useCustomColorsContext } from './useCustomColorsContext';
import DropzoneLogo from './DropzoneLogo';
import tinycolor from 'tinycolor2';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import IconButton from '@mui/material/IconButton';

export default (props: { onLogin: Function }) => {
  const { colors } = useCustomColorsContext();
  const [userData, setUserData] = useState<Users>({});
  const [editTenantId, setEditTenantId] = useState<string>('');
  const [newTenantName, setNewTenantName] = useState<string>('');

  const DEFAULT_USER_DATA: Users = {
    'Sample-App-Tenant-1': {
      userId: 'Sample-App-Tenant-1',
      name: 'Tenant 1',
      color: colors.primary,
      index: 0,
    },
    'Sample-App-Tenant-2': {
      userId: 'Sample-App-Tenant-2',
      name: 'Tenant 2',
      color: colors.secondary,
      index: 1,
    },
  };

  const handleSubmitUserData = (user: User) => {
    userData[user.userId].name = newTenantName;
    localStorage.setItem('userData', JSON.stringify(userData));
    setEditTenantId('');
  };

  useEffect(() => {
    const userData: Users = JSON.parse(localStorage.getItem('userData')) || DEFAULT_USER_DATA;
    setUserData(userData);
  }, []);

  return (
    <Grid display="flex" minHeight={'100vh'} container>
      {/* <Grid item xs={6} position="relative" mt="113px">
        <StatusPaper title="Welcome to the Fusebit Sample App!" elevation={24}>
          <Typography fontSize="16px" lineHeight="24px">
            Fusebit provides multi-tenancy out of box, we’ve mocked out two users for you in this sample app so you can
            see it in action. Log in to get started and don’t forget to follow along in the code in your favorite
            editor!
          </Typography>
        </StatusPaper>
      </Grid> */}
      <Grid
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'50vw'}
        sx={{ background: colors.primary }}
      >
        <Box width={'290px'} height={'20px'}>
          <DropzoneLogo />
        </Box>
      </Grid>
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="50vw"
        position="relative"
      >
        <Typography fontWeight="700" mb="76px" fontSize="48px" lineHeight="56px" variant="h1" component="h1">
          Welcome!
        </Typography>
        {Object.values(userData).map((user, index) => (
          <Box
            onClick={() => {
              props.onLogin({
                users: userData,
                currentUserId: user.userId,
              });
            }}
            key={index}
            display="flex"
            alignItems="center"
            padding="24px"
            width="394px"
            boxShadow="0px 20px 48px rgba(52, 72, 123, 0.1)"
            mb="32px"
            borderRadius="8px"
            sx={{
              position: 'relative',
              zIndex: 1000000,
              transition: 'all .2s ease-in-out',
              ':hover': {
                cursor: 'pointer',
                boxShadow: '0px 20px 48px rgba(52, 72, 123, 0.3)',
                transform: 'translateY(-5px)',
              },
              ':active': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 20px 48px rgba(52, 72, 123, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <Avatar sx={{ bgcolor: user.color }}>
                <PersonIcon sx={{ color: tinycolor(user.color).isDark() ? '#ffffff' : '#000000' }} />
              </Avatar>
            </ListItemIcon>
            {editTenantId === user.userId ? (
              <>
                <Input
                  onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                      handleSubmitUserData(user);
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    setNewTenantName(e.target.value);
                  }}
                  defaultValue={user.name}
                  fullWidth
                />
                <IconButton
                  aria-label="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmitUserData(user);
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <DoneOutlinedIcon sx={{ color: '#000000' }} />
                  </ListItemIcon>
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText>{user.name}</ListItemText>
                <IconButton
                  aria-label="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditTenantId(user.userId);
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <EditOutlinedIcon sx={{ color: '#000000' }} />
                  </ListItemIcon>
                </IconButton>
              </>
            )}
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};
