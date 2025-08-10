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


## 🧩 Component Patterns

### UI Component Development Philosophy
**Always use existing components from `components/ui/` first.** Only create new components when absolutely necessary.

**Component Priority:**
1. **Use existing**: `Button`, `Input`, `Text`, `Card`, etc.
2. **Extend existing**: Add variants or props to existing components
3. **Create new**: Only if truly unique functionality needed
4. **Place correctly**: All generic/reusable components go in `components/ui/`

### UI Component Template
When creating a new generic component, it MUST go in `components/ui/`:

```tsx
// components/ui/NewComponent.tsx
import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from './Text';
import { cn } from '@/utils';

// 1. INTERFACE: Always export, extend base props
export interface NewComponentProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

// 2. COMPONENT: Always use forwardRef for UI components
export const NewComponent = forwardRef<TouchableOpacity, NewComponentProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    className, 
    children, 
    isLoading, 
    disabled,
    ...props 
  }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'rounded-lg items-center justify-center',
          // Variants
          variant === 'primary' && 'bg-primary active:bg-primary/90',
          variant === 'secondary' && 'bg-secondary active:bg-secondary/90',
          variant === 'outline' && 'border border-border bg-transparent',
          // Sizes
          size === 'sm' && 'px-3 py-2',
          size === 'md' && 'px-4 py-3',
          size === 'lg' && 'px-6 py-4',
          // States
          (disabled || isLoading) && 'opacity-50',
          // Custom className
          className
        )}
        {...props}
      >
        <Text 
          className={cn(
            'font-medium',
            variant === 'outline' ? 'text-foreground' : 'text-primary-foreground',
            size === 'sm' && 'text-sm',
            size === 'lg' && 'text-lg'
          )}
        >
          {isLoading ? 'Loading...' : children}
        </Text>
      </TouchableOpacity>
    );
  }
);

// 3. DISPLAY NAME: Always set for debugging
NewComponent.displayName = 'NewComponent';

// 4. EXPORT: Add to components/ui/index.ts
```

### Component Usage Examples
```tsx
// ✅ CORRECT: Use existing UI components
import { Button, Input, Text, Card } from '@/components/ui';

export function LoginForm() {
  return (
    <Card className="p-6">
      <Text variant="h2" className="mb-4">Sign In</Text>
      <Input 
        placeholder="Email" 
        keyboardType="email-address"
        className="mb-3"
      />
      <Input 
        placeholder="Password" 
        secureTextEntry
        className="mb-4"
      />
      <Button variant="primary" size="lg">
        Sign In
      </Button>
    </Card>
  );
}

// ❌ WRONG: Creating one-off components outside ui/
function CustomButton() { ... } // Should extend existing Button
```

### Feature-Specific Components
Only create feature-specific components in `components/[feature]/` when they:
- Combine multiple UI components
- Have business logic specific to that feature
- Are not reusable across the app

```tsx
// components/auth/LoginForm.tsx (feature-specific)
import { Button, Input, Text } from '@/components/ui';

export function LoginForm() {
  // Combines UI components with auth-specific logic
  const { signIn, isLoading, error } = useAuthStore();
  
  return (
    <View>
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <Button onPress={handleLogin} isLoading={isLoading}>
        Sign In
      </Button>
    </View>
  );
}
```

## Auth Store Usage Pattern
```tsx
// Access auth state and methods
const { 
  user, 
  isAuthenticated, 
  isLoading, 
  error,
  signIn, 
  signUp, 
  signOut 
} = useAuthStore();

// All auth operations go through the store
await signIn(email, password);
await signUp(email, password, { name });
await signOut();
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

### Clean Code Principles

#### Meaningful Names
```tsx
// ✅ CORRECT: Descriptive names
const isUserAuthenticated = user !== null;
const hasValidEmail = email.includes('@');
const userRegistrationDate = new Date(user.createdAt);

function calculateMonthlyRevenue(orders: Order[]): number {
  return orders
    .filter(order => isOrderFromCurrentMonth(order))
    .reduce((total, order) => total + order.amount, 0);
}

// ❌ WRONG: Unclear names
const flag = user !== null;
const d = new Date(user.createdAt);
const calc = (arr: any[]) => arr.reduce((a, b) => a + b.amt, 0);
```

#### Function Guidelines
```tsx
// ✅ CORRECT: Small, focused functions
function validateUserInput(email: string, password: string): ValidationResult {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  
  return {
    isValid: !emailError && !passwordError,
    errors: { email: emailError, password: passwordError }
  };
}

function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  if (!email.includes('@')) return 'Invalid email format';
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
}

// ❌ WRONG: Large, multi-purpose function
function handleFormSubmission(email: string, password: string, userData: any) {
  // Validation
  if (!email || !email.includes('@')) {
    alert('Invalid email');
    return;
  }
  
  // Password validation
  if (!password || password.length < 8) {
    alert('Invalid password');
    return;
  }
  
  // API call
  fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ email, password, ...userData })
  });
  
  // Navigation
  router.push('/dashboard');
  
  // Analytics
  trackEvent('user_registered');
  
  // Too many responsibilities!
}
```

#### No Side Effects in Pure Functions
```tsx
// ✅ CORRECT: Pure functions
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function formatUserName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

// ✅ CORRECT: Clear side effects in dedicated functions
function saveUserPreferences(preferences: UserPreferences): void {
  AsyncStorage.setItem('user_preferences', JSON.stringify(preferences));
  trackEvent('preferences_saved', preferences);
}

// ❌ WRONG: Hidden side effects
function calculateTotal(items: CartItem[]): number {
  // Hidden side effect!
  trackEvent('cart_calculated');
  
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}
```

### Error Handling Patterns

#### Fail Fast Principle
```tsx
// ✅ CORRECT: Validate early, fail fast
function processUserOrder(user: User, order: Order): void {
  if (!user) throw new Error('User is required');
  if (!order) throw new Error('Order is required');
  if (order.items.length === 0) throw new Error('Order must have items');
  if (order.total <= 0) throw new Error('Order total must be positive');
  
  // Process order logic here
  chargePayment(order.total);
  createShipment(order);
  sendConfirmationEmail(user.email);
}

// ❌ WRONG: Nested validation
function processUserOrder(user: User, order: Order): void {
  if (user) {
    if (order) {
      if (order.items.length > 0) {
        if (order.total > 0) {
          // Deeply nested logic
        }
      }
    }
  }
}
```

#### Error Boundaries and Graceful Degradation
```tsx
// ✅ CORRECT: Graceful error handling
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await fetchUser(userId);
        setUser(userData);
      } catch (err) {
        setError('Failed to load user profile');
        console.error('User fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [userId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!user) return <EmptyState message="User not found" />;

  return <UserDetails user={user} />;
}
```

### Component Design Principles

#### Composition Over Inheritance
```tsx
// ✅ CORRECT: Composition pattern
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <View className={cn('bg-card rounded-lg border border-border', className)}>
      {children}
    </View>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <View className="p-4 pb-2">{children}</View>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <View className="p-4 pt-0">{children}</View>;
}

// Usage: Compose complex UI from simple parts
<Card>
  <CardHeader>
    <Text variant="h3">User Profile</Text>
  </CardHeader>
  <CardContent>
    <UserDetails user={user} />
  </CardContent>
</Card>

// ❌ WRONG: Complex inheritance hierarchy
class BaseCard extends Component { ... }
class HeaderCard extends BaseCard { ... }
class ProfileCard extends HeaderCard { ... }
```

#### Prefer Explicit Over Implicit
```tsx
// ✅ CORRECT: Explicit props and behavior
interface UserCardProps {
  user: User;
  showEmail: boolean;
  showAvatar: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function UserCard({ user, showEmail, showAvatar, onEdit, onDelete }: UserCardProps) {
  return (
    <Card>
      {showAvatar && <Avatar src={user.avatar} />}
      <Text variant="h4">{user.name}</Text>
      {showEmail && <Text variant="body">{user.email}</Text>}
      {onEdit && <Button onPress={onEdit}>Edit</Button>}
      {onDelete && <Button variant="destructive" onPress={onDelete}>Delete</Button>}
    </Card>
  );
}

// ❌ WRONG: Magic behavior and implicit props
export function UserCard({ user, mode }: { user: User; mode: string }) {
  // What does mode do? What are the possible values?
  const isAdmin = mode === 'admin'; // Magic string
  const showActions = mode !== 'readonly'; // Implicit behavior
  
  return (
    <Card>
      {/* Unclear when avatar shows */}
      {user.avatar && <Avatar src={user.avatar} />}
      <Text>{user.name}</Text>
    </Card>
  );
}
```

### Code Organization Principles

#### Keep Related Code Together
```tsx
// ✅ CORRECT: Co-located related functionality
// components/auth/LoginForm.tsx
export function LoginForm() {
  // State, effects, and handlers for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading, error } = useAuthStore();

  const validateForm = () => {
    return email.includes('@') && password.length >= 8;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    await signIn(email, password);
  };

  return (
    <View>
      <Input value={email} onChangeText={setEmail} placeholder="Email" />
      <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <Button onPress={handleSubmit} isLoading={isLoading}>
        Sign In
      </Button>
      {error && <Text className="text-destructive">{error}</Text>}
    </View>
  );
}

// ❌ WRONG: Scattered related functionality
// utils/emailValidator.ts
export function validateEmail(email: string) { ... }

// utils/passwordValidator.ts  
export function validatePassword(password: string) { ... }

// components/EmailInput.tsx
export function EmailInput() { ... }

// components/PasswordInput.tsx
export function PasswordInput() { ... }

// Too fragmented for a simple login form!
```

#### Avoid Premature Abstraction
```tsx
// ✅ CORRECT: Start simple, extract patterns when they emerge
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <View>
      {users.map(user => (
        <TouchableOpacity key={user.id} onPress={() => router.push(`/user/${user.id}`)}>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Later, when the pattern repeats, then extract:
function useEntityList<T>(fetchFn: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  
  useEffect(() => {
    fetchFn().then(setItems);
  }, [fetchFn]);
  
  return items;
}

// ❌ WRONG: Over-engineering from the start
interface ListConfig<T> {
  fetcher: () => Promise<T[]>;
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  onItemPress?: (item: T) => void;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

function GenericList<T>(config: ListConfig<T>) {
  // Complex abstraction for simple use case
}
```

---

Follow these guidelines religiously. The codebase should be consistent, performant, and maintainable.
