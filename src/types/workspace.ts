// Workspace types
import { Role } from "./rbac";

// Enums for type-safe string literals
export enum WorkflowRunStatus {
  Success = "success",
  Failure = "failure",
  Running = "running",
  Waiting = "waiting",
}

export enum PendingItemType {
  Approval = "approval",
  Review = "review",
  Error = "error",
  ActionRequired = "action_required",
}

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}

export enum ActivityType {
  WorkflowCompleted = "workflow_completed",
  WorkflowFailed = "workflow_failed",
  ApprovalNeeded = "approval_needed",
  MemberJoined = "member_joined",
  WorkflowCreated = "workflow_created",
}

export enum WorkflowStatus {
  Active = "active",
  Draft = "draft",
  Paused = "paused",
  Archived = "archived",
}

export enum WorkflowCategory {
  HR = "hr",
  Sales = "sales",
  Support = "support",
  Operations = "operations",
  Finance = "finance",
  Custom = "custom",
}

export enum ExecutionStatus {
  Queued = "queued",
  Running = "running",
  Waiting = "waiting",
  Completed = "completed",
  Failed = "failed",
  Cancelled = "cancelled",
}

export enum TriggerType {
  Manual = "manual",
  Webhook = "webhook",
  Schedule = "schedule",
  Api = "api",
}

export enum TraceStatus {
  Pending = "pending",
  Running = "running",
  Completed = "completed",
  Failed = "failed",
  Skipped = "skipped",
}

export enum LogLevel {
  Info = "info",
  Warn = "warn",
  Error = "error",
  Debug = "debug",
}

export enum ApprovalStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Expired = "expired",
}

export enum ApprovalDecision {
  Approve = "approve",
  Reject = "reject",
}

export enum IntegrationCategory {
  CRM = "crm",
  Communication = "communication",
  Payment = "payment",
  Database = "database",
  AI = "ai",
  MCP = "mcp",
  Utilities = "utilities",
}

export enum PricingModel {
  Free = "free",
  Paid = "paid",
  Freemium = "freemium",
}

export enum AuthType {
  OAuth2 = "oauth2",
  ApiKey = "api_key",
  Basic = "basic",
  Custom = "custom",
}

export enum IntegrationStatus {
  Connected = "connected",
  Disconnected = "disconnected",
  Error = "error",
  Configuring = "configuring",
}

export enum TestStatus {
  Success = "success",
  Failed = "failed",
}

export enum FieldType {
  Text = "text",
  Password = "password",
  Url = "url",
  Select = "select",
  Number = "number",
  Email = "email",
}

export enum TemplateCreatorType {
  System = "system",
  User = "user",
  Community = "community",
}

export enum ImpactLevel {
  High = "high",
  Medium = "medium",
  Low = "low",
}

export enum NodeHealthStatus {
  Healthy = "healthy",
  Warning = "warning",
  Critical = "critical",
}

export enum WorkflowNodeType {
  Trigger = "trigger",
  AIAgent = "ai_agent",
  HumanTask = "human_task",
  Logic = "logic",
  Integration = "integration",
  MCP = "mcp",
  DataOp = "data_op",
  Action = "action",
  SmartRouting = "smart_routing",
}

export enum RecommendationType {
  CostOptimization = "cost_optimization",
  SpeedImprovement = "speed_improvement",
  QualityEnhancement = "quality_enhancement",
}

export enum NotificationType {
  Approval = "approval",
  Mention = "mention",
  WorkflowComplete = "workflow_complete",
  WorkflowFailed = "workflow_failed",
  Error = "error",
  System = "system",
}

export enum MemberStatus {
  Active = "active",
  Invited = "invited",
  Inactive = "inactive",
}

export enum PoolType {
  Functional = "functional",
  Approval = "approval",
  Project = "project",
  Custom = "custom",
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  color?: string; // Workspace theme color (hex code)
  role: Role;
  memberCount: number;
  activeWorkflows: number;
  pendingApprovals: number;
  unreadNotifications: number;
  lastActiveAt: string;
  createdAt: string;
  members?: TeamMember[];
}

// Home page data structure (inspired by Zapier)
export interface WorkspaceHome {
  // Recent workflow runs/executions (most prominent)
  recentRuns: WorkflowRun[];

  // Quick stats overview
  overview: {
    totalWorkflows: number;
    activeWorkflows: number;
    totalRuns: number;
    successRate: number;
  };

  // Workflow status summary
  workflowStatus: {
    active: number;
    paused: number;
    draft: number;
    error: number;
  };

  // Recent activity feed
  activity: Activity[];

  // Pending items requiring attention
  pendingItems: PendingItem[];
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  workflowName: string;
  status: WorkflowRunStatus;
  startedAt: string;
  completedAt?: string;
  duration?: number; // milliseconds
  triggeredBy?: {
    id: string;
    name: string;
    avatar?: string;
  };
  error?: string;
  taskCount?: number;
  successCount?: number;
  failureCount?: number;
}

export interface PendingItem {
  id: string;
  type: PendingItemType;
  title: string;
  description?: string;
  workflowId?: string;
  workflowName?: string;
  priority: Priority;
  dueAt?: string;
  createdAt: string;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface Activity {
  id: string;
  type: ActivityType;
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

// Workflow types
export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  category: WorkflowCategory;
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
  type: WorkflowNodeType;
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
  status: ExecutionStatus;
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
    type: TriggerType;
    user?: { id: string; name: string };
  };
}

export interface ExecutionTrace {
  nodeId: string;
  nodeName: string;
  status: TraceStatus;
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
  level: LogLevel;
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
  priority: Priority;
  status: ApprovalStatus;
  data: Record<string, unknown>;
  aiRecommendation?: {
    decision: ApprovalDecision;
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
    avatar?: string;
  };
  decisionComment?: string;
}

// Integration types
export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  icon: string;
  rating: number;
  installs: number;
  featured: boolean;
  pricing: PricingModel;
  capabilities: string[];
  authType: AuthType;
}

export interface InstalledIntegration {
  id: string;
  integrationId: string;
  name: string;
  status: IntegrationStatus;
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
  status: IntegrationStatus;
  authType: AuthType;
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
    lastTestStatus?: TestStatus;
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
  category: IntegrationCategory;
  authType: AuthType;
  authConfig: {
    authUrl?: string;
    tokenUrl?: string;
    scopes?: string[];
    requiredFields?: Array<{
      key: string;
      label: string;
      type: FieldType;
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
  category: WorkflowCategory;
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
    type: FieldType;
    required: boolean;
    defaultValue?: string;
    options?: string[];
  }>;
  createdBy: {
    id: string;
    name: string;
    type: TemplateCreatorType;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
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
    impact: ImpactLevel;
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
    status: NodeHealthStatus;
  }>;
  aiRecommendations: Array<{
    type: RecommendationType;
    title: string;
    impact: string;
    confidence: number;
  }>;
}

// Notification types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  workspace: {
    id: string;
    name: string;
  };
  data?: Record<string, unknown>;
  priority: Priority;
  read: boolean;
  createdAt: string;
}

// Team types
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  status: MemberStatus;
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
  type: PoolType;
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
