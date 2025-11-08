# FlowAI - Backend API Documentation

## 🎯 Overview

Complete API specification for FlowAI backend services. All endpoints follow RESTful conventions with JSON payloads.

**Base URL:** `https://api.flowai.com/v1`

**Authentication:** Bearer token in Authorization header
```
Authorization: Bearer <access_token>
```

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Workspaces](#workspaces)
3. [Workflows](#workflows)
4. [AI Agents](#ai-agents)
5. [Approvals](#approvals)
6. [Integrations](#integrations)
7. [Analytics](#analytics)
8. [Team Management](#team-management)
9. [Notifications](#notifications)
10. [Executions](#executions)

---

## 🔐 Authentication

### POST /auth/signup
Create a new user account.

**Request:**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "inviteCode": "optional-workspace-invite-code"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "usr_abc123",
    "name": "John Smith",
    "email": "john@example.com",
    "avatar": null,
    "createdAt": "2025-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 3600
}
```

### POST /auth/login
Authenticate user and get access token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "usr_abc123",
    "name": "John Smith",
    "email": "john@example.com",
    "avatar": "https://cdn.flowai.com/avatars/usr_abc123.jpg",
    "workspaces": [
      {
        "id": "ws_xyz789",
        "name": "Acme Corp",
        "role": "admin",
        "slug": "acme-corp",
        "logo": "https://cdn.flowai.com/logos/ws_xyz789.png"
      }
    ]
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 3600
}
```

### POST /auth/refresh
Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "new_access_token",
  "expiresIn": 3600
}
```

### GET /auth/me
Get current authenticated user.

**Response:** `200 OK`
```json
{
  "id": "usr_abc123",
  "name": "John Smith",
  "email": "john@example.com",
  "avatar": "https://cdn.flowai.com/avatars/usr_abc123.jpg",
  "workspaces": [
    {
      "id": "ws_xyz789",
      "name": "Acme Corp",
      "role": "admin",
      "slug": "acme-corp",
      "logo": "https://cdn.flowai.com/logos/ws_xyz789.png",
      "unreadNotifications": 5,
      "pendingApprovals": 3,
      "lastActiveAt": "2025-01-15T14:20:00Z"
    }
  ],
  "preferences": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "inApp": true,
      "slack": false
    }
  }
}
```

### POST /auth/logout
Invalidate current session.

**Response:** `204 No Content`

---

## 🏢 Workspaces

### GET /workspaces
Get all workspaces for current user.

**Response:** `200 OK`
```json
{
  "workspaces": [
    {
      "id": "ws_xyz789",
      "name": "Acme Corp",
      "slug": "acme-corp",
      "logo": "https://cdn.flowai.com/logos/ws_xyz789.png",
      "role": "admin",
      "memberCount": 15,
      "activeWorkflows": 12,
      "pendingApprovals": 3,
      "unreadNotifications": 5,
      "lastActiveAt": "2025-01-15T14:20:00Z",
      "createdAt": "2024-06-01T10:00:00Z"
    }
  ]
}
```

### POST /workspaces
Create a new workspace.

**Request:**
```json
{
  "name": "Acme Corp",
  "slug": "acme-corp",
  "industry": "Technology",
  "description": "Main workspace for Acme Corp operations"
}
```

**Response:** `201 Created`
```json
{
  "id": "ws_xyz789",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "logo": null,
  "role": "admin",
  "memberCount": 1,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

### GET /workspaces/:workspaceId
Get workspace details.

**Response:** `200 OK`
```json
{
  "id": "ws_xyz789",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "logo": "https://cdn.flowai.com/logos/ws_xyz789.png",
  "industry": "Technology",
  "description": "Main workspace",
  "memberCount": 15,
  "plan": "enterprise",
  "stats": {
    "activeWorkflows": 12,
    "totalExecutions": 1524,
    "successRate": 92.3,
    "avgExecutionTime": "4.5m"
  },
  "settings": {
    "timezone": "America/Los_Angeles",
    "defaultNotifications": true,
    "allowedDomains": ["acme.com"]
  },
  "createdAt": "2024-06-01T10:00:00Z",
  "ownerId": "usr_abc123"
}
```

### PATCH /workspaces/:workspaceId
Update workspace settings.

**Request:**
```json
{
  "name": "Acme Corporation",
  "logo": "base64_image_data",
  "settings": {
    "timezone": "UTC",
    "defaultNotifications": false
  }
}
```

**Response:** `200 OK` (returns updated workspace object)

### GET /workspaces/:workspaceId/dashboard
Get dashboard stats and activity.

**Response:** `200 OK`
```json
{
  "stats": {
    "activeWorkflows": 12,
    "pendingApprovals": 3,
    "runningExecutions": 5,
    "tasksCompletedToday": 87
  },
  "recentActivity": [
    {
      "id": "act_123",
      "type": "workflow_completed",
      "title": "Employee Onboarding completed",
      "workflow": {
        "id": "wf_456",
        "name": "Employee Onboarding"
      },
      "user": {
        "id": "usr_abc",
        "name": "John Smith",
        "avatar": "https://..."
      },
      "timestamp": "2025-01-15T14:20:00Z"
    }
  ],
  "myTasks": [
    {
      "id": "task_789",
      "type": "approval",
      "title": "Approve equipment purchase",
      "workflow": "Employee Onboarding",
      "priority": "high",
      "dueAt": "2025-01-15T18:00:00Z",
      "createdAt": "2025-01-15T14:00:00Z"
    }
  ]
}
```

---

## ⚡ Workflows

### GET /workspaces/:workspaceId/workflows
Get all workflows in workspace.

**Query Parameters:**
- `status`: `active|draft|paused|archived`
- `category`: `hr|sales|support|operations|custom`
- `createdBy`: `userId`
- `search`: search term
- `page`: page number (default: 1)
- `limit`: items per page (default: 20)

**Response:** `200 OK`
```json
{
  "workflows": [
    {
      "id": "wf_abc123",
      "name": "Employee Onboarding",
      "description": "Automated new hire onboarding",
      "status": "active",
      "category": "hr",
      "version": 3,
      "createdBy": {
        "id": "usr_xyz",
        "name": "Sarah Lee",
        "avatar": "https://..."
      },
      "stats": {
        "totalRuns": 127,
        "successRate": 92.1,
        "avgDuration": "8.5 days",
        "lastRun": "2025-01-15T10:30:00Z"
      },
      "createdAt": "2024-08-15T09:00:00Z",
      "updatedAt": "2025-01-10T14:22:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "totalPages": 1
  }
}
```

### GET /workspaces/:workspaceId/workflows/:workflowId
Get workflow details with full definition.

**Response:** `200 OK`
```json
{
  "id": "wf_abc123",
  "name": "Employee Onboarding",
  "description": "Automated new hire onboarding process",
  "status": "active",
  "category": "hr",
  "version": 3,
  "definition": {
    "nodes": [
      {
        "id": "node_1",
        "type": "trigger",
        "subtype": "webhook",
        "position": { "x": 100, "y": 100 },
        "config": {
          "name": "New Hire Data",
          "path": "/webhooks/new-hire",
          "method": "POST"
        }
      },
      {
        "id": "node_2",
        "type": "ai_agent",
        "subtype": "gpt4",
        "position": { "x": 300, "y": 100 },
        "config": {
          "name": "Generate Onboarding Plan",
          "model": "gpt-4",
          "systemPrompt": "You are an expert HR...",
          "temperature": 0.7,
          "maxTokens": 2000
        }
      },
      {
        "id": "node_3",
        "type": "human_task",
        "subtype": "approval",
        "position": { "x": 500, "y": 100 },
        "config": {
          "name": "Manager Approval",
          "approvers": ["${input.managerId}"],
          "sla": 14400,
          "allowDelegation": true
        }
      }
    ],
    "edges": [
      {
        "id": "edge_1",
        "source": "node_1",
        "target": "node_2"
      },
      {
        "id": "edge_2",
        "source": "node_2",
        "target": "node_3"
      }
    ]
  },
  "permissions": {
    "canEdit": true,
    "canDelete": true,
    "canExecute": true,
    "visibility": "workspace"
  },
  "stats": {
    "totalRuns": 127,
    "successRate": 92.1,
    "avgDuration": "8.5 days",
    "costPerRun": 12.50
  },
  "createdBy": {
    "id": "usr_xyz",
    "name": "Sarah Lee"
  },
  "createdAt": "2024-08-15T09:00:00Z",
  "updatedAt": "2025-01-10T14:22:00Z"
}
```

### POST /workspaces/:workspaceId/workflows
Create new workflow.

**Request:**
```json
{
  "name": "Employee Onboarding",
  "description": "Automated onboarding process",
  "category": "hr",
  "definition": {
    "nodes": [...],
    "edges": [...]
  }
}
```

**Response:** `201 Created` (returns workflow object)

### PATCH /workspaces/:workspaceId/workflows/:workflowId
Update workflow definition or settings.

**Request:**
```json
{
  "name": "Updated name",
  "status": "active",
  "definition": {
    "nodes": [...],
    "edges": [...]
  }
}
```

**Response:** `200 OK` (returns updated workflow)

### POST /workspaces/:workspaceId/workflows/:workflowId/execute
Manually trigger workflow execution.

**Request:**
```json
{
  "input": {
    "employee": {
      "name": "Sarah Johnson",
      "email": "sarah@company.com",
      "role": "Software Engineer",
      "startDate": "2025-02-01"
    }
  },
  "testMode": false
}
```

**Response:** `201 Created`
```json
{
  "executionId": "exec_xyz789",
  "status": "running",
  "startedAt": "2025-01-15T15:00:00Z",
  "estimatedDuration": "8.5 days"
}
```

### DELETE /workspaces/:workspaceId/workflows/:workflowId
Delete workflow (soft delete, can be archived).

**Response:** `204 No Content`

---

## 🤖 AI Agents

### GET /workspaces/:workspaceId/agents
Get all AI agents in workspace.

**Response:** `200 OK`
```json
{
  "agents": [
    {
      "id": "agent_abc",
      "name": "Onboarding Plan Generator",
      "type": "assistant",
      "model": "gpt-4",
      "status": "active",
      "usageStats": {
        "totalCalls": 127,
        "avgResponseTime": "2.3s",
        "costToDate": 45.30,
        "successRate": 98.4
      },
      "createdAt": "2024-08-15T09:00:00Z"
    }
  ]
}
```

### POST /workspaces/:workspaceId/agents
Create new AI agent.

**Request:**
```json
{
  "name": "Document Analyzer",
  "type": "analyzer",
  "model": "gpt-4",
  "systemPrompt": "You are an expert document analyzer...",
  "config": {
    "temperature": 0.7,
    "maxTokens": 2000,
    "confidenceThreshold": 0.8
  },
  "tools": ["web_search", "file_reader"]
}
```

**Response:** `201 Created` (returns agent object)

### GET /workspaces/:workspaceId/agents/:agentId/analytics
Get agent performance analytics.

**Response:** `200 OK`
```json
{
  "agentId": "agent_abc",
  "period": "last_30_days",
  "metrics": {
    "totalCalls": 127,
    "avgResponseTime": 2.3,
    "successRate": 98.4,
    "totalCost": 45.30,
    "avgConfidence": 94.2,
    "humanOverrideRate": 5.2
  },
  "timeline": [
    {
      "date": "2025-01-15",
      "calls": 8,
      "avgResponseTime": 2.1,
      "cost": 2.40
    }
  ]
}
```

---

## ✅ Approvals

### GET /workspaces/:workspaceId/approvals
Get approval requests.

**Query Parameters:**
- `status`: `pending|approved|rejected|expired`
- `priority`: `low|medium|high|critical`
- `assignedTo`: `userId` (default: current user)
- `workflowId`: filter by workflow
- `page`: page number
- `limit`: items per page

**Response:** `200 OK`
```json
{
  "approvals": [
    {
      "id": "apr_123",
      "workflowName": "Employee Onboarding",
      "executionId": "exec_xyz",
      "title": "Approve equipment purchase",
      "description": "Review and approve equipment request for new hire",
      "priority": "high",
      "status": "pending",
      "data": {
        "employee": {
          "name": "Sarah Johnson",
          "role": "Software Engineer"
        },
        "equipment": {
          "laptop": "MacBook Pro M3",
          "cost": 3200
        }
      },
      "aiRecommendation": {
        "decision": "approve",
        "confidence": 95,
        "reasoning": "Within budget, standard config for role",
        "similarCases": 12
      },
      "sla": {
        "dueAt": "2025-01-15T18:00:00Z",
        "remainingTime": "3h 15m",
        "breached": false
      },
      "submittedBy": {
        "id": "usr_xyz",
        "name": "System",
        "avatar": null
      },
      "assignedTo": [
        {
          "id": "usr_abc",
          "name": "John Smith",
          "avatar": "https://..."
        }
      ],
      "createdAt": "2025-01-15T14:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 3,
    "totalPages": 1
  }
}
```

### GET /workspaces/:workspaceId/approvals/:approvalId
Get approval details.

**Response:** `200 OK`
```json
{
  "id": "apr_123",
  "workflowName": "Employee Onboarding",
  "executionId": "exec_xyz",
  "title": "Approve equipment purchase",
  "description": "Review and approve equipment request",
  "priority": "high",
  "status": "pending",
  "data": {
    "employee": {...},
    "equipment": {...}
  },
  "aiRecommendation": {...},
  "context": {
    "previousSteps": [
      {
        "name": "Generate Plan",
        "status": "completed",
        "output": "Plan generated successfully"
      }
    ],
    "relatedDocuments": [
      {
        "name": "Equipment Policy.pdf",
        "url": "https://..."
      }
    ]
  },
  "comments": [
    {
      "id": "cmt_1",
      "user": {
        "id": "usr_abc",
        "name": "John Smith"
      },
      "text": "Looks good to me",
      "createdAt": "2025-01-15T14:30:00Z"
    }
  ],
  "history": [
    {
      "action": "created",
      "user": "System",
      "timestamp": "2025-01-15T14:00:00Z"
    }
  ],
  "sla": {...},
  "createdAt": "2025-01-15T14:00:00Z"
}
```

### POST /workspaces/:workspaceId/approvals/:approvalId/decide
Make approval decision.

**Request:**
```json
{
  "decision": "approve",
  "comment": "Approved - standard equipment for role",
  "metadata": {
    "reviewTime": 300
  }
}
```

**Response:** `200 OK`
```json
{
  "approvalId": "apr_123",
  "decision": "approve",
  "decidedBy": {
    "id": "usr_abc",
    "name": "John Smith"
  },
  "decidedAt": "2025-01-15T14:45:00Z",
  "executionResumed": true
}
```

### POST /workspaces/:workspaceId/approvals/:approvalId/delegate
Delegate approval to another user.

**Request:**
```json
{
  "delegateTo": "usr_def",
  "reason": "Going on vacation, please review"
}
```

**Response:** `200 OK`

---

## 🔌 Integrations

### GET /integrations/marketplace
Browse available integrations.

**Query Parameters:**
- `category`: `crm|communication|payment|database|ai|mcp|utilities`
- `search`: search term
- `featured`: boolean
- `page`, `limit`

**Response:** `200 OK`
```json
{
  "integrations": [
    {
      "id": "int_slack",
      "name": "Slack",
      "description": "Send messages, create channels, manage users",
      "category": "communication",
      "icon": "https://cdn.flowai.com/integrations/slack.png",
      "rating": 4.9,
      "installs": 12500,
      "featured": true,
      "pricing": "free",
      "capabilities": [
        "Send messages",
        "Create channels",
        "Manage users",
        "File uploads"
      ],
      "authType": "oauth2"
    }
  ],
  "pagination": {...}
}
```

### GET /workspaces/:workspaceId/integrations
Get installed integrations in workspace.

**Response:** `200 OK`
```json
{
  "integrations": [
    {
      "id": "inst_abc",
      "integrationId": "int_slack",
      "name": "Slack",
      "status": "connected",
      "config": {
        "workspace": "acme-corp.slack.com",
        "defaultChannel": "#general"
      },
      "usage": {
        "callsThisMonth": 1250,
        "lastUsed": "2025-01-15T14:30:00Z"
      },
      "installedAt": "2024-08-01T10:00:00Z",
      "installedBy": {
        "id": "usr_abc",
        "name": "John Smith"
      }
    }
  ]
}
```

### POST /workspaces/:workspaceId/integrations/:integrationId/install
Install integration in workspace.

**Request:**
```json
{
  "config": {
    "workspace": "acme-corp.slack.com"
  },
  "authCode": "oauth_authorization_code"
}
```

**Response:** `201 Created`

### DELETE /workspaces/:workspaceId/integrations/:installationId
Uninstall integration.

**Response:** `204 No Content`

---

## 📊 Analytics

### GET /workspaces/:workspaceId/analytics/overview
Get workspace-level analytics overview.

**Query Parameters:**
- `period`: `7d|30d|90d|1y|custom`
- `startDate`, `endDate`: for custom period

**Response:** `200 OK`
```json
{
  "period": "30d",
  "metrics": {
    "totalExecutions": 1524,
    "successRate": 92.1,
    "avgDuration": "4.5h",
    "totalCost": 1587.50,
    "timeSaved": "2,145 hours",
    "roi": 340
  },
  "trends": {
    "executionsChange": 15.2,
    "successRateChange": 3.1,
    "costChange": -8.5
  },
  "topWorkflows": [
    {
      "id": "wf_abc",
      "name": "Employee Onboarding",
      "executions": 127,
      "successRate": 92.1
    }
  ]
}
```

### GET /workspaces/:workspaceId/analytics/workflows/:workflowId
Get workflow-specific analytics.

**Response:** `200 OK`
```json
{
  "workflowId": "wf_abc",
  "period": "30d",
  "overview": {
    "totalExecutions": 127,
    "avgDuration": "8.5 days",
    "successRate": 92.1,
    "costPerRun": 12.50,
    "timeSaved": "18h per run"
  },
  "timeline": [
    {
      "date": "2025-01-15",
      "executions": 5,
      "successful": 5,
      "failed": 0,
      "avgDuration": "8.2 days"
    }
  ],
  "bottlenecks": [
    {
      "nodeId": "node_4",
      "nodeName": "IT Manager Approval",
      "avgDelay": "6.2 hours",
      "slaBreachRate": 45,
      "recommendation": "Add backup approver"
    }
  ],
  "nodePerformance": [
    {
      "nodeId": "node_1",
      "nodeName": "Webhook Trigger",
      "avgTime": 0.5,
      "successRate": 100,
      "status": "healthy"
    }
  ],
  "aiRecommendations": [
    {
      "type": "cost_optimization",
      "title": "Cache AI responses",
      "impact": "$406/month",
      "confidence": 92
    }
  ]
}
```

---

## 👥 Team Management

### GET /workspaces/:workspaceId/members
Get workspace members.

**Response:** `200 OK`
```json
{
  "members": [
    {
      "id": "usr_abc",
      "name": "John Smith",
      "email": "john@acme.com",
      "avatar": "https://...",
      "role": "admin",
      "status": "active",
      "stats": {
        "workflowsCreated": 5,
        "approvalsHandled": 127,
        "avgApprovalTime": "2.3h"
      },
      "joinedAt": "2024-06-01T10:00:00Z",
      "lastActiveAt": "2025-01-15T14:30:00Z"
    }
  ]
}
```

### POST /workspaces/:workspaceId/members/invite
Invite user to workspace.

**Request:**
```json
{
  "email": "newuser@example.com",
  "role": "editor",
  "message": "Welcome to the team!"
}
```

**Response:** `201 Created`
```json
{
  "inviteId": "inv_xyz",
  "email": "newuser@example.com",
  "role": "editor",
  "inviteLink": "https://app.flowai.com/invite/inv_xyz",
  "expiresAt": "2025-01-22T15:00:00Z"
}
```

### PATCH /workspaces/:workspaceId/members/:userId
Update member role or status.

**Request:**
```json
{
  "role": "admin"
}
```

**Response:** `200 OK`

### DELETE /workspaces/:workspaceId/members/:userId
Remove member from workspace.

**Response:** `204 No Content`

---

## 🔔 Notifications

### GET /notifications
Get user notifications (cross-workspace).

**Query Parameters:**
- `workspaceId`: filter by workspace
- `type`: `approval|mention|workflow_complete|error|system`
- `unread`: boolean
- `page`, `limit`

**Response:** `200 OK`
```json
{
  "notifications": [
    {
      "id": "notif_123",
      "type": "approval",
      "title": "Approval needed: Equipment purchase",
      "message": "Review equipment request for Sarah Johnson",
      "workspace": {
        "id": "ws_xyz",
        "name": "Acme Corp"
      },
      "data": {
        "approvalId": "apr_123",
        "workflowId": "wf_abc"
      },
      "priority": "high",
      "read": false,
      "createdAt": "2025-01-15T14:00:00Z"
    }
  ],
  "unreadCount": 8,
  "pagination": {...}
}
```

### PATCH /notifications/:notificationId/read
Mark notification as read.

**Response:** `200 OK`

### POST /notifications/mark-all-read
Mark all notifications as read.

**Query Parameters:**
- `workspaceId`: optional, to mark only workspace notifications

**Response:** `200 OK`

---

## 🔄 Executions

### GET /workspaces/:workspaceId/executions
Get workflow executions.

**Query Parameters:**
- `workflowId`: filter by workflow
- `status`: `queued|running|waiting|completed|failed`
- `startDate`, `endDate`
- `page`, `limit`

**Response:** `200 OK`
```json
{
  "executions": [
    {
      "id": "exec_xyz",
      "workflowId": "wf_abc",
      "workflowName": "Employee Onboarding",
      "status": "running",
      "progress": 65,
      "currentNode": "Buddy Assignment",
      "input": {
        "employee": {
          "name": "Sarah Johnson"
        }
      },
      "startedAt": "2025-01-15T10:00:00Z",
      "estimatedCompletion": "2025-01-23T18:00:00Z",
      "triggeredBy": {
        "type": "webhook",
        "user": null
      }
    }
  ],
  "pagination": {...}
}
```

### GET /workspaces/:workspaceId/executions/:executionId
Get execution details with full trace.

**Response:** `200 OK`
```json
{
  "id": "exec_xyz",
  "workflowId": "wf_abc",
  "workflowName": "Employee Onboarding",
  "status": "running",
  "progress": 65,
  "input": {...},
  "output": null,
  "trace": [
    {
      "nodeId": "node_1",
      "nodeName": "Webhook Trigger",
      "status": "completed",
      "startedAt": "2025-01-15T10:00:00Z",
      "completedAt": "2025-01-15T10:00:01Z",
      "duration": 1.2,
      "input": {...},
      "output": {...}
    },
    {
      "nodeId": "node_2",
      "nodeName": "AI Plan Generator",
      "status": "completed",
      "startedAt": "2025-01-15T10:00:01Z",
      "completedAt": "2025-01-15T10:00:15Z",
      "duration": 14.3,
      "aiResponse": {
        "model": "gpt-4",
        "tokens": 1250,
        "confidence": 95,
        "cost": 0.05
      }
    },
    {
      "nodeId": "node_3",
      "nodeName": "Manager Approval",
      "status": "completed",
      "startedAt": "2025-01-15T10:00:15Z",
      "completedAt": "2025-01-15T12:30:00Z",
      "duration": 8400,
      "approvalId": "apr_123",
      "decision": "approved",
      "decidedBy": "John Smith"
    },
    {
      "nodeId": "node_4",
      "nodeName": "IT Setup Branch",
      "status": "running",
      "startedAt": "2025-01-15T12:30:00Z"
    }
  ],
  "startedAt": "2025-01-15T10:00:00Z",
  "estimatedCompletion": "2025-01-23T18:00:00Z"
}
```

### POST /workspaces/:workspaceId/executions/:executionId/cancel
Cancel running execution.

**Response:** `200 OK`
```json
{
  "executionId": "exec_xyz",
  "status": "cancelled",
  "cancelledAt": "2025-01-15T15:30:00Z"
}
```

### POST /workspaces/:workspaceId/executions/:executionId/retry
Retry failed execution.

**Response:** `201 Created`
```json
{
  "newExecutionId": "exec_new",
  "status": "queued"
}
```

---

## 📡 Webhooks (For Workflow Triggers)

### POST /workspaces/:workspaceId/webhooks/:workflowId
Trigger workflow via webhook.

**Headers:**
```
X-FlowAI-Signature: hmac_signature_for_verification
Content-Type: application/json
```

**Request:** (Custom payload based on workflow configuration)
```json
{
  "employee": {
    "name": "Sarah Johnson",
    "email": "sarah@company.com",
    "role": "Software Engineer",
    "startDate": "2025-02-01"
  }
}
```

**Response:** `202 Accepted`
```json
{
  "executionId": "exec_xyz",
  "status": "queued",
  "message": "Workflow execution started"
}
```

---

## 🚨 Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "requestId": "req_abc123",
    "timestamp": "2025-01-15T15:00:00Z"
  }
}
```

### Common Error Codes
- `400` - Bad Request (VALIDATION_ERROR)
- `401` - Unauthorized (AUTH_REQUIRED, INVALID_TOKEN)
- `403` - Forbidden (INSUFFICIENT_PERMISSIONS)
- `404` - Not Found (RESOURCE_NOT_FOUND)
- `409` - Conflict (RESOURCE_CONFLICT)
- `429` - Too Many Requests (RATE_LIMIT_EXCEEDED)
- `500` - Internal Server Error (INTERNAL_ERROR)

---

## 🔐 Rate Limits

**Default Limits:**
- 100 requests per minute per user
- 1000 requests per hour per workspace
- 10 concurrent workflow executions per workspace

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

---

## 📦 Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page`: Page number (1-indexed)
- `limit`: Items per page (max: 100)

**Response includes:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 127,
    "totalPages": 7,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 🔍 Filtering & Sorting

**Common query parameters:**
- `sortBy`: Field to sort by
- `sortOrder`: `asc|desc`
- `search`: Full-text search
- `filter[field]`: Filter by field value

**Example:**
```
GET /workspaces/ws_123/workflows?
  status=active&
  category=hr&
  sortBy=createdAt&
  sortOrder=desc&
  search=onboarding
```

---

## 📝 Changelog & Versioning

**Current Version:** v1

**Versioning Strategy:**
- Breaking changes require new version (v2, v3, etc.)
- Non-breaking changes added to current version
- Deprecated endpoints supported for 6 months

**Version Header:**
```
X-API-Version: v1
```

---

This API documentation covers all endpoints needed for the MVP. Each endpoint returns consistent JSON responses with proper error handling and follows REST best practices.

