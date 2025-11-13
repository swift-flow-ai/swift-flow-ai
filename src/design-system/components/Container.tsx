import { ReactNode } from 'react';
import { cn } from '../../utils';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-full',
};

/**
 * Container - Provides consistent max-width and padding for page content
 * 
 * @example
 * <Container size="lg" padding>
 *   <YourContent />
 * </Container>
 */
export function Container({
  children,
  className,
  size = 'lg',
  padding = true,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto',
        sizeClasses[size],
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  );
}

