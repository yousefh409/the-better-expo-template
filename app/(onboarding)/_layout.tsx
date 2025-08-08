import { Stack } from 'expo-router';
import 'react-native-reanimated';


export default function OnboardingNavigator() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="intro" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="questionnaire" />
    </Stack>
  );
}