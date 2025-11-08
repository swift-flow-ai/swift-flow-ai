import { api } from './api';
import { Workflow, WorkflowExecution } from '../types/workspace';

export const workflowService = {
  async getWorkflows(workspaceId: string, params?: {
    status?: string;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ workflows: Workflow[]; total: number }> {
    const response = await api.get<{ workflows: Workflow[]; total: number }>(`/workspaces/${workspaceId}/workflows`, { params });
    return response.data;
  },

  async getWorkflow(workspaceId: string, workflowId: string): Promise<Workflow> {
    const response = await api.get<Workflow>(`/workspaces/${workspaceId}/workflows/${workflowId}`);
    return response.data;
  },

  async createWorkflow(workspaceId: string, data: Partial<Workflow>): Promise<Workflow> {
    const response = await api.post<Workflow>(`/workspaces/${workspaceId}/workflows`, data);
    return response.data;
  },

  async updateWorkflow(workspaceId: string, workflowId: string, data: Partial<Workflow>): Promise<Workflow> {
    const response = await api.patch<Workflow>(`/workspaces/${workspaceId}/workflows/${workflowId}`, data);
    return response.data;
  },

  async executeWorkflow(workspaceId: string, workflowId: string, input: unknown): Promise<WorkflowExecution> {
    const response = await api.post<WorkflowExecution>(`/workspaces/${workspaceId}/workflows/${workflowId}/execute`, { input });
    return response.data;
  },

  async getExecutions(workspaceId: string, params?: {
    workflowId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ executions: WorkflowExecution[]; total: number }> {
    const response = await api.get<{ executions: WorkflowExecution[]; total: number }>(`/workspaces/${workspaceId}/executions`, { params });
    return response.data;
  },

  async getExecution(workspaceId: string, executionId: string): Promise<WorkflowExecution> {
    const response = await api.get<WorkflowExecution>(`/workspaces/${workspaceId}/executions/${executionId}`);
    return response.data;
  },
};

