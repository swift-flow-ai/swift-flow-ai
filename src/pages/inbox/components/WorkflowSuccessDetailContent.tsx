import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, BarChart3, ExternalLink, FileText, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InboxItem } from '../../../services/inbox.service';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../../components/common/Badge';

interface WorkflowSuccessDetailContentProps {
  item: InboxItem;
}

export function WorkflowSuccessDetailContent({ item }: WorkflowSuccessDetailContentProps) {
  const successMetadata = item.metadata as {
    duration?: number;
    stepsExecuted?: number;
    totalSteps?: number;
    outputData?: Record<string, unknown>;
    performance?: {
      avgStepTime?: number;
      slowestStep?: string;
      fastestStep?: string;
    };
    completedAt?: string;
  } | undefined;

  const duration = successMetadata?.duration;
  const durationText = duration 
    ? duration < 1000 
      ? `${duration}ms`
      : duration < 60000
      ? `${(duration / 1000).toFixed(1)}s`
      : `${(duration / 60000).toFixed(1)}m`
    : null;

  return (
    <div className="space-y-3">
      {/* Actions - At Top */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">View Details</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.executionId && (
            <Link
              to={`/app/executions/${item.executionId}`}
              className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/20 flex items-center gap-2 text-sm font-semibold"
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
              <ExternalLink className="h-4 w-4" />
              View Workflow
            </Link>
          )}
        </div>
      </motion.div>

      {/* Success Summary - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-950/20 p-3"
      >
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-green-900 dark:text-green-100">Workflow Completed</h3>
              <Badge variant="success" className="text-xs px-1.5 py-0">Success</Badge>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200 mb-2">
              {item.description || 'The workflow has completed without errors.'}
            </p>

            {/* Success Metrics Grid */}
            {(durationText || successMetadata?.stepsExecuted) && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {durationText && (
                  <div className="bg-green-100 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-800 p-2">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Clock className="h-3 w-3 text-green-700 dark:text-green-300" />
                      <p className="text-xs text-green-700 dark:text-green-300">Duration</p>
                    </div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      {durationText}
                    </p>
                  </div>
                )}
                {successMetadata?.stepsExecuted && successMetadata?.totalSteps && (
                  <div className="bg-green-100 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-800 p-2">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Zap className="h-3 w-3 text-green-700 dark:text-green-300" />
                      <p className="text-xs text-green-700 dark:text-green-300">Steps</p>
                    </div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      {successMetadata.stepsExecuted}/{successMetadata.totalSteps}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Performance Info */}
            {successMetadata?.performance && (
              <div className="mt-2 bg-green-100 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-800 p-2">
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">Performance</p>
                {successMetadata.performance.avgStepTime && (
                  <p className="text-xs text-green-800 dark:text-green-200">
                    Avg: {(successMetadata.performance.avgStepTime / 1000).toFixed(2)}s per step
                  </p>
                )}
                {successMetadata.performance.slowestStep && (
                  <p className="text-xs text-green-800 dark:text-green-200">
                    Slowest: {successMetadata.performance.slowestStep}
                  </p>
                )}
                {successMetadata.performance.fastestStep && (
                  <p className="text-xs text-green-800 dark:text-green-200">
                    Fastest: {successMetadata.performance.fastestStep}
                  </p>
                )}
              </div>
            )}

            {/* Completed At */}
            {(successMetadata?.completedAt || item.createdAt) && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-green-700 dark:text-green-300">
                <Clock className="h-3 w-3" />
                <span>
                  Completed {formatDistanceToNow(new Date(successMetadata?.completedAt || item.createdAt), { addSuffix: true })}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Output Data - Compact */}
      {successMetadata?.outputData && Object.keys(successMetadata.outputData).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Output Data</h3>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-200 dark:border-gray-700 p-2 overflow-auto max-h-[250px]">
            <pre className="text-xs font-mono text-gray-800 dark:text-gray-200">
              {JSON.stringify(successMetadata.outputData, null, 2)}
            </pre>
          </div>
        </motion.div>
      )}
    </div>
  );
}
