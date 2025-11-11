// Workspace types
export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  color?: string; // Workspace theme color (hex code)
  role: 'owner' | 'admin' | 'member' | 'viewer' | 'guest';
  memberCount: number;
  activeWorkflows: number;
  pendingApprovals: number;
  unreadNotifications: number;
  lastActiveAt: string;
  createdAt: string;
  members?: TeamMember[];
}

export interface WorkspaceDashboard {
  stats: {
    activeWorkflows: number;
    pendingApprovals: number;
    runningExecutions: number;
    tasksCompletedToday: number;
  };
  recentActivity: Activity[];
  myTasks: Task[];
}

export interface Activity {
  id: string;
  type: 'workflow_completed' | 'workflow_failed' | 'approval_needed' | 'member_joined' | 'workflow_created';
  title: string;
  description?: string;
  workflow?: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
}

export interface Task {
  id: string;
  type: 'approval' | 'review' | 'manual_task';
  title: string;
  description?: string;
  workflow: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueAt?: string;
  createdAt: string;
}

// Workflow types
export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused' | 'archived';
  category: 'hr' | 'sales' | 'support' | 'operations' | 'finance' | 'custom';
  version: number;
  folderId?: string | null;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  stats: {
    totalRuns: number;
    successRate: number;
    avgDuration: string;
    lastRun?: string;
  };
  definition?: WorkflowDefinition;
  createdAt: string;
  updatedAt: string;
  commentCount?: number;
  shares?: Array<{ id: string }>;
}

export interface WorkflowDefinition {
  nodes: Record<string, unknown>[]; // ReactFlow Node[]
  edges: Record<string, unknown>[]; // ReactFlow Edge[]
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'ai_agent' | 'human_task' | 'logic' | 'integration' | 'mcp' | 'data_op' | 'action' | 'smart_routing';
  subtype: string;
  position: { x: number; y: number };
  config: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  status: 'queued' | 'running' | 'waiting' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  currentNode?: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: {
    message: string;
    nodeId?: string;
    timestamp: string;
  };
  trace?: ExecutionTrace[];
  startedAt: string;
  completedAt?: string;
  estimatedCompletion?: string;
  duration?: string;
  triggeredBy: {
    type: 'manual' | 'webhook' | 'schedule' | 'api';
    user?: { id: string; name: string };
  };
}

export interface ExecutionTrace {
  nodeId: string;
  nodeName: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: string;
  logs?: ExecutionLog[];
}

export interface ExecutionLog {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  metadata?: Record<string, unknown>;
}

// Approval types
export interface Approval {
  id: string;
  workflowName: string;
  executionId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  data: Record<string, unknown>;
  aiRecommendation?: {
    decision: 'approve' | 'reject';
    confidence: number;
    reasoning: string;
    similarCases?: number;
  };
  sla: {
    dueAt: string;
    remainingTime: string;
    breached: boolean;
  };
  submittedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  assignedTo: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  createdAt: string;
  decidedAt?: string;
  decidedBy?: {
    id: string;
    name: string;
  };
}

// Integration types
export interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'crm' | 'communication' | 'payment' | 'database' | 'ai' | 'mcp' | 'utilities';
  icon: string;
  rating: number;
  installs: number;
  featured: boolean;
  pricing: 'free' | 'paid' | 'freemium';
  capabilities: string[];
  authType: 'oauth2' | 'api_key' | 'basic' | 'custom';
}

export interface InstalledIntegration {
  id: string;
  integrationId: string;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, unknown>;
  usage: {
    callsThisMonth: number;
    lastUsed?: string;
  };
  installedAt: string;
  installedBy: {
    id: string;
    name: string;
  };
}

// Integration types
export interface Integration {
  id: string;
  name: string; // Custom name for this integration instance (e.g., "Slack 1", "Production Stripe")
  appId: string;
  appName: string;
  appIcon?: string;
  workspaceId: string;
  status: 'connected' | 'disconnected' | 'error' | 'configuring';
  authType: 'oauth2' | 'api_key' | 'basic' | 'custom';
  config: {
    clientId?: string;
    scopes?: string[];
    redirectUri?: string;
    apiKey?: string;
    apiUrl?: string;
    [key: string]: unknown;
  };
  credentials?: {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string;
    [key: string]: unknown;
  };
  metadata: {
    connectedBy: string;
    connectedAt: string;
    lastTestedAt?: string;
    lastTestStatus?: 'success' | 'failed';
    lastError?: string;
  };
  settings: {
    enabled: boolean;
    autoRefresh: boolean;
    notifications: boolean;
    [key: string]: unknown;
  };
}

export interface IntegrationApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  authType: 'oauth2' | 'api_key' | 'basic' | 'custom';
  authConfig: {
    authUrl?: string;
    tokenUrl?: string;
    scopes?: string[];
    requiredFields?: Array<{
      key: string;
      label: string;
      type: 'text' | 'password' | 'url' | 'select';
      required: boolean;
      placeholder?: string;
      options?: string[];
    }>;
  };
  capabilities: string[];
  documentation?: string;
}

export interface ConnectionTestResult {
  success: boolean;
  message: string;
  details?: {
    latency?: number;
    apiVersion?: string;
    accountInfo?: Record<string, unknown>;
  };
  error?: string;
}

// Template types
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'hr' | 'sales' | 'support' | 'operations' | 'finance' | 'custom';
  icon?: string;
  thumbnail?: string;
  featured: boolean;
  verified: boolean;
  usageCount: number;
  rating: number;
  definition: WorkflowDefinition;
  variables: Array<{
    key: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'select';
    required: boolean;
    defaultValue?: string;
    options?: string[];
  }>;
  createdBy: {
    id: string;
    name: string;
    type: 'system' | 'user' | 'community';
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Audit Log types
export interface AuditLog {
  id: string;
  workspaceId: string;
  timestamp: string;
  action: string;
  category: 'workflow' | 'user' | 'integration' | 'settings' | 'security' | 'data';
  actor: {
    id: string;
    name: string;
    email: string;
    ipAddress?: string;
  };
  resource: {
    type: string;
    id: string;
    name: string;
  };
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: {
    userAgent?: string;
    location?: string;
    duration?: number;
    [key: string]: unknown;
  };
  severity: 'info' | 'warning' | 'critical';
  status: 'success' | 'failed';
}

export interface AuditLogFilters {
  category?: string;
  action?: string;
  actorId?: string;
  resourceType?: string;
  severity?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

// Analytics types
export interface WorkspaceAnalytics {
  period: string;
  metrics: {
    totalExecutions: number;
    successRate: number;
    avgDuration: string;
    totalCost: number;
    timeSaved: string;
    roi: number;
  };
  trends: {
    executionsChange: number;
    successRateChange: number;
    costChange: number;
  };
  executionTimeline: Array<{
    date: string;
    executions: number;
    successful: number;
    failed: number;
    cost: number;
  }>;
  successRateTimeline: Array<{
    date: string;
    rate: number;
  }>;
  costTimeline: Array<{
    date: string;
    cost: number;
  }>;
  topWorkflows: Array<{
    id: string;
    name: string;
    executions: number;
    successRate: number;
    avgDuration: string;
    cost: number;
  }>;
  bottlenecks: Array<{
    workflowId: string;
    workflowName: string;
    nodeId: string;
    nodeName: string;
    avgDelay: string;
    impact: 'high' | 'medium' | 'low';
    recommendation: string;
  }>;
  integrationMetrics?: Array<{
    integrationId: string;
    name: string;
    calls: number;
    cost: number;
    avgLatency: string;
    successRate: number;
  }>;
}

export interface WorkflowAnalytics {
  workflowId: string;
  period: string;
  overview: {
    totalExecutions: number;
    avgDuration: string;
    successRate: number;
    costPerRun: number;
    timeSaved: string;
  };
  timeline: Array<{
    date: string;
    executions: number;
    successful: number;
    failed: number;
    avgDuration: string;
  }>;
  bottlenecks: Array<{
    nodeId: string;
    nodeName: string;
    avgDelay: string;
    slaBreachRate: number;
    recommendation: string;
  }>;
  nodePerformance: Array<{
    nodeId: string;
    nodeName: string;
    avgTime: number;
    successRate: number;
    status: 'healthy' | 'warning' | 'critical';
  }>;
  aiRecommendations: Array<{
    type: 'cost_optimization' | 'speed_improvement' | 'quality_enhancement';
    title: string;
    impact: string;
    confidence: number;
  }>;
}

// Notification types
export interface Notification {
  id: string;
  type: 'approval' | 'mention' | 'workflow_complete' | 'workflow_failed' | 'error' | 'system';
  title: string;
  message: string;
  workspace: {
    id: string;
    name: string;
  };
  data?: Record<string, unknown>;
  priority: 'low' | 'medium' | 'high' | 'critical';
  read: boolean;
  createdAt: string;
}

// Team types
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer' | 'guest';
  status: 'active' | 'invited' | 'inactive';
  stats: {
    workflowsCreated: number;
    approvalsHandled: number;
    avgApprovalTime: string;
  };
  joinedAt: string;
  lastActiveAt: string;
  poolIds?: string[]; // Pools this member belongs to
}

// Team Pool types (groups for specific work)
export interface TeamPool {
  id: string;
  name: string;
  description: string;
  type: 'functional' | 'approval' | 'project' | 'custom';
  color?: string;
  icon?: string;
  memberIds: string[];
  members?: TeamMember[];
  settings: {
    autoAssignment: boolean;
    roundRobin: boolean;
    loadBalancing: boolean;
    notifyOnAssignment: boolean;
  };
  stats: {
    activeMembers: number;
    totalAssignments: number;
    avgResponseTime: string;
    currentLoad: number;
  };
  createdBy: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

