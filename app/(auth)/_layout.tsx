import { H1, H2, Text } from '@/components/ui';
import { router, Slot, usePathname } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View
} from 'react-native';

export default function AuthStack() {

  const currentPath = usePathname();

  return (
      <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-gray-50"
          >
            <ScrollView 
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps='always'
            >
              <View className="flex-1 justify-center px-6 py-12">

                <View className="flex-1 justify-center px-6 py-12 space-y-4">
                  {/* Header */}
                  <View className="mb-8">
                    <H1 className="text-3xl font-bold text-center mb-2">
                      {currentPath == "/signup" ? 'Create Account' : 'Welcome Back'}
                    </H1>
                    <H2 className=" text-center">
                      {currentPath == "/signup" ? 'One last step!' : 'We missed you!'}
                    </H2>
                  </View>
                  <Slot />
                </View>

                {/* Footer */}
                <View className="mt-8">
                  <Pressable onPress={() => { router.replace(currentPath == "/signup"? '/login': '/signup') }}>
                    <Text className="text-center text-gray-600">
                      {currentPath == "/signup" ? 'Already have an account? ' : 'Don’t have an account? '}
                      <Text className="text-blue-600 font-medium">
                        {currentPath == "/signup" ? 'Sign in' : 'Sign up'}
                      </Text>
                    </Text>
                  </Pressable>
                </View>

              </View>
            </ScrollView>
      </KeyboardAvoidingView>
  );
}
