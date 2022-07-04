import React from 'react';
import AppRouter from './Router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomColorsProvider, useCustomColorsContext } from './useCustomColorsContext';

const Index = () => {
  return (
    <CustomColorsProvider>
      <AppRouter />
    </CustomColorsProvider>
  );
};

export default Index;
