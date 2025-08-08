import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SplashScreenController } from '@/splash';
import { useAuthStore } from '@/stores';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { initializeAuth } = useAuthStore();

  // Initialize auth state listener
  useEffect(() => {
    const unsubscribe = initializeAuth();
    return unsubscribe;
  }, [initializeAuth]); 

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    {/* <ThemeProvider value={DefaultTheme}> */}
    <SplashScreenController />
      <RootNavigator />
      {/* <StatusBar style="auto" />   */}
    </ThemeProvider>
  );
}


// Separate this into a new component so it can access the SessionProvider context later
function RootNavigator() {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);  
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Protected routes for authenticated users */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      {/* Protected routes for non-authenticated users */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="+not-found" />
      </Stack.Protected>
    </Stack>
  );
}