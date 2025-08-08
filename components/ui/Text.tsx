import { cn } from '@/utils';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  variant?: 'body' | 'caption' | 'footnote' | 'label' | 'small';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive';
  className?: string;
  children: React.ReactNode;
}

const textVariants = {
  body: 'text-base leading-6',
  caption: 'text-xs leading-4',
  footnote: 'text-sm leading-5',
  label: 'text-sm leading-5 font-medium',
  small: 'text-xs leading-4',
};

const textWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};


const textColors = {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-400',
    muted: 'text-gray-500 dark:text-gray-500',
    accent: 'text-blue-600 dark:text-blue-400',
    destructive: 'text-red-600 dark:text-red-400',
    error: 'text-red-500 dark:text-red-300',
};

export function Text({
    variant = 'body',
    weight,
    size,
    color = 'primary',
    className,
    children,
    ...props
}: TextProps) {
    return (
        <RNText
            className={cn(
                textVariants[variant],
                weight && textWeights[weight],
                size && textSizes[size],
                textColors[color],
                className
            )}
            {...props}
        >
            {children}
        </RNText>
    );
}
