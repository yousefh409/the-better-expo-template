/**
 * Common application types
 */

// User types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Profile types for Firestore
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  displayName?: string;
  questionnaire: QuestionnaireData;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Questionnaire data type
export interface QuestionnaireData {
  interests?: string[];
  experience_level?: string;
  goals?: string[];
  preferred_style?: string;
  bio?: string;
  [key: string]: string | string[] | undefined;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// Navigation types (extend as needed)
export type RootStackParamList = {
  // Auth screens
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  
  // Main app screens
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}

// Utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Authentication error types
export interface AuthError {
  code: string;
  message: string;
}
