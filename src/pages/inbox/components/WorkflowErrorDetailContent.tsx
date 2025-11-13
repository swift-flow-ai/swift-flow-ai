import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, FileText, Code, ExternalLink, Clock, XCircle } from 'lucide-react';
import { InboxItem } from '../../../services/inbox.service';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../../components/common/Badge';

interface WorkflowErrorDetailContentProps {
  item: InboxItem;
  onRetry?: (executionId: string) => void;
}

export function WorkflowErrorDetailContent({ item, onRetry }: WorkflowErrorDetailContentProps) {
  const errorMetadata = item.metadata as {
    error?: {
      message?: string;
      stack?: string;
      code?: string;
      type?: string;
      nodeId?: string;
      nodeName?: string;
      timestamp?: string;
    };
    retryable?: boolean;
    retryCount?: number;
    maxRetries?: number;
    occurredAt?: string;
  } | undefined;

  const errorValue = errorMetadata?.error;
  const hasError = errorValue !== undefined && errorValue !== null;
  const errorText = hasError 
    ? (typeof errorValue === 'string' 
        ? errorValue 
        : JSON.stringify(errorValue, null, 2))
    : '';

  return (
    <div className="space-y-3">
      {/* Actions - At Top */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <RefreshCw className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Actions</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {onRetry && errorMetadata?.retryable && item.executionId && (
            <button
              onClick={() => onRetry(item.executionId!)}
              className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/20 flex items-center gap-2 text-sm font-semibold"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Execution
            </button>
          )}
          {item.executionId && (
            <Link
              to={`/app/executions/${item.executionId}`}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary"
            >
              <FileText className="h-4 w-4" />
              View Execution
            </Link>
          )}
          {item.workflowId && (
            <Link
              to={`/app/workflows/${item.workflowId}`}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary"
            >
              <Code className="h-4 w-4" />
              View Workflow
            </Link>
          )}
        </div>
      </motion.div>

      {/* Error Summary - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20 p-3"
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-red-900 dark:text-red-100">Error Occurred</h3>
              {errorMetadata?.error?.type && (
                <Badge variant="danger" className="text-xs px-1.5 py-0">
                  {errorMetadata.error.type}
                </Badge>
              )}
            </div>
            <p className="text-sm text-red-800 dark:text-red-200 mb-2">
              {item.description || errorMetadata?.error?.message || 'An error occurred during workflow execution.'}
            </p>
            
            {/* Error Details Grid */}
            {hasError && (
              <div className="bg-red-100 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800 p-2 space-y-2">
                {errorMetadata?.error?.code && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-red-900 dark:text-red-100 min-w-[80px]">Code:</span>
                    <code className="text-xs font-mono text-red-800 dark:text-red-200">{errorMetadata.error.code}</code>
                  </div>
                )}
                {errorMetadata?.error?.nodeName && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-red-900 dark:text-red-100 min-w-[80px]">Node:</span>
                    <div className="flex-1">
                      <p className="text-xs text-red-800 dark:text-red-200">{errorMetadata.error.nodeName}</p>
                      {errorMetadata.error.nodeId && (
                        <code className="text-xs font-mono text-red-700 dark:text-red-300">{errorMetadata.error.nodeId}</code>
                      )}
                    </div>
                  </div>
                )}
                {errorMetadata?.error?.message && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-red-900 dark:text-red-100 min-w-[80px]">Message:</span>
                    <p className="text-xs text-red-800 dark:text-red-200 flex-1">{errorMetadata.error.message}</p>
                  </div>
                )}
                {errorMetadata?.error?.stack && (
                  <div>
                    <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-1">Stack Trace:</p>
                    <pre className="text-xs font-mono text-red-800 dark:text-red-200 whitespace-pre-wrap overflow-auto max-h-32 bg-red-200 dark:bg-red-900/40 p-1.5 rounded">
                      {errorMetadata.error.stack}
                    </pre>
                  </div>
                )}
                {!errorMetadata?.error?.message && !errorMetadata?.error?.stack && (
                  <pre className="text-xs font-mono text-red-900 dark:text-red-100 whitespace-pre-wrap">
                    {errorText}
                  </pre>
                )}
              </div>
            )}

            {/* Retry Info */}
            {errorMetadata?.retryable && (
              <div className="mt-2 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded p-2">
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5 text-yellow-700 dark:text-yellow-300" />
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    {errorMetadata.retryCount !== undefined && errorMetadata.maxRetries !== undefined
                      ? `Retry ${errorMetadata.retryCount} of ${errorMetadata.maxRetries}`
                      : 'This error can be retried'}
                  </p>
                </div>
              </div>
            )}

            {/* Timestamp */}
            {(errorMetadata?.occurredAt || errorMetadata?.error?.timestamp) && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-red-700 dark:text-red-300">
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(errorMetadata.occurredAt || errorMetadata.error?.timestamp || item.createdAt), { addSuffix: true })}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
