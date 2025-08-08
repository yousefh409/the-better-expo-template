import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from './Text';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'large', 
  text, 
  className = '' 
}: LoadingSpinnerProps) {
  return (
    <View className={`flex-1 justify-center items-center ${className}`}>
      <ActivityIndicator size={size} className="mb-4" />
      {text && (
        <Text className="text-gray-600 text-center">{text}</Text>
      )}
    </View>
  );
}

export function FullScreenLoader({ text }: { text?: string }) {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <LoadingSpinner text={text || 'Loading...'} />
    </View>
  );
}
