import { CheckCircle, AlertCircle, XCircle, Clock, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export type NodeStatus =
  | 'configured'
  | 'unconfigured'
  | 'error'
  | 'warning'
  | 'testing'
  | 'skipped';

interface NodeStatusBadgeProps {
  status: NodeStatus;
  message?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size?: 'sm' | 'md' | 'lg';
}

export function NodeStatusBadge({
  status,
  message,
  position = 'top-right',
  size = 'md',
}: NodeStatusBadgeProps) {
  const statusConfig = {
    configured: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      label: 'Configured',
    },
    unconfigured: {
      icon: AlertCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500',
      label: 'Needs Configuration',
    },
    error: {
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500',
      label: 'Error',
    },
    warning: {
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500',
      label: 'Warning',
    },
    testing: {
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      label: 'Testing...',
    },
    skipped: {
      icon: EyeOff,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500',
      label: 'Skipped',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const positionClasses = {
    'top-right': '-top-2 -right-2',
    'top-left': '-top-2 -left-2',
    'bottom-right': '-bottom-2 -right-2',
    'bottom-left': '-bottom-2 -left-2',
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`absolute ${positionClasses[position]} z-10 group/badge`}
    >
      {/* Badge */}
      <div
        className={`${sizeClasses[size]} rounded-full bg-card border-2 border-card shadow-lg flex items-center justify-center`}
      >
        <Icon className={`${config.color} ${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
      </div>

      {/* Tooltip */}
      {(message || config.label) && (
        <div className="absolute hidden group-hover/badge:block z-20 pointer-events-none">
          <div
            className={`
              mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl whitespace-nowrap
              ${position.includes('right') ? 'right-0' : 'left-0'}
            `}
          >
            <div className="font-semibold">{config.label}</div>
            {message && <div className="text-gray-300 mt-1">{message}</div>}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Helper function to determine node status
// eslint-disable-next-line react-refresh/only-export-components
export function getNodeStatus(node: {
  data: {
    config?: Record<string, unknown>;
    error?: string;
    testResult?: { success: boolean; error?: string };
    skipped?: boolean;
    integrationId?: string;
    actionKey?: string;
  };
  type: string;
}): NodeStatus {
  // Check if skipped
  if (node.data.skipped) {
    return 'skipped';
  }

  // Check if has error
  if (node.data.error) {
    return 'error';
  }

  // Check if has test result with error
  if (node.data.testResult && !node.data.testResult.success) {
    return 'error';
  }

  // Trigger nodes are always configured
  if (node.type === 'trigger') {
    return 'configured';
  }

  // Action nodes need integration and action key
  if (node.type === 'action') {
    if (!node.data.integrationId || !node.data.actionKey) {
      return 'unconfigured';
    }

    // Check if has required config
    const hasConfig = node.data.config && Object.keys(node.data.config).length > 0;
    if (!hasConfig) {
      return 'warning';
    }

    return 'configured';
  }

  // Condition nodes need condition config
  if (node.type === 'condition') {
    const hasCondition = node.data.config && 'condition' in node.data.config;
    return hasCondition ? 'configured' : 'unconfigured';
  }

  // Approval nodes need assignees
  if (node.type === 'approval') {
    const hasAssignees = node.data.config && 'assignees' in node.data.config;
    return hasAssignees ? 'configured' : 'unconfigured';
  }

  return 'configured';
}

