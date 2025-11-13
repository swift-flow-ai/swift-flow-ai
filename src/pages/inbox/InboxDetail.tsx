import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';
import { approvalService } from '../../services/approval.service';
import { inboxService, InboxItem } from '../../services/inbox.service';
import { Approval } from '../../types/workspace';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { InboxDetailHeader } from './components/InboxDetailHeader';
import { InboxDetailSidebar } from './components/InboxDetailSidebar';
import { ApprovalDetailContent } from './components/ApprovalDetailContent';
import { TaskDetailContent } from './components/TaskDetailContent';
import { WorkflowErrorDetailContent } from './components/WorkflowErrorDetailContent';
import { WorkflowSuccessDetailContent } from './components/WorkflowSuccessDetailContent';
import { NotificationDetailContent } from './components/NotificationDetailContent';
import { CommentDetailContent } from './components/CommentDetailContent';
import { AssignmentDetailContent } from './components/AssignmentDetailContent';
import { GenericDetailContent } from './components/GenericDetailContent';

export function InboxDetail() {
  const { itemId } = useParams<{ itemId: string }>();
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  
  // State
  const [inboxItem, setInboxItem] = useState<InboxItem | null>(null);
  const [approval, setApproval] = useState<Approval | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState('');
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load inbox item and type-specific data
  const loadItem = useCallback(async () => {
    if (!currentWorkspace || !itemId) return;
    
    try {
      setIsLoading(true);
      
      // Load the inbox item first
      const item = await inboxService.getInboxItem(currentWorkspace.id, itemId);
      setInboxItem(item);
      
      // If it's an approval, load full approval data
      if (item.type === 'approval' && item.approval) {
        try {
          const approvalData = await approvalService.getApproval(currentWorkspace.id, itemId);
          setApproval(approvalData);
        } catch {
          console.warn('Could not load full approval data, using inbox item data');
          // Use approval data from inbox item if available
          if (item.approval) {
            setApproval(item.approval as Approval);
          }
        }
      }
      
      // Mark as read
      if (!item.read) {
        try {
          await inboxService.markAsRead(currentWorkspace.id, [itemId]);
        } catch (err) {
          console.warn('Could not mark as read:', err);
        }
      }
    } catch (error) {
      console.error('Failed to load inbox item:', error);
      setNotification({ message: 'Failed to load item details', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace, itemId]);

  useEffect(() => {
    if (currentWorkspace && itemId) {
      loadItem();
    }
  }, [currentWorkspace, itemId, loadItem]);

  const handleDecision = async (selectedDecision: 'approve' | 'reject') => {
    if (!currentWorkspace || !itemId || !approval) return;
    
    try {
      setIsSubmitting(true);
      await approvalService.decide(currentWorkspace.id, itemId, selectedDecision, comment);
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
    const execId = inboxItem?.executionId || approval?.executionId;
    if (execId) {
      navigator.clipboard.writeText(execId);
      setNotification({ message: 'Execution ID copied to clipboard', type: 'success' });
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleTaskComplete = async (taskId: string) => {
    // TODO: Implement task completion API call
    console.log('Completing task:', taskId);
    setNotification({ message: 'Task completed successfully', type: 'success' });
    setTimeout(() => {
      navigate('/app/inbox');
    }, 1500);
  };

  const handleTaskViewDetails = (taskId: string) => {
    // TODO: Navigate to task details page
    console.log('Viewing task details:', taskId);
  };

  const handleRetryExecution = async (executionId: string) => {
    // TODO: Implement retry execution API call
    console.log('Retrying execution:', executionId);
    setNotification({ message: 'Execution retry initiated', type: 'success' });
  };

  if (isLoading || !inboxItem) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Use approval data if available, otherwise use inbox item
  const displayApproval = approval || (inboxItem.approval as Approval | undefined);

  // Render type-specific content
  const renderContent = () => {
    switch (inboxItem.type) {
      case 'approval':
        if (!displayApproval) {
          return <GenericDetailContent item={inboxItem} />;
        }
        // Extract button labels from approval data if available
        const approvalData = displayApproval.data as {
          approveLabel?: string;
          rejectLabel?: string;
          approveDescription?: string;
          rejectDescription?: string;
        } | undefined;
        return (
          <ApprovalDetailContent
            item={inboxItem}
            approval={displayApproval}
            isSubmitting={isSubmitting}
            comment={comment}
            decision={decision}
            onCommentChange={setComment}
            onDecisionChange={setDecision}
            onSubmitDecision={() => decision && handleDecision(decision)}
            approveLabel={approvalData?.approveLabel}
            rejectLabel={approvalData?.rejectLabel}
            approveDescription={approvalData?.approveDescription}
            rejectDescription={approvalData?.rejectDescription}
          />
        );
      
      case 'task':
        return (
          <TaskDetailContent
            item={inboxItem}
            onComplete={handleTaskComplete}
            onViewDetails={handleTaskViewDetails}
          />
        );
      
      case 'workflow_error':
        return (
          <WorkflowErrorDetailContent
            item={inboxItem}
            onRetry={handleRetryExecution}
          />
        );
      
      case 'workflow_success':
        return <WorkflowSuccessDetailContent item={inboxItem} />;
      
      case 'notification':
      case 'alert':
        return <NotificationDetailContent item={inboxItem} />;
      
      case 'comment':
        return <CommentDetailContent item={inboxItem} />;
      
      case 'assignment':
        return (
          <AssignmentDetailContent
            item={inboxItem}
            onAccept={handleTaskComplete}
            onDecline={handleTaskComplete}
          />
        );
      
      default:
        return <GenericDetailContent item={inboxItem} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-2">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg shadow-lg text-sm ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          {notification.message}
        </motion.div>
      )}

      {/* Header */}
      <div className="mb-2">
        <button
          onClick={() => navigate('/app/inbox')}
          className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Inbox
        </button>
        
        <InboxDetailHeader item={inboxItem} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {renderContent()}
        </div>

        {/* Sidebar */}
        <InboxDetailSidebar
          item={inboxItem}
          approval={displayApproval}
          onCopyExecutionId={copyExecutionId}
        />
      </div>
    </div>
  );
}
