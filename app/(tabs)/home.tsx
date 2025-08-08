import { useAuthStore } from '@/stores';
import React from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const { user } = useAuthStore();

  return (
    <View className="flex-1 bg-gray-50 px-6 pt-16">
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Welcome Home!
      </Text>
      
      {user && (
        <View className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <Text className="text-lg font-medium text-gray-900 mb-2">
            Hello, {user.email}
          </Text>
          <Text className="text-gray-600">
            You are successfully logged in.
          </Text>
        </View>
      )}
    </View>
  );
}
