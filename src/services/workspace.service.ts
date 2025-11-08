import { api } from './api';
import { Workspace, WorkspaceDashboard } from '../types/workspace';

export const workspaceService = {
  async getWorkspaces(): Promise<Workspace[]> {
    const response = await api.get<{ workspaces: Workspace[] }>('/workspaces');
    return response.data.workspaces;
  },

  async getWorkspace(workspaceId: string): Promise<Workspace> {
    const response = await api.get<Workspace>(`/workspaces/${workspaceId}`);
    return response.data;
  },

  async getDashboard(workspaceId: string): Promise<WorkspaceDashboard> {
    const response = await api.get<WorkspaceDashboard>(`/workspaces/${workspaceId}/dashboard`);
    return response.data;
  },

  async createWorkspace(data: { name: string; slug: string; industry?: string }): Promise<Workspace> {
    const response = await api.post<Workspace>('/workspaces', data);
    return response.data;
  },

  async updateWorkspace(workspaceId: string, data: Partial<Workspace>): Promise<Workspace> {
    const response = await api.patch<Workspace>(`/workspaces/${workspaceId}`, data);
    return response.data;
  },
};

