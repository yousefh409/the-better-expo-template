import { Checkbox } from '@/components/ui/Checkbox';
import { Text } from '@/components/ui/Text';
import { QuestionOption } from '@/stores/questionnaireStore';
import React from 'react';
import { Pressable, View } from 'react-native';

interface OptionButtonProps {
  option: QuestionOption;
  isSelected: boolean;
  onPress: () => void;
  multiSelect?: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isSelected,
  onPress,
  multiSelect = false,
}) => {

  return (
    <Pressable
      onPress={onPress}
    >
      <View
        className={`flex flex-row ${
            isSelected ? 'bg-primary-300 dark:bg-primary-800' : 'dark:bg-neutral-800'
          } items-center p-4 rounded-xl border-2 w-full mt-1`}
      >
        <Text className="text-4xl mr-4">{option.emoji}</Text>
        <Text className="text-xl font-medium">
          {option.text}
        </Text>
        {multiSelect && (
          <View className="ml-auto">
            <Checkbox isChecked={isSelected} size={20} variant="primary" />
          </View>
        )}
      </View>
    </Pressable>
  );
};
