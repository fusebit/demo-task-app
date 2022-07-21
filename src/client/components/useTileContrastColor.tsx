import { useEffect } from 'react';
import tinycolor from 'tinycolor2';
import { DARK_TEXT_COLOR, LIGHT_TEXT_COLOR, TILE_CLASSES } from '../utils';
import { useCustomColorsContext } from './useCustomColorsContext';

interface Props {
  isLoadingIntegrations: boolean;
  isInstalled: boolean;
}

const useTileContrastColor = ({ isLoadingIntegrations, isInstalled }: Props) => {
  const { colors, isUsingCustomColors } = useCustomColorsContext();
  const mainColor = colors.primary !== '#ffffff' ? colors.primary : colors.secondary;
  const isDark = tinycolor(mainColor).isDark();

  useEffect(() => {
    if (!isLoadingIntegrations && isUsingCustomColors) {
      const interval = setInterval(() => {
        const tile = document.querySelector(`.${TILE_CLASSES.card}`) as HTMLElement;
        const topContent = document.querySelector(`.${TILE_CLASSES.topContent}`) as HTMLElement;
        const title = document.querySelector(`.${TILE_CLASSES.title}`) as HTMLElement;
        const subtitle = document.querySelector(`.${TILE_CLASSES.subtitle}`) as HTMLElement;
        const button = document.querySelector(`.${TILE_CLASSES.button}`) as HTMLElement;
        const link = document.querySelector(`.${TILE_CLASSES.link}`) as HTMLElement;
        if (tile && topContent && tile && button && link && title && subtitle) {
          tile.style.border = `1px solid ${tinycolor(mainColor).setAlpha(0.8).toRgbString()}`;
          topContent.style.background = isDark
            ? tinycolor(mainColor).lighten(18).setAlpha(0.2).toRgbString()
            : tinycolor(mainColor).setAlpha(0.4).toRgbString();
          title.style.color = isDark ? mainColor : DARK_TEXT_COLOR;
          subtitle.style.color = isDark
            ? tinycolor(mainColor).darken(15).setAlpha(0.4).toRgbString()
            : tinycolor(DARK_TEXT_COLOR).lighten(25).toString();
          link.style.borderColor = mainColor;
          link.style.color = isDark ? mainColor : DARK_TEXT_COLOR;
          if (!isInstalled) {
            button.style.background = mainColor;
            button.style.color = isDark ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR;
          }

          clearInterval(interval);
        }
      }, 50);
    }
  }, [colors, isUsingCustomColors, isLoadingIntegrations]);

  return {
    mainColor,
    isDark,
  };
};

export default useTileContrastColor;
