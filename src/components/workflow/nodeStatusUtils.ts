export type NodeStatus =
  | 'configured'
  | 'unconfigured'
  | 'error'
  | 'warning'
  | 'testing'
  | 'skipped';

// Helper function to determine node status
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

