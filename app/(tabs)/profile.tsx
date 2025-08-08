import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useAuthStore } from '@/stores';
import React from 'react';
import { Alert, Text, View } from 'react-native';

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
    <View className="flex-1 bg-gray-50 px-6 pt-16">
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Profile
      </Text>

      {/* User Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="space-y-3">
            <View>
              <Text className="text-sm font-medium text-gray-500 mb-1">
                Email
              </Text>
              <Text className="text-base text-gray-900">
                {user?.email || 'No email'}
              </Text>
            </View>
            
            <View>
              <Text className="text-sm font-medium text-gray-500 mb-1">
                User ID
              </Text>
              <Text className="text-base text-gray-900 font-mono">
                {user?.uid || 'No ID'}
              </Text>
            </View>

            {user?.metadata?.creationTime && (
              <View>
                <Text className="text-sm font-medium text-gray-500 mb-1">
                  Member Since
                </Text>
                <Text className="text-base text-gray-900">
                  {new Date(user.metadata.creationTime).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        </CardContent>
      </Card>

      {/* Sign Out Section */}
      <Card>
        <CardContent className="pt-4">
          <Button
            variant="destructive"
            onPress={handleSignOut}
            isLoading={isLoading}
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
