import React, { useEffect, useState } from 'react';
import constate from 'constate';

interface Colors {
  primary: string;
  secondary: string;
  background: string;
  sidebarText: string;
  backgroundText: string;
}

const defaultColors: Colors = {
  primary: '#333333',
  secondary: '#3F51B5',
  background: '#ffffff',
  backgroundText: '#333333',
  sidebarText: '#ffffff',
};

const _useCustomColorsContext = () => {
  const [colors, setColors] = useState<Colors>(defaultColors);
  const query = new URLSearchParams(window.location.search);

  const setNewDefaultColor = (colorKey: keyof Colors, colorValue: string) => {
    if (colorKey in colors) {
      const newColors = colors;
      newColors[colorKey] = colorValue;
      setColors(newColors);
    }
  };

  const searchAndStoreNewDefaultColors = (colorKeys: string[]) => {
    const newColors = JSON.parse(localStorage.getItem('defaultColors')) || defaultColors;
    colorKeys.forEach((key: keyof Colors) => {
      const newColor = query.get(key);
      if (key in defaultColors && newColor) {
        newColors[key] = `#${newColor}`;
      }
    });
    localStorage.setItem('defaultColors', JSON.stringify(newColors));
  };

  useEffect(() => {
    searchAndStoreNewDefaultColors(['primary', 'secondary', 'background', 'sidebarText', 'backgroundText']);
    const colors = JSON.parse(localStorage.getItem('defaultColors')) || defaultColors;
    setColors(colors);
  }, []);

  return { colors };
};

export const [CustomColorsProvider, useCustomColorsContext] = constate(_useCustomColorsContext);
