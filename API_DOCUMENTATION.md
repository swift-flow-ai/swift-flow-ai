# Swift Flow AI - Backend API Documentation

## 🎯 Overview

Complete API specification for Swift Flow AI backend services. All endpoints follow RESTful conventions with JSON payloads.

**Base URL:** `https://api.swiftflow.ai/v1`

**Authentication:** Bearer token in Authorization header

```
Authorization: Bearer <access_token>
```

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Workspaces](#workspaces)
3. [Workflows](#workflows)
4. [Folders & Organization](#folders--organization)
5. [Sharing & Collaboration](#sharing--collaboration)
6. [Workflow Templates](#workflow-templates)
7. [AI Agents](#ai-agents)
8. [Approvals](#approvals)
9. [Integrations](#integrations)
10. [Analytics](#analytics)
11. [Team Management](#team-management)
12. [Team Pools](#team-pools)
13. [Notifications](#notifications)
14. [Executions](#executions)
15. [Audit Logs](#audit-logs)

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
    "avatar": "https://cdn.swiftflow.ai/avatars/usr_abc123.jpg",
    "workspaces": [
      {
        "id": "ws_xyz789",
        "name": "Acme Corp",
        "role": "admin",
        "slug": "acme-corp",
        "logo": "https://cdn.swiftflow.ai/logos/ws_xyz789.png"
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
  "avatar": "https://cdn.swiftflow.ai/avatars/usr_abc123.jpg",
  "workspaces": [
    {
      "id": "ws_xyz789",
      "name": "Acme Corp",
      "role": "admin",
      "slug": "acme-corp",
      "logo": "https://cdn.swiftflow.ai/logos/ws_xyz789.png",
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
      "logo": "https://cdn.swiftflow.ai/logos/ws_xyz789.png",
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
  "success": true,
  "data": {
    "workspace": {
      "id": "ws_xyz789",
      "name": "Acme Corp",
      "slug": "acme-corp",
      "logo": null,
      "role": "admin",
      "memberCount": 1,
      "activeWorkflows": 0,
      "pendingApprovals": 0,
      "unreadNotifications": 0,
      "createdAt": "2025-01-15T10:30:00Z"
    }
  }
}
```

**Error Response:** `409 Conflict` (if slug already exists)

```json
{
  "success": false,
  "message": "Workspace with this slug already exists"
}
```

**Error Response:** `400 Bad Request` (validation error)

```json
{
  "success": false,
  "message": "Name and slug are required"
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
  "logo": "https://cdn.swiftflow.ai/logos/ws_xyz789.png",
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
    "costPerRun": 12.5
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

### GET /workspaces/:workspaceId/workflows/:workflowId/analytics

Get comprehensive analytics for a specific workflow.

**Query Parameters:**

- `period`: `7d|30d|90d|custom`
- `startDate`, `endDate`: for custom period

**Response:** `200 OK`

```json
{
  "workflowId": "wf_recruitment",
  "workflowName": "Interview Coordination",
  "period": "30d",
  "overview": {
    "totalExecutions": 89,
    "successRate": 96.6,
    "avgDuration": "2.3 hours",
    "costPerRun": 0.45,
    "timeSaved": "18h per run",
    "trend": {
      "executions": 15.2,
      "successRate": 3.1,
      "duration": -8.5
    }
  },
  "timeline": [
    {
      "date": "2025-01-15",
      "executions": 13,
      "successful": 12,
      "failed": 1,
      "avgDuration": 2.2
    }
  ],
  "statusDistribution": [
    {
      "name": "Completed",
      "value": 86,
      "percentage": 96.6
    },
    {
      "name": "Failed",
      "value": 3,
      "percentage": 3.4
    }
  ],
  "nodePerformance": [
    {
      "nodeId": "node_1",
      "nodeName": "Manual Start",
      "avgTime": 0.3,
      "successRate": 100,
      "status": "healthy",
      "executions": 89
    },
    {
      "nodeId": "node_4",
      "nodeName": "Wait for Candidate Availability",
      "avgTime": 48.5,
      "successRate": 98.9,
      "status": "healthy",
      "executions": 89
    },
    {
      "nodeId": "node_8",
      "nodeName": "Wait for Interviewer Response",
      "avgTime": 8.5,
      "successRate": 94.4,
      "status": "warning",
      "executions": 89
    }
  ],
  "bottlenecks": [
    {
      "nodeId": "node_4",
      "nodeName": "Wait for Candidate Availability",
      "avgDelay": "48.5 hours",
      "slaBreachRate": 12,
      "recommendation": "Send reminder after 3 days instead of 5"
    },
    {
      "nodeId": "node_8",
      "nodeName": "Wait for Interviewer Response",
      "avgDelay": "8.5 hours",
      "slaBreachRate": 5.6,
      "recommendation": "Reduce timeout to 12 hours and add escalation"
    }
  ],
  "triggerSources": [
    {
      "source": "Manual (HR Recruiters)",
      "count": 89,
      "percentage": 100
    }
  ],
  "peakTimes": [
    {
      "hour": "9 AM",
      "count": 15
    },
    {
      "hour": "10 AM",
      "count": 22
    },
    {
      "hour": "2 PM",
      "count": 20
    }
  ]
}
```

---

## 📁 Folders & Organization

### GET /workspaces/:workspaceId/folders

Get all folders in workspace.

**Response:** `200 OK`

```json
{
  "folders": [
    {
      "id": "folder_hr",
      "name": "HR Workflows",
      "description": "Human Resources workflows and processes",
      "parentId": null,
      "color": "#3b82f6",
      "icon": "Users",
      "workflowCount": 8,
      "metadata": {
        "createdBy": "usr_abc",
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2025-01-15T14:30:00Z"
      }
    },
    {
      "id": "folder_hr_recruitment",
      "name": "Recruitment",
      "description": "Hiring and interview workflows",
      "parentId": "folder_hr",
      "color": "#8b5cf6",
      "icon": "UserPlus",
      "workflowCount": 3,
      "metadata": {
        "createdBy": "usr_abc",
        "createdAt": "2024-06-01T10:00:00Z",
        "updatedAt": "2025-01-15T14:30:00Z"
      }
    }
  ]
}
```

### POST /workspaces/:workspaceId/folders

Create a new folder.

**Request:**

```json
{
  "name": "Finance Workflows",
  "description": "Financial processes and approvals",
  "parentId": null,
  "color": "#10b981",
  "icon": "DollarSign"
}
```

**Response:** `201 Created`

```json
{
  "folder": {
    "id": "folder_finance",
    "name": "Finance Workflows",
    "description": "Financial processes and approvals",
    "parentId": null,
    "color": "#10b981",
    "icon": "DollarSign",
    "workflowCount": 0,
    "metadata": {
      "createdBy": "usr_abc",
      "createdAt": "2025-01-15T15:00:00Z",
      "updatedAt": "2025-01-15T15:00:00Z"
    }
  }
}
```

### PATCH /workspaces/:workspaceId/folders/:folderId

Update folder details.

**Request:**

```json
{
  "name": "Updated Folder Name",
  "description": "Updated description",
  "color": "#ef4444"
}
```

**Response:** `200 OK` (returns updated folder)

### DELETE /workspaces/:workspaceId/folders/:folderId

Delete a folder (workflows inside are not deleted, just unassigned).

**Response:** `204 No Content`

### POST /workspaces/:workspaceId/workflows/:workflowId/move

Move workflow to a folder.

**Request:**

```json
{
  "folderId": "folder_hr_recruitment"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "workflow": {
    "id": "wf_abc123",
    "folderId": "folder_hr_recruitment"
  }
}
```

---

## 🔗 Sharing & Collaboration

### GET /workspaces/:workspaceId/workflows/:workflowId/shares

Get all users/teams with access to a workflow.

**Response:** `200 OK`

```json
{
  "shares": [
    {
      "id": "share_abc123",
      "workflowId": "wf_abc123",
      "user": {
        "id": "usr_xyz",
        "name": "John Smith",
        "email": "john@acme.com",
        "avatar": "https://..."
      },
      "permission": "editor",
      "sharedBy": {
        "id": "usr_owner",
        "name": "Admin User",
        "avatar": "https://..."
      },
      "sharedAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

### POST /workspaces/:workspaceId/workflows/:workflowId/shares

Share workflow with a user.

**Request:**

```json
{
  "userId": "usr_xyz",
  "permission": "editor"
}
```

**Permissions:**

- `viewer`: Can view workflow
- `commenter`: Can view and comment
- `editor`: Can view, comment, and edit
- `owner`: Full control

**Response:** `201 Created`

```json
{
  "share": {
    "id": "share_new123",
    "workflowId": "wf_abc123",
    "user": {
      "id": "usr_xyz",
      "name": "John Smith",
      "email": "john@acme.com"
    },
    "permission": "editor",
    "sharedAt": "2025-01-15T15:00:00Z"
  }
}
```

### PATCH /workspaces/:workspaceId/workflows/:workflowId/shares/:shareId

Update share permission.

**Request:**

```json
{
  "permission": "viewer"
}
```

**Response:** `200 OK` (returns updated share)

### DELETE /workspaces/:workspaceId/workflows/:workflowId/shares/:shareId

Remove user access to workflow.

**Response:** `204 No Content`

### POST /workspaces/:workspaceId/workflows/:workflowId/share-links

Generate a shareable link for workflow.

**Request:**

```json
{
  "permission": "viewer",
  "expiresAt": "2025-02-15T00:00:00Z"
}
```

**Response:** `201 Created`

```json
{
  "link": {
    "id": "link_abc123",
    "resourceId": "wf_abc123",
    "resourceType": "workflow",
    "token": "sh_a1b2c3d4e5f6",
    "url": "https://app.swiftflow.ai/shared/sh_a1b2c3d4e5f6",
    "permission": "viewer",
    "createdBy": {
      "id": "usr_abc",
      "name": "Admin User"
    },
    "createdAt": "2025-01-15T15:00:00Z",
    "expiresAt": "2025-02-15T00:00:00Z",
    "accessCount": 0,
    "isActive": true
  }
}
```

### GET /workspaces/:workspaceId/workflows/:workflowId/share-links

Get all share links for a workflow.

**Response:** `200 OK`

```json
{
  "links": [
    {
      "id": "link_abc123",
      "resourceId": "wf_abc123",
      "resourceType": "workflow",
      "token": "sh_a1b2c3d4e5f6",
      "url": "https://app.swiftflow.ai/shared/sh_a1b2c3d4e5f6",
      "permission": "viewer",
      "createdBy": {
        "id": "usr_abc",
        "name": "Admin User"
      },
      "createdAt": "2025-01-15T15:00:00Z",
      "expiresAt": "2025-02-15T00:00:00Z",
      "accessCount": 15,
      "isActive": true
    }
  ]
}
```

### DELETE /workspaces/:workspaceId/workflows/:workflowId/share-links/:linkId

Revoke a share link.

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Link revoked successfully"
}
```

### GET /workspaces/:workspaceId/folders/:folderId/shares

Get all users/teams with access to a folder (and all workflows inside).

**Response:** `200 OK`

```json
{
  "shares": [
    {
      "id": "share_folder_abc",
      "folderId": "folder_hr",
      "user": {
        "id": "usr_xyz",
        "name": "John Smith",
        "email": "john@acme.com",
        "avatar": "https://..."
      },
      "permission": "viewer",
      "sharedBy": {
        "id": "usr_owner",
        "name": "Admin User"
      },
      "sharedAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

### POST /workspaces/:workspaceId/folders/:folderId/shares

Share folder with a user (grants access to all workflows inside).

**Request:**

```json
{
  "userId": "usr_xyz",
  "permission": "viewer"
}
```

**Response:** `201 Created`

```json
{
  "share": {
    "id": "share_folder_new",
    "folderId": "folder_hr",
    "user": {
      "id": "usr_xyz",
      "name": "John Smith",
      "email": "john@acme.com"
    },
    "permission": "viewer",
    "sharedAt": "2025-01-15T15:00:00Z"
  }
}
```

### POST /workspaces/:workspaceId/folders/:folderId/share-links

Generate a shareable link for folder.

**Request:**

```json
{
  "permission": "viewer",
  "expiresAt": "2025-02-15T00:00:00Z"
}
```

**Response:** `201 Created`

```json
{
  "link": {
    "id": "link_folder_abc",
    "resourceId": "folder_hr",
    "resourceType": "folder",
    "token": "sh_folder_xyz123",
    "url": "https://app.swiftflow.ai/shared/folder/sh_folder_xyz123",
    "permission": "viewer",
    "createdBy": {
      "id": "usr_abc",
      "name": "Admin User"
    },
    "createdAt": "2025-01-15T15:00:00Z",
    "expiresAt": "2025-02-15T00:00:00Z",
    "accessCount": 0,
    "isActive": true
  }
}
```

### GET /workspaces/:workspaceId/folders/:folderId/share-links

Get all share links for a folder.

**Response:** `200 OK` (similar structure to workflow share links)

### DELETE /workspaces/:workspaceId/folders/:folderId/share-links/:linkId

Revoke a folder share link.

**Response:** `200 OK`

---

## 📋 Workflow Templates

### GET /workspaces/:workspaceId/templates

Get workflow templates available in workspace (includes marketplace templates).

**Query Parameters:**

- `category`: `hr|sales|support|operations|finance|marketing|custom`
- `search`: search term
- `featured`: boolean
- `createdBy`: `userId` (for custom templates)
- `page`, `limit`

**Response:** `200 OK`

```json
{
  "templates": [
    {
      "id": "tmpl_abc123",
      "name": "Employee Onboarding",
      "description": "Complete employee onboarding workflow with AI-powered plan generation",
      "category": "hr",
      "thumbnail": "https://cdn.swiftflow.ai/templates/onboarding.png",
      "featured": true,
      "rating": 4.8,
      "usageCount": 1250,
      "estimatedTime": "8-10 days",
      "complexity": "intermediate",
      "tags": ["hr", "onboarding", "ai", "approval"],
      "variables": [
        {
          "key": "department",
          "label": "Department",
          "type": "select",
          "required": true,
          "options": ["Engineering", "Sales", "Marketing"]
        },
        {
          "key": "managerEmail",
          "label": "Manager Email",
          "type": "email",
          "required": true
        }
      ],
      "createdBy": {
        "id": "system",
        "name": "Swift Flow AI",
        "type": "official"
      },
      "createdAt": "2024-06-01T10:00:00Z",
      "updatedAt": "2025-01-10T14:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### GET /workspaces/:workspaceId/templates/:templateId

Get template details with full workflow definition.

**Response:** `200 OK`

```json
{
  "id": "tmpl_abc123",
  "name": "Employee Onboarding",
  "description": "Complete employee onboarding workflow",
  "category": "hr",
  "thumbnail": "https://cdn.swiftflow.ai/templates/onboarding.png",
  "featured": true,
  "rating": 4.8,
  "usageCount": 1250,
  "estimatedTime": "8-10 days",
  "complexity": "intermediate",
  "tags": ["hr", "onboarding", "ai", "approval"],
  "definition": {
    "nodes": [
      {
        "id": "node_1",
        "type": "trigger",
        "subtype": "webhook",
        "position": { "x": 100, "y": 100 },
        "config": {
          "name": "New Hire Data",
          "path": "/webhooks/new-hire"
        }
      }
    ],
    "edges": [
      {
        "id": "edge_1",
        "source": "node_1",
        "target": "node_2"
      }
    ]
  },
  "variables": [
    {
      "key": "department",
      "label": "Department",
      "type": "select",
      "required": true,
      "options": ["Engineering", "Sales", "Marketing"],
      "defaultValue": "Engineering"
    }
  ],
  "requiredIntegrations": [
    {
      "id": "int_slack",
      "name": "Slack",
      "required": true
    },
    {
      "id": "int_gsuite",
      "name": "Google Workspace",
      "required": false
    }
  ],
  "instructions": "This template automates the complete employee onboarding process...",
  "createdBy": {
    "id": "system",
    "name": "Swift Flow AI",
    "type": "official"
  },
  "reviews": [
    {
      "id": "rev_1",
      "user": {
        "id": "usr_xyz",
        "name": "John Smith",
        "avatar": "https://..."
      },
      "rating": 5,
      "comment": "Saved us hours of manual work!",
      "createdAt": "2025-01-10T10:00:00Z"
    }
  ],
  "createdAt": "2024-06-01T10:00:00Z",
  "updatedAt": "2025-01-10T14:00:00Z"
}
```

### POST /workspaces/:workspaceId/templates/:templateId/use

Create a workflow from template.

**Request:**

```json
{
  "name": "Engineering Onboarding",
  "variables": {
    "department": "Engineering",
    "managerEmail": "manager@company.com"
  },
  "customizations": {
    "description": "Custom description for this workflow"
  }
}
```

**Response:** `201 Created`

```json
{
  "workflow": {
    "id": "wf_new123",
    "name": "Engineering Onboarding",
    "description": "Custom description for this workflow",
    "status": "draft",
    "templateId": "tmpl_abc123",
    "definition": {
      "nodes": [...],
      "edges": [...]
    },
    "createdAt": "2025-01-15T15:00:00Z"
  }
}
```

### POST /workspaces/:workspaceId/templates

Create custom template from existing workflow.

**Request:**

```json
{
  "workflowId": "wf_abc123",
  "name": "Custom Onboarding Template",
  "description": "Our customized onboarding process",
  "category": "hr",
  "tags": ["onboarding", "custom"],
  "visibility": "workspace",
  "variables": [
    {
      "key": "department",
      "label": "Department",
      "type": "select",
      "required": true,
      "options": ["Engineering", "Sales"]
    }
  ]
}
```

**Response:** `201 Created`

```json
{
  "template": {
    "id": "tmpl_custom123",
    "name": "Custom Onboarding Template",
    "description": "Our customized onboarding process",
    "category": "hr",
    "visibility": "workspace",
    "createdBy": {
      "id": "usr_abc",
      "name": "John Smith",
      "type": "user"
    },
    "createdAt": "2025-01-15T15:00:00Z"
  }
}
```

### PATCH /workspaces/:workspaceId/templates/:templateId

Update custom template (only for templates created by user/workspace).

**Request:**

```json
{
  "name": "Updated Template Name",
  "description": "Updated description",
  "tags": ["updated", "tags"]
}
```

**Response:** `200 OK` (returns updated template)

### DELETE /workspaces/:workspaceId/templates/:templateId

Delete custom template.

**Response:** `204 No Content`

### POST /workspaces/:workspaceId/templates/:templateId/review

Add review/rating to template.

**Request:**

```json
{
  "rating": 5,
  "comment": "Excellent template, saved us hours!"
}
```

**Response:** `201 Created`

```json
{
  "review": {
    "id": "rev_123",
    "templateId": "tmpl_abc123",
    "rating": 5,
    "comment": "Excellent template, saved us hours!",
    "user": {
      "id": "usr_abc",
      "name": "John Smith"
    },
    "createdAt": "2025-01-15T15:00:00Z"
  }
}
```

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
        "costToDate": 45.3,
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
    "totalCost": 45.3,
    "avgConfidence": 94.2,
    "humanOverrideRate": 5.2
  },
  "timeline": [
    {
      "date": "2025-01-15",
      "calls": 8,
      "avgResponseTime": 2.1,
      "cost": 2.4
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
      "icon": "https://cdn.swiftflow.ai/integrations/slack.png",
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
      "name": "Slack - Engineering",
      "appId": "int_slack",
      "appName": "Slack",
      "workspaceId": "ws_xyz",
      "status": "connected",
      "authType": "oauth2",
      "config": {
        "workspace": "acme-corp.slack.com",
        "defaultChannel": "#engineering",
        "clientId": "slack_client_id",
        "scopes": ["chat:write", "channels:read"]
      },
      "credentials": {
        "accessToken": "xoxb-...",
        "refreshToken": "xoxr-...",
        "expiresAt": "2025-01-16T15:00:00Z"
      },
      "metadata": {
        "connectedBy": "usr_abc",
        "connectedAt": "2024-08-01T10:00:00Z",
        "lastTestedAt": "2025-01-15T14:00:00Z",
        "lastTestStatus": "success"
      },
      "settings": {
        "enabled": true,
        "autoRefresh": true,
        "notifications": true
      },
      "usage": {
        "callsThisMonth": 1250,
        "lastUsed": "2025-01-15T14:30:00Z"
      }
    },
    {
      "id": "inst_def",
      "name": "Slack - Sales Team",
      "appId": "int_slack",
      "appName": "Slack",
      "workspaceId": "ws_xyz",
      "status": "connected",
      "authType": "oauth2",
      "config": {
        "workspace": "acme-sales.slack.com",
        "defaultChannel": "#sales"
      },
      "metadata": {
        "connectedBy": "usr_xyz",
        "connectedAt": "2024-09-15T10:00:00Z"
      },
      "settings": {
        "enabled": true,
        "autoRefresh": true,
        "notifications": false
      }
    }
  ]
}
```

### GET /workspaces/:workspaceId/integrations/:integrationId

Get specific integration details.

**Response:** `200 OK`

```json
{
  "id": "inst_abc",
  "name": "Slack - Engineering",
  "appId": "int_slack",
  "appName": "Slack",
  "workspaceId": "ws_xyz",
  "status": "connected",
  "authType": "oauth2",
  "config": {
    "workspace": "acme-corp.slack.com",
    "defaultChannel": "#engineering",
    "clientId": "slack_client_id",
    "scopes": ["chat:write", "channels:read"],
    "redirectUri": "https://app.swiftflow.ai/integrations/callback"
  },
  "credentials": {
    "accessToken": "xoxb-...",
    "refreshToken": "xoxr-...",
    "expiresAt": "2025-01-16T15:00:00Z"
  },
  "metadata": {
    "connectedBy": "usr_abc",
    "connectedAt": "2024-08-01T10:00:00Z",
    "lastTestedAt": "2025-01-15T14:00:00Z",
    "lastTestStatus": "success",
    "lastError": null
  },
  "settings": {
    "enabled": true,
    "autoRefresh": true,
    "notifications": true
  },
  "usage": {
    "callsThisMonth": 1250,
    "callsTotal": 15000,
    "lastUsed": "2025-01-15T14:30:00Z",
    "avgResponseTime": "250ms"
  }
}
```

### POST /workspaces/:workspaceId/integrations

Create new integration (supports multiple instances of same app).

**Request:**

```json
{
  "appId": "int_slack",
  "name": "Slack - Engineering",
  "authType": "oauth2",
  "config": {
    "workspace": "acme-corp.slack.com",
    "defaultChannel": "#engineering",
    "clientId": "slack_client_id",
    "scopes": ["chat:write", "channels:read"]
  },
  "authCode": "oauth_authorization_code"
}
```

**Response:** `201 Created`

```json
{
  "integration": {
    "id": "inst_new123",
    "name": "Slack - Engineering",
    "appId": "int_slack",
    "appName": "Slack",
    "status": "connected",
    "connectedAt": "2025-01-15T15:00:00Z"
  }
}
```

### PATCH /workspaces/:workspaceId/integrations/:integrationId

Update integration settings or configuration.

**Request:**

```json
{
  "name": "Slack - Engineering Team",
  "config": {
    "defaultChannel": "#eng-general"
  },
  "settings": {
    "enabled": true,
    "notifications": false
  }
}
```

**Response:** `200 OK` (returns updated integration)

### POST /workspaces/:workspaceId/integrations/:integrationId/test

Test integration connection.

**Response:** `200 OK`

```json
{
  "status": "success",
  "message": "Connection successful",
  "testedAt": "2025-01-15T15:00:00Z",
  "details": {
    "workspace": "acme-corp.slack.com",
    "channels": 42,
    "users": 127
  }
}
```

**Error Response:** `400 Bad Request`

```json
{
  "status": "failed",
  "message": "Authentication failed",
  "error": "Invalid access token",
  "testedAt": "2025-01-15T15:00:00Z"
}
```

### POST /workspaces/:workspaceId/integrations/:integrationId/refresh

Refresh OAuth tokens.

**Response:** `200 OK`

```json
{
  "status": "success",
  "message": "Tokens refreshed successfully",
  "expiresAt": "2025-01-16T15:00:00Z"
}
```

### DELETE /workspaces/:workspaceId/integrations/:integrationId

Disconnect/delete integration.

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
    "totalCost": 1587.5,
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
    "costPerRun": 12.5,
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

### POST /workspaces/:workspaceId/invites

Invite team members to workspace (batch invitations).

**Request:**

```json
{
  "invites": [
    {
      "email": "colleague1@example.com",
      "role": "editor"
    },
    {
      "email": "colleague2@example.com",
      "role": "viewer"
    },
    {
      "email": "manager@example.com",
      "role": "admin"
    }
  ]
}
```

**Response:** `200 OK`

```json
{
  "invitedEmails": [
    "colleague1@example.com",
    "colleague2@example.com",
    "manager@example.com"
  ],
  "invitesSent": 3,
  "message": "3 invitations sent successfully"
}
```

**Error Response:** `400 Bad Request`

```json
{
  "success": false,
  "message": "No invites provided"
}
```

### POST /workspaces/:workspaceId/members/invite

Invite single user to workspace.

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
  "inviteLink": "https://app.swiftflow.ai/invite/inv_xyz",
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

## 👥 Team Pools

### GET /workspaces/:workspaceId/pools

Get all team pools in workspace.

**Response:** `200 OK`

```json
{
  "pools": [
    {
      "id": "pool_hr_ops",
      "name": "HR Operations",
      "description": "General HR operations and administrative tasks",
      "type": "functional",
      "color": "blue",
      "icon": "Users",
      "memberIds": ["usr_1", "usr_2", "usr_3"],
      "members": [
        {
          "id": "usr_1",
          "name": "Sarah Lee",
          "email": "sarah@acme.com",
          "avatar": "https://...",
          "role": "editor"
        }
      ],
      "settings": {
        "autoAssignment": true,
        "roundRobin": true,
        "loadBalancing": true,
        "notifyOnAssignment": true
      },
      "stats": {
        "activeMembers": 3,
        "totalAssignments": 145,
        "avgResponseTime": "2.3h",
        "currentLoad": 12
      },
      "createdBy": {
        "id": "usr_admin",
        "name": "Admin User"
      },
      "createdAt": "2024-06-01T10:00:00Z",
      "updatedAt": "2025-01-15T14:30:00Z"
    }
  ]
}
```

### GET /workspaces/:workspaceId/pools/:poolId

Get specific pool details.

**Response:** `200 OK`

```json
{
  "id": "pool_hr_recruiters",
  "name": "HR Recruiters",
  "description": "Recruitment and interview coordination team",
  "type": "functional",
  "color": "purple",
  "icon": "UserCheck",
  "memberIds": ["usr_4", "usr_5"],
  "members": [
    {
      "id": "usr_4",
      "name": "John Smith",
      "email": "john@acme.com",
      "avatar": "https://...",
      "role": "editor",
      "status": "active",
      "stats": {
        "workflowsCreated": 5,
        "approvalsHandled": 127,
        "avgApprovalTime": "2.3h"
      },
      "poolIds": ["pool_hr_recruiters", "pool_hr_ops"]
    }
  ],
  "settings": {
    "autoAssignment": true,
    "roundRobin": true,
    "loadBalancing": true,
    "notifyOnAssignment": true
  },
  "stats": {
    "activeMembers": 2,
    "totalAssignments": 89,
    "avgResponseTime": "1.8h",
    "currentLoad": 8
  },
  "createdBy": {
    "id": "usr_admin",
    "name": "Admin User"
  },
  "createdAt": "2024-06-01T10:00:00Z",
  "updatedAt": "2025-01-15T14:30:00Z"
}
```

### POST /workspaces/:workspaceId/pools

Create a new team pool.

**Request:**

```json
{
  "name": "Support Tier 2",
  "description": "Advanced support specialists",
  "type": "functional",
  "color": "green",
  "icon": "Headphones",
  "memberIds": ["usr_6", "usr_7"],
  "settings": {
    "autoAssignment": true,
    "roundRobin": true,
    "loadBalancing": true,
    "notifyOnAssignment": true
  }
}
```

**Response:** `201 Created`

```json
{
  "pool": {
    "id": "pool_support_t2",
    "name": "Support Tier 2",
    "description": "Advanced support specialists",
    "type": "functional",
    "color": "green",
    "icon": "Headphones",
    "memberIds": ["usr_6", "usr_7"],
    "settings": {
      "autoAssignment": true,
      "roundRobin": true,
      "loadBalancing": true,
      "notifyOnAssignment": true
    },
    "stats": {
      "activeMembers": 2,
      "totalAssignments": 0,
      "avgResponseTime": "0h",
      "currentLoad": 0
    },
    "createdBy": {
      "id": "usr_admin",
      "name": "Admin User"
    },
    "createdAt": "2025-01-15T15:00:00Z",
    "updatedAt": "2025-01-15T15:00:00Z"
  }
}
```

### PATCH /workspaces/:workspaceId/pools/:poolId

Update pool settings or members.

**Request:**

```json
{
  "name": "Support Tier 2 - Updated",
  "description": "Advanced support and escalation team",
  "settings": {
    "autoAssignment": true,
    "roundRobin": false,
    "loadBalancing": true,
    "notifyOnAssignment": true
  }
}
```

**Response:** `200 OK` (returns updated pool)

### POST /workspaces/:workspaceId/pools/:poolId/members

Add member to pool.

**Request:**

```json
{
  "userId": "usr_8"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Member added to pool",
  "pool": {
    "id": "pool_support_t2",
    "memberIds": ["usr_6", "usr_7", "usr_8"]
  }
}
```

### DELETE /workspaces/:workspaceId/pools/:poolId/members/:userId

Remove member from pool.

**Response:** `204 No Content`

### DELETE /workspaces/:workspaceId/pools/:poolId

Delete a pool.

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

## 📝 Audit Logs

### GET /workspaces/:workspaceId/audit-logs

Get audit logs for workspace.

**Query Parameters:**

- `action`: `workflow.created|workflow.updated|workflow.deleted|workflow.executed|integration.connected|integration.disconnected|member.invited|member.removed|approval.approved|approval.rejected|settings.updated`
- `userId`: filter by user who performed action
- `resourceType`: `workflow|integration|member|approval|settings`
- `resourceId`: specific resource ID
- `severity`: `info|warning|error|critical`
- `startDate`, `endDate`: date range
- `search`: search term
- `page`, `limit`

**Response:** `200 OK`

```json
{
  "logs": [
    {
      "id": "log_abc123",
      "action": "workflow.executed",
      "resourceType": "workflow",
      "resourceId": "wf_abc",
      "resourceName": "Employee Onboarding",
      "description": "Workflow executed successfully",
      "severity": "info",
      "user": {
        "id": "usr_abc",
        "name": "John Smith",
        "email": "john@acme.com",
        "avatar": "https://..."
      },
      "metadata": {
        "executionId": "exec_xyz",
        "duration": "8.5 days",
        "status": "completed",
        "triggeredBy": "webhook"
      },
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2025-01-15T14:30:00Z"
    },
    {
      "id": "log_def456",
      "action": "integration.connected",
      "resourceType": "integration",
      "resourceId": "inst_slack",
      "resourceName": "Slack - Engineering",
      "description": "Integration connected successfully",
      "severity": "info",
      "user": {
        "id": "usr_abc",
        "name": "John Smith",
        "email": "john@acme.com"
      },
      "metadata": {
        "appId": "int_slack",
        "appName": "Slack",
        "authType": "oauth2"
      },
      "ipAddress": "192.168.1.100",
      "timestamp": "2025-01-15T10:00:00Z"
    },
    {
      "id": "log_ghi789",
      "action": "approval.approved",
      "resourceType": "approval",
      "resourceId": "apr_123",
      "resourceName": "Equipment Purchase Approval",
      "description": "Approval request approved",
      "severity": "info",
      "user": {
        "id": "usr_xyz",
        "name": "Manager Name",
        "email": "manager@acme.com"
      },
      "metadata": {
        "workflowId": "wf_abc",
        "executionId": "exec_xyz",
        "decision": "approved",
        "comment": "Approved - standard equipment"
      },
      "timestamp": "2025-01-15T12:30:00Z"
    },
    {
      "id": "log_jkl012",
      "action": "workflow.deleted",
      "resourceType": "workflow",
      "resourceId": "wf_old",
      "resourceName": "Old Workflow",
      "description": "Workflow deleted",
      "severity": "warning",
      "user": {
        "id": "usr_abc",
        "name": "John Smith",
        "email": "john@acme.com"
      },
      "metadata": {
        "reason": "No longer needed",
        "hadActiveExecutions": false
      },
      "timestamp": "2025-01-14T16:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1247,
    "totalPages": 25
  },
  "summary": {
    "totalLogs": 1247,
    "bySeverity": {
      "info": 1100,
      "warning": 120,
      "error": 25,
      "critical": 2
    },
    "byAction": {
      "workflow.executed": 850,
      "workflow.created": 45,
      "workflow.updated": 120,
      "integration.connected": 15,
      "approval.approved": 180
    }
  }
}
```

### GET /workspaces/:workspaceId/audit-logs/:logId

Get detailed audit log entry.

**Response:** `200 OK`

```json
{
  "id": "log_abc123",
  "action": "workflow.executed",
  "resourceType": "workflow",
  "resourceId": "wf_abc",
  "resourceName": "Employee Onboarding",
  "description": "Workflow executed successfully",
  "severity": "info",
  "user": {
    "id": "usr_abc",
    "name": "John Smith",
    "email": "john@acme.com",
    "avatar": "https://...",
    "role": "admin"
  },
  "metadata": {
    "executionId": "exec_xyz",
    "duration": "8.5 days",
    "status": "completed",
    "triggeredBy": "webhook",
    "input": {
      "employee": {
        "name": "Sarah Johnson"
      }
    },
    "output": {
      "success": true
    }
  },
  "context": {
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
    "location": {
      "country": "US",
      "city": "San Francisco"
    },
    "device": "desktop"
  },
  "changes": [
    {
      "field": "status",
      "oldValue": "running",
      "newValue": "completed"
    }
  ],
  "relatedLogs": [
    {
      "id": "log_related1",
      "action": "workflow.started",
      "timestamp": "2025-01-07T10:00:00Z"
    }
  ],
  "timestamp": "2025-01-15T14:30:00Z"
}
```

### POST /workspaces/:workspaceId/audit-logs/export

Export audit logs.

**Request:**

```json
{
  "format": "csv",
  "filters": {
    "action": "workflow.executed",
    "startDate": "2025-01-01T00:00:00Z",
    "endDate": "2025-01-31T23:59:59Z"
  },
  "fields": ["timestamp", "action", "user", "resourceName", "severity"]
}
```

**Response:** `200 OK`

```json
{
  "exportId": "exp_abc123",
  "status": "processing",
  "format": "csv",
  "estimatedSize": "2.5 MB",
  "estimatedTime": "30 seconds",
  "downloadUrl": null,
  "expiresAt": null,
  "createdAt": "2025-01-15T15:00:00Z"
}
```

### GET /workspaces/:workspaceId/audit-logs/exports/:exportId

Check export status and get download link.

**Response:** `200 OK`

```json
{
  "exportId": "exp_abc123",
  "status": "completed",
  "format": "csv",
  "size": "2.3 MB",
  "recordCount": 1247,
  "downloadUrl": "https://cdn.swiftflow.ai/exports/exp_abc123.csv",
  "expiresAt": "2025-01-16T15:00:00Z",
  "createdAt": "2025-01-15T15:00:00Z",
  "completedAt": "2025-01-15T15:00:25Z"
}
```

### GET /workspaces/:workspaceId/audit-logs/stats

Get audit log statistics.

**Query Parameters:**

- `period`: `7d|30d|90d|1y|custom`
- `startDate`, `endDate`: for custom period

**Response:** `200 OK`

```json
{
  "period": "30d",
  "totalLogs": 1247,
  "bySeverity": {
    "info": 1100,
    "warning": 120,
    "error": 25,
    "critical": 2
  },
  "byAction": {
    "workflow.executed": 850,
    "workflow.created": 45,
    "workflow.updated": 120,
    "workflow.deleted": 5,
    "integration.connected": 15,
    "integration.disconnected": 3,
    "approval.approved": 180,
    "approval.rejected": 12,
    "member.invited": 8,
    "member.removed": 2,
    "settings.updated": 7
  },
  "byUser": [
    {
      "userId": "usr_abc",
      "userName": "John Smith",
      "actionCount": 450
    },
    {
      "userId": "usr_xyz",
      "userName": "Sarah Lee",
      "actionCount": 320
    }
  ],
  "topResources": [
    {
      "resourceType": "workflow",
      "resourceId": "wf_abc",
      "resourceName": "Employee Onboarding",
      "actionCount": 127
    }
  ],
  "timeline": [
    {
      "date": "2025-01-15",
      "total": 42,
      "info": 38,
      "warning": 3,
      "error": 1,
      "critical": 0
    }
  ],
  "anomalies": [
    {
      "type": "unusual_activity",
      "description": "High number of failed executions detected",
      "severity": "warning",
      "count": 15,
      "date": "2025-01-14"
    }
  ]
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
