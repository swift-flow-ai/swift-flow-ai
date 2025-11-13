import { ReactNode } from 'react';
import { cn } from '../../utils';

export interface SectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  headerAction?: ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  sm: 'space-y-3',
  md: 'space-y-4',
  lg: 'space-y-6',
};

/**
 * Section - A semantic section wrapper with optional header
 * 
 * @example
 * <Section title="Recent Workflows" description="Your active workflows" headerAction={<Button>View All</Button>}>
 *   <WorkflowList />
 * </Section>
 */
export function Section({
  children,
  className,
  title,
  description,
  headerAction,
  spacing = 'md',
}: SectionProps) {
  return (
    <section className={cn('w-full', className)}>
      {(title || description || headerAction) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
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
      <div className={spacingClasses[spacing]}>{children}</div>
    </section>
  );
}

