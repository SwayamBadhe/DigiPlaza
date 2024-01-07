import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// alows to use tailwind classes in clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
