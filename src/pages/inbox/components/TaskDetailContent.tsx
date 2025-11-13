import { useState } from 'react';
import { PlayCircle, CheckCircle2, FileText, Link as LinkIcon, User } from 'lucide-react';
import { InboxItem } from '../../../services/inbox.service';
import { format } from 'date-fns';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

interface TaskDetailContentProps {
  item: InboxItem;
  onComplete?: (taskId: string) => void;
  onViewDetails?: (taskId: string) => void;
}

export function TaskDetailContent({ item, onComplete, onViewDetails }: TaskDetailContentProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  
  const taskMetadata = item.metadata as {
    steps?: Array<{ id: string; name: string; completed: boolean; dueDate?: string }>;
    attachments?: Array<{ name: string; url: string; type: string; size?: string }>;
    relatedItems?: Array<{ id: string; type: string; title: string; url?: string }>;
    estimatedTime?: string;
    category?: string;
    assignee?: { name: string; avatar?: string };
    progress?: number;
  } | undefined;

  const completedSteps = taskMetadata?.steps?.filter(s => s.completed).length || 0;
  const totalSteps = taskMetadata?.steps?.length || 0;
  const progress = taskMetadata?.progress || (totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0);

  const handleComplete = async () => {
    if (!onComplete) return;
    setIsCompleting(true);
    try {
      await onComplete(item.id);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Actions - At Top */}
      <Card
        padding="md"
        variant="default"
      >
        <div className="flex items-center gap-2 mb-2">
          <PlayCircle className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Actions</h3>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleComplete}
            disabled={isCompleting}
            variant="primary"
            isLoading={isCompleting}
            className="flex-1"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Complete Task
          </Button>
          {onViewDetails && (
            <Button
              onClick={() => onViewDetails(item.id)}
              variant="outline"
            >
              <FileText className="h-4 w-4 mr-2" />
              Details
            </Button>
          )}
        </div>
      </Card>

      {/* Task Overview - Compact */}
      {(taskMetadata?.category || taskMetadata?.estimatedTime || progress > 0) && (
        <Card
          padding="md"
          variant="default"
        >
          <div className="grid grid-cols-3 gap-3 text-sm">
            {taskMetadata?.category && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Category</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{taskMetadata.category}</p>
              </div>
            )}
            {taskMetadata?.estimatedTime && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Est. Time</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{taskMetadata.estimatedTime}</p>
              </div>
            )}
            {progress > 0 && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Progress</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{progress}%</p>
              </div>
            )}
          </div>
          {progress > 0 && (
            <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </Card>
      )}

      {/* Task Steps/Checklist - Compact */}
      {taskMetadata?.steps && taskMetadata.steps.length > 0 && (
        <Card
          padding="md"
          variant="default"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Steps ({completedSteps}/{totalSteps})
            </h3>
          </div>
          <div className="space-y-1.5">
            {taskMetadata.steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 p-2 rounded border ${
                  step.completed
                    ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className={`flex-shrink-0 ${
                  step.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm ${
                    step.completed
                      ? 'text-gray-500 dark:text-gray-400 line-through'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {index + 1}. {step.name}
                  </span>
                  {step.dueDate && !step.completed && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Due: {format(new Date(step.dueDate), 'MMM d, h:mm a')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Attachments - Compact */}
      {taskMetadata?.attachments && taskMetadata.attachments.length > 0 && (
        <Card
          padding="md"
          variant="default"
        >
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Attachments ({taskMetadata.attachments.length})
            </h3>
          </div>
          <div className="space-y-1">
            {taskMetadata.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <FileText className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {attachment.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{attachment.type}</span>
                    {attachment.size && <span>• {attachment.size}</span>}
                  </div>
                </div>
                <LinkIcon className="h-3.5 w-3.5 text-gray-400" />
              </a>
            ))}
          </div>
        </Card>
      )}

      {/* Related Items - Compact */}
      {taskMetadata?.relatedItems && taskMetadata.relatedItems.length > 0 && (
        <Card
          padding="md"
          variant="default"
        >
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Related ({taskMetadata.relatedItems.length})
            </h3>
          </div>
          <div className="space-y-1">
            {taskMetadata.relatedItems.map((related) => (
              <div
                key={related.id}
                className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {related.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {related.type}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Assignee Info */}
      {taskMetadata?.assignee && (
        <Card
          padding="md"
          variant="default"
        >
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Assigned To</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{taskMetadata.assignee.name}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
