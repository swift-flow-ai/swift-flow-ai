import { WorkspaceAnalytics } from "../../types/workspace";

/**
 * Enhanced Analytics Data Generator
 * Creates realistic analytics based on actual workflows and integrations
 */

// Workflow execution patterns (based on actual workflow complexity and usage)
const WORKFLOW_PATTERNS = {
  wf_onboarding: {
    avgExecutionsPerDay: 4,
    successRate: 0.92,
    avgDurationHours: 48, // 2 days
    costPerExecution: 12.5,
    peakDays: [1, 2, 3], // Monday-Wednesday (new hires)
  },
  wf_recruitment: {
    avgExecutionsPerDay: 8,
    successRate: 0.89,
    avgDurationHours: 72, // 3 days
    costPerExecution: 18.75,
    peakDays: [1, 2, 3, 4], // Monday-Thursday
  },
  wf_support: {
    avgExecutionsPerDay: 45,
    successRate: 0.94,
    avgDurationHours: 0.25, // 15 minutes
    costPerExecution: 1.25,
    peakDays: [1, 2, 3, 4, 5], // Weekdays
  },
  wf_invoice: {
    avgExecutionsPerDay: 15,
    successRate: 0.98,
    avgDurationHours: 2.5,
    costPerExecution: 4.0,
    peakDays: [4, 5], // Thursday-Friday (end of week approvals)
  },
  wf_lead: {
    avgExecutionsPerDay: 32,
    successRate: 0.96,
    avgDurationHours: 0.083, // 5 minutes
    costPerExecution: 0.75,
    peakDays: [1, 2, 3], // Early week
  },
  wf_content: {
    avgExecutionsPerDay: 12,
    successRate: 0.91,
    avgDurationHours: 6,
    costPerExecution: 5.0,
    peakDays: [1, 4], // Monday and Thursday
  },
  wf_procurement: {
    avgExecutionsPerDay: 6,
    successRate: 0.95,
    avgDurationHours: 24,
    costPerExecution: 8.5,
    peakDays: [1, 2],
  },
  wf_customer_onboarding: {
    avgExecutionsPerDay: 18,
    successRate: 0.93,
    avgDurationHours: 12,
    costPerExecution: 6.25,
    peakDays: [1, 2, 3, 4, 5],
  },
  wf_expense_report: {
    avgExecutionsPerDay: 22,
    successRate: 0.97,
    avgDurationHours: 1.5,
    costPerExecution: 2.5,
    peakDays: [4, 5], // End of week
  },
  wf_contract_review: {
    avgExecutionsPerDay: 5,
    successRate: 0.88,
    avgDurationHours: 48,
    costPerExecution: 15.0,
    peakDays: [1, 2, 3],
  },
  wf_it_provisioning: {
    avgExecutionsPerDay: 7,
    successRate: 0.94,
    avgDurationHours: 4,
    costPerExecution: 7.5,
    peakDays: [1], // Monday (new starters)
  },
};

// Generate realistic execution data for last 30 days
const generateTimelineData = () => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

    let totalExecutions = 0;
    let totalSuccessful = 0;
    let totalCost = 0;

    // Calculate executions for each workflow based on day of week
    Object.entries(WORKFLOW_PATTERNS).forEach(([, pattern]) => {
      // Weekend reduction (80% less traffic)
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekendMultiplier = isWeekend ? 0.2 : 1.0;

      // Peak day bonus (30% more traffic)
      const isPeakDay = pattern.peakDays.includes(dayOfWeek);
      const peakMultiplier = isPeakDay ? 1.3 : 1.0;

      // Random variation (±20%)
      const randomMultiplier = 0.8 + Math.random() * 0.4;

      const executions = Math.round(
        pattern.avgExecutionsPerDay *
          weekendMultiplier *
          peakMultiplier *
          randomMultiplier
      );

      const successful = Math.round(executions * pattern.successRate);
      const cost = executions * pattern.costPerExecution;

      totalExecutions += executions;
      totalSuccessful += successful;
      totalCost += cost;
    });

    data.push({
      date: dateStr,
      executions: totalExecutions,
      successful: totalSuccessful,
      failed: totalExecutions - totalSuccessful,
      cost: parseFloat(totalCost.toFixed(2)),
    });
  }

  return data;
};

// Generate success rate timeline with realistic patterns
const generateSuccessRateTimeline = () => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    // Base success rate around 93% with small variations
    const baseRate = 93;
    const variation = (Math.random() - 0.5) * 4; // ±2%
    const rate = Math.max(88, Math.min(98, baseRate + variation));

    data.push({
      date: dateStr,
      rate: parseFloat(rate.toFixed(1)),
    });
  }

  return data;
};

// Generate cost timeline
const generateCostTimeline = () => {
  const timelineData = generateTimelineData();
  return timelineData.map((day) => ({
    date: day.date,
    cost: day.cost,
  }));
};

// Calculate total metrics from timeline data
const calculateMetrics = (
  timelineData: ReturnType<typeof generateTimelineData>
) => {
  const totalExecutions = timelineData.reduce(
    (sum, day) => sum + day.executions,
    0
  );
  const totalSuccessful = timelineData.reduce(
    (sum, day) => sum + day.successful,
    0
  );
  const totalCost = timelineData.reduce((sum, day) => sum + day.cost, 0);
  const successRate = (totalSuccessful / totalExecutions) * 100;

  // Calculate average duration (weighted by workflow executions)
  let totalDurationHours = 0;
  let totalWeightedExecutions = 0;

  Object.entries(WORKFLOW_PATTERNS).forEach(([, pattern]) => {
    const executions = pattern.avgExecutionsPerDay * 30;
    totalDurationHours += executions * pattern.avgDurationHours;
    totalWeightedExecutions += executions;
  });

  const avgDurationHours = totalDurationHours / totalWeightedExecutions;

  // Calculate time saved (assuming manual process takes 5x longer)
  const manualTimeHours = totalWeightedExecutions * avgDurationHours * 5;
  const automatedTimeHours = totalWeightedExecutions * avgDurationHours;
  const timeSavedHours = manualTimeHours - automatedTimeHours;

  // Calculate ROI (assuming $50/hour labor cost)
  const laborCostSaved = timeSavedHours * 50;
  const roi = ((laborCostSaved - totalCost) / totalCost) * 100;

  return {
    totalExecutions,
    successRate: parseFloat(successRate.toFixed(1)),
    avgDuration: formatDuration(avgDurationHours),
    totalCost: parseFloat(totalCost.toFixed(2)),
    timeSaved: `${Math.round(timeSavedHours).toLocaleString()} hours`,
    roi: Math.round(roi),
  };
};

// Format duration in human-readable format
const formatDuration = (hours: number): string => {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`;
  } else if (hours < 24) {
    return `${hours.toFixed(1)}h`;
  } else {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    if (remainingHours === 0) {
      return `${days}d`;
    }
    return `${days}d ${remainingHours.toFixed(0)}h`;
  }
};

// Calculate trends (comparing last 7 days vs previous 7 days)
const calculateTrends = (
  timelineData: ReturnType<typeof generateTimelineData>
) => {
  const last7Days = timelineData.slice(-7);
  const previous7Days = timelineData.slice(-14, -7);

  const last7Executions = last7Days.reduce(
    (sum, day) => sum + day.executions,
    0
  );
  const prev7Executions = previous7Days.reduce(
    (sum, day) => sum + day.executions,
    0
  );
  const executionsChange =
    ((last7Executions - prev7Executions) / prev7Executions) * 100;

  const last7Success =
    (last7Days.reduce((sum, day) => sum + day.successful, 0) /
      last7Executions) *
    100;
  const prev7Success =
    (previous7Days.reduce((sum, day) => sum + day.successful, 0) /
      prev7Executions) *
    100;
  const successRateChange = last7Success - prev7Success;

  const last7Cost = last7Days.reduce((sum, day) => sum + day.cost, 0);
  const prev7Cost = previous7Days.reduce((sum, day) => sum + day.cost, 0);
  const costChange = ((last7Cost - prev7Cost) / prev7Cost) * 100;

  return {
    executionsChange: parseFloat(executionsChange.toFixed(1)),
    successRateChange: parseFloat(successRateChange.toFixed(1)),
    costChange: parseFloat(costChange.toFixed(1)),
  };
};

// Generate top workflows data
const generateTopWorkflows = () => {
  return Object.entries(WORKFLOW_PATTERNS)
    .map(([id, pattern]) => {
      const executions = Math.round(pattern.avgExecutionsPerDay * 30);
      const successful = Math.round(executions * pattern.successRate);
      const successRate = (successful / executions) * 100;
      const cost = executions * pattern.costPerExecution;

      // Workflow names mapping
      const names: Record<string, string> = {
        wf_onboarding: "Employee Onboarding",
        wf_recruitment: "Interview Coordination",
        wf_support: "Customer Support Ticket",
        wf_invoice: "Invoice Approval",
        wf_lead: "Lead Distribution",
        wf_content: "Content Approval",
        wf_procurement: "Procurement Request",
        wf_customer_onboarding: "Customer Onboarding",
        wf_expense_report: "Expense Report",
        wf_contract_review: "Contract Review",
        wf_it_provisioning: "IT Provisioning",
      };

      return {
        id,
        name: names[id] || id,
        executions,
        successRate: parseFloat(successRate.toFixed(1)),
        avgDuration: formatDuration(pattern.avgDurationHours),
        cost: parseFloat(cost.toFixed(2)),
      };
    })
    .sort((a, b) => b.executions - a.executions);
};

// Generate realistic bottlenecks based on workflow patterns
const generateBottlenecks = () => {
  return [
    {
      workflowId: "wf_recruitment",
      workflowName: "Interview Coordination",
      nodeId: "node_7",
      nodeName: "Interviewer Availability Check",
      avgDelay: "18.5 hours",
      impact: "high" as const,
      recommendation:
        "Implement calendar integration with real-time availability or expand interviewer pool",
    },
    {
      workflowId: "wf_contract_review",
      workflowName: "Contract Review",
      nodeId: "node_4",
      nodeName: "Legal Team Review",
      avgDelay: "12.3 hours",
      impact: "high" as const,
      recommendation:
        "Add AI-powered contract analysis for initial screening or assign backup reviewers",
    },
    {
      workflowId: "wf_onboarding",
      workflowName: "Employee Onboarding",
      nodeId: "node_4",
      nodeName: "IT Manager Approval",
      avgDelay: "6.8 hours",
      impact: "medium" as const,
      recommendation:
        "Enable auto-approval for standard equipment requests or add backup approver",
    },
    {
      workflowId: "wf_invoice",
      workflowName: "Invoice Approval",
      nodeId: "node_5",
      nodeName: "CFO Approval",
      avgDelay: "4.2 hours",
      impact: "medium" as const,
      recommendation:
        "Implement tiered approval: auto-approve under $5k, manager approval $5k-$50k, CFO above $50k",
    },
    {
      workflowId: "wf_content",
      workflowName: "Content Approval",
      nodeId: "node_3",
      nodeName: "Compliance Review",
      avgDelay: "3.5 hours",
      impact: "medium" as const,
      recommendation:
        "Deploy AI compliance checker for pre-screening common issues",
    },
    {
      workflowId: "wf_procurement",
      workflowName: "Procurement Request",
      nodeId: "node_6",
      nodeName: "Vendor Quote Collection",
      avgDelay: "8.7 hours",
      impact: "medium" as const,
      recommendation: "Integrate with vendor APIs for automated quote requests",
    },
    {
      workflowId: "wf_support",
      workflowName: "Customer Support Ticket",
      nodeId: "node_2",
      nodeName: "AI Classification",
      avgDelay: "42 seconds",
      impact: "low" as const,
      recommendation:
        "Optimize AI model inference time or cache common classifications",
    },
    {
      workflowId: "wf_customer_onboarding",
      workflowName: "Customer Onboarding",
      nodeId: "node_5",
      nodeName: "Account Setup Verification",
      avgDelay: "2.1 hours",
      impact: "low" as const,
      recommendation:
        "Implement automated verification checks to reduce manual review time",
    },
  ];
};

// Integration usage breakdown
const generateIntegrationMetrics = () => {
  return [
    {
      integrationId: "slack",
      name: "Slack",
      calls: 4235,
      cost: 211.75,
      avgLatency: "245ms",
      successRate: 99.2,
    },
    {
      integrationId: "gmail",
      name: "Gmail",
      calls: 3892,
      cost: 389.2,
      avgLatency: "680ms",
      successRate: 98.8,
    },
    {
      integrationId: "google-calendar",
      name: "Google Calendar",
      calls: 2156,
      cost: 215.6,
      avgLatency: "520ms",
      successRate: 97.5,
    },
    {
      integrationId: "openai",
      name: "OpenAI",
      calls: 1847,
      cost: 2216.4,
      avgLatency: "3.2s",
      successRate: 96.3,
    },
    {
      integrationId: "jira",
      name: "Jira",
      calls: 1523,
      cost: 152.3,
      avgLatency: "890ms",
      successRate: 98.1,
    },
    {
      integrationId: "github",
      name: "GitHub",
      calls: 892,
      cost: 89.2,
      avgLatency: "450ms",
      successRate: 99.5,
    },
    {
      integrationId: "anthropic",
      name: "Anthropic",
      calls: 645,
      cost: 967.5,
      avgLatency: "2.8s",
      successRate: 97.8,
    },
    {
      integrationId: "calendly",
      name: "Calendly",
      calls: 523,
      cost: 52.3,
      avgLatency: "380ms",
      successRate: 98.9,
    },
  ];
};

// Generate the complete analytics object
const timelineData = generateTimelineData();
const metrics = calculateMetrics(timelineData);
const trends = calculateTrends(timelineData);

export const mockWorkspaceAnalytics: WorkspaceAnalytics = {
  period: "30d",
  metrics,
  trends,
  executionTimeline: timelineData,
  successRateTimeline: generateSuccessRateTimeline(),
  costTimeline: generateCostTimeline(),
  topWorkflows: generateTopWorkflows(),
  bottlenecks: generateBottlenecks(),
  integrationMetrics: generateIntegrationMetrics(),
};

export function getWorkspaceAnalytics(): WorkspaceAnalytics {
  return mockWorkspaceAnalytics;
}
