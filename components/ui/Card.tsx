import { cn } from '@/utils';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';

type CardVariant = 'default' | 'elevated' | 'outline' | 'filled';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: CardVariant;
}

interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
}

interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const cardVariants = {
  default: 'bg-white border border-neutral-200 shadow-sm',
  elevated: 'bg-white border-0 shadow-lg',
  outline: 'bg-transparent border-2 border-primary-200 shadow-none',
  filled: 'bg-primary-50 border border-primary-100 shadow-none',
};

export function Card({ children, className, variant = 'default', ...props }: CardProps) {
  return (
    <View
      className={cn(
        'rounded-lg',
        cardVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <View className={cn('p-4 pb-2', className)} {...props}>
      {children}
    </View>
  );
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <View className={cn('p-4 pt-0 text-black', className)} {...props}>
      {children}
    </View>
  );
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <View className={cn('p-4 pt-0', className)} {...props}>
      {children}
    </View>
  );
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <Text className={cn('text-lg font-semibold text-neutral-900', className)}>
      {children}
    </Text>
  );
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <Text className={cn('text-sm text-neutral-600 mt-1', className)}>
      {children}
    </Text>
  );
}
