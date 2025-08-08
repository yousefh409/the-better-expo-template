/**
 * Centralized color definitions for the application
 * This file is the single source of truth for all colors used in both Tailwind CSS and React Native
 */

const themeColors = {
  primary: {
    50: "rgb(255, 245, 245)",
    100: "rgb(254, 235, 235)",
    200: "rgb(252, 215, 215)",
    300: "rgb(248, 185, 185)",
    400: "rgb(240, 135, 135)",
    500: "rgb(220, 85, 85)",
    600: "rgb(185, 28, 28)",
    700: "rgb(153, 27, 27)",
    800: "rgb(127, 29, 29)",
    900: "rgb(85, 0, 0)",
    950: "rgb(69, 10, 10)",
  },
  secondary: {
    50: "rgb(255, 251, 235)",
    100: "rgb(254, 243, 199)",
    200: "rgb(253, 230, 138)",
    300: "rgb(252, 211, 77)",
    400: "rgb(251, 191, 36)",
    500: "rgb(245, 158, 11)",
    600: "rgb(217, 119, 6)",
    700: "rgb(180, 83, 9)",
    800: "rgb(146, 64, 14)",
    900: "rgb(120, 53, 15)",
    950: "rgb(69, 26, 3)",
  },
  neutral: {
    0: "rgb(255, 255, 255)",
    50: "rgb(250, 250, 250)",
    100: "rgb(244, 244, 245)",
    200: "rgb(228, 228, 231)",
    300: "rgb(212, 212, 216)",
    400: "rgb(161, 161, 170)",
    500: "rgb(113, 113, 122)",
    600: "rgb(82, 82, 91)",
    700: "rgb(63, 63, 70)",
    800: "rgb(39, 39, 42)",
    900: "rgb(24, 24, 27)",
    950: "rgb(9, 9, 11)",
  },
  error: {
    50: "rgb(254, 242, 242)",
    100: "rgb(254, 226, 226)",
    200: "rgb(254, 202, 202)",
    300: "rgb(252, 165, 165)",
    400: "rgb(248, 113, 113)",
    500: "rgb(239, 68, 68)",
    600: "rgb(220, 38, 38)",
    700: "rgb(185, 28, 28)",
    800: "rgb(153, 27, 27)",
    900: "rgb(127, 29, 29)",
  },
  warning: {
    50: "rgb(255, 251, 235)",
    100: "rgb(254, 243, 199)",
    200: "rgb(253, 230, 138)",
    300: "rgb(252, 211, 77)",
    400: "rgb(251, 191, 36)",
    500: "rgb(245, 158, 11)",
    600: "rgb(217, 119, 6)",
    700: "rgb(180, 83, 9)",
    800: "rgb(146, 64, 14)",
    900: "rgb(120, 53, 15)",
  },
  success: {
    50: "rgb(240, 253, 244)",
    100: "rgb(220, 252, 231)",
    200: "rgb(187, 247, 208)",
    300: "rgb(134, 239, 172)",
    400: "rgb(74, 222, 128)",
    500: "rgb(34, 197, 94)",
    600: "rgb(22, 163, 74)",
    700: "rgb(21, 128, 61)",
    800: "rgb(22, 101, 52)",
    900: "rgb(20, 83, 45)",
  },
  accent: {
    cream: "rgb(255, 248, 220)",
    burgundy: "rgb(128, 0, 32)",
    bronze: "rgb(205, 127, 50)",
    champagne: "rgb(247, 231, 206)",
  },
};

// Semantic color aliases for easier usage
const semanticColors = {
  "primary-brand": themeColors.primary[900],
  "secondary-brand": themeColors.secondary[500],
  "default-font": themeColors.neutral[900],
  "subtext-color": themeColors.neutral[500],
  "neutral-border": themeColors.neutral[200],
  white: themeColors.neutral[0],
  "default-background": themeColors.neutral[0],
};

// Combined colors object for Tailwind
const tailwindColors = {
  ...themeColors,
  ...semanticColors,
};

module.exports = { themeColors, semanticColors, tailwindColors };
