import { Button, Input } from '@/components/ui';
import { useAuthStore } from '@/stores';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  View
} from 'react-native';

export default function SignupScreen() {
  const { signUp, isLoading, error, clearError } = useAuthStore();
  const { answers: questionnaireData } = useQuestionnaireStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    name?: string;
  }>({});

  // Clear auth error when user starts typing
  React.useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, password, name, error, clearError]);

  // Show alert when there's an error
  React.useEffect(() => {
    if (error) {
      Alert.alert(
        'Signup Error',
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
    const newErrors: {
      email?: string; 
      password?: string; 
      name?: string;
    } = {};

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

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

  const handleSignUp = async () => {
      Keyboard.dismiss();
    
    if (!validateForm()) return;

    try {
      // Include questionnaire data in signup
      const userProfile = {
        name,
        questionnaire: questionnaireData,
      };
      
      await signUp(email, password, userProfile);
      
      // Navigate to main app after successful signup
      router.replace('/(tabs)');
    } catch (error: any) {
      // Error is already handled by the store and displayed via error state
      console.error('Signup failed:', error);
    }
  };

  return (
    <View>
      <View className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoComplete="name"
          error={errors.name}
          size='lg'
        />

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
          autoComplete="new-password"
          error={errors.password}
          size='lg'
        />


        <Button
          onPress={handleSignUp}
          isLoading={isLoading}
          className="mt-6"
          disabled={isLoading}
        >
          Create Account
        </Button>
      </View>
    </View>
  );
}
