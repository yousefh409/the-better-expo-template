import { Button, H1, H2, Input, Text } from '@/components/ui';
import { useAuthStore } from '@/stores';
import { QuestionnaireData } from '@/stores/questionnaireStore';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignupScreenProps {
  onSwitchToLogin?: () => void;
}

export default function SignupScreen({ onSwitchToLogin }: SignupScreenProps) {
  const { signUp, isLoading } = useAuthStore();
  const params = useLocalSearchParams();
  
  // Parse questionnaire data from params
  const questionnaireData: QuestionnaireData = React.useMemo(() => {
    try {
      return params.questionnaireData 
        ? JSON.parse(params.questionnaireData as string) 
        : {};
    } catch {
      return {};
    }
  }, [params.questionnaireData]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState<{
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      email?: string; 
      password?: string; 
      confirmPassword?: string;
      firstName?: string;
      lastName?: string;
    } = {};

    if (!firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      // Include questionnaire data in signup
      const userProfile = {
        firstName,
        lastName,
        email,
        ...questionnaireData,
      };
      
      await signUp(email, password, userProfile);
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView>
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="mb-8">
            <H1 className="text-3xl font-bold text-center mb-2">
              Create Account
            </H1>
            <H2 className=" text-center">
              One last step!
            </H2>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <View className="flex-1">
              <Input
                label="Last Name"
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoComplete="given-name"
                error={errors.lastName}
                size='lg'
              />
            </View>

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
            >
              Sign Up
            </Button>
          </View>

          {/* Footer */}
          <View className="mt-8">
            <Pressable onPress={() => { router.replace('/login')}}>
              <Text className="text-center text-gray-600">
                Already have an account?{' '}
                <Text className="text-blue-600 font-medium">
                  Sign in
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
