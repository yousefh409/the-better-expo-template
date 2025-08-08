import { clsx, type ClassValue } from 'clsx';
/**
 * Utility function to merge class names (similar to clsx but compatible with NativeWind)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export * from './colors';
