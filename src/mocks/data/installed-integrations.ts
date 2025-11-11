import { InstalledApp } from '../../services/integration-system.service';

/**
 * Mock installed integrations for workspaces
 * These represent actual connections/accounts that users have set up
 */

export const installedIntegrations: InstalledApp[] = [
  // Workspace: ws_acme (Acme Corp)
  {
    id: 'inst_slack_engineering',
    integrationId: 'slack',
    workspaceId: 'ws_acme',
    name: 'Engineering Slack',
    credentials: {
      access_token: 'xoxb-mock-token-engineering',
      team_id: 'T123456',
      team_name: 'Acme Engineering',
      bot_user_id: 'U789012',
    },
    status: 'active',
    lastUsed: '2025-11-10T10:30:00Z',
    usageCount: 142,
    createdBy: 'usr_admin',
    createdAt: '2025-01-15T09:00:00Z',
    updatedAt: '2025-11-10T10:30:00Z',
  },
  {
    id: 'inst_slack_sales',
    integrationId: 'slack',
    workspaceId: 'ws_acme',
    name: 'Sales Slack',
    credentials: {
      access_token: 'xoxb-mock-token-sales',
      team_id: 'T654321',
      team_name: 'Acme Sales',
      bot_user_id: 'U345678',
    },
    status: 'active',
    lastUsed: '2025-11-09T15:20:00Z',
    usageCount: 87,
    createdBy: 'usr_admin',
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-11-09T15:20:00Z',
  },
  {
    id: 'inst_gmail_hr',
    integrationId: 'gmail',
    workspaceId: 'ws_acme',
    name: 'HR Gmail (hr@acme.com)',
    credentials: {
      access_token: 'ya29.mock-access-token',
      refresh_token: 'mock-refresh-token',
      email: 'hr@acme.com',
    },
    status: 'active',
    lastUsed: '2025-11-10T09:15:00Z',
    usageCount: 234,
    createdBy: 'usr_sarah',
    createdAt: '2025-01-20T11:00:00Z',
    updatedAt: '2025-11-10T09:15:00Z',
  },
  {
    id: 'inst_gmail_support',
    integrationId: 'gmail',
    workspaceId: 'ws_acme',
    name: 'Support Gmail (support@acme.com)',
    credentials: {
      access_token: 'ya29.mock-access-token-support',
      refresh_token: 'mock-refresh-token-support',
      email: 'support@acme.com',
    },
    status: 'active',
    lastUsed: '2025-11-10T11:45:00Z',
    usageCount: 456,
    createdBy: 'usr_john',
    createdAt: '2025-01-25T14:00:00Z',
    updatedAt: '2025-11-10T11:45:00Z',
  },
  {
    id: 'inst_google_calendar_main',
    integrationId: 'google-calendar',
    workspaceId: 'ws_acme',
    name: 'Company Calendar',
    credentials: {
      access_token: 'ya29.mock-calendar-token',
      refresh_token: 'mock-calendar-refresh',
      calendar_id: 'acme.com_calendar@group.calendar.google.com',
    },
    status: 'active',
    lastUsed: '2025-11-10T08:30:00Z',
    usageCount: 189,
    createdBy: 'usr_admin',
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-11-10T08:30:00Z',
  },
  {
    id: 'inst_jira_main',
    integrationId: 'jira',
    workspaceId: 'ws_acme',
    name: 'Acme Jira',
    credentials: {
      access_token: 'mock-jira-token',
      refresh_token: 'mock-jira-refresh',
      cloud_id: 'abc123-def456',
      site_url: 'https://acme.atlassian.net',
    },
    status: 'active',
    lastUsed: '2025-11-10T12:00:00Z',
    usageCount: 312,
    createdBy: 'usr_john',
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-11-10T12:00:00Z',
  },
  {
    id: 'inst_github_main',
    integrationId: 'github',
    workspaceId: 'ws_acme',
    name: 'Acme GitHub',
    credentials: {
      access_token: 'gho_mock_github_token',
      user: 'acme-corp',
      installation_id: '12345678',
    },
    status: 'active',
    lastUsed: '2025-11-10T10:15:00Z',
    usageCount: 278,
    createdBy: 'usr_john',
    createdAt: '2025-01-12T11:00:00Z',
    updatedAt: '2025-11-10T10:15:00Z',
  },
  {
    id: 'inst_calendly_hr',
    integrationId: 'calendly',
    workspaceId: 'ws_acme',
    name: 'HR Calendly',
    credentials: {
      access_token: 'mock-calendly-token',
      organization: 'https://api.calendly.com/organizations/abc123',
      user: 'https://api.calendly.com/users/def456',
    },
    status: 'active',
    lastUsed: '2025-11-09T16:30:00Z',
    usageCount: 45,
    createdBy: 'usr_sarah',
    createdAt: '2025-02-15T10:00:00Z',
    updatedAt: '2025-11-09T16:30:00Z',
  },
  {
    id: 'inst_postgresql_main',
    integrationId: 'postgresql',
    workspaceId: 'ws_acme',
    name: 'Production Database',
    credentials: {
      host: 'db.acme.com',
      port: '5432',
      database: 'acme_prod',
      username: 'workflow_user',
      password: 'encrypted_password_here',
    },
    status: 'active',
    lastUsed: '2025-11-10T11:00:00Z',
    usageCount: 567,
    createdBy: 'usr_admin',
    createdAt: '2025-01-08T09:00:00Z',
    updatedAt: '2025-11-10T11:00:00Z',
  },
  {
    id: 'inst_mongodb_analytics',
    integrationId: 'mongodb',
    workspaceId: 'ws_acme',
    name: 'Analytics MongoDB',
    credentials: {
      connection_string: 'mongodb://analytics.acme.com:27017/analytics',
    },
    status: 'active',
    lastUsed: '2025-11-10T07:45:00Z',
    usageCount: 234,
    createdBy: 'usr_admin',
    createdAt: '2025-01-22T10:00:00Z',
    updatedAt: '2025-11-10T07:45:00Z',
  },
  {
    id: 'inst_openai_main',
    integrationId: 'openai',
    workspaceId: 'ws_acme',
    name: 'OpenAI GPT-4',
    credentials: {
      api_key: 'sk-mock-openai-key',
    },
    status: 'active',
    lastUsed: '2025-11-10T13:20:00Z',
    usageCount: 892,
    createdBy: 'usr_admin',
    createdAt: '2025-01-05T09:00:00Z',
    updatedAt: '2025-11-10T13:20:00Z',
  },
  {
    id: 'inst_anthropic_main',
    integrationId: 'anthropic',
    workspaceId: 'ws_acme',
    name: 'Claude AI',
    credentials: {
      api_key: 'sk-ant-mock-key',
    },
    status: 'active',
    lastUsed: '2025-11-10T12:45:00Z',
    usageCount: 456,
    createdBy: 'usr_admin',
    createdAt: '2025-02-10T10:00:00Z',
    updatedAt: '2025-11-10T12:45:00Z',
  },

  // Utilities (no auth required, workspace-scoped)
  {
    id: 'inst_approval_acme',
    integrationId: 'approval',
    workspaceId: 'ws_acme',
    name: 'Approval System',
    credentials: {},
    status: 'active',
    lastUsed: '2025-11-10T14:00:00Z',
    usageCount: 1234,
    createdBy: 'system',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-10T14:00:00Z',
  },
  {
    id: 'inst_wait_acme',
    integrationId: 'wait',
    workspaceId: 'ws_acme',
    name: 'Wait / Delay',
    credentials: {},
    status: 'active',
    lastUsed: '2025-11-10T13:45:00Z',
    usageCount: 2345,
    createdBy: 'system',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-10T13:45:00Z',
  },

  // Workspace: ws_techstart (TechStart Inc)
  {
    id: 'inst_slack_general_techstart',
    integrationId: 'slack',
    workspaceId: 'ws_techstart',
    name: 'TechStart Slack',
    credentials: {
      access_token: 'xoxb-mock-token-techstart',
      team_id: 'T999888',
      team_name: 'TechStart Inc',
      bot_user_id: 'U111222',
    },
    status: 'active',
    lastUsed: '2025-11-10T09:00:00Z',
    usageCount: 67,
    createdBy: 'usr_mike',
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-11-10T09:00:00Z',
  },
  {
    id: 'inst_gmail_techstart',
    integrationId: 'gmail',
    workspaceId: 'ws_techstart',
    name: 'Main Gmail',
    credentials: {
      access_token: 'ya29.mock-techstart-token',
      refresh_token: 'mock-techstart-refresh',
      email: 'contact@techstart.io',
    },
    status: 'active',
    lastUsed: '2025-11-10T10:30:00Z',
    usageCount: 123,
    createdBy: 'usr_mike',
    createdAt: '2025-03-05T11:00:00Z',
    updatedAt: '2025-11-10T10:30:00Z',
  },
  {
    id: 'inst_github_techstart',
    integrationId: 'github',
    workspaceId: 'ws_techstart',
    name: 'TechStart GitHub',
    credentials: {
      access_token: 'gho_mock_techstart_token',
      user: 'techstart-io',
      installation_id: '87654321',
    },
    status: 'active',
    lastUsed: '2025-11-10T11:15:00Z',
    usageCount: 189,
    createdBy: 'usr_mike',
    createdAt: '2025-03-02T09:00:00Z',
    updatedAt: '2025-11-10T11:15:00Z',
  },
  {
    id: 'inst_openai_techstart',
    integrationId: 'openai',
    workspaceId: 'ws_techstart',
    name: 'OpenAI',
    credentials: {
      api_key: 'sk-mock-techstart-openai',
    },
    status: 'active',
    lastUsed: '2025-11-10T12:00:00Z',
    usageCount: 345,
    createdBy: 'usr_mike',
    createdAt: '2025-03-10T10:00:00Z',
    updatedAt: '2025-11-10T12:00:00Z',
  },

  // Workspace: ws_globalcorp (GlobalCorp)
  {
    id: 'inst_slack_globalcorp',
    integrationId: 'slack',
    workspaceId: 'ws_globalcorp',
    name: 'GlobalCorp Slack',
    credentials: {
      access_token: 'xoxb-mock-token-globalcorp',
      team_id: 'T777666',
      team_name: 'GlobalCorp',
      bot_user_id: 'U333444',
    },
    status: 'active',
    lastUsed: '2025-11-10T08:45:00Z',
    usageCount: 234,
    createdBy: 'usr_emma',
    createdAt: '2025-02-20T10:00:00Z',
    updatedAt: '2025-11-10T08:45:00Z',
  },
  {
    id: 'inst_gmail_globalcorp',
    integrationId: 'gmail',
    workspaceId: 'ws_globalcorp',
    name: 'Operations Gmail',
    credentials: {
      access_token: 'ya29.mock-globalcorp-token',
      refresh_token: 'mock-globalcorp-refresh',
      email: 'ops@globalcorp.com',
    },
    status: 'active',
    lastUsed: '2025-11-10T09:30:00Z',
    usageCount: 456,
    createdBy: 'usr_emma',
    createdAt: '2025-02-22T11:00:00Z',
    updatedAt: '2025-11-10T09:30:00Z',
  },
  {
    id: 'inst_jira_globalcorp',
    integrationId: 'jira',
    workspaceId: 'ws_globalcorp',
    name: 'GlobalCorp Jira',
    credentials: {
      access_token: 'mock-globalcorp-jira-token',
      refresh_token: 'mock-globalcorp-jira-refresh',
      cloud_id: 'xyz789-uvw456',
      site_url: 'https://globalcorp.atlassian.net',
    },
    status: 'active',
    lastUsed: '2025-11-10T10:45:00Z',
    usageCount: 567,
    createdBy: 'usr_emma',
    createdAt: '2025-02-25T09:00:00Z',
    updatedAt: '2025-11-10T10:45:00Z',
  },
  {
    id: 'inst_postgresql_globalcorp',
    integrationId: 'postgresql',
    workspaceId: 'ws_globalcorp',
    name: 'Main Database',
    credentials: {
      host: 'db.globalcorp.com',
      port: '5432',
      database: 'globalcorp_main',
      username: 'workflow_app',
      password: 'encrypted_password_globalcorp',
    },
    status: 'active',
    lastUsed: '2025-11-10T11:30:00Z',
    usageCount: 789,
    createdBy: 'usr_emma',
    createdAt: '2025-02-18T10:00:00Z',
    updatedAt: '2025-11-10T11:30:00Z',
  },
];

// Helper functions
export function getInstalledIntegrationsByWorkspace(workspaceId: string): InstalledApp[] {
  return installedIntegrations.filter((inst) => inst.workspaceId === workspaceId);
}

export function getInstalledIntegrationById(id: string): InstalledApp | undefined {
  return installedIntegrations.find((inst) => inst.id === id);
}

export function getInstalledIntegrationsByIntegrationId(
  workspaceId: string,
  integrationId: string
): InstalledApp[] {
  return installedIntegrations.filter(
    (inst) => inst.workspaceId === workspaceId && inst.integrationId === integrationId
  );
}

// Get installed integration count by workspace
export function getInstalledIntegrationCount(workspaceId: string): number {
  return installedIntegrations.filter((inst) => inst.workspaceId === workspaceId).length;
}

// Check if integration is installed in workspace
export function isIntegrationInstalled(workspaceId: string, integrationId: string): boolean {
  return installedIntegrations.some(
    (inst) => inst.workspaceId === workspaceId && inst.integrationId === integrationId
  );
}

