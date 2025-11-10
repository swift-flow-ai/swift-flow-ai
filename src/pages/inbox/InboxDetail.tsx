import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { approvalService } from '../../services/approval.service';
import { Approval } from '../../types/workspace';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  FileText,
  AlertTriangle,
  User,
  Calendar,
  MessageSquare,
  TrendingUp,
  CheckSquare
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

export function InboxDetail() {
  const { approvalId } = useParams<{ approvalId: string }>();
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const [approval, setApproval] = useState<Approval | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState('');
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);

  const loadApproval = useCallback(async () => {
    if (!currentWorkspace || !approvalId) return;
    
    try {
      setIsLoading(true);
      const data = await approvalService.getApproval(currentWorkspace.id, approvalId);
      setApproval(data);
    } catch (error) {
      console.error('Failed to load inbox item:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace, approvalId]);

  useEffect(() => {
    if (currentWorkspace && approvalId) {
      loadApproval();
    }
  }, [currentWorkspace, approvalId, loadApproval]);

  const handleDecision = async (selectedDecision: 'approve' | 'reject') => {
    if (!currentWorkspace || !approvalId) return;
    
    try {
      setIsSubmitting(true);
      await approvalService.decide(currentWorkspace.id, approvalId, selectedDecision, comment);
      navigate('/app/inbox');
    } catch (error) {
      console.error('Failed to submit decision:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !approval) {
    return <LoadingSpinner />;
  }

  const priorityConfig = {
    low: { variant: 'default' as const, color: 'text-gray-500', bg: 'bg-gray-500/10' },
    medium: { variant: 'info' as const, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    high: { variant: 'warning' as const, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    critical: { variant: 'danger' as const, color: 'text-red-500', bg: 'bg-red-500/10' },
  };

  const config = priorityConfig[approval.priority];
  const isUrgent = approval.sla.breached || 
    (new Date(approval.sla.dueAt).getTime() - Date.now() < 60 * 60 * 1000);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app/inbox')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Inbox
        </button>
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{approval.title}</h1>
              {isUrgent && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 text-red-500 text-sm font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Urgent
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-lg">{approval.description}</p>
          </div>
          <Badge variant={config.variant} className="text-sm px-3 py-1">
            {approval.priority}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Recommendation */}
          {approval.aiRecommendation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-lg">AI Recommendation</h3>
                    <Badge variant="info" className="text-xs">
                      {approval.aiRecommendation.confidence}% confidence
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium ${
                      approval.aiRecommendation.decision === 'approve'
                        ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                        : 'bg-red-500/20 text-red-700 dark:text-red-300'
                    }`}>
                      {approval.aiRecommendation.decision === 'approve' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <span className="capitalize">{approval.aiRecommendation.decision}</span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 mb-3">
                    {approval.aiRecommendation.reasoning}
                  </p>
                  
                  {approval.aiRecommendation.similarCases && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      Based on analysis of {approval.aiRecommendation.similarCases} similar cases
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Request Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border bg-card p-6"
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Request Details
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 overflow-auto max-h-[500px]">
              <pre className="text-sm font-mono">
                {JSON.stringify(approval.data, null, 2)}
              </pre>
            </div>
          </motion.div>

          {/* Decision Section */}
          {approval.status === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border bg-card p-6"
            >
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Your Decision
              </h3>
              
              {/* Decision Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setDecision('approve')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    decision === 'approve'
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-border hover:border-green-500/50'
                  }`}
                >
                  <CheckCircle2 className={`h-8 w-8 mx-auto mb-2 ${
                    decision === 'approve' ? 'text-green-500' : 'text-muted-foreground'
                  }`} />
                  <p className={`font-medium ${
                    decision === 'approve' ? 'text-green-500' : 'text-foreground'
                  }`}>
                    Approve
                  </p>
                </button>

                <button
                  onClick={() => setDecision('reject')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    decision === 'reject'
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-border hover:border-red-500/50'
                  }`}
                >
                  <XCircle className={`h-8 w-8 mx-auto mb-2 ${
                    decision === 'reject' ? 'text-red-500' : 'text-muted-foreground'
                  }`} />
                  <p className={`font-medium ${
                    decision === 'reject' ? 'text-red-500' : 'text-foreground'
                  }`}>
                    Reject
                  </p>
                </button>
              </div>

              {/* Comment */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Comment {decision ? '(optional)' : ''}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your reasoning or feedback..."
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={() => decision && handleDecision(decision)}
                disabled={!decision || isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  decision === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : decision === 'reject'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Processing...
                  </>
                ) : decision ? (
                  <>
                    {decision === 'approve' ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    Submit {decision === 'approve' ? 'Approval' : 'Rejection'}
                  </>
                ) : (
                  'Select a decision above'
                )}
              </button>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Workflow Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl border bg-card p-5"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-primary" />
              Workflow
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Name</p>
                <p className="font-medium">{approval.workflowName}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Execution ID</p>
                <p className="font-mono text-xs">{approval.executionId}</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border bg-card p-5"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
                  <Calendar className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(approval.createdAt), 'MMM d, yyyy h:mm a')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(approval.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isUrgent ? 'bg-red-500/10' : 'bg-orange-500/10'} flex-shrink-0`}>
                  <AlertTriangle className={`h-4 w-4 ${isUrgent ? 'text-red-500' : 'text-orange-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(approval.sla.dueAt), 'MMM d, yyyy h:mm a')}
                  </p>
                  <p className={`text-xs font-medium ${isUrgent ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {isUrgent ? 'URGENT: ' : ''}
                    {formatDistanceToNow(new Date(approval.sla.dueAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Submitted By */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border bg-card p-5"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Submitted By
            </h3>
            <div className="flex items-center gap-3">
              <Avatar 
                src={approval.submittedBy.avatar} 
                alt={approval.submittedBy.name}
                size="md"
              />
              <div>
                <p className="font-medium">{approval.submittedBy.name}</p>
                <p className="text-xs text-muted-foreground">Workflow Initiator</p>
              </div>
            </div>
          </motion.div>

          {/* Assigned To */}
          {approval.assignedTo && approval.assignedTo.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border bg-card p-5"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Assigned To
              </h3>
              <div className="space-y-3">
                {approval.assignedTo.map((assignee) => (
                  <div key={assignee.id} className="flex items-center gap-3">
                    <Avatar 
                      src={assignee.avatar} 
                      alt={assignee.name}
                      size="sm"
                    />
                    <p className="text-sm font-medium">{assignee.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

