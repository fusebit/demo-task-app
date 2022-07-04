import React, { useEffect, useState } from 'react';
import constate from 'constate';

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

const _useCustomColorsContext = () => {
  const [colors, setColors] = useState<Colors>(DEFAULT_COLORS);
  const query = new URLSearchParams(window.location.search);

  const setNewDefaultColor = (colorKey: keyof Colors, colorValue: string) => {
    if (colorKey in colors) {
      const newColors = colors;
      newColors[colorKey] = colorValue;
      setColors(newColors);
      localStorage.setItem('defaultColors', JSON.stringify(newColors));
    }
  };

  const searchAndStoreNewDefaultColors = (colorKeys: string[]) => {
    const newColors = JSON.parse(localStorage.getItem('defaultColors')) || DEFAULT_COLORS;
    colorKeys.forEach((key: keyof Colors) => {
      const newColor = query.get(key);
      if (key in DEFAULT_COLORS && newColor) {
        newColors[key] = `#${newColor}`;
      }
    });
    localStorage.setItem('defaultColors', JSON.stringify(newColors));
  };

  useEffect(() => {
    searchAndStoreNewDefaultColors(['primary', 'secondary', 'background', 'sidebarText', 'backgroundText']);
    const colors = JSON.parse(localStorage.getItem('defaultColors')) || DEFAULT_COLORS;
    setColors(colors);
  }, []);

  return { colors, setNewDefaultColor };
};

const [CustomColorsProvider, useCustomColorsContext] = constate(_useCustomColorsContext);

export { CustomColorsProvider, useCustomColorsContext };
