// src/components/forum/CommentItem.tsx
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { CommentType } from '@/lib/forum/types';
import ForumEditor from './ForumEditor';

interface CommentItemProps {
  comment: CommentType;
  threadId: string;
  onReply?: (content: string, parentCommentId: string) => Promise<void>;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, threadId, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const {
    id,
    content,
    authorId,
    authorName,
    authorPhotoURL,
    createdAt,
    updatedAt,
    likeCount,
    isAnswer,
    parentCommentId,
  } = comment;

  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: id,
  });

  const wasEdited = createdAt !== updatedAt;

  // This would need to be implemented with actual replies from the database
  const replies: CommentType[] = []; // Replace with actual replies

  const handleLikeComment = () => {
    // Implement like functionality
    console.log('Like comment:', id);
  };

  const handleReply = async (replyContent: string) => {
    if (!replyContent.trim()) return;

    try {
      setIsSubmitting(true);
      if (onReply) {
        await onReply(replyContent, id);
      }
      setIsReplying(false);
    } catch (error) {
      console.error('Error adding reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`comment-item ${isAnswer ? 'border-l-4 border-green-500 pl-4' : ''}`}>
      <div className="flex space-x-4">
        {/* Author Image */}
        <div className="flex-shrink-0">
          <img
            src={authorPhotoURL || '/api/placeholder/32/32'}
            alt={authorName}
            className="w-8 h-8 rounded-full"
          />
        </div>

        {/* Comment Content */}
        <div className="flex-grow">
          <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
            {/* Comment Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-900 dark:text-gray-100">{authorName}</span>
                <span className="mx-2 text-gray-400 dark:text-gray-500">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {timeAgo}
                  {wasEdited && ' (diedit)'}
                </span>
              </div>

              {isAnswer && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Jawaban Terverifikasi
                </span>
              )}
            </div>

            {/* Comment Text */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-gray-800 dark:text-gray-200">{content}</p>
            </div>

            {/* Comment Actions */}
            <div className="mt-3 flex items-center space-x-4 text-sm">
              <button
                onClick={handleLikeComment}
                className="flex items-center text-gray-500 hover:text-[#087E8B] dark:hover:text-[#164B69]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{likeCount}</span>
              </button>

              <button
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center text-gray-500 hover:text-[#087E8B] dark:hover:text-[#164B69]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                <span>Balas</span>
              </button>

              <button className="flex items-center text-gray-500 hover:text-[#087E8B] dark:hover:text-[#164B69]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
                <span>Lainnya</span>
              </button>
            </div>
          </div>

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-4 ml-4">
              <ForumEditor
                placeholder="Tulis balasan Anda di sini..."
                onSubmit={handleReply}
                isSubmitting={isSubmitting}
                buttonText="Kirim Balasan"
                onCancel={() => setIsReplying(false)}
              />
            </div>
          )}

          {/* Replies */}
          {replies.length > 0 && (
            <div className="mt-4 ml-4">
              <div className="flex items-center mb-2">
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-sm text-gray-500 hover:text-[#087E8B] dark:hover:text-[#164B69] flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-1 transform transition-transform ${
                      showReplies ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>{replies.length} balasan</span>
                </button>
              </div>

              {showReplies && (
                <div className="space-y-4">
                  {replies.map(reply => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      threadId={threadId}
                      onReply={onReply}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
