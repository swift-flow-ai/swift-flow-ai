import { authHandlers } from './handlers/auth.handlers';
import { workspaceHandlers } from './handlers/workspace.handlers';
import { workflowHandlers } from './handlers/workflow.handlers';
import { approvalHandlers } from './handlers/approval.handlers';
import { workspaceManagementHandlers } from './handlers/workspace-management.handlers';

// Combine all handlers
export const handlers = [
  ...authHandlers,
  ...workspaceHandlers,
  ...workflowHandlers,
  ...approvalHandlers,
  ...workspaceManagementHandlers,
];

