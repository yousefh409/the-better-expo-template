import { Button, H1, Text } from '@/components/ui';
import { useAuthStore } from '@/stores';
import React from 'react';
import { Alert, View } from 'react-native';

export default function ProfileScreen() {
  const { user, signOut, isLoading } = useAuthStore();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 px-6 pt-16">
      <H1>
        Profile
      </H1>

      {/* User Info Card */}
      <View className="mb-6">
            <Text size='xl'>
              Email: {user?.email || 'No email'}
              </Text>
            
            <Text size='xl'>
                User ID: {user?.uid || 'No ID'}
              </Text>

            {user?.metadata?.creationTime && (
            <Text size='xl'>
                  Member Since: {new Date(user.metadata.creationTime).toLocaleDateString()}
                </Text>
            )}
    </View>

      {/* Sign Out Section */}
      <Button
        variant="destructive"
        onPress={handleSignOut}
        isLoading={isLoading}
      >
        Sign Out
      </Button>
    </View>
  );
}
