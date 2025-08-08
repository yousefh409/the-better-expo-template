/**
 * TypeScript wrapper for theme colors
 * Re-exports the centralized colors with proper TypeScript types
 */

// Import the actual colors from the JavaScript file
const themeColorsModule = require('./theme-colors.js');

// Type-safe exports
export const themeColors = themeColorsModule.themeColors;
export const semanticColors = themeColorsModule.semanticColors;
export const tailwindColors = themeColorsModule.tailwindColors;

// Also export individual color objects for convenience
export const {
  primary,
  secondary,
  neutral,
  error,
  warning,
  success,
  accent,
} = themeColors;

// Export type definitions
export type * from './theme-colors';
