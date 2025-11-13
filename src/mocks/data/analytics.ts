import { WorkspaceAnalytics } from "../../types/workspace";

// Generate realistic execution data for last 30 days
const generateTimelineData = () => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    data.push({
      date: dateStr,
      executions: 0,
      successful: 0,
      failed: 0,
      cost: 0,
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

    data.push({
      date: dateStr,
      rate: 0,
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
const calculateMetrics = () => {
  return {
    totalExecutions: 0,
    successRate: 0,
    avgDuration: "0",
    totalCost: 0,
    timeSaved: "0 hours",
    roi: 0,
  };
};

// Calculate trends (comparing last 7 days vs previous 7 days)
const calculateTrends = () => {
  return {
    executionsChange: 0,
    successRateChange: 0,
    costChange: 0,
  };
};

// Generate top workflows data
const generateTopWorkflows = () => {
  return [];
};

// Generate realistic bottlenecks based on workflow patterns
const generateBottlenecks = () => {
  return [];
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
const metrics = calculateMetrics();
const trends = calculateTrends();

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
