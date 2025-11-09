import { AuditLog } from '../../types/workspace';

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit_001',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-08T10:30:00Z',
    action: 'created',
    category: 'workflow',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'workflow',
      id: 'wf_onboarding',
      name: 'Employee Onboarding',
    },
    changes: [
      { field: 'status', oldValue: null, newValue: 'draft' },
      { field: 'triggerType', oldValue: null, newValue: 'manual' },
    ],
    metadata: {
      nodeCount: 4,
      edgeCount: 3,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'info',
  },
  {
    id: 'audit_002',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-08T09:45:00Z',
    action: 'connected',
    category: 'integration',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'integration',
      id: 'int_slack_001',
      name: 'Slack - Engineering',
    },
    metadata: {
      appName: 'Slack',
      authType: 'oauth2',
      scopes: ['chat:write', 'channels:read', 'users:read'],
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'info',
  },
  {
    id: 'audit_003',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-08T09:15:00Z',
    action: 'executed',
    category: 'workflow',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'workflow',
      id: 'wf_onboarding',
      name: 'Employee Onboarding',
    },
    metadata: {
      executionId: 'exec_001',
      executionStatus: 'completed',
      duration: 154, // 2 minutes 34 seconds in seconds
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'info',
  },
  {
    id: 'audit_004',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-08T08:30:00Z',
    action: 'updated',
    category: 'workflow',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'workflow',
      id: 'wf_invoice',
      name: 'Invoice Approval',
    },
    changes: [
      { field: 'status', oldValue: 'draft', newValue: 'active' },
      { field: 'approvalThreshold', oldValue: 1000, newValue: 5000 },
    ],
    metadata: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'warning',
  },
  {
    id: 'audit_005',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-08T07:20:00Z',
    action: 'approved',
    category: 'workflow',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'approval',
      id: 'appr_001',
      name: 'Invoice #12345 Approval',
    },
    metadata: {
      amount: 5000,
      currency: 'USD',
      decision: 'approved',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'info',
  },
  {
    id: 'audit_006',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-07T16:45:00Z',
    action: 'deleted',
    category: 'workflow',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'workflow',
      id: 'wf_old_process',
      name: 'Old Process Workflow',
    },
    metadata: {
      reason: 'Deprecated workflow',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'warning',
  },
  {
    id: 'audit_007',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-07T15:30:00Z',
    action: 'invited',
    category: 'user',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'user',
      id: 'usr_new_001',
      name: 'New Team Member',
    },
    metadata: {
      inviteeEmail: 'newmember@swiftflow.ai',
      role: 'editor',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'info',
  },
  {
    id: 'audit_008',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-07T14:15:00Z',
    action: 'disconnected',
    category: 'integration',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'integration',
      id: 'int_old_slack',
      name: 'Slack - Old Workspace',
    },
    metadata: {
      reason: 'Workspace decommissioned',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'warning',
  },
  {
    id: 'audit_009',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-07T13:00:00Z',
    action: 'updated',
    category: 'settings',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'workspace',
      id: 'ws_acme',
      name: 'Acme Corp',
    },
    changes: [
      { field: 'timezone', oldValue: 'UTC', newValue: 'America/New_York' },
      { field: 'workingHours', oldValue: '9-17', newValue: '8-18' },
    ],
    metadata: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'info',
  },
  {
    id: 'audit_010',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-06T18:20:00Z',
    action: 'failed',
    category: 'security',
    actor: {
      id: 'unknown',
      name: 'Unknown User',
      email: 'unknown@example.com',
      ipAddress: '203.0.113.42',
    },
    resource: {
      type: 'workspace',
      id: 'ws_acme',
      name: 'Acme Corp',
    },
    metadata: {
      reason: 'Invalid credentials',
      attemptCount: 3,
      userAgent: 'Mozilla/5.0',
    },
    status: 'failed',
    severity: 'critical',
  },
  {
    id: 'audit_011',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-06T17:00:00Z',
    action: 'exported',
    category: 'data',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'workflow',
      id: 'wf_onboarding',
      name: 'Employee Onboarding',
    },
    metadata: {
      format: 'json',
      recordCount: 150,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'info',
  },
  {
    id: 'audit_012',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-06T16:45:00Z',
    action: 'updated',
    category: 'user',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'user',
      id: 'usr_002',
      name: 'Team Member',
    },
    changes: [
      { field: 'role', oldValue: 'viewer', newValue: 'editor' },
    ],
    metadata: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    status: 'success',
    severity: 'warning',
  },
];

interface AuditLogFilters {
  action?: string;
  userId?: string;
  resourceType?: string;
  resourceId?: string;
  severity?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export function getAuditLogs(workspaceId: string, filters?: AuditLogFilters): AuditLog[] {
  let logs = mockAuditLogs.filter((log) => log.workspaceId === workspaceId);

  if (filters?.userId) {
    logs = logs.filter((log) => log.actor.id === filters.userId);
  }

  if (filters?.action) {
    logs = logs.filter((log) => log.action === filters.action);
  }

  if (filters?.resourceType) {
    logs = logs.filter((log) => log.resource.type === filters.resourceType);
  }

  if (filters?.severity) {
    logs = logs.filter((log) => log.severity === filters.severity);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    logs = logs.filter(
      (log) =>
        log.action.toLowerCase().includes(searchLower) ||
        log.resource.name.toLowerCase().includes(searchLower) ||
        log.actor.name.toLowerCase().includes(searchLower)
    );
  }

  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getAuditLogById(logId: string): AuditLog | undefined {
  return mockAuditLogs.find((log) => log.id === logId);
}
