import { http, HttpResponse } from 'msw';
import { getAuditLogs, getAuditLogById } from '../data/auditLogs';
import { config } from '../../config';

const BASE_URL = config.apiBaseUrl;

export const auditHandlers = [
  // GET /workspaces/:workspaceId/audit-logs
  http.get(`${BASE_URL}/workspaces/:workspaceId/audit-logs`, ({ request, params }) => {
    const { workspaceId } = params;
    const url = new URL(request.url);
    
    // Axios sends params as params[key]=value, so we need to check both formats
    const filters = {
      userId: url.searchParams.get('userId') || url.searchParams.get('params[userId]'),
      action: url.searchParams.get('action') || url.searchParams.get('params[action]'),
      resourceType: url.searchParams.get('resourceType') || url.searchParams.get('params[resourceType]'),
      severity: url.searchParams.get('severity') || url.searchParams.get('params[severity]'),
      startDate: url.searchParams.get('startDate') || url.searchParams.get('params[startDate]'),
      endDate: url.searchParams.get('endDate') || url.searchParams.get('params[endDate]'),
      search: url.searchParams.get('search') || url.searchParams.get('params[search]'),
    };

    console.log('🔷 MSW: GET /workspaces/:workspaceId/audit-logs', {
      workspaceId,
      filters,
    });

    const logs = getAuditLogs(workspaceId as string, filters);

    return HttpResponse.json({
      logs,
      total: logs.length,
    });
  }),

  // GET /workspaces/:workspaceId/audit-logs/:logId
  http.get(`${BASE_URL}/workspaces/:workspaceId/audit-logs/:logId`, ({ params }) => {
    const { logId } = params;
    console.log('🔷 MSW: GET /workspaces/:workspaceId/audit-logs/:logId', { logId });

    const log = getAuditLogById(logId as string);

    if (!log) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Audit log not found',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(log);
  }),

  // GET /workspaces/:workspaceId/audit-logs/export
  http.get(`${BASE_URL}/workspaces/:workspaceId/audit-logs/export`, ({ request, params }) => {
    const { workspaceId } = params;
    const url = new URL(request.url);
    const format = url.searchParams.get('format') || 'csv';

    console.log('🔷 MSW: GET /workspaces/:workspaceId/audit-logs/export', {
      workspaceId,
      format,
    });

    const logs = getAuditLogs(workspaceId as string);

    if (format === 'csv') {
      // Generate CSV
      const headers = ['Timestamp', 'User', 'Action', 'Resource Type', 'Resource Name', 'Severity', 'IP Address'];
      const rows = logs.map((log) => [
        log.timestamp,
        log.userName,
        log.action,
        log.resourceType,
        log.resourceName,
        log.severity,
        log.ipAddress || '',
      ]);

      const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });

      return new HttpResponse(blob, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="audit-logs-${Date.now()}.csv"`,
        },
      });
    } else if (format === 'json') {
      const json = JSON.stringify(logs, null, 2);
      const blob = new Blob([json], { type: 'application/json' });

      return new HttpResponse(blob, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="audit-logs-${Date.now()}.json"`,
        },
      });
    }

    // Default to JSON
    return HttpResponse.json(logs);
  }),

  // GET /workspaces/:workspaceId/audit-logs/stats
  http.get(`${BASE_URL}/workspaces/:workspaceId/audit-logs/stats`, ({ request, params }) => {
    const { workspaceId } = params;
    const url = new URL(request.url);
    
    const filters = {
      startDate: url.searchParams.get('startDate'),
      endDate: url.searchParams.get('endDate'),
    };

    console.log('🔷 MSW: GET /workspaces/:workspaceId/audit-logs/stats', {
      workspaceId,
      filters,
    });

    const logs = getAuditLogs(workspaceId as string, filters);

    // Calculate statistics
    const byAction: Record<string, number> = {};
    const byResourceType: Record<string, number> = {};
    const bySeverity: Record<string, number> = {};
    const userCounts: Record<string, { userName: string; userEmail: string; count: number }> = {};

    logs.forEach((log) => {
      // By action
      byAction[log.action] = (byAction[log.action] || 0) + 1;

      // By resource type
      byResourceType[log.resourceType] = (byResourceType[log.resourceType] || 0) + 1;

      // By severity
      bySeverity[log.severity] = (bySeverity[log.severity] || 0) + 1;

      // By user
      if (!userCounts[log.userId]) {
        userCounts[log.userId] = {
          userName: log.userName,
          userEmail: log.userEmail,
          count: 0,
        };
      }
      userCounts[log.userId].count++;
    });

    const byUser = Object.entries(userCounts).map(([userId, data]) => ({
      userId,
      userName: data.userName,
      count: data.count,
    }));

    return HttpResponse.json({
      totalLogs: logs.length,
      byAction,
      byResourceType,
      bySeverity,
      byUser,
    });
  }),
];
