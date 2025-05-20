// src/components/forum/ThreadCard.tsx
import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { ThreadType } from '@/lib/forum/types';
import ThreadActions from './ThreadActions';

interface ThreadCardProps {
  thread: ThreadType;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  const {
    id,
    title,
    content,
    authorName,
    authorPhotoURL,
    createdAt,
    commentCount,
    likeCount,
    viewCount,
    categoryId,
    isAnnouncement,
    isPinned,
    status,
  } = thread;

  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: id,
  });

  return (
    <div className="thread-card bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Author Image */}
          <div className="flex-shrink-0">
            <img
              src={authorPhotoURL || '/api/placeholder/40/40'}
              alt={authorName}
              className="w-10 h-10 rounded-full"
            />
          </div>

          {/* Thread Content */}
          <div className="flex-grow">
            {/* Status Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {isAnnouncement && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                  Pengumuman
                </span>
              )}
              {isPinned && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Pinned
                </span>
              )}
              {status === 'solved' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Solved
                </span>
              )}
            </div>

            {/* Title & Preview */}
            <Link href={`/forum/thread/${id}`}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1 hover:text-[#087E8B] dark:hover:text-[#164B69] transition-colors">
                {title}
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">{content}</p>

            {/* Meta Info */}
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
              <span className="mr-4">Oleh: {authorName}</span>
              <span className="mr-4">{timeAgo}</span>
              <span className="flex items-center gap-1 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                {commentCount}
              </span>
              <span className="flex items-center gap-1 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
                {likeCount}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {viewCount}
              </span>
            </div>
          </div>

          {/* Thread Actions */}
          <ThreadActions threadId={id} isLiked={false} isBookmarked={false} />
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
