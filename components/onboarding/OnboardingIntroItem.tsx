import LottieView from 'lottie-react-native';
import React from 'react';
import {
  ImageURISource,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Text } from '../ui';

type Props = {
  item: { text: string; image: ImageURISource };
  index: number;
  x: Animated.SharedValue<number>;
};

const OnboardingIntroItem = ({ item, index, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const rnImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      width: SCREEN_WIDTH * 0.7,
      height: SCREEN_WIDTH * 0.7,
      transform: [{ translateY}],
    };
  }, [index, x]);

  const rnTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY}],
    };
  }, [index, x]);
  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <LottieView
        autoPlay
        style={{
          width: SCREEN_WIDTH * 0.9,
          height: SCREEN_WIDTH * 0.9,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('@/assets/lottie/earth.json')}
      />
      <Text style={[styles.textItem, rnTextStyle]}>
        {item.text}
      </Text>
    </View>
  );
};

export default React.memo(OnboardingIntroItem);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textItem: {
    fontWeight: '600',
    lineHeight: 41,
    fontSize: 34,
    paddingHorizontal: 20
  },
});