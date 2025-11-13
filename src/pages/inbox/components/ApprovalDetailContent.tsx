import { motion } from 'framer-motion';
import { 
  Sparkles, 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  ThumbsUp, 
  ThumbsDown, 
  TrendingUp,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../../../components/common/Badge';
import { Avatar } from '../../../components/common/Avatar';
import { InboxItem } from '../../../services/inbox.service';
import { Approval } from '../../../types/workspace';
import { formatDistanceToNow, format } from 'date-fns';

interface ApprovalDetailContentProps {
  item: InboxItem;
  approval: Approval;
  isSubmitting: boolean;
  comment: string;
  decision: 'approve' | 'reject' | null;
  onCommentChange: (comment: string) => void;
  onDecisionChange: (decision: 'approve' | 'reject') => void;
  onSubmitDecision: () => void;
  approveLabel?: string;
  rejectLabel?: string;
  approveDescription?: string;
  rejectDescription?: string;
}

export function ApprovalDetailContent({
  item,
  approval,
  isSubmitting,
  comment,
  decision,
  onCommentChange,
  onDecisionChange,
  onSubmitDecision,
  approveLabel = 'Approve',
  rejectLabel = 'Reject',
  approveDescription = 'Accept request',
  rejectDescription = 'Decline request',
}: ApprovalDetailContentProps) {
  const canApprove = approval.status === 'pending';
  const isResolved = approval.status !== 'pending';
  const timeRemaining = approval.sla?.dueAt 
    ? new Date(approval.sla.dueAt).getTime() - Date.now()
    : null;
  const hoursRemaining = timeRemaining ? Math.floor(timeRemaining / (1000 * 60 * 60)) : null;

  return (
    <div className="space-y-3">
      {/* Decision Section - Modern, Minimal & Elegant */}
      {canApprove && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        >
          <div className="p-4 space-y-4">
            {/* Minimal Header */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Your Decision</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Select your response below</p>
            </div>

            {/* Elegant Decision Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => onDecisionChange('approve')}
                disabled={isSubmitting}
                className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-lg border transition-all duration-200 ${
                  decision === 'approve'
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50/50 dark:hover:bg-green-950/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <CheckCircle2 className={`h-4 w-4 transition-colors ${
                  decision === 'approve' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-400'
                }`} />
                <span className={`text-sm font-medium ${
                  decision === 'approve' 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400'
                }`}>
                  {approveLabel}
                </span>
                {decision === 'approve' && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800"></div>
                )}
              </button>

              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

              <button
                onClick={() => onDecisionChange('reject')}
                disabled={isSubmitting}
                className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-lg border transition-all duration-200 ${
                  decision === 'reject'
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/30 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50/50 dark:hover:bg-red-950/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <XCircle className={`h-4 w-4 transition-colors ${
                  decision === 'reject' 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400'
                }`} />
                <span className={`text-sm font-medium ${
                  decision === 'reject' 
                    ? 'text-red-700 dark:text-red-300' 
                    : 'text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400'
                }`}>
                  {rejectLabel}
                </span>
                {decision === 'reject' && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></div>
                )}
              </button>
            </div>

            {/* Comment Section - Elegant reveal */}
            {decision && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="pt-4 border-t border-gray-100 dark:border-gray-700/50"
              >
                <label className="block text-xs font-medium mb-2 text-gray-600 dark:text-gray-400">
                  Comment <span className="text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => onCommentChange(e.target.value)}
                  placeholder={`Add your reasoning for ${decision === 'approve' ? 'approving' : 'rejecting'} this request...`}
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  rows={3}
                />
              </motion.div>
            )}

            {/* Submit Button - Elegant & Narrow */}
            <div className="flex justify-center">
              <button
                onClick={onSubmitDecision}
                disabled={!decision || isSubmitting}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  decision === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
                    : decision === 'reject'
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Processing...</span>
                  </>
                ) : decision ? (
                  <>
                    {decision === 'approve' ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <span>Submit {decision === 'approve' ? approveLabel : rejectLabel}</span>
                  </>
                ) : (
                  <span>Select a decision above</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Already Decided - At Top for Resolved */}
      {isResolved && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
            approval.status === 'approved'
              ? 'bg-green-500/20 text-green-700 dark:text-green-300'
              : 'bg-red-500/20 text-red-700 dark:text-red-300'
          }`}>
            {approval.status === 'approved' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <span className="capitalize">Request {approval.status}</span>
          </div>
          {approval.decisionComment && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Comment:</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{approval.decisionComment}</p>
            </div>
          )}
          {approval.decidedBy && (
            <div className="mt-2 flex items-center gap-1.5">
              <Avatar src={approval.decidedBy.avatar} alt={approval.decidedBy.name} size="xs" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Decided by {approval.decidedBy.name}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* AI Recommendation */}
      {approval.aiRecommendation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-primary/20 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-3"
        >
          <div className="flex items-start gap-2">
            <div className="p-1.5 rounded bg-primary/20 flex-shrink-0">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">AI Recommendation</span>
                <Badge variant="info" className="text-xs px-1.5 py-0">
                  {approval.aiRecommendation.confidence}%
                </Badge>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium mb-1.5 ${
                approval.aiRecommendation.decision === 'approve'
                  ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                  : 'bg-red-500/20 text-red-700 dark:text-red-300'
              }`}>
                {approval.aiRecommendation.decision === 'approve' ? (
                  <ThumbsUp className="h-3 w-3" />
                ) : (
                  <ThumbsDown className="h-3 w-3" />
                )}
                <span className="capitalize">{approval.aiRecommendation.decision}</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                {approval.aiRecommendation.reasoning}
              </p>
              {approval.aiRecommendation.similarCases && (
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <TrendingUp className="h-3 w-3" />
                  Based on {approval.aiRecommendation.similarCases} similar cases
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Request Summary - Key Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Request Summary</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {approval.sla?.dueAt && (
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Due Date</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {format(new Date(approval.sla.dueAt), 'MMM d, h:mm a')}
              </p>
              {hoursRemaining !== null && (
                <p className={`text-xs ${hoursRemaining < 0 ? 'text-red-500' : hoursRemaining < 24 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {hoursRemaining < 0 ? 'Overdue' : `${hoursRemaining}h remaining`}
                </p>
              )}
            </div>
          )}
          {approval.submittedBy && (
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Submitted By</p>
              <div className="flex items-center gap-1.5">
                <Avatar src={approval.submittedBy.avatar} alt={approval.submittedBy.name} size="xs" />
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{approval.submittedBy.name}</p>
              </div>
            </div>
          )}
          {approval.assignedTo && approval.assignedTo.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Assigned To</p>
              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{approval.assignedTo.length} person(s)</p>
            </div>
          )}
          {approval.createdAt && (
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Created</p>
              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {formatDistanceToNow(new Date(approval.createdAt), { addSuffix: true })}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Request Data - Compact JSON */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Request Data</h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-200 dark:border-gray-700 p-2 overflow-auto max-h-[300px]">
          <pre className="text-xs font-mono text-gray-800 dark:text-gray-200">
            {JSON.stringify(approval.data, null, 2)}
          </pre>
        </div>
      </motion.div>
    </div>
  );
}
