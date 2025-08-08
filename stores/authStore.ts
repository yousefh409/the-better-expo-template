import { AuthService } from '@/lib/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profileData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoading: true,
      isAuthenticated: false,

      // Actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      signIn: async (email, password) => {
        try {
          set({ isLoading: true });
          const userCredential = await AuthService.signIn(email, password);
          get().setUser(userCredential.user);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signUp: async (email, password, profileData) => {
        try {
          set({ isLoading: true });
          const userCredential = await AuthService.createAccount(email, password);
          
          // If profile data is provided, save it to Firestore
          if (profileData && userCredential.user) {
            try {
              // You can implement FirestoreService.createUserProfile here
              console.log('User profile data:', profileData);
              // await FirestoreService.createUserProfile(userCredential.user.uid, profileData);
            } catch (profileError) {
              console.error('Failed to save user profile:', profileError);
              // Don't throw here as user account was created successfully
            }
          }
          
          get().setUser(userCredential.user);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signOut: async () => {
        try {
          await AuthService.signOut();
          get().setUser(null);
        } catch (error) {
          throw error;
        }
      },

      initializeAuth: () => {
        const unsubscribe = AuthService.onAuthStateChanged((user) => {
          get().setUser(user);
        });
        
        // Return unsubscribe function for cleanup
        return unsubscribe;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist user data, not loading states
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
