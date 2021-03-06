import React, { useEffect, useState } from 'react';
import constate from 'constate';
import tinycolor from 'tinycolor2';
import { DISABLE_HELPERS_LOCALSTORAGE_KEY } from './StatusPaper';

interface Colors {
  primary: string;
  secondary: string;
  sidebarText: string;
}

const DEFAULT_COLORS: Colors = {
  primary: '#333333',
  secondary: '#3F51B5',
  sidebarText: '#ffffff',
};

const LOCALSTORAGE_COLORS_KEY = 'colors';

const _useCustomColorsContext = () => {
  const [colors, setColors] = useState<Colors>(DEFAULT_COLORS);
  const [isUsingCustomColors, setIsUsingCustomColors] = useState(false);
  const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    const colors: Colors = JSON.parse(localStorage.getItem(LOCALSTORAGE_COLORS_KEY)) || DEFAULT_COLORS;
    const primaryColor = tinycolor(query.get('primary'));
    const secondaryColor = tinycolor(query.get('secondary'));

    if (primaryColor.isValid()) {
      colors.primary = primaryColor.toString();
      colors.sidebarText = primaryColor.isDark() ? '#ffffff' : '#333333';
    }

    if (secondaryColor.isValid()) {
      colors.secondary = secondaryColor.toString();
    }

    if (JSON.stringify(colors) !== JSON.stringify(DEFAULT_COLORS)) {
      setIsUsingCustomColors(true);
      localStorage.setItem(DISABLE_HELPERS_LOCALSTORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(DISABLE_HELPERS_LOCALSTORAGE_KEY);
    }

    localStorage.setItem(LOCALSTORAGE_COLORS_KEY, JSON.stringify(colors));
    setColors(colors);
  }, []);

  return {
    colors,
    isUsingCustomColors,
    isDark: tinycolor(colors.primary).isDark(),
    isPrimaryColorWhite: colors.primary === '#ffffff',
  };
};

const [CustomColorsProvider, useCustomColorsContext] = constate(_useCustomColorsContext);

export { CustomColorsProvider, useCustomColorsContext };
