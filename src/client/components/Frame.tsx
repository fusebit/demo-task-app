import React from 'react';
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom'
import {
    Avatar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemProps,
    ListItemIcon,
    ListItemText, Paper,
} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {User} from "./Types";
import {useHistory} from "react-router-dom";

function ListItemLink(props: React.PropsWithChildren<{
    to: string;
}>) {
    const {to} = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <ListItem button component={renderLink}>
            {props.children}
        </ListItem>
    );
}


const Frame = (props: React.PropsWithChildren<{currentUser?: User}>) => {
    if (!props.currentUser) {
        const history = useHistory();
        history.push('/');
        return <React.Fragment/>;
    }
    return (
        <div>
            <Grid container className="navigation-drawer-grid">
                <Grid item xs={2}>
                    <Paper
                        square
                        className="navigation-drawer"
                    >
                        <List>
                            <ListItem className="center-text">
                                <Avatar>{props.currentUser.id}</Avatar>
                                <ListItemText>{props.currentUser.name}</ListItemText>
                            </ListItem>
                            <ListItem className="center-text">
                                <ListItemText>Sample App</ListItemText>
                            </ListItem>
                            <Divider variant="middle" style={{backgroundColor: 'white'}} />
                            <ListItemLink to='/dashboard'>
                                <ListItemIcon><InboxIcon style={{color:"white"}}/></ListItemIcon>
                                <ListItemText>Your Tasks</ListItemText>
                            </ListItemLink>
                            <ListItemLink to='/marketplace'>
                                <ListItemIcon><StarIcon style={{color:"white"}}/></ListItemIcon>
                                <ListItemText>Integration Marketplace</ListItemText>
                            </ListItemLink>
                            <ListItemLink to='/logout'>
                                <ListItemIcon><ExitToAppIcon style={{color:"white"}}/></ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </ListItemLink>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={2}/>
                <Grid item xs={10}>
                    {props.children}
                </Grid>
            </Grid>
    </div>
    )
}

export default Frame;