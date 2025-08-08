import { cn } from '@/utils';
import React from 'react';
import {
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Text } from './Text';

type InputVariant = 'default' | 'outline' | 'filled';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
  variant?: InputVariant;
  size?: InputSize;
}

const inputVariants = {
  default: 'bg-white focus:border-primary-500 focus:bg-primary-50',
  outline: 'border-2 border-primary-200 bg-transparent focus:border-primary-600 focus:bg-primary-500',
  filled: 'border-0 bg-neutral-100 focus:bg-primary-50',
};

const inputSizes = {
  sm: 'px-3 py-2 text-sm rounded-sm',
  md: 'px-3 py-3 text-base rounded-sm',
  lg: 'px-4 py-1 h-[50px] text-xl rounded-sm',
};

export function Input({
  label,
  error,
  hint,
  containerClassName,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: InputProps) {
  return (
    <View className={cn('w-full', containerClassName)}>
      {label && (
        <Text className="text-sm font-medium mt-2">
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          inputVariants[variant],
          inputSizes[size],
          error && 'border-error-500 bg-error-50 focus:border-error-600 focus:bg-error-100',
          className
        )}
        placeholderTextColor="#6B7280"
        {...props}
      />
      {error && (
        <Text className="text-sm mt-1" color='error'>
          {error}
        </Text>
      )}
      {hint && !error && (
        <Text className="text-sm mt-1">
          {hint}
        </Text>
      )}
    </View>
  );
}
