import {BrowserRouter as Router, Route, Switch, useLocation, RouteProps} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import React, {useEffect, useState} from "react";
import Frame from "./Frame";
import {Tenant} from "./Types";
import Marketplace from "./Marketplace";
import {Users} from '../api';

const AppRouter = () => (
        <Router>
            <Routes/>
        </Router>
    );

const AuthedRoute = (props: {authorized: boolean, onLogin: Function} & RouteProps) => {
    if(props.authorized) {
        return <Route {...props} />
    }
    return <Login onLogin={props.onLogin}/>
}
const Routes = () => {
    const [currentUser, setCurrentUser] = useState<Tenant | undefined>();
    const [isAuthorized, setAuthorized] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== '/') {
            setRefresh(true);
        }
    }, [location.pathname]);
    useEffect(() => {
        if (refresh) {
            Users.me().then(me => {
                if (me.id) {
                    setCurrentUser(me);
                    setAuthorized(true);
                } else {
                    setCurrentUser(undefined);
                    setAuthorized(false);
                }
                setRefresh(false);
            });
        }
    }, [refresh]);

    const handleLogin = async (user: Tenant) => {
        await Users.login(user);
        setRefresh(true);
    }

    const handleLogout = async () => {
        await Users.logout();
        setRefresh(true);
    }

    const frameProps = {
        onLogout: handleLogout,
        currentUser
    };
    const authRouteProps = {
        authorized: isAuthorized,
        onLogin: handleLogin
    }

    return (
        <Switch>
            <AuthedRoute path="/marketplace" {...authRouteProps}>
                <Frame {...frameProps}>
                    <Marketplace/>
                </Frame>
            </AuthedRoute>
            <AuthedRoute path="/" {...authRouteProps}>
                <Frame {...frameProps}>
                    <Dashboard/>
                </Frame>
            </AuthedRoute>

        </Switch>
    )
}

export default AppRouter;