import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function ListItemLink(
  props: React.PropsWithChildren<{
    to: string;
  }>
) {
  const { to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink}>
      {props.children}
    </ListItem>
  );
}

const Frame = (props: React.PropsWithChildren<{ userData?: UserData; onLogout: () => void }>) => {
  if (!props.userData.currentUserId) {
    return <React.Fragment />;
  }
  const currentUser = props.userData.users[props.userData.currentUserId];
  return (
    <div>
      <Grid container className="navigation-drawer-grid null-pointer">
        <Grid item minWidth="310px">
          <Paper square className="navigation-drawer full-pointer">
            <List disablePadding style={{ padding: '64px 0' }}>
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
              <ListItem className="center-text">
                <Avatar>{currentUser?.index + 1}</Avatar>
                <ListItemText>{currentUser?.name}</ListItemText>
              </ListItem>
              <ListItem className="center-text">
                <ListItemText>Sample App</ListItemText>
              </ListItem>
              <Divider variant="middle" style={{ backgroundColor: 'white' }} />
              <ListItemLink to="/">
                <ListItemIcon>
                  <InboxIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText>Your Tasks</ListItemText>
              </ListItemLink>
              <ListItemLink to="/marketplace">
                <ListItemIcon>
                  <StarIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText>Integrations Marketplace</ListItemText>
              </ListItemLink>
              <ListItem button onClick={props.onLogout}>
                <ListItemIcon>
                  <ExitToAppIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={2} />
        <Grid item xs={10}>
          {props.children}
        </Grid>
      </Grid>
    </div>
  );
};

export default Frame;
