// NativeWind-compatible color utilities
// Colors are imported from the centralized theme colors file

import { themeColors } from '../constants/theme-colors';

// Re-export the centralized colors for backward compatibility
export const colors = themeColors;

export const getTabColors = (colorScheme: 'light' | 'dark' | null | undefined) => {
  return {
    focused: colorScheme === 'dark' ? colors.primary[400] : colors.primary[900],
    unfocused: colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500],
  };
};
