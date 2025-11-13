import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils';
import { Link } from 'react-router-dom';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  urgent?: boolean;
  link?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * StatCard - Displays a statistic with icon, value, and optional trend indicator
 * 
 * @example
 * <StatCard
 *   label="Active Workflows"
 *   value={12}
 *   icon={Zap}
 *   iconColor="text-blue-600"
 *   iconBg="bg-blue-50"
 *   trend={{ value: "+12%", isPositive: true }}
 *   link="/app/workflows"
 * />
 */
export function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
  trend,
  urgent,
  link,
  className,
  onClick,
}: StatCardProps) {
  const content = (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-gray-800 p-4',
        'transition-all duration-200',
        link || onClick ? 'hover:shadow-md cursor-pointer' : '',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        {Icon && (
          <div className={cn('p-1.5 rounded-md', iconBg)}>
            <Icon className={cn('h-4 w-4', iconColor)} />
          </div>
        )}
        <div className="flex items-center gap-2">
          {trend && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                trend.isPositive
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              )}
            >
              {trend.value}
            </div>
          )}
          {urgent && (
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          )}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-0.5">
        {value}
      </div>
      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
        {label}
      </div>
      {(link || onClick) && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
}

