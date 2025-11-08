import { authHandlers } from './handlers/auth.handlers';
import { workspaceHandlers } from './handlers/workspace.handlers';
import { workflowHandlers } from './handlers/workflow.handlers';
import { approvalHandlers } from './handlers/approval.handlers';
import { workspaceManagementHandlers } from './handlers/workspace-management.handlers';
import { executionHandlers } from './handlers/execution.handlers';
import { analyticsHandlers } from './handlers/analytics.handlers';

// Combine all handlers
export const handlers = [
  ...authHandlers,
  ...workspaceHandlers,
  ...workflowHandlers,
  ...approvalHandlers,
  ...workspaceManagementHandlers,
  ...executionHandlers,
  ...analyticsHandlers,
];

