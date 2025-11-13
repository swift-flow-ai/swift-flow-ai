import { motion } from 'framer-motion';
import { MessageSquare, Reply, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Avatar } from '../../../components/common/Avatar';
import { InboxItem } from '../../../services/inbox.service';
import { formatDistanceToNow } from 'date-fns';

interface CommentDetailContentProps {
  item: InboxItem;
  onReply?: (commentId: string, reply: string) => void;
  onReact?: (commentId: string, reaction: 'like' | 'dislike') => void;
}

export function CommentDetailContent({ item, onReply, onReact }: CommentDetailContentProps) {
  const commentMetadata = item.metadata as {
    threadId?: string;
    parentCommentId?: string;
    replies?: Array<{
      id: string;
      author: { name: string; avatar?: string };
      content: string;
      createdAt: string;
      reactions?: { likes: number; dislikes: number };
    }>;
    reactions?: { likes: number; dislikes: number };
    context?: {
      type: string;
      id: string;
      title: string;
    };
  } | undefined;

  return (
    <div className="space-y-3">
      {/* Reply Action - At Top */}
      {onReply && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Reply className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Add Reply</h3>
          </div>
          <textarea
            placeholder="Write a reply..."
            className="w-full px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none text-sm text-gray-900 dark:text-gray-100"
            rows={3}
          />
          <button className="mt-3 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/20 flex items-center gap-2 text-sm font-semibold w-full justify-center">
            <Reply className="h-4 w-4" />
            Post Reply
          </button>
        </motion.div>
      )}

      {/* Comment Content - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
      >
        <div className="flex items-start gap-2">
          {item.submittedBy && (
            <Avatar 
              src={item.submittedBy.avatar} 
              alt={item.submittedBy.name}
              size="sm"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.submittedBy?.name || 'Unknown User'}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </span>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none mb-2">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {item.description}
              </p>
            </div>

            {/* Reactions - Compact */}
            {commentMetadata?.reactions && (
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => onReact?.(item.id, 'like')}
                  className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {commentMetadata.reactions.likes || 0}
                </button>
                <button
                  onClick={() => onReact?.(item.id, 'dislike')}
                  className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                  {commentMetadata.reactions.dislikes || 0}
                </button>
              </div>
            )}

            {/* Context - Compact */}
            {commentMetadata?.context && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Comment on</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {commentMetadata.context.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {commentMetadata.context.type}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Replies - Compact */}
      {commentMetadata?.replies && commentMetadata.replies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Replies ({commentMetadata.replies.length})
            </h3>
          </div>
          <div className="space-y-2">
            {commentMetadata.replies.map((reply) => (
              <div key={reply.id} className="flex items-start gap-2 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
                <Avatar 
                  src={reply.author.avatar} 
                  alt={reply.author.name}
                  size="xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                      {reply.author.name}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {reply.content}
                  </p>
                  {reply.reactions && (
                    <div className="flex items-center gap-2 mt-1">
                      {reply.reactions.likes > 0 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          👍 {reply.reactions.likes}
                        </span>
                      )}
                      {reply.reactions.dislikes > 0 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          👎 {reply.reactions.dislikes}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
