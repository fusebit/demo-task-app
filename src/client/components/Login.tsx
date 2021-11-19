import React from 'react';
import StatusPaper from './StatusPaper';
import { Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Box, Typography } from '@mui/material';

export default (props: { onLogin: Function; userData: UserData }) => {
  const handleLogin = (user: User) => async () => {
    props.onLogin({
      users,
      currentUserId: user.userId,
    });
  };

  const users: Users = props.userData?.users || {
    'tentant-1': {
      userId: 'tentant-1',
      name: 'Tentant 1',
      index: 0,
    },
    'tentant-2': {
      userId: 'tentant-2',
      name: 'Tenant 2',
      index: 1,
    },
  };

  return (
    <Grid container justifyContent="center">
      <Box position="absolute" left="0" top="0" width="100vw" height="204px" style={{ backgroundColor: '#333333' }} />
      <Grid item xs={8} position="relative" mt="113px">
        <StatusPaper title="Welcome to the Fusebit Sample App!" elevation={24}>
          <Typography>
            Fusebit provides multi-tenancy out of box, we've mocked out four users for you in this sample app so you can
            see it in action. Log in to get started and{' '}
            <strong>don't forget to follow along in the code in your favorite editor</strong>!
          </Typography>
        </StatusPaper>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={4} position="relative">
        <Paper style={{ borderRadius: 25 }}>
          <List>
            {Object.values(users).map((user, index) => (
              <ListItem button onClick={handleLogin(user)} key={index}>
                <ListItemIcon>
                  <Avatar>{user.index + 1}</Avatar>
                </ListItemIcon>
                <ListItemText>{user.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};
