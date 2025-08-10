import { Button, H1, Text } from '@/components/ui';
import { useAuthStore } from '@/stores';
import React from 'react';
import { Alert, View } from 'react-native';

export default function ProfileScreen() {
  const { user, signOut, isLoading, deleteAccount } = useAuthStore();

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

  const handleDeleteAccount = async () => {
    Alert.prompt(
          'Delete Profile',
          'This action is irreversible. Please type "delete" to confirm.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async (text) => {
            if (text?.toLowerCase() === 'delete') {
              try {
                await deleteAccount();
                Alert.alert('Success', 'Your profile has been deleted.');
              } catch (error: any) {
                Alert.alert('Error', error.message || 'Failed to delete profile');
              }
            } else {
              Alert.alert('Error', 'You must type "delete" to confirm.');
            }
              },
            },
          ],
          'plain-text'
    );
  }

  return (
    <View className="flex-1 px-6 pt-20">
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

      {/* Delete Profile Section */}
        <Button
          className="mt-4"
          variant="destructive"
          onPress={handleDeleteAccount}
          isLoading={isLoading}
        >
          Delete Profile
        </Button>
    </View>
  );
}
