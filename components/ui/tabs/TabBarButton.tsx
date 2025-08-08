import { icons } from '@/assets/icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface TabBarButtonProps {
  isFocused: boolean;
  label: string;
  routeName: string;
  color: string;
  onPress: () => void;
  onLongPress: () => void;
}

const TabBarButton: React.FC<TabBarButtonProps> = (props) => {
    const { isFocused, label, routeName, color, onPress, onLongPress } = props;
    const colorScheme = useColorScheme();

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
        const top = interpolate(scale.value, [0, 1], [0, 8]);

        return {
            transform: [{ scale: scaleValue }],
            top
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0]);
        return {
            opacity
        };
    });

    return (
        <Pressable 
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 justify-center items-center gap-1"
        >
            <Animated.View style={[animatedIconStyle]}>
                {icons[routeName as keyof typeof icons]?.({ color })}
            </Animated.View>
            
            <Animated.Text 
                style={[
                    { 
                        color,
                        fontSize: 11
                    }, 
                    animatedTextStyle
                ]}
                className={`text-xs ${colorScheme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}
            >
                {label}
            </Animated.Text>
        </Pressable>
    );
};

export default TabBarButton;