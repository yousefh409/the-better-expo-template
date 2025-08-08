import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import LoginScreen from './login';
import SignupScreen from './signup';

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <View className="flex-1 bg-gray-50">
      {/* Tab Header */}
      <View className="bg-white shadow-sm">
        <View className="flex-row mx-6 mt-12 mb-4">
          <Pressable
            className={`flex-1 py-3 ${
              activeTab === 'login' 
                ? 'border-b-2 border-blue-600' 
                : 'border-b border-gray-200'
            }`}
            onPress={() => setActiveTab('login')}
          >
            <Text
              className={`text-center font-medium ${
                activeTab === 'login' 
                  ? 'text-blue-600' 
                  : 'text-gray-500'
              }`}
            >
              Sign In
            </Text>
          </Pressable>
          
          <Pressable
            className={`flex-1 py-3 ${
              activeTab === 'signup' 
                ? 'border-b-2 border-blue-600' 
                : 'border-b border-gray-200'
            }`}
            onPress={() => setActiveTab('signup')}
          >
            <Text
              className={`text-center font-medium ${
                activeTab === 'signup' 
                  ? 'text-blue-600' 
                  : 'text-gray-500'
              }`}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Tab Content */}
      <View className="flex-1">
        {activeTab === 'login' ? (
          <LoginScreen onSwitchToSignup={() => setActiveTab('signup')} />
        ) : (
          <SignupScreen onSwitchToLogin={() => setActiveTab('login')} />
        )}
      </View>
    </View>
  );
}
