import { WorkspaceAnalytics } from '../../types/workspace';

// Generate last 30 days of data
const generateTimelineData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Simulate varying execution volumes
    const baseExecutions = 15 + Math.floor(Math.random() * 20);
    const successful = Math.floor(baseExecutions * (0.85 + Math.random() * 0.12));
    const failed = baseExecutions - successful;
    const cost = baseExecutions * (8 + Math.random() * 4);
    
    data.push({
      date: dateStr,
      executions: baseExecutions,
      successful,
      failed,
      cost: parseFloat(cost.toFixed(2)),
    });
  }
  return data;
};

const generateSuccessRateTimeline = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Simulate success rate between 85-98%
    const rate = 85 + Math.random() * 13;
    
    data.push({
      date: dateStr,
      rate: parseFloat(rate.toFixed(1)),
    });
  }
  return data;
};

const generateCostTimeline = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Simulate daily costs
    const cost = 120 + Math.random() * 80;
    
    data.push({
      date: dateStr,
      cost: parseFloat(cost.toFixed(2)),
    });
  }
  return data;
};

export const mockWorkspaceAnalytics: WorkspaceAnalytics = {
  period: '30d',
  metrics: {
    totalExecutions: 1524,
    successRate: 92.3,
    avgDuration: '4.5h',
    totalCost: 5287.50,
    timeSaved: '2,145 hours',
    roi: 340,
  },
  trends: {
    executionsChange: 15.2,
    successRateChange: 3.1,
    costChange: -8.5,
  },
  executionTimeline: generateTimelineData(),
  successRateTimeline: generateSuccessRateTimeline(),
  costTimeline: generateCostTimeline(),
  topWorkflows: [
    {
      id: 'wf_support',
      name: 'Support Ticket Routing',
      executions: 523,
      successRate: 94.3,
      avgDuration: '15m',
      cost: 785.50,
    },
    {
      id: 'wf_invoice',
      name: 'Invoice Approval',
      executions: 456,
      successRate: 98.2,
      avgDuration: '2.3h',
      cost: 1824.00,
    },
    {
      id: 'wf_lead',
      name: 'Lead Distribution',
      executions: 289,
      successRate: 96.7,
      avgDuration: '5m',
      cost: 433.50,
    },
    {
      id: 'wf_onboarding',
      name: 'Employee Onboarding',
      executions: 127,
      successRate: 92.1,
      avgDuration: '8.5 days',
      cost: 1587.50,
    },
    {
      id: 'wf_content',
      name: 'Content Approval',
      executions: 129,
      successRate: 91.5,
      avgDuration: '6h',
      cost: 645.00,
    },
  ],
  bottlenecks: [
    {
      workflowId: 'wf_onboarding',
      workflowName: 'Employee Onboarding',
      nodeId: 'node_4',
      nodeName: 'IT Manager Approval',
      avgDelay: '6.2 hours',
      impact: 'high',
      recommendation: 'Add backup approver or increase SLA timeout',
    },
    {
      workflowId: 'wf_invoice',
      workflowName: 'Invoice Approval',
      nodeId: 'node_5',
      nodeName: 'CFO Approval',
      avgDelay: '4.5 hours',
      impact: 'medium',
      recommendation: 'Enable auto-approval for amounts under $10k',
    },
    {
      workflowId: 'wf_content',
      workflowName: 'Content Approval',
      nodeId: 'node_3',
      nodeName: 'Compliance Check',
      avgDelay: '3.8 hours',
      impact: 'medium',
      recommendation: 'Implement AI-powered compliance pre-check',
    },
    {
      workflowId: 'wf_support',
      workflowName: 'Support Ticket Routing',
      nodeId: 'node_2',
      nodeName: 'AI Classification',
      avgDelay: '45 seconds',
      impact: 'low',
      recommendation: 'Optimize AI model for faster inference',
    },
  ],
};

export function getWorkspaceAnalytics(): WorkspaceAnalytics {
  return mockWorkspaceAnalytics;
}

