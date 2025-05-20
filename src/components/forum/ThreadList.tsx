// src/components/forum/ThreadList.tsx
import React from 'react';
import ThreadCard from './ThreadCard';
import { ThreadType } from '@/lib/forum/types';

interface ThreadListProps {
  threads: ThreadType[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  if (threads.length === 0) {
    return (
      <div className="empty-state p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M9 4H5a2 2 0 00-2 2v13.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V6a2 2 0 00-2-2h-4m-1-3H9a1 1 0 00-1 1v1h8V2a1 1 0 00-1-1z"
            />
          </svg>
          <p className="text-lg font-medium">Belum ada thread</p>
          <p className="mt-2">Jadilah yang pertama membuat diskusi di kategori ini!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="thread-list space-y-4">
      {threads.map(thread => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default ThreadList;
