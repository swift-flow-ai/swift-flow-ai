import { api } from "./api";
import { WorkflowFolder } from "../types/collaboration";

interface CreateFolderData {
  name: string;
  description?: string;
  parentId?: string | null;
  color?: string;
  icon?: string;
}

interface UpdateFolderData {
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
}

export const folderService = {
  async getFolders(workspaceId: string): Promise<WorkflowFolder[]> {
    const response = await api.get(`/workspaces/${workspaceId}/folders`);
    return (response.data as { folders: WorkflowFolder[] }).folders;
  },

  async getFolder(
    workspaceId: string,
    folderId: string
  ): Promise<WorkflowFolder> {
    const response = await api.get(
      `/workspaces/${workspaceId}/folders/${folderId}`
    );
    return (response.data as { folder: WorkflowFolder }).folder;
  },

  async createFolder(
    workspaceId: string,
    data: CreateFolderData
  ): Promise<WorkflowFolder> {
    const response = await api.post(`/workspaces/${workspaceId}/folders`, data);
    return (response.data as { folder: WorkflowFolder }).folder;
  },

  async updateFolder(
    workspaceId: string,
    folderId: string,
    data: UpdateFolderData
  ): Promise<WorkflowFolder> {
    const response = await api.patch(
      `/workspaces/${workspaceId}/folders/${folderId}`,
      data
    );
    return (response.data as { folder: WorkflowFolder }).folder;
  },

  async deleteFolder(workspaceId: string, folderId: string): Promise<void> {
    await api.delete(`/workspaces/${workspaceId}/folders/${folderId}`);
  },

  async moveFolder(
    workspaceId: string,
    folderId: string,
    parentId: string | null
  ): Promise<void> {
    await api.post(`/workspaces/${workspaceId}/folders/${folderId}/move`, {
      parentId,
    });
  },

  async moveWorkflow(
    workspaceId: string,
    workflowId: string,
    folderId: string | null
  ): Promise<void> {
    await api.post(`/workspaces/${workspaceId}/workflows/${workflowId}/move`, {
      folderId,
    });
  },
};
