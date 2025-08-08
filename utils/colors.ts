// NativeWind-compatible color utilities
// These match the colors defined in tailwind.config.js

export const colors = {
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
};

export const getTabColors = (colorScheme: 'light' | 'dark' | null | undefined) => {
  return {
    focused: colorScheme === 'dark' ? colors.primary[400] : colors.primary[900],
    unfocused: colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500],
  };
};
