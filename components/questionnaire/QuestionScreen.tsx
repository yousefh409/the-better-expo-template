import { Question } from '@/stores/questionnaireStore';
import React from 'react';
import { TextInput, View } from 'react-native';
import Animated, {
    FadeInUp,
    FadeOutDown
} from 'react-native-reanimated';
import { H1 } from '../ui';
import { OptionButton } from './OptionButton';

interface QuestionScreenProps {
  question: Question;
  answer: string | string[] | undefined;
  onAnswerChange: (answer: string | string[]) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  answer,
  onAnswerChange,
}) => {
  const handleOptionPress = (optionId: string) => {
    if (question.type === 'single') {
      onAnswerChange(optionId);
    } else if (question.type === 'multiple') {
      const currentAnswers = Array.isArray(answer) ? answer : [];
      const isSelected = currentAnswers.includes(optionId);
      
      if (isSelected) {
        onAnswerChange(currentAnswers.filter(id => id !== optionId));
      } else {
        onAnswerChange([...currentAnswers, optionId]);
      }
    }
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'single':
      case 'multiple':
        return (
          <View>
            {question.options?.map((option, index) => (
              <Animated.View
                key={option.id}
                entering={FadeInUp.delay(index * 100)}
                exiting={FadeOutDown.delay(index * 50)}
                className="mb-4"
              >
                <OptionButton
                  option={option}
                  isSelected={
                    question.type === 'single'
                      ? answer === option.id
                      : Array.isArray(answer) && answer.includes(option.id)
                  }
                  onPress={() => handleOptionPress(option.id)}
                  multiSelect={question.type === 'multiple'}
                />
              </Animated.View>
            ))}
          </View>
        );

      case 'text':
        return (
          <Animated.View
            entering={FadeInUp.delay(200)}
            exiting={FadeOutDown}
            className="w-full"
          >
            <TextInput
              value={typeof answer === 'string' ? answer : ''}
              onChangeText={(text) => onAnswerChange(text)}
              placeholder={question.placeholder}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white"
              style={{ 
                fontSize: 16,
                lineHeight: 24,
                height: 120,
                borderColor: '#E5E7EB',
              }}
              placeholderTextColor="#9CA3AF"
            />
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <View className="px-6">
      {/* Question Header */}
      <View className="pt-8 pb-6">
        <View>
          <H1>
            {question.title}
          </H1>
          {/* {question.type === 'multiple' && (
            <Text className="text-center text-gray-600 text-base">
              Select all that apply
            </Text>
          )} */}
        </View>
      </View>

      {/* Question Content */}
      <View>
        {renderQuestion()}
      </View>
    </View>
  );
};
