import { Integration, IntegrationApp } from '../../types/workspace';

// Available integration apps
export const mockIntegrationApps: IntegrationApp[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send messages, create channels, and manage your Slack workspace',
    icon: '💬',
    category: 'Communication',
    authType: 'oauth2',
    authConfig: {
      authUrl: 'https://slack.com/oauth/v2/authorize',
      tokenUrl: 'https://slack.com/api/oauth.v2.access',
      scopes: ['chat:write', 'channels:read', 'users:read'],
    },
    capabilities: ['send_message', 'create_channel', 'list_users', 'post_file'],
    documentation: 'https://api.slack.com/docs',
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    description: 'Manage Gmail, Calendar, Drive, and other Google services',
    icon: '🔷',
    category: 'Productivity',
    authType: 'oauth2',
    authConfig: {
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      scopes: ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar'],
    },
    capabilities: ['send_email', 'create_event', 'upload_file', 'create_doc'],
    documentation: 'https://developers.google.com/workspace',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Manage repositories, issues, pull requests, and workflows',
    icon: '🐙',
    category: 'Development',
    authType: 'oauth2',
    authConfig: {
      authUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      scopes: ['repo', 'workflow', 'read:org'],
    },
    capabilities: ['create_issue', 'create_pr', 'trigger_workflow', 'list_repos'],
    documentation: 'https://docs.github.com/en/rest',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Manage leads, contacts, opportunities, and custom objects',
    icon: '☁️',
    category: 'CRM',
    authType: 'oauth2',
    authConfig: {
      authUrl: 'https://login.salesforce.com/services/oauth2/authorize',
      tokenUrl: 'https://login.salesforce.com/services/oauth2/token',
      scopes: ['api', 'refresh_token', 'offline_access'],
    },
    capabilities: ['create_lead', 'update_contact', 'query_records', 'create_opportunity'],
    documentation: 'https://developer.salesforce.com/docs/apis',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Process payments, manage subscriptions, and handle invoices',
    icon: '💳',
    category: 'Payment',
    authType: 'api_key',
    authConfig: {
      requiredFields: [
        {
          key: 'apiKey',
          label: 'API Secret Key',
          type: 'password',
          required: true,
          placeholder: 'sk_live_...',
        },
        {
          key: 'environment',
          label: 'Environment',
          type: 'select',
          required: true,
          options: ['test', 'live'],
        },
      ],
    },
    capabilities: ['create_payment', 'create_subscription', 'create_invoice', 'refund'],
    documentation: 'https://stripe.com/docs/api',
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Send transactional and marketing emails at scale',
    icon: '📧',
    category: 'Email',
    authType: 'api_key',
    authConfig: {
      requiredFields: [
        {
          key: 'apiKey',
          label: 'API Key',
          type: 'password',
          required: true,
          placeholder: 'SG.xxxxx',
        },
      ],
    },
    capabilities: ['send_email', 'send_template', 'manage_contacts', 'track_email'],
    documentation: 'https://docs.sendgrid.com/api-reference',
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'Send SMS, make calls, and manage phone numbers',
    icon: '📱',
    category: 'Communication',
    authType: 'basic',
    authConfig: {
      requiredFields: [
        {
          key: 'accountSid',
          label: 'Account SID',
          type: 'text',
          required: true,
          placeholder: 'ACxxxxx',
        },
        {
          key: 'authToken',
          label: 'Auth Token',
          type: 'password',
          required: true,
          placeholder: 'Your auth token',
        },
      ],
    },
    capabilities: ['send_sms', 'make_call', 'send_whatsapp', 'lookup_number'],
    documentation: 'https://www.twilio.com/docs/usage/api',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Use GPT models for text generation, embeddings, and more',
    icon: '🤖',
    category: 'AI',
    authType: 'api_key',
    authConfig: {
      requiredFields: [
        {
          key: 'apiKey',
          label: 'API Key',
          type: 'password',
          required: true,
          placeholder: 'sk-...',
        },
        {
          key: 'model',
          label: 'Default Model',
          type: 'select',
          required: true,
          options: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
        },
      ],
    },
    capabilities: ['generate_text', 'create_embedding', 'moderate_content', 'analyze_image'],
    documentation: 'https://platform.openai.com/docs/api-reference',
  },
];

// Configured integrations for a workspace
export const mockIntegrations: Integration[] = [
  {
    id: 'int_slack_001',
    name: 'Slack - Engineering',
    appId: 'slack',
    appName: 'Slack',
    appIcon: '💬',
    workspaceId: 'ws_acme',
    status: 'connected',
    authType: 'oauth2',
    config: {
      clientId: 'slack-client-123',
      scopes: ['chat:write', 'channels:read', 'users:read'],
      redirectUri: 'http://localhost:5173/integrations/callback',
    },
    credentials: {
      accessToken: 'xoxb-mock-token-123',
      expiresAt: '2025-12-31T23:59:59Z',
    },
    metadata: {
      connectedBy: 'demo@swiftflow.ai',
      connectedAt: '2024-11-01T10:30:00Z',
      lastTestedAt: '2024-11-08T09:15:00Z',
      lastTestStatus: 'success',
    },
    settings: {
      enabled: true,
      autoRefresh: true,
      notifications: true,
    },
  },
  {
    id: 'int_slack_002',
    name: 'Slack - Sales Team',
    appId: 'slack',
    appName: 'Slack',
    appIcon: '💬',
    workspaceId: 'ws_acme',
    status: 'connected',
    authType: 'oauth2',
    config: {
      clientId: 'slack-client-456',
      scopes: ['chat:write', 'channels:read', 'users:read'],
      redirectUri: 'http://localhost:5173/integrations/callback',
    },
    credentials: {
      accessToken: 'xoxb-mock-token-456',
      expiresAt: '2025-12-31T23:59:59Z',
    },
    metadata: {
      connectedBy: 'demo@swiftflow.ai',
      connectedAt: '2024-10-20T14:15:00Z',
      lastTestedAt: '2024-11-08T10:00:00Z',
      lastTestStatus: 'success',
    },
    settings: {
      enabled: true,
      autoRefresh: true,
      notifications: true,
    },
  },
  {
    id: 'int_google_001',
    name: 'Google Workspace - Main',
    appId: 'google-workspace',
    appName: 'Google Workspace',
    appIcon: '🔷',
    workspaceId: 'ws_acme',
    status: 'connected',
    authType: 'oauth2',
    config: {
      clientId: 'google-client-456',
      scopes: ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar'],
      redirectUri: 'http://localhost:5173/integrations/callback',
    },
    credentials: {
      accessToken: 'ya29.mock-token-456',
      refreshToken: 'refresh-token-456',
      expiresAt: '2025-11-15T14:20:00Z',
    },
    metadata: {
      connectedBy: 'demo@swiftflow.ai',
      connectedAt: '2024-10-15T14:20:00Z',
      lastTestedAt: '2024-11-07T16:45:00Z',
      lastTestStatus: 'success',
    },
    settings: {
      enabled: true,
      autoRefresh: true,
      notifications: false,
    },
  },
  {
    id: 'int_stripe_001',
    name: 'Stripe - Production',
    appId: 'stripe',
    appName: 'Stripe',
    appIcon: '💳',
    workspaceId: 'ws_acme',
    status: 'connected',
    authType: 'api_key',
    config: {
      apiKey: 'sk_live_mock_key_789',
      environment: 'live',
    },
    metadata: {
      connectedBy: 'demo@swiftflow.ai',
      connectedAt: '2024-09-20T11:00:00Z',
      lastTestedAt: '2024-11-08T08:30:00Z',
      lastTestStatus: 'success',
    },
    settings: {
      enabled: true,
      autoRefresh: false,
      notifications: true,
    },
  },
  {
    id: 'int_stripe_002',
    name: 'Stripe - Test',
    appId: 'stripe',
    appName: 'Stripe',
    appIcon: '💳',
    workspaceId: 'ws_acme',
    status: 'connected',
    authType: 'api_key',
    config: {
      apiKey: 'sk_test_mock_key_123',
      environment: 'test',
    },
    metadata: {
      connectedBy: 'demo@swiftflow.ai',
      connectedAt: '2024-09-25T09:30:00Z',
      lastTestedAt: '2024-11-08T08:35:00Z',
      lastTestStatus: 'success',
    },
    settings: {
      enabled: true,
      autoRefresh: false,
      notifications: false,
    },
  },
  {
    id: 'int_github_001',
    name: 'GitHub - Company Org',
    appId: 'github',
    appName: 'GitHub',
    appIcon: '🐙',
    workspaceId: 'ws_acme',
    status: 'error',
    authType: 'oauth2',
    config: {
      clientId: 'github-client-789',
      scopes: ['repo', 'workflow'],
      redirectUri: 'http://localhost:5173/integrations/callback',
    },
    credentials: {
      accessToken: 'ghp_mock_token_expired',
      expiresAt: '2024-10-01T00:00:00Z',
    },
    metadata: {
      connectedBy: 'demo@swiftflow.ai',
      connectedAt: '2024-08-10T09:00:00Z',
      lastTestedAt: '2024-11-05T12:00:00Z',
      lastTestStatus: 'failed',
      lastError: 'Token expired. Please reconnect.',
    },
    settings: {
      enabled: false,
      autoRefresh: true,
      notifications: true,
    },
  },
  {
    id: 'int_sendgrid_001',
    name: 'SendGrid - Marketing',
    appId: 'sendgrid',
    appName: 'SendGrid',
    appIcon: '📧',
    workspaceId: 'ws_acme',
    status: 'connected',
    authType: 'api_key',
    config: {
      apiKey: 'SG.mock_key_abc123',
    },
    metadata: {
      connectedBy: 'demo@swiftflow.ai',
      connectedAt: '2024-09-10T13:20:00Z',
      lastTestedAt: '2024-11-08T07:45:00Z',
      lastTestStatus: 'success',
    },
    settings: {
      enabled: true,
      autoRefresh: false,
      notifications: true,
    },
  },
  {
    id: 'int_openai_001',
    name: 'OpenAI - GPT-4',
    appId: 'openai',
    appName: 'OpenAI',
    appIcon: '🤖',
    workspaceId: 'ws_acme',
    status: 'connected',
    authType: 'api_key',
    config: {
      apiKey: 'sk-mock_openai_key_xyz',
      model: 'gpt-4',
    },
    metadata: {
      connectedBy: 'demo@swiftflow.ai',
      connectedAt: '2024-10-05T16:00:00Z',
      lastTestedAt: '2024-11-08T09:00:00Z',
      lastTestStatus: 'success',
    },
    settings: {
      enabled: true,
      autoRefresh: false,
      notifications: true,
    },
  },
];

export function getIntegrations(workspaceId: string): Integration[] {
  return mockIntegrations.filter((i) => i.workspaceId === workspaceId);
}

export function getIntegrationById(integrationId: string): Integration | undefined {
  return mockIntegrations.find((i) => i.id === integrationId);
}

export function getIntegrationApps(): IntegrationApp[] {
  return mockIntegrationApps;
}

export function getIntegrationAppById(appId: string): IntegrationApp | undefined {
  return mockIntegrationApps.find((app) => app.id === appId);
}

