import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  CheckSquare,
  ExternalLink,
  Copy,
  ThumbsUp,
  ThumbsDown,
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
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadApproval = useCallback(async () => {
    if (!currentWorkspace || !approvalId) return;
    
    try {
      setIsLoading(true);
      const data = await approvalService.getApproval(currentWorkspace.id, approvalId);
      setApproval(data);
    } catch (error) {
      console.error('Failed to load inbox item:', error);
      setNotification({ message: 'Failed to load approval details', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
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
      setNotification({ 
        message: `Successfully ${selectedDecision === 'approve' ? 'approved' : 'rejected'} the request`, 
        type: 'success' 
      });
      setTimeout(() => {
        navigate('/app/inbox');
      }, 1500);
    } catch (error) {
      console.error('Failed to submit decision:', error);
      setNotification({ message: 'Failed to submit decision. Please try again.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyExecutionId = () => {
    if (approval?.executionId) {
      navigator.clipboard.writeText(approval.executionId);
      setNotification({ message: 'Execution ID copied to clipboard', type: 'success' });
      setTimeout(() => setNotification(null), 2000);
    }
  };

  if (isLoading || !approval) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
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
    <div className="max-w-6xl mx-auto space-y-6 px-4">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          {notification.message}
        </motion.div>
      )}

      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app/inbox')}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Inbox
        </button>
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{approval.title}</h1>
              <Badge variant={config.variant} className="text-sm px-3 py-1">
                {approval.priority}
              </Badge>
              {isUrgent && (
                <Badge variant="destructive" className="text-sm px-3 py-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Urgent
                </Badge>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{approval.description}</p>
          </div>
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
              className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/20 flex-shrink-0">
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
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                      approval.aiRecommendation.decision === 'approve'
                        ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                        : 'bg-red-500/20 text-red-700 dark:text-red-300'
                    }`}>
                      {approval.aiRecommendation.decision === 'approve' ? (
                        <ThumbsUp className="h-4 w-4" />
                      ) : (
                        <ThumbsDown className="h-4 w-4" />
                      )}
                      <span className="capitalize">{approval.aiRecommendation.decision}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {approval.aiRecommendation.reasoning}
                  </p>
                  
                  {approval.aiRecommendation.similarCases && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
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
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6"
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Request Details
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 overflow-auto max-h-[500px] border border-gray-200 dark:border-gray-700">
              <pre className="text-sm font-mono text-gray-800 dark:text-gray-200">
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
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6"
            >
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Your Decision
              </h3>
              
              {/* Decision Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => setDecision('approve')}
                  disabled={isSubmitting}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    decision === 'approve'
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-green-500/50 bg-white dark:bg-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <CheckCircle2 className={`h-8 w-8 mx-auto mb-2 ${
                    decision === 'approve' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <p className={`font-medium ${
                    decision === 'approve' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    Approve
                  </p>
                </button>

                <button
                  onClick={() => setDecision('reject')}
                  disabled={isSubmitting}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    decision === 'reject'
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-red-500/50 bg-white dark:bg-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <XCircle className={`h-8 w-8 mx-auto mb-2 ${
                    decision === 'reject' ? 'text-red-500' : 'text-gray-400'
                  }`} />
                  <p className={`font-medium ${
                    decision === 'reject' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    Reject
                  </p>
                </button>
              </div>

              {/* Comment */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Comment {decision ? '(optional)' : ''}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your reasoning or feedback..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none text-gray-900 dark:text-gray-100"
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
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
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

          {/* Already Decided */}
          {approval.status !== 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                approval.status === 'approved'
                  ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                  : 'bg-red-500/20 text-red-700 dark:text-red-300'
              }`}>
                {approval.status === 'approved' ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span className="capitalize">This request has been {approval.status}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Workflow Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <CheckSquare className="h-4 w-4 text-primary" />
              Workflow
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Name</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{approval.workflowName}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Execution ID</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs text-gray-900 dark:text-gray-100">{approval.executionId}</p>
                  <button
                    onClick={copyExecutionId}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Copy execution ID"
                  >
                    <Copy className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                  </button>
                  <Link
                    to={`/app/executions/${approval.executionId}`}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="View execution"
                  >
                    <ExternalLink className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Clock className="h-4 w-4 text-primary" />
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
                  <Calendar className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Created</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(approval.createdAt), 'MMM d, yyyy h:mm a')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(approval.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isUrgent ? 'bg-red-500/10' : 'bg-orange-500/10'} flex-shrink-0`}>
                  <AlertTriangle className={`h-4 w-4 ${isUrgent ? 'text-red-500' : 'text-orange-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Due Date</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(approval.sla.dueAt), 'MMM d, yyyy h:mm a')}
                  </p>
                  <p className={`text-xs font-medium ${isUrgent ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
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
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
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
                <p className="font-medium text-gray-900 dark:text-gray-100">{approval.submittedBy.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Workflow Initiator</p>
              </div>
            </div>
          </motion.div>

          {/* Assigned To */}
          {approval.assignedTo && approval.assignedTo.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
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
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{assignee.name}</p>
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
