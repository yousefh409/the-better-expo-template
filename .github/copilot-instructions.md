# GitHub Copilot Instructions

You are an expert React Native and Expo developer working on a modern mobile application. Follow these guidelines strictly.

## 🏗️ Project Architecture

This is an **Expo React Native app** using:
- **Expo SDK 53+** with the new architecture enabled
- **File-based routing** with Expo Router
- **TypeScript** in strict mode
- **TailwindCSS + NativeWind** for styling
- **Zustand** for state management
- **Firebase** for backend services

## 📁 File Structure Conventions

```
app/                    # Expo Router screens ONLY
├── (auth)/            # Auth group - login, signup
├── (onboarding)/      # Onboarding flow
├── (tabs)/            # Main app with bottom tabs
└── _layout.tsx        # Root layout

components/            # Reusable components
├── ui/               # Base design system components
└── [feature]/        # Feature-specific components

lib/                  # Core utilities and services
stores/               # Zustand state stores
types/                # TypeScript definitions
constants/            # App constants and theme
utils/                # Helper functions
```

## 🎨 Styling Guidelines

### ALWAYS use TailwindCSS classes, NEVER inline styles:
```tsx
// ✅ CORRECT
<View className="flex-1 bg-white p-4 rounded-lg">

// ❌ WRONG
<View style={{flex: 1, backgroundColor: 'white', padding: 16}}>
```

### Use theme colors from constants:
```tsx
import { useThemeColor } from '@/hooks/useThemeColor';

// ✅ CORRECT
const backgroundColor = useThemeColor('background');
<View style={{ backgroundColor }}>

// ❌ WRONG - no hardcoded colors
<View className="bg-blue-500">
```

### Responsive design patterns:
```tsx
// Use screen width for responsive layouts
const { width } = useWindowDimensions();

// Size components relative to screen
style={{ width: width * 0.8 }}
```

## 🧩 Component Patterns

### Always use forwardRef for UI components:
```tsx
export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ variant = 'primary', children, className, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className={cn(
          'rounded-lg px-4 py-2',
          variant === 'primary' && 'bg-primary',
          className
        )}
        {...props}
      >
        <Text className="text-white font-medium">{children}</Text>
      </TouchableOpacity>
    );
  }
);
```

### Component file structure:
```tsx
// 1. Imports (grouped: React, React Native, third-party, local)
import { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { cn } from '@/utils';

// 2. Interface (always export)
export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// 3. Component with forwardRef
export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (props, ref) => {
    // Component logic
  }
);

// 4. Display name
Button.displayName = 'Button';
```

## 🗃️ State Management with Zustand

### Store pattern:
```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  // State properties
  data: DataType[];
  isLoading: boolean;
  error: string | null;
  
  // Actions (verbs)
  setData: (data: DataType[]) => void;
  addItem: (item: DataType) => void;
  setLoading: (loading: boolean) => void;
}

export const useDataStore = create<StoreState>()(
  persist(
    (set, get) => ({
      data: [],
      isLoading: false,
      error: null,
      
      setData: (data) => set({ data }),
      addItem: (item) => set((state) => ({ 
        data: [...state.data, item] 
      })),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: 'data-storage' }
  )
);
```

## 🧭 Navigation with Expo Router

### Screen components (in app/ directory):
```tsx
import { SafeAreaView } from 'react-native';
import { Text } from '@/components/ui';

export default function ScreenName() {
  return (
    <SafeAreaView className="flex-1">
      <Text>Screen content</Text>
    </SafeAreaView>
  );
}
```

### Navigation actions:
```tsx
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate
router.push('/path');
router.replace('/path');
router.back();

// With params
router.push({
  pathname: '/user/[id]',
  params: { id: '123' }
});
```

## 🔥 Firebase Integration

### Always use the service layer:
```tsx
import { AuthService, FirestoreService } from '@/lib/firebase';

// ✅ CORRECT
const user = await AuthService.signIn(email, password);

// ❌ WRONG - no direct Firebase calls in components
import { signInWithEmailAndPassword } from 'firebase/auth';
```

### Error handling pattern:
```tsx
const handleSignIn = async () => {
  setLoading(true);
  try {
    await AuthService.signIn(email, password);
    router.replace('/(tabs)');
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## 📱 Expo-Specific Patterns

### Use Expo components when available:
```tsx
// ✅ CORRECT
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';

// ❌ WRONG
import { Image } from 'react-native';
```

### Platform-specific code:
```tsx
import { Platform } from 'react-native';

// File-based platform specificity preferred
// Button.ios.tsx, Button.android.tsx

// Or conditional rendering
{Platform.OS === 'ios' && <IOSComponent />}
```

### Safe area handling:
```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

// Always wrap screens
<SafeAreaView className="flex-1">
  {/* Content */}
</SafeAreaView>
```

## 🎯 Performance Best Practices

### Optimize images:
```tsx
// Use Expo Image with optimization
<Image
  source={{ uri: imageUrl }}
  contentFit="cover"
  transition={200}
  style={{ width: 100, height: 100 }}
/>
```

### Memoize expensive operations:
```tsx
import { useMemo } from 'react';

const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```

### Use React.memo for pure components:
```tsx
export const PureComponent = React.memo(({ data }) => {
  return <View>{/* render */}</View>;
});
```

## 🧪 Error Handling

### Always handle loading and error states:
```tsx
const [isLoading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
```

### Use Error Boundaries for components:
```tsx
<ErrorBoundary>
  <SomeComponent />
</ErrorBoundary>
```

## 🔤 TypeScript Best Practices

### Always define interfaces:
```tsx
interface UserProfileProps {
  user: User;
  onEdit: (user: User) => void;
  isLoading?: boolean;
}
```

### Use strict typing:
```tsx
// ✅ CORRECT
const [data, setData] = useState<DataType[]>([]);

// ❌ WRONG
const [data, setData] = useState([]);
```

## 🎨 Animation Guidelines

### Use React Native Reanimated for complex animations:
```tsx
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';
```

### Use Lottie for illustrations:
```tsx
import LottieView from 'lottie-react-native';

<LottieView
  autoPlay
  style={{ width: 200, height: 200 }}
  source={require('@/assets/lottie/animation.json')}
/>
```

## 🚫 What NOT to do

- ❌ No inline styles - use TailwindCSS classes
- ❌ No hardcoded colors - use theme constants
- ❌ No direct Firebase imports in components
- ❌ No any types - always specify types
- ❌ No default exports for components (except screens)
- ❌ No useEffect for navigation - use router methods
- ❌ No View when SafeAreaView is needed
- ❌ No React Native Image - use Expo Image

## 🎯 Code Quality

### File naming:
- Components: PascalCase (Button.tsx)
- Screens: camelCase (profile.tsx)
- Hooks: camelCase with use prefix (useAuth.ts)
- Utils: camelCase (formatDate.ts)

### Import organization:
```tsx
// 1. React imports
import { useState, useEffect } from 'react';

// 2. React Native imports
import { View, Text } from 'react-native';

// 3. Third-party libraries
import { useRouter } from 'expo-router';

// 4. Local imports (use absolute paths)
import { Button } from '@/components/ui';
import { useAuthStore } from '@/stores';
```

Follow these guidelines religiously. The codebase should be consistent, performant, and maintainable.
