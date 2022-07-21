import React, { useEffect, useState } from 'react';
import { Avatar, Grid, ListItemIcon, ListItemText, Box, Typography, Input } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useCustomColorsContext } from './useCustomColorsContext';
import DropzoneLogo from './DropzoneLogo';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import IconButton from '@mui/material/IconButton';
import tinycolor from 'tinycolor2';

export default (props: { onLogin: Function }) => {
  const { colors, isPrimaryColorWhite } = useCustomColorsContext();
  const [users, setUsers] = useState<Users>({});
  const [editTenantId, setEditTenantId] = useState<string>('');
  const [newTenantName, setNewTenantName] = useState<string>('');

  const DEFAULT_USERS: Users = {
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
    if (!newTenantName) {
      return;
    }

    users[user.userId].name = newTenantName;
    localStorage.setItem('users', JSON.stringify(users));
    setEditTenantId('');
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      storedUsers['Sample-App-Tenant-1'].color = colors.primary;
      storedUsers['Sample-App-Tenant-2'].color = colors.secondary;
      setUsers(storedUsers);
    } else {
      setUsers(DEFAULT_USERS);
    }
  }, []);

  return (
    <Grid display="flex" minHeight={'100vh'} container>
      <Grid
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'50vw'}
        sx={{
          background: !isPrimaryColorWhite
            ? colors.primary
            : `linear-gradient(${colors.primary} 40%, ${tinycolor(colors.secondary).setAlpha(0.5).toRgbString()} 100%)`,
        }}
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
        <Typography fontWeight="700" mb="76px" fontSize="32px" lineHeight="56px" variant="h1" component="h1">
          Choose an Account
        </Typography>
        {Object.values(users).map((user, index) => (
          <Box
            onClick={() => {
              if (editTenantId === user.userId) {
                return;
              }

              props.onLogin({
                users,
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
                  autoFocus
                  onBlur={() => {
                    handleSubmitUserData(user);
                  }}
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
                    setNewTenantName(user.name);
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
