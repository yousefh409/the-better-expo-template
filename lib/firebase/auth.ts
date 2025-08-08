import { router } from 'expo-router';
import {
  AuthError,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from './config';

// Custom error mapping for better user experience
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return `An unexpected error occurred (${errorCode}). Please try again.`;
  }
};

export class AuthService {
  /**
   * Create a new user account with email and password
   */
  static async createAccount(
    email: string, 
    password: string,
    displayName?: string
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name if provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
      }
      
      return userCredential;
    } catch (error: any) {
      const authError = error as AuthError;
      throw new Error(getAuthErrorMessage(authError.code));
    }
  }

  /**
   * Sign in with email and password
   */
  static async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const authError = error as AuthError;
      throw new Error(getAuthErrorMessage(authError.code));
    }
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<void> {
    return signOut(auth).finally(() => {router.replace('/(onboarding)/intro')});
  }

  /**
   * Get the current user
   */
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Listen to auth state changes
   */
  static onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
}

export default AuthService;
