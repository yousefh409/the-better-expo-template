# AI Coding Instructions

You are an expert React Native and Expo developer building modern, production-ready mobile applications. Follow these principles and patterns religiously.

## 🎯 Core Philosophy

**AI-First Development**: Every pattern, convention, and structure in this codebase is designed to maximize AI assistance effectiveness. Write code that AI can understand, predict, and extend.

**Consistency Over Cleverness**: Choose predictable patterns over clever solutions. AI thrives on repetition and consistency.

**Progressive Enhancement**: Start simple, then enhance. Build a solid foundation that AI can intelligently extend.

---

## 🏗️ Architecture Overview

This is an **Expo React Native application** with:
- **Expo SDK 53+** (latest stable)
- **File-based routing** (Expo Router v7+)
- **TypeScript strict mode** (zero tolerance for `any`)
- **TailwindCSS + NativeWind** (utility-first styling)
- **Zustand** (minimal state management)
- **Firebase** (authentication + Firestore)

### Mental Model
Think of this as a "mobile website" with native capabilities:
- **Screens** = pages in `app/` directory
- **Components** = reusable UI blocks
- **Stores** = global state containers
- **Services** = external API wrappers

---

## 📁 File Organization

```
├── app/                    # 🏠 SCREENS ONLY (Expo Router)
│   ├── (auth)/            # 🔐 Authentication group
│   ├── (onboarding)/      # 👋 User onboarding flow
│   ├── (tabs)/            # 📱 Main app navigation
│   └── _layout.tsx        # 🌐 Root navigation layout
│
├── components/            # 🧩 UI COMPONENTS
│   ├── ui/               # 🎨 Base design system
│   └── [feature]/        # 🎯 Feature-specific components
│
├── lib/                  # 🛠️ CORE UTILITIES
│   └── firebase/         # 🔥 Backend services
│
├── stores/               # 📦 STATE MANAGEMENT
├── types/                # 📝 TYPESCRIPT DEFINITIONS
├── constants/            # ⚙️ CONFIGURATION
└── utils/                # 🔧 HELPER FUNCTIONS
```

### File Naming Rules
- **Screens**: `kebab-case.tsx` (e.g., `user-profile.tsx`)
- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useUserProfile.ts`)
- **Utils**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Types**: `camelCase.ts` or `index.ts`

---

## 🎨 Styling System

### Core Principle: Zero Inline Styles
**NEVER** use inline styles. Always use TailwindCSS classes or theme constants.

```tsx
// ✅ CORRECT: TailwindCSS classes
<View className="flex-1 bg-white p-4 rounded-lg shadow-sm">
  <Text className="text-xl font-bold text-gray-900">Title</Text>
</View>

// ❌ WRONG: Inline styles
<View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Title</Text>
</View>
```

### Theme Integration
Always use theme colors from constants, never hardcode colors:

```tsx
import { useThemeColor } from '@/hooks/useThemeColor';

// ✅ CORRECT: Theme-aware colors
const backgroundColor = useThemeColor('background');
const textColor = useThemeColor('text');

// ✅ CORRECT: Dynamic classes with theme
<View className="bg-background dark:bg-background-dark">
  <Text className="text-foreground dark:text-foreground-dark">
    Content
  </Text>
</View>

// ❌ WRONG: Hardcoded colors
<View className="bg-blue-500">
  <Text className="text-white">Content</Text>
</View>
```

### Responsive Design Patterns
```tsx
import { useWindowDimensions } from 'react-native';

const { width, height } = useWindowDimensions();

// Size components relative to screen
const imageSize = width * 0.8;
const padding = width > 400 ? 24 : 16;

// Use breakpoint-aware classes
<View className="p-4 md:p-8 lg:p-12">
```

---

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

### Screen Component Template
```tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Text, Button } from '@/components/ui';
import { useRouter } from 'expo-router';

export default function ExampleScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        <Text variant="h1" className="mb-6">
          Screen Title
        </Text>
        
        {/* Screen content */}
        
        <Button 
          onPress={() => router.push('/next-screen')}
          className="mt-auto"
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
}
```

---

## 🗃️ State Management (Zustand)

### Store Pattern
Every store follows this exact structure:

```tsx
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. STATE INTERFACE
interface ExampleState {
  // State properties (nouns)
  items: Item[];
  selectedItem: Item | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions (verbs)
  setItems: (items: Item[]) => void;
  selectItem: (item: Item) => void;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

// 2. INITIAL STATE
const initialState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
};

// 3. STORE CREATION
export const useExampleStore = create<ExampleState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Actions implementation
      setItems: (items) => set({ items, error: null }),
      
      selectItem: (item) => set({ selectedItem: item }),
      
      addItem: (item) => set((state) => ({
        items: [...state.items, item],
        error: null,
      })),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id),
      })),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error, isLoading: false }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'example-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        items: state.items, 
        selectedItem: state.selectedItem 
      }),
    }
  )
);
```

### Store Usage Pattern
```tsx
import { useExampleStore } from '@/stores/exampleStore';

export function ExampleComponent() {
  // Extract only what you need
  const { items, isLoading, addItem, setLoading } = useExampleStore();
  
  const handleAddItem = async () => {
    setLoading(true);
    try {
      const newItem = await createItem();
      addItem(newItem);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {/* Component implementation */}
    </View>
  );
}
```

---

## 🧭 Navigation (Expo Router)

### Route Structure
```
app/
├── _layout.tsx           # Root layout (Stack)
├── +not-found.tsx        # 404 page
├── (auth)/              # Auth group (unauthenticated)
│   ├── _layout.tsx      # Auth stack layout
│   ├── login.tsx        # Login screen
│   └── signup.tsx       # Signup screen
├── (onboarding)/        # Onboarding group
│   ├── _layout.tsx      # Onboarding stack
│   ├── welcome.tsx      # Welcome screen
│   └── goals.tsx        # Goal selection
└── (tabs)/              # Main app (authenticated)
    ├── _layout.tsx      # Tab layout
    ├── index.tsx        # Home tab (/)
    └── profile.tsx      # Profile tab (/profile)
```

### Navigation Patterns
```tsx
import { useRouter } from 'expo-router';

const router = useRouter();

// Push new screen
router.push('/profile');

// Replace current screen (no back button)
router.replace('/(tabs)');

// Navigate with parameters
router.push({
  pathname: '/user/[id]',
  params: { id: user.id }
});

// Go back
router.back();

// Navigate to root
router.dismissAll();
```

### Protected Routes
```tsx
// app/(tabs)/_layout.tsx
import { useAuthStore } from '@/stores/authStore';
import { Redirect } from 'expo-router';

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }
  
  return <Tabs />;
}
```

---

## 🔥 Firebase Integration

### Authentication Pattern
Always interact with the **Zustand auth store** directly, not Firebase services:

```tsx
import { useAuthStore } from '@/stores/authStore';

// ✅ CORRECT: Use auth store methods
export function LoginForm() {
  const { signIn, isLoading, error } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    await signIn(email, password);
    // Store handles navigation and state updates
  };

  return (
    <View className="p-4">
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button 
        onPress={() => handleLogin(email, password)}
        isLoading={isLoading}
      >
        Sign In
      </Button>
      {error && <Text className="text-destructive">{error}</Text>}
    </View>
  );
}

// ❌ WRONG: Direct Firebase service calls
import { AuthService } from '@/lib/firebase';
const user = await AuthService.signIn(email, password);
```

### Auth Store Usage Pattern
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

### Firestore Integration
For database operations, use the Firestore service layer:

```tsx
import { FirestoreService } from '@/lib/firebase';

// ✅ CORRECT: Use service for database operations
const userData = await FirestoreService.getDocument('users', userId);
await FirestoreService.updateDocument('users', userId, updates);
```
```

---

## 📱 Expo Best Practices

### Use Expo Components First
```tsx
// ✅ CORRECT: Use Expo optimized components
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// ❌ WRONG: React Native components when Expo alternatives exist
import { Image } from 'react-native';
```

### Platform-Specific Code
```tsx
import { Platform } from 'react-native';

// File-based platform specificity (preferred)
// Button.ios.tsx, Button.android.tsx, Button.tsx (fallback)

// Conditional rendering
{Platform.OS === 'ios' && <IOSOnlyComponent />}
{Platform.OS === 'android' && <AndroidOnlyComponent />}

// Platform-specific styles
const platformStyles = Platform.select({
  ios: { marginTop: 20 },
  android: { marginTop: 25 },
  default: { marginTop: 0 },
});
```

### Safe Area Handling
```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

// ✅ CORRECT: Always use SafeAreaView for screens
export default function Screen() {
  return (
    <SafeAreaView className="flex-1">
      {/* Screen content */}
    </SafeAreaView>
  );
}

// ❌ WRONG: Plain View for screen root
export default function Screen() {
  return (
    <View className="flex-1">
      {/* Content might be cut off */}
    </View>
  );
}
```

### Performance Optimizations
```tsx
// Use Expo Image for better performance
<Image
  source={{ uri: imageUrl }}
  contentFit="cover"
  transition={200}
  className="w-20 h-20 rounded-lg"
/>

// Use useMemo for expensive calculations only when truly needed
const processedData = useMemo(() => {
  return heavyProcessing(rawData);
}, [rawData]);

// Prefer simple patterns over premature optimization
const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
```
```

---

## 🔤 TypeScript Patterns

### Strict Typing Rules
```tsx
// ✅ CORRECT: Explicit types everywhere
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const [users, setUsers] = useState<User[]>([]);
const [selectedUser, setSelectedUser] = useState<User | null>(null);

// ✅ CORRECT: Generic functions
function updateUser<T extends User>(user: T, updates: Partial<T>): T {
  return { ...user, ...updates };
}

// ❌ WRONG: any or implicit types
const [data, setData] = useState([]);
const user: any = getCurrentUser();
```

### Component Props Patterns
```tsx
// Base interface for common props
interface BaseProps {
  className?: string;
  testID?: string;
}

// Extend base props for specific components
interface ButtonProps extends BaseProps, TouchableOpacityProps {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Union types for variants
type AlertVariant = 'success' | 'warning' | 'error' | 'info';

// Conditional props with discriminated unions
type ConditionalProps = 
  | { type: 'button'; onPress: () => void }
  | { type: 'link'; href: string };
```

---

## 🎯 Error Handling

### Component Error Patterns
```tsx
const [state, setState] = useState({
  data: null,
  isLoading: false,
  error: null,
});

const handleAsyncAction = async () => {
  setState(prev => ({ ...prev, isLoading: true, error: null }));
  
  try {
    const data = await fetchData();
    setState(prev => ({ ...prev, data, isLoading: false }));
  } catch (error) {
    setState(prev => ({ 
      ...prev, 
      error: error.message, 
      isLoading: false 
    }));
  }
};

// Render with error handling
if (state.isLoading) return <LoadingSpinner />;
if (state.error) return <ErrorMessage message={state.error} />;
if (!state.data) return <EmptyState />;

return <DataView data={state.data} />;
```

### Error Boundaries
```tsx
// components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';
import { View } from 'react-native';
import { Text, Button } from '@/components/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    // Report to crash analytics
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback />;
    }

    return this.props.children;
  }
}
```

---

## ⚡ General Coding Principles

### SOLID Principles in React Native

#### Single Responsibility Principle
Every function, component, and module should have one reason to change:

```tsx
// ✅ CORRECT: Single responsibility
function validateEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Component with single responsibility
export function EmailInput({ onEmailChange }: { onEmailChange: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (value: string) => {
    setEmail(value);
    setIsValid(validateEmail(value));
    onEmailChange(value);
  };

  return (
    <Input
      value={email}
      onChangeText={handleChange}
      placeholder="Email"
      error={!isValid ? 'Invalid email format' : undefined}
    />
  );
}

// ❌ WRONG: Multiple responsibilities
function validateAndFormatUserData(email: string, amount: number) {
  // Validation + formatting + business logic = too much!
  if (!email.includes('@')) return null;
  const formatted = '$' + amount.toFixed(2);
  return { email, amount: formatted };
}
```

#### Open/Closed Principle
Components should be open for extension, closed for modification:

```tsx
// ✅ CORRECT: Extensible through props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = ({ variant = 'primary', leftIcon, rightIcon, ...props }) => {
  return (
    <TouchableOpacity className={getButtonStyles(variant, size)}>
      {leftIcon}
      <Text>{children}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
};

// Extend behavior without modifying the component
<Button leftIcon={<Icon name="plus" />} variant="primary">
  Add Item
</Button>

// ❌ WRONG: Hard to extend
function SpecificButton() {
  return (
    <TouchableOpacity className="bg-blue-500">
      <Text>Hardcoded Button</Text>
    </TouchableOpacity>
  );
}
```

#### Dependency Inversion
Depend on abstractions, not concretions:

```tsx
// ✅ CORRECT: Depend on interface
interface UserRepository {
  getUser(id: string): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<void>;
}

// Component depends on abstraction
function useUserData(repository: UserRepository, userId: string) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    repository.getUser(userId).then(setUser);
  }, [repository, userId]);
  
  return { user, updateUser: repository.updateUser };
}

// ❌ WRONG: Depend on concrete implementation
function useUserData(userId: string) {
  // Directly coupled to Firebase
  const userDoc = doc(db, 'users', userId);
  // Hard to test, hard to change
}
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

## 🎯 Final Rules

1. **Consistency First**: Use established patterns, don't invent new ones
2. **Type Everything**: No `any` types, ever
3. **Component-First**: Always use existing `components/ui/` components
4. **Error Handling**: Every async operation needs error handling
5. **Performance**: Keep it simple, optimize only when needed
6. **Accessibility**: Include proper labels and hints
7. **Testing**: Write testable code with clear interfaces
8. **Documentation**: Code should be self-documenting

Remember: AI thrives on predictable patterns. The more consistent your code, the better AI can assist you.
