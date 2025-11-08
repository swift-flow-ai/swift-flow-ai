import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function Badge({ variant = 'default', children, icon: Icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300': variant === 'default',
          'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300': variant === 'success',
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300': variant === 'warning',
          'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300': variant === 'danger',
          'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300': variant === 'info',
        },
        className
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}

