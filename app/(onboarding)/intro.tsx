import { H1 } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';

const App = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 justify-between">
            <View className="flex-1 justify-center items-center px-5">
                <Image
                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} // Replace with your actual logo URI
                    className="w-32 h-32 rounded-full mb-6"
                />
                <H1 className="mb-2">MyApp</H1>
                <Text className="text-center">Your catchy phrase goes here.</Text>
            </View>
            <View className="px-5 pb-10">
                <Button
                    variant="primary"
                    size="lg"
                    className="mb-3"
                    onPress={() => router.push('/onboarding')}
                >
                    Get Started
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    onPress={() => router.push('/login')}
                >
                    Sign In
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default App;
