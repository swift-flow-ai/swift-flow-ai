import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Target,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { analyticsService } from '../../services/analytics.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { WorkspaceAnalytics } from '../../types';
import { cn } from '../../utils';

export function AnalyticsDashboard() {
  const { currentWorkspace } = useWorkspace();
  const [analytics, setAnalytics] = useState<WorkspaceAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    if (currentWorkspace) {
      loadAnalytics();
    }
  }, [currentWorkspace, period]);

  const loadAnalytics = async () => {
    if (!currentWorkspace) return;

    setIsLoading(true);
    try {
      const data = await analyticsService.getWorkspaceAnalytics(currentWorkspace.id, period);
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-muted-foreground';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No analytics data available</h3>
        <p className="text-muted-foreground">Start running workflows to see analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Workspace performance insights and trends
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                period === p
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {p === '7d' && 'Last 7 days'}
              {p === '30d' && 'Last 30 days'}
              {p === '90d' && 'Last 90 days'}
              {p === '1y' && 'Last year'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Executions</p>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{formatNumber(analytics.metrics.totalExecutions)}</p>
          <div className="flex items-center gap-2 mt-2">
            {getTrendIcon(analytics.trends.executionsChange)}
            <span className={cn('text-sm font-medium', getTrendColor(analytics.trends.executionsChange))}>
              {Math.abs(analytics.trends.executionsChange)}% vs last period
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold">{analytics.metrics.successRate}%</p>
          <div className="flex items-center gap-2 mt-2">
            {getTrendIcon(analytics.trends.successRateChange)}
            <span className={cn('text-sm font-medium', getTrendColor(analytics.trends.successRateChange))}>
              {Math.abs(analytics.trends.successRateChange)}% vs last period
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Cost</p>
            <DollarSign className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold">{formatCurrency(analytics.metrics.totalCost)}</p>
          <div className="flex items-center gap-2 mt-2">
            {getTrendIcon(-analytics.trends.costChange)}
            <span className={cn('text-sm font-medium', getTrendColor(-analytics.trends.costChange))}>
              {Math.abs(analytics.trends.costChange)}% vs last period
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">ROI</p>
            <Target className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold">{analytics.metrics.roi}%</p>
          <p className="text-sm text-muted-foreground mt-2">
            {analytics.metrics.timeSaved} saved
          </p>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Execution Timeline */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Execution Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.executionTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="successful"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="Successful"
              />
              <Area
                type="monotone"
                dataKey="failed"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
                name="Failed"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Success Rate Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Success Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.successRateTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis
                domain={[80, 100]}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Success Rate']}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Analysis */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Cost Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.costTimeline.slice(-14)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Cost']}
              />
              <Bar dataKey="cost" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Workflows */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Top Workflows by Executions</h3>
          <div className="space-y-4">
            {analytics.topWorkflows.map((workflow, index) => (
              <div key={workflow.id} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{workflow.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {workflow.executions} runs • {workflow.successRate}% success
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(workflow.cost)}</p>
                  <p className="text-xs text-muted-foreground">{workflow.avgDuration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottlenecks */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold">Identified Bottlenecks</h3>
        </div>
        <div className="space-y-4">
          {analytics.bottlenecks.map((bottleneck, index) => (
            <motion.div
              key={`${bottleneck.workflowId}-${bottleneck.nodeId}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-border"
            >
              <div className="flex-shrink-0">
                <div
                  className={cn(
                    'w-2 h-2 rounded-full mt-2',
                    bottleneck.impact === 'high' && 'bg-red-500',
                    bottleneck.impact === 'medium' && 'bg-yellow-500',
                    bottleneck.impact === 'low' && 'bg-blue-500'
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{bottleneck.workflowName}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <p className="text-sm text-muted-foreground">{bottleneck.nodeName}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Average delay: <span className="font-medium text-foreground">{bottleneck.avgDelay}</span>
                </p>
                <div className="flex items-start gap-2 bg-card p-3 rounded-lg">
                  <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{bottleneck.recommendation}</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span
                  className={cn(
                    'inline-flex px-2.5 py-1 rounded-md text-xs font-medium',
                    bottleneck.impact === 'high' && 'bg-red-500/10 text-red-600 dark:text-red-400',
                    bottleneck.impact === 'medium' && 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
                    bottleneck.impact === 'low' && 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  )}
                >
                  {bottleneck.impact} impact
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

