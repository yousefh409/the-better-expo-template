import { Text } from '@/components/ui/Text';
import React from 'react';
import { View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

interface ProgressBarProps {
  progress: number; // 0 to 1
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  totalSteps 
}) => {
  const animatedProgress = useSharedValue(0);

  React.useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 300 });
  }, [progress]);

  const progressStyle = useAnimatedStyle(() => {
    const width = interpolate(
      animatedProgress.value,
      [0, 1],
      [0, 100]
    );

    return {
      width: `${width}%`,
    };
  });

  return (
    <View className="w-full mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm text-neutral-600">
          Step {Math.floor(progress * totalSteps) + 1} of {totalSteps}
        </Text>
        <Text className="text-sm text-neutral-600">
          {Math.round(progress * 100)}%
        </Text>
      </View>
      <View className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
        <Animated.View
          style={progressStyle}
          className="h-full bg-primary-500 rounded-full"
        />
      </View>
    </View>
  );
};
