import { api } from './api';
import { Approval } from '../types/workspace';

export const approvalService = {
  async getApprovals(workspaceId: string, params?: {
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<{ approvals: Approval[]; total: number }> {
    const response = await api.get<{ approvals: Approval[]; total: number }>(`/workspaces/${workspaceId}/approvals`, { params });
    return response.data;
  },

  async getApproval(workspaceId: string, approvalId: string): Promise<Approval> {
    const response = await api.get<Approval>(`/workspaces/${workspaceId}/approvals/${approvalId}`);
    return response.data;
  },

  async decide(workspaceId: string, approvalId: string, decision: 'approve' | 'reject', comment?: string): Promise<void> {
    await api.post(`/workspaces/${workspaceId}/approvals/${approvalId}/decide`, {
      decision,
      comment,
    });
  },

  async delegate(workspaceId: string, approvalId: string, delegateTo: string, reason?: string): Promise<void> {
    await api.post(`/workspaces/${workspaceId}/approvals/${approvalId}/delegate`, {
      delegateTo,
      reason,
    });
  },
};

