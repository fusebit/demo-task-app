import React from 'react';
import StatusPaper from './StatusPaper';
import { Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export default (props: { onLogin: Function; userData: UserData }) => {
  const handleLogin = (user: User) => async () => {
    props.onLogin({
      users,
      currentUserId: user.userId,
    });
  };

  const users: Users = props.userData?.users || {
    'tentant-1': {
      userId: 'Sample-App-Tenant-1',
      name: 'Tentant 1',
      color: '#BBDEFB',
      index: 0,
    },
    'tentant-2': {
      userId: 'Sample-App-Tenant-2',
      name: 'Tenant 2',
      color: '#FFA600',
      index: 1,
    },
  };

  return (
    <Grid display="flex" flexDirection="column" container alignItems="center" justifyContent="center">
      <Box position="absolute" left="0" top="0" width="100vw" height="204px" style={{ backgroundColor: '#333333' }} />
      <Grid item xs={6} position="relative" mt="113px">
        <StatusPaper title="Welcome to the Fusebit Sample App!" elevation={24}>
          <Typography fontSize="16px" lineHeight="24px">
            Fusebit provides multi-tenancy out of box, we’ve mocked out two users for you in this sample app so you can
            see it in action. Log in to get started and don’t forget to follow along in the code in your favorite
            editor!
          </Typography>
        </StatusPaper>
      </Grid>
      <Grid minWidth="268px" position="relative" mt="104px">
        <Paper elevation={24}>
          <Box padding="21px 0px 13px">
            <Typography
              fontWeight="500"
              mb="20px"
              ml="15px"
              fontSize="20px"
              lineHeight="24px"
              variant="h3"
              component="h3"
            >
              Welcome user!
            </Typography>
            <List>
              {Object.values(users).map((user, index) => (
                <ListItem disablePadding button onClick={handleLogin(user)} key={index}>
                  <Box display="flex" alignItems="center" padding="8px 0px" ml="15px">
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: user.color }}>
                        <PersonIcon sx={{ color: '#1F2937' }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText>{user.name}</ListItemText>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
