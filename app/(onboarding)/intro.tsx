import { H1, H3, Text } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { SafeAreaView, useWindowDimensions, View } from 'react-native';

const App = () => {
    const router = useRouter();
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    

    return (
        <SafeAreaView className="flex-1 justify-between">
            <View className="flex-1 items-center px-5">
                {/* <Image
                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} // Replace with your actual logo URI
                    className="w-32 h-32 rounded-full mb-6"
                /> */}
               <H3 className="mb-2 mt-[100px]">Welcome to My App!</H3>
                <H1 className="text-center">Your catchy phrase goes here.</H1>
                <LottieView
                        autoPlay
                        style={{
                          width: SCREEN_WIDTH * 0.7,
                          height: SCREEN_WIDTH * 0.7,
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('@/assets/lottie/Yay Jump.json')}
                      />
            </View>
            <View className="px-5 pb-10">
                <Text className="text-center mb-3">
                        quick lets start, last one there is a rotten egg!
                </Text>
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
