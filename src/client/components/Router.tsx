import { BrowserRouter as Router, Route, Switch, useLocation, RouteProps } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import React, { useEffect, useState } from 'react';
import Frame from './Frame';
import Marketplace from './Marketplace';
import { CircularProgress, Fade } from '@mui/material';

const AppRouter = () => (
  <Router>
    <Routes />
  </Router>
);

const AuthedRoute = (props: { onLogin: Function; userData: UserData } & RouteProps) => {
  if (props.userData?.currentUserId) {
    return <Route {...props} />;
  }
  return <Login onLogin={props.onLogin} userData={props.userData} />;
};

const Routes = () => {
  const [userData, setUserData] = useState<UserData>();
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    // Check if browser is logged in and fetch user data
    getMe()
      .then((userData) => {
        if (mounted) {
          setUserData(userData);
        }
      })
      .catch((e) => {
        if (mounted) {
          setUserData(undefined);
        }
      })
      .finally(() => {
        if (mounted) {
          setHasLoaded(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const getMe = async () =>
    fetch('/api/user/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('configuration')}` },
      credentials: 'include',
    }).then((response) => response.json());

  const { hash } = useLocation();
  useEffect(() => {
    if (!hash || !hash.includes('configuration=')) {
      return;
    }
    const configuration = hash.split('configuration=')[1];
    localStorage.setItem('configuration', configuration);
  }, [hash]);

  if (!hasLoaded) {
    return (
      <Fade
        in
        style={{
          transitionDelay: '800ms',
        }}
        unmountOnExit
        timeout={1000}
      >
        <CircularProgress size="400" style={{ margin: 'auto', display: 'flex', padding: 20 }} />
      </Fade>
    );
  }

  const handleLogin = async (userData: UserData) => {
    await fetch('/api/user/login', {
      body: JSON.stringify(userData),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('configuration')}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'include',
    });
    await getMe().then((userData) => setUserData(userData));
  };

  const handleLogout = async () => {
    await fetch('/api/user/logout', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('configuration')}` },
      credentials: 'include',
    });
    await getMe().finally(() => setUserData(undefined));
  };

  const AuthedRouteWithProps = (props: { path: string } & RouteProps) => (
    <AuthedRoute {...props} onLogin={handleLogin} userData={userData} />
  );

  const FrameWithProps = (props: RouteProps) => <Frame {...props} onLogout={handleLogout} userData={userData} />;

  const handleUninstall = async () => {
    await fetch('/api/integration/install', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('configuration')}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'include',
    });
    await getMe()
      .then((userData) => setUserData(userData))
      .catch(() => ({}));
  };

  return (
    <Switch>
      <AuthedRouteWithProps path="/marketplace">
        <FrameWithProps>
          <Marketplace userData={userData} onUninstall={handleUninstall} />
        </FrameWithProps>
      </AuthedRouteWithProps>
      <AuthedRouteWithProps path="/">
        <FrameWithProps>
          <Dashboard integrations={userData?.integrations} />
        </FrameWithProps>
      </AuthedRouteWithProps>
    </Switch>
  );
};

export default AppRouter;
