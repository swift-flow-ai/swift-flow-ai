import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Activity,
  AlertTriangle,
  DollarSign,
  Target,
} from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';
import { workflowService } from '../../services/workflow.service';
import { Workflow } from '../../types';
import {
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

export function WorkflowAnalytics() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock analytics data (in production, this would come from the API)
  const [analytics] = useState({
    overview: {
      totalExecutions: 89,
      successRate: 96.6,
      avgDuration: '2.3 hours',
      costPerRun: 0.45,
      timeSaved: '18h per run',
      trend: {
        executions: 15.2,
        successRate: 3.1,
        duration: -8.5,
      },
    },
    timeline: [
      { date: 'Jan 1', executions: 8, successful: 8, failed: 0, avgDuration: 2.5 },
      { date: 'Jan 2', executions: 12, successful: 11, failed: 1, avgDuration: 2.2 },
      { date: 'Jan 3', executions: 15, successful: 15, failed: 0, avgDuration: 2.1 },
      { date: 'Jan 4', executions: 10, successful: 9, failed: 1, avgDuration: 2.4 },
      { date: 'Jan 5', executions: 14, successful: 14, failed: 0, avgDuration: 2.0 },
      { date: 'Jan 6', executions: 11, successful: 11, failed: 0, avgDuration: 2.3 },
      { date: 'Jan 7', executions: 13, successful: 12, failed: 1, avgDuration: 2.2 },
    ],
    statusDistribution: [
      { name: 'Completed', value: 86, color: '#10b981' },
      { name: 'Failed', value: 3, color: '#ef4444' },
    ],
    nodePerformance: [
      {
        nodeId: '1',
        nodeName: 'Manual Start',
        avgTime: 0.3,
        successRate: 100,
        status: 'healthy',
        executions: 89,
      },
      {
        nodeId: '4',
        nodeName: 'Wait for Candidate Availability',
        avgTime: 48.5,
        successRate: 98.9,
        status: 'healthy',
        executions: 89,
      },
      {
        nodeId: '6',
        nodeName: 'Select Best Match Interviewer',
        avgTime: 1.2,
        successRate: 100,
        status: 'healthy',
        executions: 89,
      },
      {
        nodeId: '8',
        nodeName: 'Wait for Interviewer Response',
        avgTime: 8.5,
        successRate: 94.4,
        status: 'warning',
        executions: 89,
      },
      {
        nodeId: '11',
        nodeName: 'AI - Generate Interview Agenda',
        avgTime: 3.4,
        successRate: 100,
        status: 'healthy',
        executions: 84,
      },
      {
        nodeId: '16',
        nodeName: 'Wait for Feedback Submission',
        avgTime: 1.8,
        successRate: 96.4,
        status: 'healthy',
        executions: 84,
      },
    ],
    bottlenecks: [
      {
        nodeId: '4',
        nodeName: 'Wait for Candidate Availability',
        avgDelay: '48.5 hours',
        slaBreachRate: 12,
        recommendation: 'Send reminder after 3 days instead of 5',
      },
      {
        nodeId: '8',
        nodeName: 'Wait for Interviewer Response',
        avgDelay: '8.5 hours',
        slaBreachRate: 5.6,
        recommendation: 'Reduce timeout to 12 hours and add escalation',
      },
    ],
    triggerSources: [
      { source: 'Manual (HR Recruiters)', count: 89, percentage: 100 },
    ],
    peakTimes: [
      { hour: '9 AM', count: 15 },
      { hour: '10 AM', count: 22 },
      { hour: '11 AM', count: 18 },
      { hour: '2 PM', count: 20 },
      { hour: '3 PM', count: 14 },
    ],
  });

  useEffect(() => {
    if (workflowId && currentWorkspace) {
      loadWorkflow();
    }
  }, [workflowId, currentWorkspace]);

  const loadWorkflow = async () => {
    if (!workflowId || !currentWorkspace) return;

    setIsLoading(true);
    try {
      const data = await workflowService.getWorkflow(currentWorkspace.id, workflowId);
      setWorkflow(data);
    } catch (error) {
      console.error('Failed to load workflow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !workflow) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/app/workflows/${workflowId}`)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Workflow
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{workflow.name}</h1>
            <p className="text-muted-foreground mt-1">Workflow Analytics & Performance</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                timeRange === '7d'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                timeRange === '30d'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                timeRange === '90d'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              90 Days
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Executions</p>
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{analytics.overview.totalExecutions}</p>
          <div className="flex items-center gap-1 mt-2">
            {getTrendIcon(analytics.overview.trend.executions)}
            <span className={`text-sm ${getTrendColor(analytics.overview.trend.executions)}`}>
              {analytics.overview.trend.executions > 0 ? '+' : ''}
              {analytics.overview.trend.executions}% vs last period
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">{analytics.overview.successRate}%</p>
          <div className="flex items-center gap-1 mt-2">
            {getTrendIcon(analytics.overview.trend.successRate)}
            <span className={`text-sm ${getTrendColor(analytics.overview.trend.successRate)}`}>
              {analytics.overview.trend.successRate > 0 ? '+' : ''}
              {analytics.overview.trend.successRate}% vs last period
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Avg Duration</p>
            <Clock className="h-5 w-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold">{analytics.overview.avgDuration}</p>
          <div className="flex items-center gap-1 mt-2">
            {getTrendIcon(analytics.overview.trend.duration)}
            <span className={`text-sm ${getTrendColor(analytics.overview.trend.duration)}`}>
              {analytics.overview.trend.duration > 0 ? '+' : ''}
              {analytics.overview.trend.duration}% vs last period
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Cost Per Run</p>
            <DollarSign className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">${analytics.overview.costPerRun}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Time saved: {analytics.overview.timeSaved}
          </p>
        </motion.div>
      </div>

      {/* Execution Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-6">Execution Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={analytics.timeline}>
            <defs>
              <linearGradient id="colorExecutions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f1f1f',
                border: '1px solid #333',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="executions"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorExecutions)"
              name="Total Executions"
            />
            <Line
              type="monotone"
              dataKey="successful"
              stroke="#22c55e"
              strokeWidth={2}
              name="Successful"
            />
            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              strokeWidth={2}
              name="Failed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics.statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: Record<string, unknown>) => {
                  const name = entry.name as string;
                  const percent = entry.percent as number;
                  return `${name}: ${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {analytics.statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Peak Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Peak Execution Times</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.peakTimes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="hour" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f1f1f',
                  border: '1px solid #333',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Node Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-6">Node Performance</h3>
        <div className="space-y-3">
          {analytics.nodePerformance.map((node, index) => (
            <motion.div
              key={node.nodeId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium">{node.nodeName}</h4>
                  {node.status === 'healthy' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {node.executions} executions
                </p>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <div className="text-right">
                  <p className="text-muted-foreground">Avg Time</p>
                  <p className="font-medium">{node.avgTime}h</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Success Rate</p>
                  <p className="font-medium">{node.successRate}%</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottlenecks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-semibold">Identified Bottlenecks</h3>
        </div>
        <div className="space-y-4">
          {analytics.bottlenecks.map((bottleneck, index) => (
            <motion.div
              key={bottleneck.nodeId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{bottleneck.nodeName}</h4>
                <span className="text-sm text-yellow-600">
                  {bottleneck.slaBreachRate}% SLA breach
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Average delay: {bottleneck.avgDelay}
              </p>
              <div className="flex items-start gap-2 p-3 bg-card rounded-lg">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Recommendation</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {bottleneck.recommendation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

