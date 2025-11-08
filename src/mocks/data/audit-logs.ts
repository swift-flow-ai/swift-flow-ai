import { AuditLog } from '../../types/workspace';

export const mockAuditLogs: AuditLog[] = [
  // Workflow actions
  {
    id: 'audit_001',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-08T10:30:00Z',
    action: 'workflow.created',
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
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'San Francisco, CA',
    },
    severity: 'info',
    status: 'success',
  },
  {
    id: 'audit_002',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-08T09:15:00Z',
    action: 'workflow.updated',
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
      {
        field: 'status',
        oldValue: 'draft',
        newValue: 'active',
      },
      {
        field: 'trigger',
        oldValue: 'manual',
        newValue: 'webhook',
      },
    ],
    metadata: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'San Francisco, CA',
    },
    severity: 'info',
    status: 'success',
  },
  {
    id: 'audit_003',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-08T08:45:00Z',
    action: 'workflow.executed',
    category: 'workflow',
    actor: {
      id: 'system',
      name: 'System',
      email: 'system@swiftflow.ai',
    },
    resource: {
      type: 'workflow',
      id: 'wf_onboarding',
      name: 'Employee Onboarding',
    },
    metadata: {
      executionId: 'exec_001',
      duration: 4500,
      status: 'completed',
    },
    severity: 'info',
    status: 'success',
  },
  {
    id: 'audit_004',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-08T07:30:00Z',
    action: 'workflow.deleted',
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
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'San Francisco, CA',
    },
    severity: 'warning',
    status: 'success',
  },

  // User actions
  {
    id: 'audit_005',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-07T16:20:00Z',
    action: 'user.invited',
    category: 'user',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'user',
      id: 'user_new',
      name: 'john.doe@acme.com',
    },
    metadata: {
      role: 'member',
      inviteExpiry: '2024-11-14T16:20:00Z',
    },
    severity: 'info',
    status: 'success',
  },
  {
    id: 'audit_006',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-07T14:10:00Z',
    action: 'user.role_changed',
    category: 'user',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'user',
      id: '3',
      name: 'jane.smith@acme.com',
    },
    changes: [
      {
        field: 'role',
        oldValue: 'member',
        newValue: 'admin',
      },
    ],
    metadata: {
      reason: 'Promoted to team lead',
    },
    severity: 'warning',
    status: 'success',
  },
  {
    id: 'audit_007',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-07T11:00:00Z',
    action: 'user.removed',
    category: 'user',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'user',
      id: 'user_old',
      name: 'old.user@acme.com',
    },
    metadata: {
      reason: 'Left company',
    },
    severity: 'warning',
    status: 'success',
  },

  // Integration actions
  {
    id: 'audit_008',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-06T15:30:00Z',
    action: 'integration.connected',
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
      authType: 'oauth2',
      scopes: ['chat:write', 'channels:read'],
    },
    severity: 'info',
    status: 'success',
  },
  {
    id: 'audit_009',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-06T13:45:00Z',
    action: 'integration.disconnected',
    category: 'integration',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'integration',
      id: 'int_old_service',
      name: 'Old Service Integration',
    },
    metadata: {
      reason: 'Service deprecated',
    },
    severity: 'warning',
    status: 'success',
  },
  {
    id: 'audit_010',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-06T10:00:00Z',
    action: 'integration.credentials_updated',
    category: 'integration',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'integration',
      id: 'int_stripe_001',
      name: 'Stripe - Production',
    },
    metadata: {
      authType: 'api_key',
    },
    severity: 'warning',
    status: 'success',
  },

  // Settings actions
  {
    id: 'audit_011',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-05T16:00:00Z',
    action: 'settings.updated',
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
      {
        field: 'name',
        oldValue: 'Acme Corporation',
        newValue: 'Acme Corp',
      },
      {
        field: 'timezone',
        oldValue: 'UTC',
        newValue: 'America/Los_Angeles',
      },
    ],
    severity: 'info',
    status: 'success',
  },
  {
    id: 'audit_012',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-05T14:30:00Z',
    action: 'settings.security_updated',
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
      {
        field: 'twoFactorRequired',
        oldValue: false,
        newValue: true,
      },
    ],
    severity: 'warning',
    status: 'success',
  },

  // Security actions
  {
    id: 'audit_013',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-05T09:00:00Z',
    action: 'security.login',
    category: 'security',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'session',
      id: 'session_123',
      name: 'User Session',
    },
    metadata: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'San Francisco, CA',
      method: 'password',
    },
    severity: 'info',
    status: 'success',
  },
  {
    id: 'audit_014',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-04T22:15:00Z',
    action: 'security.failed_login',
    category: 'security',
    actor: {
      id: 'unknown',
      name: 'Unknown',
      email: 'attacker@example.com',
      ipAddress: '203.0.113.42',
    },
    resource: {
      type: 'session',
      id: 'failed_attempt',
      name: 'Failed Login Attempt',
    },
    metadata: {
      userAgent: 'curl/7.68.0',
      location: 'Unknown',
      reason: 'Invalid credentials',
      attempts: 3,
    },
    severity: 'critical',
    status: 'failed',
  },
  {
    id: 'audit_015',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-04T18:00:00Z',
    action: 'security.password_changed',
    category: 'security',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'user',
      id: '1',
      name: 'Demo User',
    },
    metadata: {
      method: 'self_service',
    },
    severity: 'warning',
    status: 'success',
  },

  // Data actions
  {
    id: 'audit_016',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-04T15:30:00Z',
    action: 'data.exported',
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
    },
    severity: 'warning',
    status: 'success',
  },
  {
    id: 'audit_017',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-04T12:00:00Z',
    action: 'data.imported',
    category: 'data',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'workflow',
      id: 'wf_bulk_import',
      name: 'Bulk Import Workflow',
    },
    metadata: {
      format: 'csv',
      recordCount: 500,
    },
    severity: 'info',
    status: 'success',
  },
  {
    id: 'audit_018',
    workspaceId: 'ws_acme',
    timestamp: '2024-11-03T16:45:00Z',
    action: 'data.deleted',
    category: 'data',
    actor: {
      id: '1',
      name: 'Demo User',
      email: 'demo@swiftflow.ai',
      ipAddress: '192.168.1.100',
    },
    resource: {
      type: 'execution',
      id: 'exec_old_001',
      name: 'Old Execution Data',
    },
    metadata: {
      reason: 'Data retention policy',
      recordCount: 1000,
    },
    severity: 'warning',
    status: 'success',
  },
];

export function getAuditLogs(
  workspaceId: string,
  filters?: {
    category?: string;
    action?: string;
    actorId?: string;
    severity?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }
): AuditLog[] {
  let logs = mockAuditLogs.filter((log) => log.workspaceId === workspaceId);

  if (filters?.category && filters.category !== 'all') {
    logs = logs.filter((log) => log.category === filters.category);
  }

  if (filters?.severity && filters.severity !== 'all') {
    logs = logs.filter((log) => log.severity === filters.severity);
  }

  if (filters?.actorId) {
    logs = logs.filter((log) => log.actor.id === filters.actorId);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    logs = logs.filter(
      (log) =>
        log.action.toLowerCase().includes(searchLower) ||
        log.actor.name.toLowerCase().includes(searchLower) ||
        log.actor.email.toLowerCase().includes(searchLower) ||
        log.resource.name.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.startDate) {
    logs = logs.filter((log) => log.timestamp >= filters.startDate!);
  }

  if (filters?.endDate) {
    logs = logs.filter((log) => log.timestamp <= filters.endDate!);
  }

  // Sort by timestamp descending (newest first)
  logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return logs;
}

export function getAuditLogById(logId: string): AuditLog | undefined {
  return mockAuditLogs.find((log) => log.id === logId);
}

