/**
 * Utility functions for app configuration and placeholders
 * These help keep the template generic while allowing easy customization
 */

export const APP_CONFIG = {
  // Default values for the template
  DEFAULT_APP_NAME: 'My Mobile App',
  DEFAULT_APP_SLUG: 'my-mobile-app',
  DEFAULT_SCHEME: 'mymobileapp',
  DEFAULT_BUNDLE_ID: 'com.yourcompany.mymobileapp',
  
  // Common app categories for app stores
  APP_CATEGORIES: {
    ios: [
      'Business',
      'Education',
      'Entertainment',
      'Finance',
      'Health & Fitness',
      'Lifestyle',
      'Medical',
      'Music',
      'Navigation',
      'News',
      'Photo & Video',
      'Productivity',
      'Reference',
      'Social Networking',
      'Sports',
      'Travel',
      'Utilities',
      'Weather',
    ],
    android: [
      'Art & Design',
      'Auto & Vehicles',
      'Beauty',
      'Books & Reference',
      'Business',
      'Comics',
      'Communication',
      'Dating',
      'Education',
      'Entertainment',
      'Events',
      'Finance',
      'Food & Drink',
      'Health & Fitness',
      'House & Home',
      'Libraries & Demo',
      'Lifestyle',
      'Maps & Navigation',
      'Medical',
      'Music & Audio',
      'News & Magazines',
      'Parenting',
      'Personalization',
      'Photography',
      'Productivity',
      'Shopping',
      'Social',
      'Sports',
      'Tools',
      'Travel & Local',
      'Video Players & Editors',
      'Weather',
    ],
  },
};

/**
 * Generate app-specific configuration
 */
export function generateAppConfig(appName: string) {
  const slug = appName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
  
  const scheme = slug.replace(/-/g, '');
  
  const bundleId = `com.yourcompany.${scheme}`;
  
  return {
    name: appName,
    slug,
    scheme,
    bundleId,
  };
}

/**
 * Validate app configuration
 */
export function validateAppConfig(config: any) {
  const errors: string[] = [];
  
  if (!config.name || config.name.trim().length === 0) {
    errors.push('App name is required');
  }
  
  if (!config.slug || !/^[a-z0-9-]+$/.test(config.slug)) {
    errors.push('App slug must contain only lowercase letters, numbers, and hyphens');
  }
  
  if (!config.scheme || !/^[a-z0-9]+$/.test(config.scheme)) {
    errors.push('URL scheme must contain only lowercase letters and numbers');
  }
  
  if (!config.bundleId || !/^[a-z0-9.]+$/.test(config.bundleId)) {
    errors.push('Bundle identifier must be in reverse domain format (e.g., com.company.app)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Common placeholder texts for the template
 */
export const PLACEHOLDER_TEXTS = {
  appName: 'My Mobile App',
  tagline: 'Your catchy phrase goes here.',
  welcomeMessage: 'Welcome to My App!',
  getStartedText: 'quick lets start, last one there is a rotten egg!',
  
  // Onboarding goals - these can be customized for different app types
  goals: [
    { id: 'learn', icon: '🎓', text: 'Learn new skills' },
    { id: 'network', icon: '🤝', text: 'Network with others' },
    { id: 'career', icon: '📈', text: 'Advance my career' },
    { id: 'hobbies', icon: '🎨', text: 'Pursue hobbies' },
    { id: 'fitness', icon: '💪', text: 'Stay fit and healthy' },
  ],
  
  // Auth screen texts
  auth: {
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Sign in to your account',
    signupTitle: 'Create Account',
    signupSubtitle: 'Join us today',
    forgotPassword: 'Forgot your password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
  },
  
  // Error messages
  errors: {
    generic: 'Something went wrong. Please try again.',
    network: 'Check your internet connection and try again.',
    auth: {
      invalidCredentials: 'Invalid email or password.',
      emailInUse: 'An account with this email already exists.',
      weakPassword: 'Password should be at least 6 characters.',
      userNotFound: 'No account found with this email.',
    },
  },
};

/**
 * Theme configuration helpers
 */
export const THEME_PRESETS = {
  modern: {
    primary: '#4F46E5', // Indigo
    secondary: '#7C3AED', // Violet
    accent: '#F59E0B', // Amber
  },
  nature: {
    primary: '#059669', // Emerald
    secondary: '#0D9488', // Teal
    accent: '#84CC16', // Lime
  },
  sunset: {
    primary: '#DC2626', // Red
    secondary: '#EA580C', // Orange
    accent: '#F59E0B', // Amber
  },
  ocean: {
    primary: '#0284C7', // Sky
    secondary: '#0891B2', // Cyan
    accent: '#06B6D4', // Cyan
  },
  minimal: {
    primary: '#374151', // Gray
    secondary: '#6B7280', // Gray
    accent: '#9CA3AF', // Gray
  },
};

/**
 * Feature flags for the template
 */
export const FEATURES = {
  // Authentication features
  ENABLE_APPLE_SIGNIN: true,
  ENABLE_GOOGLE_SIGNIN: true,
  ENABLE_PHONE_AUTH: false,
  ENABLE_BIOMETRIC_AUTH: false,
  
  // App features
  ENABLE_ONBOARDING: true,
  ENABLE_QUESTIONNAIRE: true,
  ENABLE_PUSH_NOTIFICATIONS: false,
  ENABLE_ANALYTICS: true,
  ENABLE_CRASH_REPORTING: true,
  
  // Development features
  ENABLE_DEV_MENU: __DEV__,
  ENABLE_FLIPPER: __DEV__,
  ENABLE_DEBUG_LOGS: __DEV__,
};

/**
 * App store metadata helpers
 */
export function generateAppStoreMetadata(appName: string, description: string) {
  return {
    shortDescription: description.slice(0, 80),
    fullDescription: description,
    keywords: [
      'mobile',
      'app',
      'productivity',
      'lifestyle',
      // Add more relevant keywords based on your app
    ],
    categoryPrimary: 'Productivity',
    categorySecondary: 'Lifestyle',
    ageRating: '4+', // Default to 4+ for general apps
    supportUrl: 'https://yourwebsite.com/support',
    privacyPolicyUrl: 'https://yourwebsite.com/privacy',
    marketingUrl: 'https://yourwebsite.com',
  };
}

/**
 * Version management helpers
 */
export function getNextVersion(currentVersion: string, type: 'patch' | 'minor' | 'major' = 'patch') {
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

/**
 * Development environment detection
 */
export const ENV = {
  isDev: __DEV__,
  isProd: !__DEV__,
  isWeb: typeof window !== 'undefined',
  isNative: typeof window === 'undefined',
};
