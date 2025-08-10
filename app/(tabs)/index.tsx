import { H1, H3 } from '@/components/ui';
import { useAuthStore } from '@/stores';
import React from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  const { user } = useAuthStore();

  return (
    <View className="flex-1 px-6 pt-20">
      <H1>
        Welcome Home!
      </H1>
      
      {user && (
        <View>
          <H3 className="mb-2">
            Hello, {user.email}
          </H3>
          <H3>
            You are successfully logged in.
          </H3>
        </View>
      )}
    </View>
  );
}
