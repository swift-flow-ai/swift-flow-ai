import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWorkspace } from '../../hooks/useWorkspace';
import { approvalService } from '../../services/approval.service';
import { Approval } from '../../types/workspace';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { 
  Inbox, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  ChevronDown,
  Zap,
  Calendar,
  TrendingUp,
  CheckSquare
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type FilterType = 'all' | 'pending' | 'urgent' | 'today';
type PriorityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low';

export function InboxPage() {
  const { currentWorkspace } = useWorkspace();
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('pending');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  const loadApprovals = useCallback(async () => {
    if (!currentWorkspace) return;
    
    try {
      setIsLoading(true);
      const params: Record<string, string> = {};
      if (filter !== 'all') params.status = 'pending';
      
      const data = await approvalService.getApprovals(currentWorkspace.id, params);
      setApprovals(data.approvals);
    } catch (error) {
      console.error('Failed to load inbox items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace, filter]);

  useEffect(() => {
    if (currentWorkspace) {
      loadApprovals();
    }
  }, [currentWorkspace, loadApprovals]);

  const handleQuickDecision = async (approvalId: string, decision: 'approve' | 'reject') => {
    if (!currentWorkspace) return;
    
    setProcessingIds(prev => new Set(prev).add(approvalId));
    
    try {
      await approvalService.decide(currentWorkspace.id, approvalId, decision, '');
      setApprovals(prev => prev.filter(a => a.id !== approvalId));
    } catch (error) {
      console.error('Failed to process decision:', error);
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(approvalId);
        return next;
      });
    }
  };

  // Filter logic
  const filteredApprovals = approvals.filter(approval => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!approval.title.toLowerCase().includes(query) &&
          !approval.description.toLowerCase().includes(query) &&
          !approval.workflowName.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Priority filter
    if (priorityFilter !== 'all' && approval.priority !== priorityFilter) {
      return false;
    }

    // Status filter
    if (filter === 'urgent') {
      const dueTime = new Date(approval.sla.dueAt).getTime();
      const now = Date.now();
      return dueTime - now < 60 * 60 * 1000; // Less than 1 hour
    }

    if (filter === 'today') {
      const dueTime = new Date(approval.sla.dueAt).getTime();
      const now = Date.now();
      const tomorrow = now + 24 * 60 * 60 * 1000;
      return dueTime <= tomorrow;
    }

    return true;
  });

  // Group by priority
  const groupedApprovals = {
    critical: filteredApprovals.filter(a => a.priority === 'critical'),
    high: filteredApprovals.filter(a => a.priority === 'high'),
    medium: filteredApprovals.filter(a => a.priority === 'medium'),
    low: filteredApprovals.filter(a => a.priority === 'low'),
  };

  const stats = {
    total: approvals.length,
    urgent: approvals.filter(a => {
      const dueTime = new Date(a.sla.dueAt).getTime();
      return dueTime - Date.now() < 60 * 60 * 1000;
    }).length,
    today: approvals.filter(a => {
      const dueTime = new Date(a.sla.dueAt).getTime();
      const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
      return dueTime <= tomorrow;
    }).length,
    withAI: approvals.filter(a => a.aiRecommendation).length,
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Inbox className="h-8 w-8 text-primary" />
            Inbox
          </h1>
          <p className="text-muted-foreground">
            {stats.total === 0 ? 'All caught up!' : `${stats.total} items need your attention`}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.button
          onClick={() => setFilter('all')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`text-left p-4 rounded-xl border transition-all ${
            filter === 'all' 
              ? 'bg-primary/10 border-primary shadow-lg' 
              : 'bg-card border-border hover:border-primary/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Inbox className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Items</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          onClick={() => setFilter('urgent')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`text-left p-4 rounded-xl border transition-all ${
            filter === 'urgent' 
              ? 'bg-red-500/10 border-red-500 shadow-lg' 
              : 'bg-card border-border hover:border-red-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.urgent}</p>
              <p className="text-sm text-muted-foreground">Urgent</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          onClick={() => setFilter('today')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`text-left p-4 rounded-xl border transition-all ${
            filter === 'today' 
              ? 'bg-orange-500/10 border-orange-500 shadow-lg' 
              : 'bg-card border-border hover:border-orange-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.today}</p>
              <p className="text-sm text-muted-foreground">Due Today</p>
            </div>
          </div>
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl border bg-card border-border"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Sparkles className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.withAI}</p>
              <p className="text-sm text-muted-foreground">AI Assisted</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search inbox..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary transition-all"
        >
          <Filter className="h-5 w-5" />
          Filters
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Dropdown */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Priority</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['all', 'critical', 'high', 'medium', 'low'] as PriorityFilter[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriorityFilter(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      priorityFilter === p
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inbox Items */}
      {filteredApprovals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="inline-flex p-6 rounded-full bg-primary/10 mb-4">
            <CheckSquare className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Inbox Zero! 🎉</h3>
          <p className="text-muted-foreground">
            {searchQuery || priorityFilter !== 'all' 
              ? 'No items match your filters. Try adjusting your search.'
              : 'You\'re all caught up! No pending items at the moment.'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Critical Priority */}
          {groupedApprovals.critical.length > 0 && (
            <PrioritySection
              title="Critical Priority"
              icon={AlertTriangle}
              color="red"
              approvals={groupedApprovals.critical}
              onQuickDecision={handleQuickDecision}
              processingIds={processingIds}
            />
          )}

          {/* High Priority */}
          {groupedApprovals.high.length > 0 && (
            <PrioritySection
              title="High Priority"
              icon={TrendingUp}
              color="orange"
              approvals={groupedApprovals.high}
              onQuickDecision={handleQuickDecision}
              processingIds={processingIds}
            />
          )}

          {/* Medium Priority */}
          {groupedApprovals.medium.length > 0 && (
            <PrioritySection
              title="Medium Priority"
              icon={Clock}
              color="blue"
              approvals={groupedApprovals.medium}
              onQuickDecision={handleQuickDecision}
              processingIds={processingIds}
            />
          )}

          {/* Low Priority */}
          {groupedApprovals.low.length > 0 && (
            <PrioritySection
              title="Low Priority"
              icon={Inbox}
              color="gray"
              approvals={groupedApprovals.low}
              onQuickDecision={handleQuickDecision}
              processingIds={processingIds}
            />
          )}
        </div>
      )}
    </div>
  );
}

interface PrioritySectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'red' | 'orange' | 'blue' | 'gray';
  approvals: Approval[];
  onQuickDecision: (id: string, decision: 'approve' | 'reject') => void;
  processingIds: Set<string>;
}

function PrioritySection({ title, icon: Icon, color, approvals, onQuickDecision, processingIds }: PrioritySectionProps) {
  const colorClasses = {
    red: 'text-red-500 bg-red-500/10',
    orange: 'text-orange-500 bg-orange-500/10',
    blue: 'text-blue-500 bg-blue-500/10',
    gray: 'text-gray-500 bg-gray-500/10',
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-1.5 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <Badge variant="default">{approvals.length}</Badge>
      </div>

      <div className="space-y-3">
        {approvals.map((approval, index) => (
          <InboxItem
            key={approval.id}
            approval={approval}
            index={index}
            onQuickDecision={onQuickDecision}
            isProcessing={processingIds.has(approval.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface InboxItemProps {
  approval: Approval;
  index: number;
  onQuickDecision: (id: string, decision: 'approve' | 'reject') => void;
  isProcessing: boolean;
}

function InboxItem({ approval, index, onQuickDecision, isProcessing }: InboxItemProps) {
  const [showActions, setShowActions] = useState(false);
  
  const isUrgent = approval.sla.breached || 
    (new Date(approval.sla.dueAt).getTime() - Date.now() < 60 * 60 * 1000);

  const priorityColors = {
    critical: 'border-red-500/30 bg-red-500/5',
    high: 'border-orange-500/30 bg-orange-500/5',
    medium: 'border-blue-500/30 bg-blue-500/5',
    low: 'border-border bg-card',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className={`group rounded-xl border p-5 transition-all hover:shadow-lg ${priorityColors[approval.priority]}`}
    >
      <div className="flex items-start gap-4">
        {/* Left: Icon/Avatar */}
        <div className="flex-shrink-0">
          <Avatar 
            src={approval.submittedBy.avatar} 
            alt={approval.submittedBy.name}
            size="md"
          />
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          <Link
            to={`/app/inbox/${approval.id}`}
            className="block group/link"
          >
            <h3 className="font-semibold text-lg mb-1 group-hover/link:text-primary transition-colors">
              {approval.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {approval.description}
            </p>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <CheckSquare className="h-4 w-4" />
              {approval.workflowName}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {isUrgent ? (
                <span className="text-red-500 font-medium">
                  Due {approval.sla.remainingTime}
                </span>
              ) : (
                `Due ${formatDistanceToNow(new Date(approval.sla.dueAt), { addSuffix: true })}`
              )}
            </span>
            <span className="text-xs">
              by {approval.submittedBy.name}
            </span>
          </div>

          {/* AI Recommendation */}
          {approval.aiRecommendation && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-primary/10 border border-primary/20 mb-3">
              <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-primary">
                  AI suggests: <span className="capitalize">{approval.aiRecommendation.decision}</span>
                  <span className="ml-1 opacity-80">
                    ({approval.aiRecommendation.confidence}% confidence)
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <AnimatePresence>
          {(showActions || isProcessing) && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => onQuickDecision(approval.id, 'approve')}
                disabled={isProcessing}
                className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Approve"
              >
                <CheckCircle2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onQuickDecision(approval.id, 'reject')}
                disabled={isProcessing}
                className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Reject"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

