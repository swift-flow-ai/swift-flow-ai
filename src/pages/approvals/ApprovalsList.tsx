import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWorkspace } from '../../hooks/useWorkspace';
import { approvalService } from '../../services/approval.service';
import { Approval } from '../../types/workspace';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/EmptyState';
import { CheckSquare, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ApprovalsList() {
  const { currentWorkspace } = useWorkspace();
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('pending');

  const loadApprovals = useCallback(async () => {
    if (!currentWorkspace) return;
    
    try {
      setIsLoading(true);
      const params: Record<string, string> = {};
      if (filter !== 'all') params.status = filter;
      
      const data = await approvalService.getApprovals(currentWorkspace.id, params);
      setApprovals(data.approvals);
    } catch (error) {
      console.error('Failed to load approvals:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace, filter]);

  useEffect(() => {
    if (currentWorkspace) {
      loadApprovals();
    }
  }, [currentWorkspace, loadApprovals]);

  const priorityVariants = {
    low: { variant: 'default' as const, color: 'text-gray-500' },
    medium: { variant: 'info' as const, color: 'text-blue-500' },
    high: { variant: 'warning' as const, color: 'text-yellow-500' },
    critical: { variant: 'danger' as const, color: 'text-red-500' },
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Approvals</h1>
        <p className="text-muted-foreground">
          Review and approve pending requests
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'pending' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'approved' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'rejected' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Approvals List */}
      {approvals.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No approvals found"
          description="You're all caught up! No pending approvals at this time."
        />
      ) : (
        <div className="space-y-4">
          {approvals.map((approval, index) => {
            const priorityConfig = priorityVariants[approval.priority];
            const isUrgent = approval.sla.breached || 
              (new Date(approval.sla.dueAt).getTime() - Date.now() < 60 * 60 * 1000); // Less than 1 hour

            return (
              <motion.div
                key={approval.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/app/approvals/${approval.id}`}
                  className="block group rounded-xl border bg-card p-6 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${approval.sla.breached ? 'bg-red-500/10' : 'bg-muted'} flex-shrink-0`}>
                      <CheckSquare className={`h-6 w-6 ${approval.sla.breached ? 'text-red-500' : priorityConfig.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                            {approval.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {approval.description}
                          </p>
                        </div>
                        <Badge variant={priorityConfig.variant}>
                          {approval.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
                      </div>

                      {approval.aiRecommendation && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 mb-3">
                          <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary mb-1">
                              AI Recommendation: {approval.aiRecommendation.decision === 'approve' ? 'Approve' : 'Reject'}
                              <span className="ml-2 text-xs opacity-80">
                                ({approval.aiRecommendation.confidence}% confidence)
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {approval.aiRecommendation.reasoning}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Submitted by</span>
                          <Avatar 
                            src={approval.submittedBy.avatar} 
                            alt={approval.submittedBy.name}
                            size="sm"
                            className="h-5 w-5"
                          />
                          <span className="text-xs text-muted-foreground">{approval.submittedBy.name}</span>
                        </div>
                        
                        {isUrgent && (
                          <div className="flex items-center gap-1 text-xs text-red-500 font-medium">
                            <AlertTriangle className="h-3 w-3" />
                            Urgent
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

