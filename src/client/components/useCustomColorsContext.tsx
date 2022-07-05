import React, { useEffect, useState } from 'react';
import constate from 'constate';
import tinycolor from 'tinycolor2';

interface Colors {
  primary: string;
  secondary: string;
  background: string;
  sidebarText: string;
  backgroundText: string;
}

const DEFAULT_COLORS: Colors = {
  primary: '#333333',
  secondary: '#3F51B5',
  background: '#ffffff',
  backgroundText: '#333333',
  sidebarText: '#ffffff',
};

const LOCALSTORAGE_COLORS_KEY = 'colors';

const _useCustomColorsContext = () => {
  const [colors, setColors] = useState<Colors>(DEFAULT_COLORS);
  const query = new URLSearchParams(window.location.search);

  const setNewDefaultColor = (colorKey: keyof Colors, colorValue: string) => {
    const newColors = colors;
    newColors[colorKey] = colorValue;
    setColors(newColors);
    localStorage.setItem(LOCALSTORAGE_COLORS_KEY, JSON.stringify(newColors));
  };

  const searchAndStoreNewDefaultColors = (colorKeys: string[]) => {
    const newColors: Colors = JSON.parse(localStorage.getItem(LOCALSTORAGE_COLORS_KEY)) || DEFAULT_COLORS;
    colorKeys.forEach((colorKey: keyof Colors) => {
      const newColorValue = query.get(colorKey);
      if (colorKey in newColors && newColorValue) {
        newColors[colorKey] = newColorValue.includes('rgb') ? newColorValue : `#${newColorValue}`;
      }
    });
    localStorage.setItem(LOCALSTORAGE_COLORS_KEY, JSON.stringify(newColors));
  };

  useEffect(() => {
    searchAndStoreNewDefaultColors(['primary', 'secondary', 'background', 'sidebarText', 'backgroundText']);
    const colors = JSON.parse(localStorage.getItem(LOCALSTORAGE_COLORS_KEY)) || DEFAULT_COLORS;
    setColors(colors);
  }, []);

  return { colors, setNewDefaultColor };
};

const [CustomColorsProvider, useCustomColorsContext] = constate(_useCustomColorsContext);

export { CustomColorsProvider, useCustomColorsContext };
