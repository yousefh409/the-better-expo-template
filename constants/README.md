# Centralized Color System

This project uses a centralized color system where colors are defined once and used across both Tailwind CSS and React Native components.

## Files Structure

- **`constants/theme-colors.js`** - The single source of truth for all colors (JavaScript for Tailwind compatibility)
- **`constants/theme-colors.ts`** - TypeScript wrapper for type-safe imports
- **`constants/theme-colors.d.ts`** - Type definitions
- **`utils/colors.ts`** - Backward-compatible color utilities for React Native

## How to Use

### In TypeScript/React Native Components

```typescript
import { themeColors, primary, secondary } from '../constants/theme-colors';

// Use specific color scales
const backgroundColor = primary[500];
const textColor = themeColors.neutral[900];

// Or use individual color objects
const borderColor = neutral[200];
```

### In Tailwind CSS Classes

```jsx
<View className="bg-primary-500 text-neutral-900 border-neutral-200">
  <Text className="text-secondary-brand">Hello World</Text>
</View>
```

### Backward Compatibility

The existing `colors` export from `utils/colors.ts` still works:

```typescript
import { colors } from '../utils/colors';

const backgroundColor = colors.primary[500];
```

## Color Categories

- **Primary**: Maroon color scale (primary-brand: primary-900)
- **Secondary**: Gold color scale (secondary-brand: secondary-500)  
- **Neutral**: Gray scale for text and backgrounds
- **Error**: Red color scale for errors
- **Warning**: Amber color scale for warnings
- **Success**: Green color scale for success states
- **Accent**: Complementary colors (cream, burgundy, bronze, champagne)

## Semantic Color Aliases

- `primary-brand`: Main brand color (primary-900)
- `secondary-brand`: Secondary brand color (secondary-500)
- `default-font`: Default text color (neutral-900)
- `subtext-color`: Subdued text color (neutral-500)
- `neutral-border`: Default border color (neutral-200)
- `white`: White color (neutral-0)
- `default-background`: Default background color (neutral-0)

## How to Change Colors

To change any color in the application:

1. **Edit only `constants/theme-colors.js`**
2. The changes will automatically apply to:
   - All Tailwind CSS classes
   - All TypeScript imports
   - All React Native components using the color utilities

**Do not edit colors in `tailwind.config.js` or `utils/colors.ts` directly** - they now import from the centralized file.

## Example: Changing the Primary Brand Color

```javascript
// In constants/theme-colors.js
const themeColors = {
  primary: {
    // ... other shades
    900: "rgb(100, 0, 0)", // Changed from "rgb(85, 0, 0)"
    // ... other shades
  },
  // ... rest of colors
};
```

This single change will update the primary brand color throughout the entire application.
