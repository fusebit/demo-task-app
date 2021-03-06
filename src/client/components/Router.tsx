import { BrowserRouter as Router, Route, Switch, useLocation, RouteProps } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import React, { useEffect, useState } from 'react';
import Frame from './Frame';
import Marketplace from './Marketplace';
import { CircularProgress, createTheme, Fade, ThemeProvider } from '@mui/material';
import { useCustomColorsContext } from './useCustomColorsContext';

const AppRouter = () => {
  const { colors } = useCustomColorsContext();

  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
    },
    typography: {
      fontFamily: `"Source Sans Pro", "Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            padding: '16px 24px',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: '16px 24px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
};

const AuthedRoute = (props: { onLogin: Function; userData: UserData } & RouteProps) => {
  if (props.userData?.currentUserId) {
    return <Route {...props} />;
  }
  return <Login onLogin={props.onLogin} />;
};

const Routes = () => {
  const [userData, setUserData] = useState<UserData>();
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const { hash } = useLocation();
  const { colors, isPrimaryColorWhite } = useCustomColorsContext();

  // TODO: For now, this sample app only supports one integration at a time.  This will be updated in the future to support multiple integrations.
  const appToTest = (userData?.list || [])[0];
  const isInstalled = appToTest?.isInstalled || false;

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
  }, [hash]);

  const getMe = async () => {
    if (hash && hash.includes('configuration=')) {
      const configuration = hash.split('configuration=')[1];
      localStorage.setItem('configuration', configuration);
    }
    return fetch('/api/user/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('configuration')}` },
      credentials: 'include',
    }).then((response) => response.json());
  };

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
        <CircularProgress
          color={!isPrimaryColorWhite ? 'primary' : 'secondary'}
          size="50"
          style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
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
    await getMe().then((userData) => {
      setUserData(userData);
    });
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

  const FrameWithProps = (props: RouteProps) => (
    <Frame {...props} appToTest={appToTest} onLogout={handleLogout} userData={userData} />
  );

  const handleUninstall = async (integrationName: string) => {
    await fetch(`/api/integration/${integrationName}/install`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('configuration')}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'include',
    });
    getMe()
      .then((userData) => setUserData(userData))
      .catch(() => ({}));
  };

  const getInstallUrl = async (integrationId: string) => {
    const res = await fetch(`/api/integration/${integrationId}/install`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('configuration')}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    const data = await res.json();
    return data.targetUrl;
  };

  return (
    <Switch>
      <AuthedRouteWithProps path="/marketplace">
        <FrameWithProps>
          <Marketplace
            userData={userData}
            isInstalled={isInstalled}
            onUninstall={handleUninstall}
            getInstallUrl={getInstallUrl}
          />
        </FrameWithProps>
      </AuthedRouteWithProps>
      <AuthedRouteWithProps path="/">
        <FrameWithProps>
          <Dashboard userData={userData} appToTest={appToTest} isInstalled={isInstalled} />
        </FrameWithProps>
      </AuthedRouteWithProps>
    </Switch>
  );
};

export default AppRouter;
