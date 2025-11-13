import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils';
import { Badge } from '../../components/common/Badge';

export interface QuickActionProps {
  label: string;
  description?: string;
  icon: LucideIcon;
  href: string;
  color?: string;
  badge?: number | string;
  className?: string;
}

/**
 * QuickAction - A prominent action button for quick navigation
 * 
 * @example
 * <QuickAction
 *   label="Create Workflow"
 *   description="Build a new automation"
 *   icon={Plus}
 *   href="/app/workflows/new"
 *   color="bg-primary"
 * />
 */
export function QuickAction({
  label,
  description,
  icon: Icon,
  href,
  color = 'bg-primary hover:bg-primary/90',
  badge,
  className,
}: QuickActionProps) {
  return (
    <Link to={href} className={cn('group relative', className)}>
      <div
        className={cn(
          'flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-lg',
          'hover:shadow-xl transition-all duration-200 group-hover:scale-105',
          color
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{label}</div>
          {description && (
            <div className="text-xs opacity-90 line-clamp-1">{description}</div>
          )}
        </div>
        {badge && (
          <Badge variant="danger" className="ml-2 bg-white/20 text-white border-white/30 flex-shrink-0">
            {badge}
          </Badge>
        )}
      </div>
    </Link>
  );
}

