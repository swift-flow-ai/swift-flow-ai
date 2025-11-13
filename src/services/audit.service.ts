import { api } from './api';
import { AuditLog, AuditLogFilters } from '../types';

export const auditService = {
  // Get audit logs for a workspace
  async getAuditLogs(
    workspaceId: string,
    filters?: AuditLogFilters & { page?: number; limit?: number }
  ): Promise<{ logs: AuditLog[]; total: number }> {
    const response = await api.get<{ logs: AuditLog[]; total: number }>(
      `/workspaces/${workspaceId}/audit-logs`,
      { params: filters }
    );
    return response.data;
  },

  // Get single audit log
  async getAuditLog(workspaceId: string, logId: string): Promise<AuditLog> {
    const response = await api.get<AuditLog>(
      `/workspaces/${workspaceId}/audit-logs/${logId}`
    );
    return response.data;
  },

  // Export audit logs (for compliance)
  async exportAuditLogs(
    workspaceId: string,
    filters?: AuditLogFilters,
    format: 'csv' | 'json' | 'pdf' = 'csv'
  ): Promise<Blob> {
    const response = await api.get(
      `/workspaces/${workspaceId}/audit-logs/export`,
      {
        params: { ...filters, format },
        responseType: 'blob',
      }
    );
    return response.data as Blob;
  },

  // Get audit log statistics
  async getAuditStats(
    workspaceId: string,
    filters?: AuditLogFilters
  ): Promise<{
    totalLogs: number;
    byAction: Record<string, number>;
    byResourceType: Record<string, number>;
    bySeverity: Record<string, number>;
    byUser: Array<{ userId: string; userName: string; count: number }>;
  }> {
    const response = await api.get(
      `/workspaces/${workspaceId}/audit-logs/stats`,
      { params: filters }
    );
    return response.data as {
      totalLogs: number;
      byAction: Record<string, number>;
      byResourceType: Record<string, number>;
      bySeverity: Record<string, number>;
      byUser: Array<{ userId: string; userName: string; count: number }>;
    };
  },
};
