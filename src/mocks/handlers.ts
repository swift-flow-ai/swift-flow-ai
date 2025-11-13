import { authHandlers } from "./handlers/auth.handlers";
import { workspaceHandlers } from "./handlers/workspace.handlers";
import { workflowHandlers } from "./handlers/workflow.handlers";
import { approvalHandlers } from "./handlers/approval.handlers";
import { workspaceManagementHandlers } from "./handlers/workspace-management.handlers";
import { executionHandlers } from "./handlers/execution.handlers";
import { analyticsHandlers } from "./handlers/analytics.handlers";
import { templateHandlers } from "./handlers/template.handlers";
import { integrationSystemHandlers } from "./handlers/integration-system.handlers";
import { teamHandlers } from "./handlers/team.handlers";
import { folderHandlers } from "./handlers/folder.handlers";
import { shareHandlers } from "./handlers/share.handlers";
import { inboxHandlers } from "./handlers/inbox.handlers";

// Combine all handlers
// NOTE: Order matters! More specific routes must come before generic ones.
export const handlers = [
  ...authHandlers,
  ...workspaceHandlers,
  ...workflowHandlers,
  ...approvalHandlers,
  ...workspaceManagementHandlers,
  ...executionHandlers,
  ...analyticsHandlers,
  ...templateHandlers,
  ...integrationSystemHandlers,
  ...teamHandlers,
  ...folderHandlers,
  ...shareHandlers,
  ...inboxHandlers,
];
