import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
  // Theme
  isDarkMode: boolean;
  
  // App settings
  isFirstLaunch: boolean;
  hasCompletedOnboarding: boolean;
  
  // UI state
  isOffline: boolean;
  
  // Actions
  toggleTheme: () => void;
  setFirstLaunch: (isFirst: boolean) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setOfflineStatus: (offline: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      isDarkMode: false,
      isFirstLaunch: true,
      hasCompletedOnboarding: false,
      isOffline: false,

      // Actions
      toggleTheme: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      setFirstLaunch: (isFirst) => {
        set({ isFirstLaunch: isFirst });
      },

      setOnboardingComplete: (complete) => {
        set({ hasCompletedOnboarding: complete });
      },

      setOfflineStatus: (offline) => {
        set({ isOffline: offline });
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
