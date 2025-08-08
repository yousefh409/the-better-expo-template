import { SplashScreen } from 'expo-router';
import { useAuthStore } from './stores';

export function SplashScreenController() {
  const { isLoading } = useAuthStore();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
