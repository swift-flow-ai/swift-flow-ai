import { api } from './api';
import { WorkflowTemplate } from '../types';

export const templateService = {
  // Get all templates
  async getTemplates(params?: {
    category?: string;
    featured?: boolean;
    search?: string;
  }): Promise<{ templates: WorkflowTemplate[]; total: number }> {
    const response = await api.get<{ templates: WorkflowTemplate[]; total: number }>(
      '/templates',
      { params }
    );
    return response.data;
  },

  // Get single template
  async getTemplate(templateId: string): Promise<WorkflowTemplate> {
    const response = await api.get<WorkflowTemplate>(`/templates/${templateId}`);
    return response.data;
  },

  // Create workflow from template
  async useTemplate(
    workspaceId: string,
    templateId: string,
    data: {
      name: string;
      variables: Record<string, string>;
    }
  ): Promise<{ workflowId: string }> {
    const response = await api.post<{ workflowId: string }>(
      `/workspaces/${workspaceId}/workflows/from-template/${templateId}`,
      data
    );
    return response.data;
  },

  // Save workflow as template
  async saveAsTemplate(
    workspaceId: string,
    workflowId: string,
    data: {
      name: string;
      description: string;
      category: string;
      tags: string[];
      isPublic: boolean;
    }
  ): Promise<{ templateId: string }> {
    const response = await api.post<{ templateId: string }>(
      `/workspaces/${workspaceId}/workflows/${workflowId}/save-as-template`,
      data
    );
    return response.data;
  },
};

