import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { approvalService } from '../../services/approval.service';
import { Approval } from '../../types/workspace';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { CheckCircle2, XCircle, ArrowLeft, Clock, Sparkles, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ApprovalDetail() {
  const { approvalId } = useParams<{ approvalId: string }>();
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const [approval, setApproval] = useState<Approval | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState('');

  const loadApproval = useCallback(async () => {
    if (!currentWorkspace || !approvalId) return;
    
    try {
      setIsLoading(true);
      const data = await approvalService.getApproval(currentWorkspace.id, approvalId);
      setApproval(data);
    } catch (error) {
      console.error('Failed to load approval:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace, approvalId]);

  useEffect(() => {
    if (currentWorkspace && approvalId) {
      loadApproval();
    }
  }, [currentWorkspace, approvalId, loadApproval]);

  const handleDecision = async (decision: 'approve' | 'reject') => {
    if (!currentWorkspace || !approvalId) return;
    
    try {
      setIsSubmitting(true);
      await approvalService.decide(currentWorkspace.id, approvalId, decision, comment);
      navigate('/app/approvals');
    } catch (error) {
      console.error('Failed to submit decision:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !approval) {
    return <LoadingSpinner />;
  }

  const priorityVariants = {
    low: 'default' as const,
    medium: 'info' as const,
    high: 'warning' as const,
    critical: 'danger' as const,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app/approvals')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Approvals
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{approval.title}</h1>
            <p className="text-muted-foreground">{approval.description}</p>
          </div>
          <Badge variant={priorityVariants[approval.priority]}>
            {approval.priority}
          </Badge>
        </div>
      </div>

      {/* Workflow Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border bg-card p-6"
      >
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{approval.workflowName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className={approval.sla.breached ? 'text-red-500 font-medium' : 'text-muted-foreground'}>
              Due {formatDistanceToNow(new Date(approval.sla.dueAt), { addSuffix: true })}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-muted-foreground">Submitted by</span>
            <Avatar src={approval.submittedBy.avatar} alt={approval.submittedBy.name} size="sm" />
            <span>{approval.submittedBy.name}</span>
          </div>
        </div>
      </motion.div>

      {/* AI Recommendation */}
      {approval.aiRecommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                AI Recommendation
                <Badge variant="info">
                  {approval.aiRecommendation.confidence}% confidence
                </Badge>
              </h3>
              <p className="text-sm mb-3">
                <span className="font-medium capitalize">
                  {approval.aiRecommendation.decision}:
                </span>{' '}
                {approval.aiRecommendation.reasoning}
              </p>
              {approval.aiRecommendation.similarCases && (
                <p className="text-xs text-muted-foreground">
                  Based on {approval.aiRecommendation.similarCases} similar cases
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Request Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border bg-card p-6"
      >
        <h3 className="font-semibold text-lg mb-4">Request Details</h3>
        <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto max-h-96">
          {JSON.stringify(approval.data, null, 2)}
        </pre>
      </motion.div>

      {/* Decision Section */}
      {approval.status === 'pending' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border bg-card p-6"
        >
          <h3 className="font-semibold text-lg mb-4">Your Decision</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Comment (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comments or reasoning..."
              className="w-full px-4 py-3 rounded-lg bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleDecision('approve')}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="h-5 w-5" />
              {isSubmitting ? 'Approving...' : 'Approve'}
            </button>
            <button
              onClick={() => handleDecision('reject')}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="h-5 w-5" />
              {isSubmitting ? 'Rejecting...' : 'Reject'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

