import TabBarButton from '@/components/ui/tabs/TabBarButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getTabColors } from '@/utils/colors';
import React from 'react';
import { View } from 'react-native';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const colorScheme = useColorScheme();
  const tabColors = getTabColors(colorScheme);

  return (
    <View className={`absolute bottom-6 flex-row justify-between items-center mx-5 py-4 px-2 rounded-[25px] shadow-lg
      ${colorScheme === 'dark' 
        ? 'bg-neutral-800 shadow-neutral-900/20' 
        : 'bg-white shadow-primary-900/10'
      }`}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if(['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton 
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? tabColors.focused : tabColors.unfocused}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default TabBar;