import React from 'react';
import AppRouter from './Router';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1F2937',
    },
    secondary: {
      main: '#3F51B5',
    },
  },
});
const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default Index;
