/**
 * Standardized Button Component
 * 
 * Variants:
 * - primary: Maroon background (default)
 * - secondary: Gold background
 * - outline: Transparent background with maroon border
 * - ghost: Transparent background, no border
 * - destructive: Red background for dangerous actions
 * 
 * Sizes:
 * - sm: Small padding and text
 * - md: Medium padding and text (default)
 * - lg: Large padding and text
 * 
 * Usage:
 * <Button variant="primary" size="lg">Primary Button</Button>
 * <Button variant="outline" size="md">Outline Button</Button>
 */
import { cn } from '@/utils';
import React from 'react';
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
  children: React.ReactNode;
  textClassName?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const buttonVariants = {
  primary: 'bg-primary-600 active:bg-primary-700',
  secondary: 'bg-secondary-500 active:bg-secondary-600',
  outline: 'border-2 border-primary-600 bg-transparent active:bg-primary-50',
  ghost: 'bg-transparent active:bg-primary-50',
  destructive: 'bg-error-600 active:bg-error-700',
};

const buttonTextVariants = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-primary-600',
  ghost: 'text-primary-600',
  destructive: 'text-white',
};

const buttonSizes = {
  sm: 'px-3 py-2 rounded-sm',
  md: 'px-4 py-3 rounded-sm',
  lg: 'px-6 py-4 rounded-sm',
};

const buttonTextSizes = {
  sm: 'text-base font-medium',
  md: 'text-lg font-medium',
  lg: 'text-xl font-semibold',
};

export function Button({
  isLoading = false,
  children,
  disabled,
  className,
  textClassName,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        'items-center justify-center flex-row',
        buttonVariants[variant],
        buttonSizes[size],
        (disabled || isLoading) && 'opacity-50',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <ActivityIndicator
          size="small"
          className="mr-2"
          color={variant === 'outline' || variant === 'ghost' ? '#550000' : '#ffffff'}
        />
      )}
      <Text className={cn(
        buttonTextVariants[variant],
        buttonTextSizes[size],
        textClassName
      )}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
