import { api } from "./api";
import { Approval } from "../types/workspace";

export type InboxItemType =
  | "approval"
  | "task"
  | "notification"
  | "alert"
  | "workflow_error"
  | "workflow_success"
  | "comment"
  | "mention"
  | "assignment"
  | "invitation"
  | "system";

export interface InboxItem {
  id: string;
  type: InboxItemType;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  read: boolean;
  createdAt: string;
  dueAt?: string;
  workflowName?: string;
  workflowId?: string;
  executionId?: string;
  submittedBy?: {
    name: string;
    avatar?: string;
  };
  approval?: Approval;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface InboxQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  filter?: "all" | "unread" | "actionable";
  sortBy?: "newest" | "oldest" | "priority" | "dueDate";
  types?: InboxItemType[];
}

export interface InboxResponse {
  items: InboxItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  stats: {
    total: number;
    unread: number;
    actionable: number;
  };
}

export const inboxService = {
  /**
   * Get paginated inbox items with server-side filtering and sorting
   */
  async getInboxItems(
    workspaceId: string,
    params?: InboxQueryParams
  ): Promise<InboxResponse> {
    const response = await api.get<InboxResponse>(
      `/workspaces/${workspaceId}/inbox`,
      { params }
    );
    return response.data;
  },

  /**
   * Mark item(s) as read
   */
  async markAsRead(workspaceId: string, itemIds: string[]): Promise<void> {
    await api.post(`/workspaces/${workspaceId}/inbox/mark-read`, {
      itemIds,
    });
  },

  /**
   * Mark all as read
   */
  async markAllAsRead(workspaceId: string): Promise<void> {
    await api.post(`/workspaces/${workspaceId}/inbox/mark-all-read`);
  },

  /**
   * Get inbox stats (for badges/counters)
   */
  async getStats(workspaceId: string): Promise<{
    total: number;
    unread: number;
    actionable: number;
  }> {
    const response = await api.get<{
      total: number;
      unread: number;
      actionable: number;
    }>(`/workspaces/${workspaceId}/inbox/stats`);
    return response.data;
  },
};
