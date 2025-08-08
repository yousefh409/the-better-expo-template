import { cn } from '@/utils';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface HeadingProps extends RNTextProps {
  level: 1 | 2 | 3;
  className?: string;
  children: React.ReactNode;
}

const headingStyles = {
  1: 'text-4xl font-bold leading-tight',
  2: 'text-3xl font-bold leading-tight',
  3: 'text-2xl font-semibold leading-tight',
};

function Heading({ level, className, children, ...props }: HeadingProps) {
  return (
    <RNText
      className={cn(
        headingStyles[level],
        'text-gray-900 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function H1({ className, children, ...props }: Omit<HeadingProps, 'level'>) {
  return (
    <Heading level={1} className={className} {...props}>
      {children}
    </Heading>
  );
}

export function H2({ className, children, ...props }: Omit<HeadingProps, 'level'>) {
  return (
    <Heading level={2} className={className} {...props}>
      {children}
    </Heading>
  );
}

export function H3({ className, children, ...props }: Omit<HeadingProps, 'level'>) {
  return (
    <Heading level={3} className={className} {...props}>
      {children}
    </Heading>
  );
}

const textVariants = {
  paragraph: 'text-base text-gray-800 dark:text-gray-200',
  caption: 'text-xs text-gray-500 dark:text-gray-400',
  subtitle: 'text-lg font-medium text-gray-700 dark:text-gray-300',
  overline: 'text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500',
};

interface TextVariantProps extends RNTextProps {
  className?: string;
  children: React.ReactNode;
}

export function Paragraph({ className, children, ...props }: TextVariantProps) {
  return (
    <RNText className={cn(textVariants.paragraph, className)} {...props}>
      {children}
    </RNText>
  );
}

export function Caption({ className, children, ...props }: TextVariantProps) {
  return (
    <RNText className={cn(textVariants.caption, className)} {...props}>
      {children}
    </RNText>
  );
}

export function Subtitle({ className, children, ...props }: TextVariantProps) {
  return (
    <RNText className={cn(textVariants.subtitle, className)} {...props}>
      {children}
    </RNText>
  );
}

export function Overline({ className, children, ...props }: TextVariantProps) {
  return (
    <RNText className={cn(textVariants.overline, className)} {...props}>
      {children}
    </RNText>
  );
}
