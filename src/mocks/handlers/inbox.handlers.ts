import { http, HttpResponse } from 'msw';
import { getApprovalsByWorkspace } from '../data/approvals';
import type { InboxItem, InboxResponse } from '../../services/inbox.service';

const BASE_URL = 'http://localhost:3000/api';

// Transform approval to inbox item
function approvalToInboxItem(approval: any): InboxItem {
  return {
    id: approval.id,
    type: 'approval',
    title: approval.title,
    description: approval.description,
    priority: approval.priority,
    read: false,
    createdAt: approval.createdAt,
    dueAt: approval.sla?.dueAt,
    workflowName: approval.workflowName,
    workflowId: approval.executionId,
    executionId: approval.executionId,
    submittedBy: approval.submittedBy,
    approval,
    actionUrl: `/app/inbox/${approval.id}`,
  };
}

// Mock additional inbox items
function generateMockItems(count: number): InboxItem[] {
  const types: InboxItem['type'][] = ['task', 'notification', 'workflow_error', 'workflow_success', 'comment'];
  const priorities: InboxItem['priority'][] = ['low', 'medium', 'high', 'critical'];
  
  // Use execution IDs that exist in mock data
  const validExecutionIds = ['exec_001', 'exec_002', 'exec_003', 'exec_004', 'exec_005', 'exec_006'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[i % types.length];
    const priority = priorities[i % priorities.length];
    const createdAt = new Date(Date.now() - i * 60 * 60 * 1000).toISOString();
    const executionId = validExecutionIds[i % validExecutionIds.length];
    
    return {
      id: `mock-${type}-${i}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
      description: `This is a ${type} item number ${i + 1}`,
      priority,
      read: i % 3 === 0,
      createdAt,
      workflowName: `Workflow ${i % 10}`,
      workflowId: `wf-${i % 10}`,
      executionId,
      submittedBy: { name: `User ${i % 5}` },
      actionUrl: `/app/executions/${executionId}`,
    };
  });
}

export const inboxHandlers = [
  // GET /workspaces/:workspaceId/inbox
  http.get(`${BASE_URL}/workspaces/:workspaceId/inbox`, ({ request, params }) => {
    const url = new URL(request.url);
    const { workspaceId } = params;
    
    // Parse query params
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    const search = url.searchParams.get('search') || '';
    const filter = url.searchParams.get('filter') || 'all';
    const sortBy = url.searchParams.get('sortBy') || 'newest';
    
    // Get approvals
    const approvals = getApprovalsByWorkspace();
    const approvalItems = approvals.map(approvalToInboxItem);
    
    // Generate mock items (in production, these would come from other services)
    const mockItems = generateMockItems(200); // Generate 200 mock items for testing
    
    // Combine all items
    let allItems = [...approvalItems, ...mockItems];
    
    // Apply search filter
    if (search) {
      const query = search.toLowerCase();
      allItems = allItems.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.workflowName?.toLowerCase().includes(query) ||
        item.submittedBy?.name.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (filter === 'unread') {
      allItems = allItems.filter(item => !item.read);
    } else if (filter === 'actionable') {
      allItems = allItems.filter(item => 
        item.type === 'approval' || 
        item.type === 'task' || 
        item.type === 'workflow_error'
      );
    }
    
    // Sort
    allItems.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'priority') {
        const priorityOrder = { critical: 1, high: 2, medium: 3, low: 4 };
        const aPriority = priorityOrder[a.priority];
        const bPriority = priorityOrder[b.priority];
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'dueDate') {
        const aDue = a.dueAt ? new Date(a.dueAt).getTime() : Infinity;
        const bDue = b.dueAt ? new Date(b.dueAt).getTime() : Infinity;
        return aDue - bDue;
      }
      return 0;
    });
    
    // Paginate
    const total = allItems.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = allItems.slice(startIndex, endIndex);
    
    const response: InboxResponse = {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
      stats: {
        total: allItems.length,
        unread: allItems.filter(item => !item.read).length,
        actionable: allItems.filter(item => 
          item.type === 'approval' || item.type === 'task' || item.type === 'workflow_error'
        ).length,
      },
    };
    
    return HttpResponse.json(response);
  }),

  // POST /workspaces/:workspaceId/inbox/mark-read
  http.post(`${BASE_URL}/workspaces/:workspaceId/inbox/mark-read`, async ({ request }) => {
    const body = await request.json() as { itemIds: string[] };
    
    return HttpResponse.json({
      success: true,
      markedCount: body.itemIds.length,
    });
  }),

  // POST /workspaces/:workspaceId/inbox/mark-all-read
  http.post(`${BASE_URL}/workspaces/:workspaceId/inbox/mark-all-read`, () => {
    return HttpResponse.json({
      success: true,
    });
  }),

  // GET /workspaces/:workspaceId/inbox/stats
  http.get(`${BASE_URL}/workspaces/:workspaceId/inbox/stats`, () => {
    const approvals = getApprovalsByWorkspace();
    const approvalItems = approvals.map(approvalToInboxItem);
    const mockItems = generateMockItems(200);
    const allItems = [...approvalItems, ...mockItems];
    
    return HttpResponse.json({
      total: allItems.length,
      unread: allItems.filter(item => !item.read).length,
      actionable: allItems.filter(item => 
        item.type === 'approval' || item.type === 'task' || item.type === 'workflow_error'
      ).length,
    });
  }),
];

