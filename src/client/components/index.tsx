import React from 'react';
import AppRouter from './Router';
import { CustomColorsProvider } from './useCustomColorsContext';

const Index = () => {
  return (
    <CustomColorsProvider>
      <AppRouter />
    </CustomColorsProvider>
  );
};

export default Index;
