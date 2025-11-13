import { ReactNode } from 'react';
import { cn } from '../../utils';

export interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  headerAction?: ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  variant?: 'default' | 'outlined' | 'elevated';
  hover?: boolean;
  onClick?: () => void;
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  none: 'p-0',
};

const variantClasses = {
  default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
  elevated: 'bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700',
};

/**
 * Card - A flexible card component with consistent styling
 * 
 * @example
 * <Card title="My Card" description="Card description" padding="md" variant="default">
 *   <CardContent />
 * </Card>
 */
export default function Card({
  children,
  className,
  title,
  description,
  headerAction,
  padding = 'md',
  variant = 'default',
  hover = false,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-200',
        variantClasses[variant],
        paddingClasses[padding],
        hover && 'hover:shadow-md cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {(title || description || headerAction) && (
        <div className={cn('flex items-start justify-between', padding !== 'none' && 'mb-4')}>
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

