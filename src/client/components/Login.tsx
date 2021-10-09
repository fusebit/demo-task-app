import React from 'react';
import StatusPaper from './StatusPaper';
import { Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';

export default (props: { onLogin: Function; userData: UserData }) => {
  const handleLogin = (user: User) => async () => {
    props.onLogin({
      users,
      currentUserId: user.userId,
    });
  };

  const users: Users = props.userData?.users || {
    'user-id-1': {
      userId: 'user-id-1',
      name: 'User 1',
      index: 0,
    },
    'user-id-2': {
      userId: 'user-id-2',
      name: 'User 2',
      index: 1,
    },
    'user-id-3': {
      userId: 'user-id-3',
      name: 'User 3',
      index: 2,
    },
    'user-id-4': {
      userId: 'user-id-4',
      name: 'User 4',
      index: 3,
    },
  };

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item xs={8}>
        <StatusPaper elevation={24}>
          <React.Fragment>
            <h1>Welcome to the Fusebit Sample App!</h1>
            <p>
              Fusebit provides multi-tenancy out of box, we've mocked out four users for you in this sample app so you
              can see it in action. Log in to get started and{' '}
              <strong>don't forget to follow along in the code in your favorite editor</strong>!
            </p>
          </React.Fragment>
        </StatusPaper>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={4}>
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
