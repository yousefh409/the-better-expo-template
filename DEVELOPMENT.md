# 🛠 Development Guide

This guide covers development best practices, common patterns, and helpful tips for working with this AI-first Expo mobile template.

## 🚀 Quick Start Commands

```bash
# Install and setup
npm install
npm run setup                # Interactive setup script

# Development
npm start                    # Start Expo dev server
npm run ios                  # Run on iOS simulator
npm run android             # Run on Android emulator
npm run web                 # Run on web browser

# Code quality
npm run lint                # Run ESLint
npx tsc --noEmit           # Type checking
```

## 📁 Project Architecture

### File-Based Routing (Expo Router)

```
app/
├── _layout.tsx            # Root layout with navigation
├── +not-found.tsx         # 404 page
├── (auth)/               # Authentication group
│   ├── _layout.tsx       # Auth layout
│   ├── login.tsx         # Login screen
│   └── signup.tsx        # Signup screen
├── (onboarding)/         # Onboarding group
│   ├── _layout.tsx       # Onboarding layout
│   ├── intro.tsx         # Welcome screen
│   ├── onboarding.tsx    # Questionnaire
│   └── questionnaire.tsx # Goal selection
└── (tabs)/               # Main app tabs
    ├── _layout.tsx       # Tab layout
    ├── index.tsx         # Home screen
    └── profile.tsx       # Profile screen
```

### Component System

```
components/
├── ui/                   # Base components
│   ├── Button.tsx        # Button with variants
│   ├── Input.tsx         # Form inputs
│   ├── Text.tsx          # Typography system
│   ├── Card.tsx          # Container component
│   └── index.ts          # Exports
├── onboarding/           # Feature components
│   ├── OnboardingButton.tsx
│   ├── OnboardingIntroItem.tsx
│   └── OnboardingPaginationElement.tsx
└── questionnaire/        # Questionnaire flow
    ├── OptionButton.tsx
    ├── ProgressBar.tsx
    └── QuestionScreen.tsx
```

## 🎨 Styling System

### TailwindCSS with NativeWind

```typescript
// Basic styling
<View className="flex-1 bg-white p-4">
  <Text className="text-lg font-bold text-gray-900">
    Hello World
  </Text>
</View>

// Responsive design
<View className="p-4 md:p-8 lg:p-12">
  {/* Responsive padding */}
</View>

// Dark mode support
<View className="bg-white dark:bg-gray-900">
  <Text className="text-gray-900 dark:text-white">
    Themed text
  </Text>
</View>
```

### Theme System

```typescript
// constants/theme-colors.ts
export const Colors = {
  light: {
    primary: '#4F46E5',
    secondary: '#7C3AED',
    background: '#FFFFFF',
    card: '#F9FAFB',
    text: '#111827',
    border: '#E5E7EB',
  },
  dark: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    border: '#374151',
  },
};

// Usage in components
import { useThemeColor } from '@/hooks/useThemeColor';

const backgroundColor = useThemeColor('background');
```

## 🗃 State Management with Zustand

### Basic Store Pattern

```typescript
// stores/exampleStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExampleState {
  // State
  items: string[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addItem: (item: string) => void;
  removeItem: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useExampleStore = create<ExampleState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isLoading: false,
      error: null,
      
      // Actions
      addItem: (item) => {
        set((state) => ({
          items: [...state.items, item],
        }));
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'example-storage', // localStorage key
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
```

### Using Stores in Components

```typescript
// In a component
import { useExampleStore } from '@/stores/exampleStore';

export function ExampleComponent() {
  const { items, isLoading, addItem, setLoading } = useExampleStore();
  
  const handleAddItem = async () => {
    setLoading(true);
    try {
      await addItem('New item');
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View>
      {items.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
      <Button onPress={handleAddItem} disabled={isLoading}>
        Add Item
      </Button>
    </View>
  );
}
```

## 🔥 Firebase Integration

### Authentication

```typescript
// lib/firebase/auth.ts
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from './config';

export const AuthService = {
  async signIn(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },
  
  async signUp(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  },
  
  async signOut() {
    await firebaseSignOut(auth);
  },
};
```

### Firestore

```typescript
// lib/firebase/firestore.ts
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs
} from 'firebase/firestore';
import { db } from './config';

export const FirestoreService = {
  // Create document
  async createDocument(collectionName: string, docId: string, data: any) {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
    return docRef;
  },
  
  // Get document
  async getDocument(collectionName: string, docId: string) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },
  
  // Update document
  async updateDocument(collectionName: string, docId: string, data: any) {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  },
  
  // Delete document
  async deleteDocument(collectionName: string, docId: string) {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  },
  
  // Query collection
  async queryCollection(collectionName: string, conditions: any[] = []) {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...conditions);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },
};
```

## 📱 Navigation Patterns

### Basic Navigation

```typescript
import { useRouter } from 'expo-router';

export function NavigationExample() {
  const router = useRouter();
  
  return (
    <View>
      <Button onPress={() => router.push('/profile')}>
        Go to Profile
      </Button>
      
      <Button onPress={() => router.replace('/login')}>
        Login (Replace)
      </Button>
      
      <Button onPress={() => router.back()}>
        Go Back
      </Button>
    </View>
  );
}
```

### Passing Parameters

```typescript
// Navigate with params
router.push({
  pathname: '/user/[id]',
  params: { id: '123' }
});

// In the target screen (app/user/[id].tsx)
import { useLocalSearchParams } from 'expo-router';

export default function UserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return <Text>User ID: {id}</Text>;
}
```

### Protected Routes

```typescript
// app/(auth)/_layout.tsx
import { useAuthStore } from '@/stores/authStore';
import { Redirect } from 'expo-router';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Stack />;
}
```

## 🧩 Component Development

### UI Component Template

```typescript
// components/ui/NewComponent.tsx
import { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/utils'; // className utility

interface NewComponentProps extends ViewProps {
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const NewComponent = forwardRef<View, NewComponentProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg border',
          // Variants
          variant === 'default' && 'bg-white border-gray-200',
          variant === 'secondary' && 'bg-gray-50 border-gray-300',
          // Sizes
          size === 'sm' && 'p-2',
          size === 'md' && 'p-4',
          size === 'lg' && 'p-6',
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

NewComponent.displayName = 'NewComponent';
```

### Form Handling

```typescript
import { useState } from 'react';
import { Input, Button } from '@/components/ui';

export function FormExample() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Submit form
      console.log('Form submitted:', form);
    }
  };
  
  return (
    <View className="p-4">
      <Input
        placeholder="Email"
        value={form.email}
        onChangeText={(email) => setForm({ ...form, email })}
        error={errors.email}
      />
      
      <Input
        placeholder="Password"
        value={form.password}
        onChangeText={(password) => setForm({ ...form, password })}
        secureTextEntry
        error={errors.password}
      />
      
      <Button onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
}
```

## 🎭 Animations

### Lottie Animations

```typescript
import LottieView from 'lottie-react-native';
import { useWindowDimensions } from 'react-native';

export function AnimationExample() {
  const { width } = useWindowDimensions();
  
  return (
    <LottieView
      autoPlay
      loop
      style={{
        width: width * 0.8,
        height: width * 0.8,
      }}
      source={require('@/assets/lottie/animation.json')}
    />
  );
}
```

### Reanimated

```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export function ReanimatedExample() {
  const opacity = useSharedValue(0);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  
  const fadeIn = () => {
    opacity.value = withTiming(1, { duration: 1000 });
  };
  
  return (
    <View>
      <Animated.View style={animatedStyle}>
        <Text>Animated content</Text>
      </Animated.View>
      <Button onPress={fadeIn}>Fade In</Button>
    </View>
  );
}
```

## 🧪 Testing

### Component Testing

```typescript
// __tests__/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button>Test Button</Button>
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress}>Test Button</Button>
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## 📊 Performance Optimization

### Image Optimization

```typescript
import { Image } from 'expo-image';

// Use Expo Image for better performance
<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  transition={1000}
/>

// For local images, use optimized formats
<Image
  source={require('@/assets/images/optimized.webp')}
  style={{ width: 200, height: 200 }}
/>
```

### Lazy Loading

```typescript
import { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/components/ui';

const LazyComponent = lazy(() => import('./LazyComponent'));

export function LazyExample() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
}
```

## 🐛 Debugging

### Development Tools

```typescript
// Enable Flipper debugging
if (__DEV__) {
  require('react-native-flipper').default;
}

// Console logging with better formatting
console.log('🐛 Debug:', { user, data });
console.warn('⚠️ Warning:', error);
console.error('❌ Error:', error);
```

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';
import { View, Text } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-lg font-bold mb-2">Oops! Something went wrong</Text>
          <Text className="text-gray-600 text-center">
            We're sorry for the inconvenience. Please try restarting the app.
          </Text>
        </View>
      );
    }
    
    return this.props.children;
  }
}
```

## 📱 Platform-Specific Code

```typescript
import { Platform } from 'react-native';

// Conditional rendering
{Platform.OS === 'ios' && <IOSSpecificComponent />}
{Platform.OS === 'android' && <AndroidSpecificComponent />}

// Platform-specific styles
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
      },
      android: {
        backgroundColor: '#f0f0f0',
      },
    }),
  },
});

// Platform-specific files
// Button.ios.tsx
// Button.android.tsx
// Button.tsx (fallback)
```

## 🚀 Next Steps

1. **Explore the codebase** - Familiarize yourself with the structure
2. **Build your first feature** - Start with a simple screen or component
3. **Add authentication** - Set up Firebase and test login/signup
4. **Customize theming** - Update colors and typography
5. **Deploy to stores** - Follow the deployment guide

Happy coding! 🎉
