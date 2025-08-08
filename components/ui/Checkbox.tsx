import React from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { colors } from '../../utils/colors';

type CheckboxVariant = 'primary' | 'secondary' | 'success' | 'error';

interface CheckboxProps {
  isChecked: boolean;
  size?: number;
  variant?: CheckboxVariant;
}

const checkboxColors = {
  primary: { checked: colors.primary, border: colors.primary },
  secondary: { checked: colors.secondary, border: colors.secondary },
  success: { checked: colors.success, border: colors.success },
  error: { checked: colors.error, border: colors.error },
};

export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  size = 24,
  variant = 'primary',
}) => {
  const checkedProgress = useSharedValue(isChecked ? 1 : 0);
  const scale = useSharedValue(1);
  const colors = checkboxColors[variant];

  React.useEffect(() => {
    checkedProgress.value = withTiming(isChecked ? 1 : 0, { duration: 200 });
    if (isChecked) {
      scale.value = withSpring(1.1, { damping: 15 }, () => {
        scale.value = withSpring(1, { damping: 15 });
      });
    }
  }, [isChecked]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolate(
      checkedProgress.value,
      [0, 1],
      [0, 1]
    );

    return {
      transform: [{ scale: scale.value }],
      backgroundColor: backgroundColor > 0.5 ? colors.checked : 'transparent',
      borderColor: backgroundColor > 0.5 ? "white" : '#9CA3AF',
    };
  });

  const checkmarkStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      checkedProgress.value,
      [0, 0.5, 1],
      [0, 0, 1]
    );

    const scale = interpolate(
      checkedProgress.value,
      [0, 0.5, 1],
      [0.3, 0.7, 1]
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: size,
          height: size,
          borderRadius: 6,
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }
      ]}
    >
      <Animated.View style={checkmarkStyle}>
        <View
          style={{
            width: size * 0.4,
            height: size * 0.2,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderColor: 'white',
            transform: [{ rotate: '-45deg' }],
            marginTop: -2,
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};
