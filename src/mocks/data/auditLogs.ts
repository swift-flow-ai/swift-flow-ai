import { AuditLog } from '../../types/workspace';

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit_001',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'created',
    resourceType: 'workflow',
    resourceId: 'wf_onboarding',
    resourceName: 'Employee Onboarding',
    details: {
      after: {
        name: 'Employee Onboarding',
        status: 'draft',
        triggerType: 'manual',
      },
      metadata: {
        nodeCount: 4,
        edgeCount: 3,
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-08T10:30:00Z',
    severity: 'info',
  },
  {
    id: 'audit_002',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'connected',
    resourceType: 'integration',
    resourceId: 'int_slack_001',
    resourceName: 'Slack - Engineering',
    details: {
      after: {
        appName: 'Slack',
        authType: 'oauth2',
        status: 'connected',
      },
      metadata: {
        scopes: ['chat:write', 'channels:read', 'users:read'],
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-08T09:45:00Z',
    severity: 'info',
  },
  {
    id: 'audit_003',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'executed',
    resourceType: 'workflow',
    resourceId: 'wf_onboarding',
    resourceName: 'Employee Onboarding',
    details: {
      metadata: {
        executionId: 'exec_001',
        status: 'completed',
        duration: '2m 34s',
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-08T09:15:00Z',
    severity: 'info',
  },
  {
    id: 'audit_004',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'updated',
    resourceType: 'workflow',
    resourceId: 'wf_invoice',
    resourceName: 'Invoice Approval',
    details: {
      before: {
        status: 'draft',
        approvalThreshold: 1000,
      },
      after: {
        status: 'active',
        approvalThreshold: 5000,
      },
      changes: [
        {
          field: 'status',
          oldValue: 'draft',
          newValue: 'active',
        },
        {
          field: 'approvalThreshold',
          oldValue: 1000,
          newValue: 5000,
        },
      ],
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-08T08:30:00Z',
    severity: 'warning',
  },
  {
    id: 'audit_005',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'approved',
    resourceType: 'approval',
    resourceId: 'appr_001',
    resourceName: 'Invoice #12345 Approval',
    details: {
      metadata: {
        amount: 5000,
        approver: 'demo@swiftflow.ai',
        comments: 'Approved for payment',
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-08T07:45:00Z',
    severity: 'info',
  },
  {
    id: 'audit_006',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'deleted',
    resourceType: 'workflow',
    resourceId: 'wf_old_001',
    resourceName: 'Old Test Workflow',
    details: {
      before: {
        name: 'Old Test Workflow',
        status: 'draft',
        nodeCount: 2,
      },
      metadata: {
        reason: 'No longer needed',
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-07T16:20:00Z',
    severity: 'critical',
  },
  {
    id: 'audit_007',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'invited',
    resourceType: 'user',
    resourceId: 'user_new_001',
    resourceName: 'john@acme.com',
    details: {
      after: {
        email: 'john@acme.com',
        role: 'member',
      },
      metadata: {
        invitationSent: true,
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-07T15:10:00Z',
    severity: 'info',
  },
  {
    id: 'audit_008',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'settings_changed',
    resourceType: 'workspace',
    resourceId: 'ws_acme',
    resourceName: 'Acme Corp',
    details: {
      before: {
        notificationsEnabled: false,
        retentionDays: 30,
      },
      after: {
        notificationsEnabled: true,
        retentionDays: 90,
      },
      changes: [
        {
          field: 'notificationsEnabled',
          oldValue: false,
          newValue: true,
        },
        {
          field: 'retentionDays',
          oldValue: 30,
          newValue: 90,
        },
      ],
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-07T14:30:00Z',
    severity: 'warning',
  },
  {
    id: 'audit_009',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'disconnected',
    resourceType: 'integration',
    resourceId: 'int_github_001',
    resourceName: 'GitHub - Company Org',
    details: {
      before: {
        status: 'error',
        lastError: 'Token expired',
      },
      metadata: {
        reason: 'Expired credentials',
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-07T13:15:00Z',
    severity: 'warning',
  },
  {
    id: 'audit_010',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'exported',
    resourceType: 'workflow',
    resourceId: 'wf_onboarding',
    resourceName: 'Employee Onboarding',
    details: {
      metadata: {
        format: 'json',
        includeDefinition: true,
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-07T12:00:00Z',
    severity: 'info',
  },
  {
    id: 'audit_011',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'login',
    resourceType: 'user',
    resourceId: '1',
    resourceName: 'Demo User',
    details: {
      metadata: {
        method: 'email',
        success: true,
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-07T09:00:00Z',
    severity: 'info',
  },
  {
    id: 'audit_012',
    workspaceId: 'ws_acme',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@swiftflow.ai',
    action: 'rejected',
    resourceType: 'approval',
    resourceId: 'appr_002',
    resourceName: 'Expense Report #789',
    details: {
      metadata: {
        amount: 15000,
        approver: 'demo@swiftflow.ai',
        comments: 'Amount exceeds policy limit',
        reason: 'Policy violation',
      },
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2024-11-06T16:45:00Z',
    severity: 'warning',
  },
];

export function getAuditLogs(workspaceId: string, filters?: any): AuditLog[] {
  let logs = mockAuditLogs.filter((log) => log.workspaceId === workspaceId);

  if (filters?.userId) {
    logs = logs.filter((log) => log.userId === filters.userId);
  }

  if (filters?.action) {
    logs = logs.filter((log) => log.action === filters.action);
  }

  if (filters?.resourceType) {
    logs = logs.filter((log) => log.resourceType === filters.resourceType);
  }

  if (filters?.severity) {
    logs = logs.filter((log) => log.severity === filters.severity);
  }

  if (filters?.startDate) {
    logs = logs.filter((log) => log.timestamp >= filters.startDate);
  }

  if (filters?.endDate) {
    logs = logs.filter((log) => log.timestamp <= filters.endDate);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    logs = logs.filter(
      (log) =>
        log.resourceName.toLowerCase().includes(searchLower) ||
        log.action.toLowerCase().includes(searchLower) ||
        log.userName.toLowerCase().includes(searchLower)
    );
  }

  // Sort by timestamp descending (newest first)
  logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return logs;
}

export function getAuditLogById(logId: string): AuditLog | undefined {
  return mockAuditLogs.find((log) => log.id === logId);
}

