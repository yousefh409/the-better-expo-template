import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Animated, {
    SlideInRight,
    SlideOutLeft,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QuestionScreen } from '@/components/questionnaire/QuestionScreen';
import { Button } from '@/components/ui/Button';
import { questions, useQuestionnaireStore } from '@/stores/questionnaireStore';

export default function Questionnaire() {
  const {
    currentQuestionIndex,
    answers,
    setAnswer,
    nextQuestion,
    previousQuestion,
    completeQuestionnaire,
    resetQuestionnaire,
  } = useQuestionnaireStore();

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];
  const progress = (currentQuestionIndex + 1) / questions.length;

  // Animation for screen transitions
  const slideDirection = useSharedValue(0);

  const canProceed = React.useMemo(() => {
    if (!currentAnswer) return false;
    
    switch (currentQuestion.type) {
      case 'text':
        return typeof currentAnswer === 'string' && currentAnswer.trim().length > 0;
      case 'single':
        return typeof currentAnswer === 'string' && currentAnswer.length > 0;
      case 'multiple':
        return Array.isArray(currentAnswer) && currentAnswer.length > 0;
      default:
        return false;
    }
  }, [currentAnswer, currentQuestion.type]);

  const handleNext = () => {
    slideDirection.value = withTiming(1, { duration: 200 });
    
    if (currentQuestionIndex === questions.length - 1) {
      // Complete questionnaire and navigate to signup
      completeQuestionnaire();
      // Pass questionnaire data to signup screen
      router.push({
        pathname: '/(onboarding)/(auth)/signup',
        params: {
          questionnaireData: JSON.stringify(answers),
        },
      });
    } else {
      setTimeout(() => {
        nextQuestion();
        slideDirection.value = withTiming(0, { duration: 200 });
      }, 200);
    }
  };

  const handlePrevious = () => {
    slideDirection.value = withTiming(-1, { duration: 200 });
    
    setTimeout(() => {
      previousQuestion();
      slideDirection.value = withTiming(0, { duration: 200 });
    }, 200);
  };

  const handleAnswerChange = (answer: string | string[]) => {
    setAnswer(currentQuestion.id, answer);
  };

  React.useEffect(() => {
    // Reset questionnaire when component mounts
    return () => {
      // Don't reset on unmount as we want to preserve data for signup
    };
  }, []);

  return (
    <SafeAreaView className="flex-1">      
        {/* <View className="px-6">
          <ProgressBar 
            progress={progress} 
            totalSteps={questions.length} 
          />
        </View> */}

        <Animated.View 
          className="flex-1"
          key={currentQuestionIndex} // Force re-render for animations
          entering={SlideInRight.duration(300)}
          exiting={SlideOutLeft.duration(200)}
        >
          <QuestionScreen
            question={currentQuestion}
            answer={currentAnswer}
            onAnswerChange={handleAnswerChange}
          />
        </Animated.View>

        {/* Navigation Buttons */}
        <View className="flex flex-row justify-between items-center py-6 px-6">
          <Button
            variant="outline"
            size="lg"
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="mr-3 flex-2"
          >
            Previous
          </Button>

          <Button
            variant="primary"
            size="lg"
            onPress={handleNext}
            disabled={!canProceed}
            className="ml-3 flex-1"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </View>
    </SafeAreaView>
  );
}