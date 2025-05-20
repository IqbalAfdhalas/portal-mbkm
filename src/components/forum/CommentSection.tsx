// src/components/forum/CommentSection.tsx
import React, { useState } from 'react';
import { CommentType } from '@/lib/forum/types';
import CommentItem from './CommentItem';
import ForumEditor from './ForumEditor';

interface CommentSectionProps {
  threadId: string;
  comments: CommentType[];
  isLocked?: boolean;
  onAddComment?: (content: string) => Promise<void>;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  threadId,
  comments,
  isLocked = false,
  onAddComment,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (content: string) => {
    if (!content.trim() || isLocked) return;

    try {
      setIsSubmitting(true);
      if (onAddComment) {
        await onAddComment(content);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sort comments by created date (newest first)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="comment-section mt-8">
      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">
        Diskusi ({comments.length})
      </h3>

      {!isLocked && (
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            Tambahkan Komentar
          </h4>
          <ForumEditor
            placeholder="Tulis komentar Anda di sini..."
            onSubmit={handleSubmitComment}
            isSubmitting={isSubmitting}
            buttonText="Kirim Komentar"
          />
        </div>
      )}

      {isLocked && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-md p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            Thread ini telah dikunci. Komentar baru tidak diperbolehkan.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {sortedComments.length > 0 ? (
          sortedComments.map(comment => (
            <CommentItem key={comment.id} comment={comment} threadId={threadId} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Belum ada komentar. Jadilah yang pertama berkomentar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
