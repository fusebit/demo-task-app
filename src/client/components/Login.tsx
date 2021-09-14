import React from "react";
import {useHistory} from 'react-router-dom';
import StatusPaper from "./StatusPaper";
import {Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, Paper} from "@material-ui/core";
import {User} from "./Types";

export default (props: {onLogin: (user: User) => void, currentUser: User}) => {
    const history = useHistory();

    const handleLogin = (user: User) => () => {
        props.onLogin(user)
        history.push('/dashboard');
    }

    const users = [
        {
            id: 1,
            name: 'Tenant 1'
        },
        {
            id: 2,
            name: 'Tenant 2'
        }
    ]

    return (
        <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={8}>
                    <StatusPaper elevation={24}>
                        <React.Fragment>
                            <h1>Welcome to the Fusebit Sample App! integrationUrl </h1>
                            <p>Fusebit provides multi-tenancy out of box, we've mocked out two users for you in this sample app so you can see it in action.  Log in to get started and <strong>don't forget to follow along in the code in your favorite editor</strong>!</p>
                        </React.Fragment>
                    </StatusPaper>
            </Grid>
            <Grid item xs={12}/>
            <Grid item xs={4}>
                    <Paper style={{borderRadius: 25}}>
                        <List>
                            {users.map((user, index) => (
                                <ListItem button onClick={handleLogin(user)} key={index}>
                                    <ListItemIcon>
                                        <Avatar>{user.id}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {user.name}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
            </Grid>
        </Grid>
    );
}