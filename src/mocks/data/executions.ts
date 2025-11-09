import { WorkflowExecution } from '../../types/workspace';

export const mockExecutions: WorkflowExecution[] = [
  {
    id: 'exec_001',
    workflowId: 'wf_onboarding',
    workflowName: 'Employee Onboarding',
    status: 'running',
    progress: 60,
    currentNode: 'Manager Approval',
    input: {
      employee: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'Software Engineer',
        startDate: '2025-02-01',
      },
    },
    trace: [
      {
        nodeId: '1',
        nodeName: 'New Hire Webhook',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
        duration: 1.2,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            level: 'info',
            message: 'Webhook received from HR system',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
            level: 'info',
            message: 'Employee data validated successfully',
          },
        ],
      },
      {
        nodeId: '2',
        nodeName: 'Create Email Account',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        duration: 4.3,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
            level: 'info',
            message: 'Connecting to Google Workspace API',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 27).toISOString(),
            level: 'info',
            message: 'Creating email account: sarah.johnson@company.com',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
            level: 'info',
            message: 'Email account created successfully',
          },
        ],
      },
      {
        nodeId: '3',
        nodeName: 'Send Welcome Email',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
        duration: 2.1,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
            level: 'info',
            message: 'Preparing welcome email template',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
            level: 'info',
            message: 'Welcome email sent to sarah.johnson@company.com',
          },
        ],
      },
      {
        nodeId: '4',
        nodeName: 'Manager Approval',
        status: 'running',
        startedAt: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
            level: 'info',
            message: 'Approval request sent to manager: john.smith@company.com',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
            level: 'info',
            message: 'Reminder sent to approver',
          },
        ],
      },
      {
        nodeId: '5',
        nodeName: 'Assign Buddy',
        status: 'pending',
      },
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    estimatedCompletion: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    triggeredBy: {
      type: 'webhook',
    },
  },
  {
    id: 'exec_002',
    workflowId: 'wf_invoice',
    workflowName: 'Invoice Approval',
    status: 'completed',
    progress: 100,
    input: {
      invoice: {
        number: 'INV-2025-001',
        vendor: 'Acme Supplies',
        amount: 3200,
        dueDate: '2025-02-15',
      },
    },
    output: {
      approved: true,
      paymentScheduled: '2025-02-10',
      paymentId: 'PAY-12345',
    },
    trace: [
      {
        nodeId: '1',
        nodeName: 'Invoice Received',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000).toISOString(),
        duration: 1.0,
      },
      {
        nodeId: '2',
        nodeName: 'Extract Invoice Data',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 5000).toISOString(),
        duration: 4.0,
      },
      {
        nodeId: '3',
        nodeName: 'Check Amount',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 5000).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 6000).toISOString(),
        duration: 1.0,
      },
      {
        nodeId: '4',
        nodeName: 'Manager Approval',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 6000).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        duration: 4500,
      },
      {
        nodeId: '6',
        nodeName: 'Process Payment',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 43).toISOString(),
        duration: 2.0,
      },
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 43).toISOString(),
    duration: '1h 17m',
    triggeredBy: {
      type: 'manual',
      user: { id: 'usr_john', name: 'John Smith' },
    },
  },
  {
    id: 'exec_003',
    workflowId: 'wf_support',
    workflowName: 'Support Ticket Routing',
    status: 'completed',
    progress: 100,
    input: {
      ticket: {
        id: 'TICKET-456',
        subject: 'Cannot access billing portal',
        priority: 'high',
      },
    },
    output: {
      assigned: true,
      team: 'billing',
      assignee: 'jane.doe@company.com',
    },
    startedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    duration: '5m',
    triggeredBy: {
      type: 'webhook',
    },
  },
  {
    id: 'exec_004',
    workflowId: 'wf_onboarding',
    workflowName: 'Employee Onboarding',
    status: 'failed',
    progress: 40,
    currentNode: 'Create Email Account',
    input: {
      employee: {
        name: 'Mike Wilson',
        email: 'mike.wilson@company.com',
        role: 'Product Manager',
      },
    },
    error: {
      message: 'Failed to create email account: Domain quota exceeded',
      nodeId: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    trace: [
      {
        nodeId: '1',
        nodeName: 'New Hire Webhook',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 5 + 1000).toISOString(),
        duration: 1.0,
      },
      {
        nodeId: '2',
        nodeName: 'Create Email Account',
        status: 'failed',
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 5 + 1000).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 5 + 5000).toISOString(),
        duration: 4.0,
        error: 'Domain quota exceeded',
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5 + 1000).toISOString(),
            level: 'info',
            message: 'Connecting to Google Workspace API',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5 + 3000).toISOString(),
            level: 'error',
            message: 'API Error: Domain quota exceeded. Cannot create new accounts.',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5 + 5000).toISOString(),
            level: 'error',
            message: 'Failed after 3 retry attempts',
          },
        ],
      },
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 5 + 5000).toISOString(),
    duration: '5s',
    triggeredBy: {
      type: 'manual',
      user: { id: 'usr_sarah', name: 'Sarah Lee' },
    },
  },
  {
    id: 'exec_005',
    workflowId: 'wf_invoice',
    workflowName: 'Invoice Approval',
    status: 'waiting',
    progress: 75,
    currentNode: 'CFO Approval',
    input: {
      invoice: {
        number: 'INV-2025-002',
        vendor: 'Tech Solutions Inc',
        amount: 15000,
        dueDate: '2025-02-20',
      },
    },
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    estimatedCompletion: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
    triggeredBy: {
      type: 'api',
    },
  },
  {
    id: 'exec_006',
    workflowId: 'wf_support',
    workflowName: 'Support Ticket Routing',
    status: 'queued',
    progress: 0,
    input: {
      ticket: {
        id: 'TICKET-789',
        subject: 'Feature request: Dark mode',
        priority: 'low',
      },
    },
    startedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    triggeredBy: {
      type: 'webhook',
    },
  },
  {
    id: 'exec_recruit_001',
    workflowId: 'wf_recruitment',
    workflowName: 'Interview Coordination',
    status: 'completed',
    progress: 100,
    input: {
      candidate: {
        name: 'Alex Martinez',
        email: 'alex.martinez@email.com',
        phone: '+1-555-0123',
        position: 'Senior Software Engineer',
        interviewType: 'Technical Round',
        preferredDates: ['2025-01-15', '2025-01-16', '2025-01-17'],
      },
    },
    output: {
      interviewScheduled: true,
      interviewer: 'John Smith',
      scheduledTime: '2025-01-16T14:00:00Z',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      calendarEventId: 'cal_event_123',
    },
    trace: [
      {
        nodeId: '1',
        nodeName: 'Manual Start',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 500).toISOString(),
        duration: 0.5,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            level: 'info',
            message: 'Workflow started by sarah@company.com',
          },
        ],
      },
      {
        nodeId: '3',
        nodeName: 'Select Interviewer from Pool',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 118).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 117).toISOString(),
        duration: 1.2,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 118).toISOString(),
            level: 'info',
            message: 'Checking HR Recruiters pool for available interviewers',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 117).toISOString(),
            level: 'info',
            message: 'Selected interviewer: John Smith (round-robin strategy)',
          },
        ],
      },
      {
        nodeId: '4',
        nodeName: 'Check Calendar Availability',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 117).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 115).toISOString(),
        duration: 2.1,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 117).toISOString(),
            level: 'info',
            message: 'Checking calendar availability for next 7 days',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 115).toISOString(),
            level: 'info',
            message: 'Found 5 common available time slots',
          },
        ],
      },
      {
        nodeId: '7',
        nodeName: 'AI - Generate Meeting Details',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 115).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 112).toISOString(),
        duration: 3.4,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 115).toISOString(),
            level: 'info',
            message: 'Generating personalized interview agenda using GPT-4',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 112).toISOString(),
            level: 'info',
            message: 'Interview agenda created with technical assessment topics',
          },
        ],
      },
      {
        nodeId: '8',
        nodeName: 'Create Calendar Event',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 112).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
        duration: 2.3,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 112).toISOString(),
            level: 'info',
            message: 'Creating Google Calendar event with Meet link',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
            level: 'info',
            message: 'Calendar event created: https://meet.google.com/abc-defg-hij',
          },
        ],
      },
      {
        nodeId: '9',
        nodeName: 'Send Confirmation to Candidate',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 109).toISOString(),
        duration: 1.1,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
            level: 'info',
            message: 'Sending confirmation email to alex.martinez@email.com',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 109).toISOString(),
            level: 'info',
            message: 'Email sent successfully with interview prep guide attachment',
          },
        ],
      },
      {
        nodeId: '13',
        nodeName: 'Notify HR Team',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 107).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 106).toISOString(),
        duration: 0.8,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 107).toISOString(),
            level: 'info',
            message: 'Posting notification to #hr-interviews Slack channel',
          },
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 106).toISOString(),
            level: 'info',
            message: 'Slack notification sent successfully',
          },
        ],
      },
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 106).toISOString(),
    triggeredBy: {
      type: 'manual',
      user: {
        id: 'usr_sarah',
        name: 'Sarah Lee',
      },
    },
  },
  {
    id: 'exec_recruit_002',
    workflowId: 'wf_recruitment',
    workflowName: 'Interview Coordination',
    status: 'running',
    progress: 45,
    currentNode: 'AI - Generate Meeting Details',
    input: {
      candidate: {
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        phone: '+1-555-0456',
        position: 'Product Manager',
        interviewType: 'Behavioral Round',
        preferredDates: ['2025-01-18', '2025-01-19'],
      },
    },
    trace: [
      {
        nodeId: '1',
        nodeName: 'Manual Start',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 15 + 300).toISOString(),
        duration: 0.3,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            level: 'info',
            message: 'Workflow started by sarah@company.com',
          },
        ],
      },
      {
        nodeId: '3',
        nodeName: 'Select Interviewer from Pool',
        status: 'completed',
        startedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 13).toISOString(),
        duration: 1.1,
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
            level: 'info',
            message: 'Selected interviewer: Alice Johnson from HR Recruiters pool',
          },
        ],
      },
      {
        nodeId: '7',
        nodeName: 'AI - Generate Meeting Details',
        status: 'running',
        startedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        logs: [
          {
            timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
            level: 'info',
            message: 'Generating interview agenda for Product Manager role...',
          },
        ],
      },
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    triggeredBy: {
      type: 'manual',
      user: {
        id: 'usr_sarah',
        name: 'Sarah Lee',
      },
    },
  },
];

export function getExecutionsByWorkspace(workflowId?: string, status?: string): WorkflowExecution[] {
  let executions = [...mockExecutions];

  if (workflowId) {
    executions = executions.filter((e) => e.workflowId === workflowId);
  }

  if (status) {
    executions = executions.filter((e) => e.status === status);
  }

  return executions;
}

export function getExecutionById(executionId: string): WorkflowExecution | undefined {
  return mockExecutions.find((e) => e.id === executionId);
}

