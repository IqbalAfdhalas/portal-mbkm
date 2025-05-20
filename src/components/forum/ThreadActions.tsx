// src/components/forum/ThreadActions.tsx
import React, { useState } from 'react';
import { useForumActions } from '@/hooks/forum/useForumActions';

interface ThreadActionsProps {
  threadId: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

const ThreadActions: React.FC<ThreadActionsProps> = ({
  threadId,
  isLiked: initialIsLiked,
  isBookmarked: initialIsBookmarked,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const { toggleLike, toggleBookmark, reportThread } = useForumActions();
  const [showReportMenu, setShowReportMenu] = useState(false);

  const handleLike = async () => {
    try {
      await toggleLike(threadId);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      await toggleBookmark(threadId);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleReport = () => {
    setShowReportMenu(!showReportMenu);
  };

  return (
    <div className="thread-actions flex flex-col gap-2">
      <button
        onClick={handleLike}
        className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
          isLiked ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
        }`}
        title={isLiked ? 'Batalkan Suka' : 'Suka'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={isLiked ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={isLiked ? 0 : 2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <button
        onClick={handleBookmark}
        className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
          isBookmarked ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'
        }`}
        title={isBookmarked ? 'Batalkan Simpan' : 'Simpan'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={isBookmarked ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={isBookmarked ? 0 : 2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>

      <div className="relative">
        <button
          onClick={handleReport}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 dark:text-gray-500"
          title="Lainnya"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        </button>

        {showReportMenu && (
          <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <button
                onClick={() => {
                  reportThread(threadId);
                  setShowReportMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Laporkan Thread
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadActions;
