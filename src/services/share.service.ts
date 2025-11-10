import { api } from "./api";
import {
  WorkflowShare,
  ShareLink,
  SharePermission,
} from "../types/collaboration";

interface ShareWorkflowData {
  userId: string;
  permission: SharePermission;
}

interface GenerateShareLinkData {
  permission: SharePermission;
  expiresAt?: string;
}

export const shareService = {
  async getWorkflowShares(
    workspaceId: string,
    workflowId: string
  ): Promise<WorkflowShare[]> {
    const response = await api.get(
      `/workspaces/${workspaceId}/workflows/${workflowId}/shares`
    );
    return (response.data as { shares: WorkflowShare[] }).shares;
  },

  async shareWorkflow(
    workspaceId: string,
    workflowId: string,
    data: ShareWorkflowData
  ): Promise<WorkflowShare> {
    const response = await api.post(
      `/workspaces/${workspaceId}/workflows/${workflowId}/shares`,
      data
    );
    return (response.data as { share: WorkflowShare }).share;
  },

  async updateShare(
    workspaceId: string,
    workflowId: string,
    shareId: string,
    permission: SharePermission
  ): Promise<WorkflowShare> {
    const response = await api.patch(
      `/workspaces/${workspaceId}/workflows/${workflowId}/shares/${shareId}`,
      { permission }
    );
    return (response.data as { share: WorkflowShare }).share;
  },

  async removeShare(
    workspaceId: string,
    workflowId: string,
    shareId: string
  ): Promise<void> {
    await api.delete(
      `/workspaces/${workspaceId}/workflows/${workflowId}/shares/${shareId}`
    );
  },

  async generateShareLink(
    workspaceId: string,
    workflowId: string,
    data: GenerateShareLinkData
  ): Promise<ShareLink> {
    const response = await api.post(
      `/workspaces/${workspaceId}/workflows/${workflowId}/share-links`,
      data
    );
    return (response.data as { link: ShareLink }).link;
  },

  async getShareLinks(
    workspaceId: string,
    workflowId: string
  ): Promise<ShareLink[]> {
    const response = await api.get(
      `/workspaces/${workspaceId}/workflows/${workflowId}/share-links`
    );
    return (response.data as { links: ShareLink[] }).links;
  },

  async revokeShareLink(
    workspaceId: string,
    workflowId: string,
    linkId: string
  ): Promise<void> {
    await api.delete(
      `/workspaces/${workspaceId}/workflows/${workflowId}/share-links/${linkId}`
    );
  },
};
