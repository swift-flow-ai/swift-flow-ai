import { Badge } from '../../../components/common/Badge';
import { AlertTriangle } from 'lucide-react';
import { InboxItem } from '../../../services/inbox.service';
import { getItemTypeConfig, getPriorityConfig, isUrgent, isOverdue } from '../utils';

interface InboxDetailHeaderProps {
  item: InboxItem;
}

export function InboxDetailHeader({ item }: InboxDetailHeaderProps) {
  const typeConfig = getItemTypeConfig(item.type);
  const TypeIcon = typeConfig.icon;
  const priorityConfig = getPriorityConfig(item.priority);
  const urgent = isUrgent(item.dueAt);
  const overdue = isOverdue(item.dueAt);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
      <div className="flex items-start gap-2 flex-wrap">
        <div className={`p-1.5 rounded ${typeConfig.bgColor} flex-shrink-0`}>
          <TypeIcon className={`h-4 w-4 ${typeConfig.color}`} />
        </div>
        <h1 className="text-xl font-bold flex-1 min-w-0">{item.title}</h1>
        <Badge variant="info" className="text-xs px-2 py-0.5">
          {typeConfig.label}
        </Badge>
        <Badge variant={priorityConfig.variant} className="text-xs px-2 py-0.5">
          {item.priority}
        </Badge>
        {urgent && !overdue && (
          <Badge variant="warning" className="text-xs px-2 py-0.5 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Urgent
          </Badge>
        )}
        {overdue && (
          <Badge variant="danger" className="text-xs px-2 py-0.5 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Overdue
          </Badge>
        )}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5">{item.description}</p>
    </div>
  );
}
