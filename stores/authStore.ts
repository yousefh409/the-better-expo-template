import { AuthService, FirestoreService } from '@/lib/firebase';
import { QuestionnaireData, UserProfile } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  // State
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profileData?: {
    name: string;
    [key: string]: any;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  loadUserProfile: (uid: string) => Promise<void>;
  updateQuestionnaire: (questionnaireData: QuestionnaireData) => Promise<void>;
  initializeAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      userProfile: null,
      isLoading: true,
      isAuthenticated: false,
      error: null,

      // Actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        });
        
        // Load user profile when user is set
        if (user) {
          get().loadUserProfile(user.uid);
        } else {
          set({ userProfile: null });
        }
      },

      setUserProfile: (profile) => {
        set({ userProfile: profile });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      loadUserProfile: async (uid) => {
        try {
          const profile = await FirestoreService.getUserProfile(uid);
          set({ userProfile: profile });
        } catch (error) {
          // console.error('Failed to load user profile:', error);
          // Don't set error state for profile loading failures
        }
      },

      signIn: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          const userCredential = await AuthService.signIn(email, password);
          get().setUser(userCredential.user);
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      signUp: async (email, password, profileData) => {
        try {
          set({ isLoading: true, error: null });
          
          // Create user account
          const userCredential = await AuthService.createAccount(
            email, 
            password, 
            profileData?.name
          );
          
          // Create user profile in Firestore
          if (userCredential.user && profileData) {
            try {
              await FirestoreService.createUserProfile(userCredential.user.uid, {
                email,
                name: profileData.name,
                displayName: profileData.name,
                questionnaire: profileData.questionnaire || {},
              });
            } catch (profileError) {
              console.error('Failed to create user profile:', profileError);
              // Don't throw here as user account was created successfully
              // User can complete profile later
            }
          }
          
          get().setUser(userCredential.user);
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      updateQuestionnaire: async (questionnaireData) => {
        const { user } = get();
        if (!user) {
          throw new Error('User must be authenticated to update questionnaire');
        }

        try {
          set({ isLoading: true, error: null });
          
          await FirestoreService.updateUserQuestionnaire(user.uid, questionnaireData);
          
          // Reload user profile to get updated data
          await get().loadUserProfile(user.uid);
          
          set({ isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          await AuthService.signOut();
          get().setUser(null);
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
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
      // Only persist user data and profile, not loading states or errors
      partialize: (state) => ({ 
        user: state.user,
        userProfile: state.userProfile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
