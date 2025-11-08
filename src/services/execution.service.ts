import { api } from './api';
import { WorkflowExecution } from '../types';

export const executionService = {
  // Get all executions for a workspace
  async getExecutions(
    workspaceId: string,
    params?: {
      workflowId?: string;
      status?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{ executions: WorkflowExecution[]; total: number }> {
    const response = await api.get<{ executions: WorkflowExecution[]; total: number }>(
      `/workspaces/${workspaceId}/executions`,
      { params }
    );
    return response.data;
  },

  // Get single execution with full trace
  async getExecution(workspaceId: string, executionId: string): Promise<WorkflowExecution> {
    const response = await api.get<WorkflowExecution>(
      `/workspaces/${workspaceId}/executions/${executionId}`
    );
    return response.data;
  },

  // Cancel running execution
  async cancelExecution(workspaceId: string, executionId: string): Promise<WorkflowExecution> {
    const response = await api.post<WorkflowExecution>(
      `/workspaces/${workspaceId}/executions/${executionId}/cancel`
    );
    return response.data;
  },

  // Retry failed execution
  async retryExecution(workspaceId: string, executionId: string): Promise<{ newExecutionId: string }> {
    const response = await api.post<{ newExecutionId: string }>(
      `/workspaces/${workspaceId}/executions/${executionId}/retry`
    );
    return response.data;
  },

  // Trigger workflow execution
  async executeWorkflow(
    workspaceId: string,
    workflowId: string,
    input: Record<string, unknown>
  ): Promise<{ executionId: string; status: string }> {
    const response = await api.post<{ executionId: string; status: string }>(
      `/workspaces/${workspaceId}/workflows/${workflowId}/execute`,
      { input }
    );
    return response.data;
  },
};

