import { create } from 'zustand';

export interface QuestionOption {
  id: string;
  text: string;
  emoji: string;
}

export interface Question {
  id: string;
  title: string;
  type: 'single' | 'multiple' | 'text';
  options?: QuestionOption[];
  placeholder?: string;
}

export interface QuestionnaireData {
  [questionId: string]: string | string[];
}

interface QuestionnaireState {
  currentQuestionIndex: number;
  answers: QuestionnaireData;
  isCompleted: boolean;
  
  // Actions
  setCurrentQuestion: (index: number) => void;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetQuestionnaire: () => void;
  completeQuestionnaire: () => void;
}

export const questions: Question[] = [
  {
    id: 'interests',
    title: 'What are your main interests?',
    type: 'multiple',
    options: [
      { id: 'technology', text: 'Technology', emoji: '💻' },
      { id: 'sports', text: 'Sports', emoji: '⚽' },
      { id: 'music', text: 'Music', emoji: '🎵' },
      { id: 'reading', text: 'Reading', emoji: '📚' },
      { id: 'travel', text: 'Travel', emoji: '✈️' },
      { id: 'cooking', text: 'Cooking', emoji: '👨‍🍳' },
    ],
  },
  {
    id: 'experience_level',
    title: 'How would you describe your experience level?',
    type: 'single',
    options: [
      { id: 'beginner', text: 'Beginner', emoji: '🌱' },
      { id: 'intermediate', text: 'Intermediate', emoji: '🌿' },
      { id: 'advanced', text: 'Advanced', emoji: '🌳' },
      { id: 'expert', text: 'Expert', emoji: '🦋' },
    ],
  },
  {
    id: 'goals',
    title: 'What are your main goals?',
    type: 'multiple',
    options: [
      { id: 'learn', text: 'Learn new skills', emoji: '🎓' },
      { id: 'network', text: 'Network with others', emoji: '🤝' },
      { id: 'career', text: 'Advance my career', emoji: '📈' },
      { id: 'hobby', text: 'Pursue hobbies', emoji: '🎨' },
      { id: 'fitness', text: 'Stay fit and healthy', emoji: '💪' },
    ],
  },
  {
    id: 'preferred_style',
    title: 'What\'s your preferred learning style?',
    type: 'single',
    options: [
      { id: 'visual', text: 'Visual', emoji: '👁️' },
      { id: 'auditory', text: 'Auditory', emoji: '👂' },
      { id: 'kinesthetic', text: 'Hands-on', emoji: '✋' },
      { id: 'reading', text: 'Reading/Writing', emoji: '✍️' },
    ],
  },
  {
    id: 'bio',
    title: 'Tell us a bit about yourself',
    type: 'text',
    placeholder: 'Share your story, background, or anything you\'d like us to know...',
  },
];

export const useQuestionnaireStore = create<QuestionnaireState>((set, get) => ({
  currentQuestionIndex: 0,
  answers: {},
  isCompleted: false,

  setCurrentQuestion: (index) => {
    set({ currentQuestionIndex: Math.max(0, Math.min(index, questions.length - 1)) });
  },

  setAnswer: (questionId, answer) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer,
      },
    }));
  },

  nextQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  previousQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  resetQuestionnaire: () => {
    set({
      currentQuestionIndex: 0,
      answers: {},
      isCompleted: false,
    });
  },

  completeQuestionnaire: () => {
    set({ isCompleted: true });
  },
}));
