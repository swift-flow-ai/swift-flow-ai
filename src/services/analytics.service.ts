import { api } from './api';
import { WorkspaceAnalytics, WorkflowAnalytics } from '../types';

export const analyticsService = {
  // Get workspace-level analytics
  async getWorkspaceAnalytics(
    workspaceId: string,
    period: '7d' | '30d' | '90d' | '1y' = '30d'
  ): Promise<WorkspaceAnalytics> {
    const response = await api.get<WorkspaceAnalytics>(
      `/workspaces/${workspaceId}/analytics/overview`,
      { params: { period } }
    );
    return response.data;
  },

  // Get workflow-specific analytics
  async getWorkflowAnalytics(
    workspaceId: string,
    workflowId: string,
    period: '7d' | '30d' | '90d' | '1y' = '30d'
  ): Promise<WorkflowAnalytics> {
    const response = await api.get<WorkflowAnalytics>(
      `/workspaces/${workspaceId}/analytics/workflows/${workflowId}`,
      { params: { period } }
    );
    return response.data;
  },
};

