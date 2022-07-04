import React from 'react';
import AppRouter from './Router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomColorsProvider, useCustomColorsContext } from './useCustomColorsContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#3F51B5',
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ':hover': {
            backgroundColor: 'rgba(255,255,255,0.2)',
          },
        },
      },
    },
  },
});

const Index = () => {
  useCustomColorsContext();

  return (
    <CustomColorsProvider>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </CustomColorsProvider>
  );
};

export default Index;
