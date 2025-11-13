import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils';
import Button from '../../components/common/Button';

// Note: This is a design-system specific EmptyState component
// The common EmptyState component is in src/components/common/EmptyState.tsx

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
}

/**
 * EmptyState - Displays an empty state with icon, message, and optional action
 * 
 * @example
 * <EmptyState
 *   icon={Zap}
 *   title="No workflows yet"
 *   description="Create your first workflow to get started"
 *   action={{ label: "Create Workflow", onClick: handleCreate }}
 * />
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      {Icon && (
        <div className="mb-4 p-4 rounded-full bg-gray-100 dark:bg-gray-800">
          <Icon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <Button
          variant={action.variant || 'primary'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

