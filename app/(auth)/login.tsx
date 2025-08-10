import { Button, Input } from '@/components/ui';
import { useAuthStore } from '@/stores';
import * as AppleAuthentication from 'expo-apple-authentication';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  View
} from 'react-native';

interface LoginScreenProps {
  onSwitchToSignup: () => void;
}

export default function LoginScreen({ onSwitchToSignup }: LoginScreenProps) {
  const { signIn, isLoading, error, clearError, providerSignIn} = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  // Clear auth error when user starts typing
  React.useEffect(() => {
    // if (error) {
    //   clearError();
    // }
  }, [email, password, error, clearError]);

  // Show alert when there's an error
  React.useEffect(() => {
    if (error) {
      Alert.alert(
        'Login Error',
        error,
        [
          {
            text: 'OK',
            onPress: clearError,
          },
        ]
      );
    }
  }, [error, clearError]);

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;

    try {
      await signIn(email, password);
      // Navigate to main app after successful login
      router.replace('/(tabs)');
    } catch (error: any) {
      // Error is already handled by the store and displayed via error state
      // console.error('Login failed:', error);
    }
  };
  return (
        <View>
          <View className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email}
              size='lg'
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="current-password"
              error={errors.password}
              size='lg'
            />

            <Button
              onPress={handleSignIn}
              isLoading={isLoading}
              className="mt-6"
              disabled={isLoading}
            >
              Sign In
            </Button>

            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                className="w-full h-[44px] mb-4"
                style={{ width: '100%', height: 44, marginTop: 10 }}
                onPress={() => {providerSignIn('apple')}}
            />
          </View>
        </View>
  );
}
