import OnboardingButton from '@/components/onboarding/OnboardingButton';
import OnboardingIntroItem from '@/components/onboarding/OnboardingIntroItem';
import OnboardingPaginationElement from '@/components/onboarding/OnboardingPaginationElement';
import { useCallback } from 'react';
import {
    ImageURISource,
    SafeAreaView,
    StyleSheet,
    View,
    ViewToken
} from 'react-native';
import Animated, {
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';



const pages = [
  {
    text: 'Trusted by millions of people, part of one part',
    image: require('@/assets/images/icon.png'),
  },
  {
    text: 'Spend money abroad, and track your expense',
    image: require('@/assets/images/icon.png'),
  },
  {
    text: 'Receive Money From Anywhere In The World',
    image: require('@/assets/images/icon.png'),
  },
];

export default function OnboardingIntro() {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    []
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: { text: string; image: ImageURISource };
      index: number;
    }) => {
      return <OnboardingIntroItem item={item} index={index} x={x} />;
    },
    [x]
  );
  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.bottomContainer}>
        <OnboardingPaginationElement length={pages.length} x={x} />
        <OnboardingButton
          currentIndex={flatListIndex}
          length={pages.length}
          flatListRef={flatListRef}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});