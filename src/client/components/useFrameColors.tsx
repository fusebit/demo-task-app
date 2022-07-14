import { useMemo } from 'react';
import tinycolor from 'tinycolor2';
import { useCustomColorsContext } from './useCustomColorsContext';

interface Props {
  userId: string;
}

const useFrameColors = ({ userId }: Props) => {
  const { colors, isPrimaryColorWhite, isDark } = useCustomColorsContext();

  const avatarColor = useMemo(() => {
    if (userId === 'Sample-App-Tenant-2') {
      return colors.secondary;
    }

    return colors.primary;
  }, [userId, colors]);

  const itemHoverColor = useMemo(() => {
    if (!isPrimaryColorWhite) {
      return tinycolor('#ffffff')
        .setAlpha(isDark ? 0.1 : 0.3)
        .toRgbString();
    }

    return tinycolor(colors.primary).darken(7).toString();
  }, [isPrimaryColorWhite, isDark, colors]);

  return { avatarColor, itemHoverColor };
};

export default useFrameColors;
