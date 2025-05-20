//src/app/forum/thread/[threadId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CommentSection from '@/components/forum/CommentSection';
import ThreadActions from '@/components/forum/ThreadActions';
import ForumSidebar from '@/components/forum/ForumSidebar';
import Link from 'next/link';
import { FiArrowLeft, FiEdit2, FiAlertTriangle } from 'react-icons/fi';
import { getThreadById } from '@/services/forum/threadService';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import ReportModal from '@/components/forum/ReportModal';

interface Thread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhotoURL: string;
  categoryId: string;
  categoryName?: string;
  createdAt: any;
  updatedAt: any;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isAnnouncement: boolean;
  isPinned: boolean;
  isLocked: boolean;
  status: 'active' | 'solved' | 'archived';
  tags: string[];
}

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const threadId = params.threadId as string;

  useEffect(() => {
    const fetchThread = async () => {
      try {
        setLoading(true);
        const threadData = await getThreadById(threadId);
        if (threadData) {
          setThread(threadData);
        } else {
          // Thread not found
          router.push('/forum');
        }
      } catch (error) {
        console.error('Error fetching thread:', error);
      } finally {
        setLoading(false);
      }
    };

    if (threadId) {
      fetchThread();
    }
  }, [threadId, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Thread tidak ditemukan</h1>
        <p className="mb-6">Thread yang kamu cari tidak tersedia atau telah dihapus.</p>
        <Link href="/forum">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            Kembali ke Forum
          </button>
        </Link>
      </div>
    );
  }

  // Format the date
  const formattedDate = new Date(thread.createdAt.toDate()).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Get thread status badge
  const getStatusBadge = () => {
    switch (thread.status) {
      case 'solved':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            Solved
          </span>
        );
      case 'archived':
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            Archived
          </span>
        );
      default:
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            Active
          </span>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <Link
              href="/forum"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light mb-4"
            >
              <FiArrowLeft className="mr-2" /> Kembali ke Forum
            </Link>

            <div className="flex justify-between items-start mb-2">
              <div>
                {thread.isAnnouncement && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 mr-2">
                    Pengumuman
                  </span>
                )}
                {thread.isPinned && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 mr-2">
                    Pinned
                  </span>
                )}
                {getStatusBadge()}
              </div>

              <div className="flex gap-2">
                {user && user.uid === thread.authorId && (
                  <Link href={`/forum/thread/${threadId}/edit`}>
                    <button className="text-gray-500 hover:text-primary p-1">
                      <FiEdit2 size={18} />
                    </button>
                  </Link>
                )}
                <button
                  className="text-gray-500 hover:text-red-500 p-1"
                  onClick={() => setIsReportModalOpen(true)}
                >
                  <FiAlertTriangle size={18} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">{thread.title}</h1>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center">
                <img
                  src={thread.authorPhotoURL || '/images/default-avatar.png'}
                  alt={thread.authorName}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span>{thread.authorName}</span>
              </div>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
              {thread.updatedAt !== thread.createdAt && (
                <span className="ml-2 text-xs italic">(edited)</span>
              )}
              <span className="mx-2">•</span>
              <Link
                href={`/forum/${thread.categoryId}`}
                className="hover:text-primary dark:hover:text-primary-light"
              >
                {thread.categoryName || 'Kategori'}
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: thread.content }}
              ></div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <ThreadActions
                  threadId={thread.id}
                  likeCount={thread.likeCount}
                  commentCount={thread.commentCount}
                  viewCount={thread.viewCount}
                />

                <div className="flex gap-2">
                  {thread.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <CommentSection threadId={threadId} isLocked={thread.isLocked} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80">
          <ForumSidebar />
        </div>
      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          contentId={threadId}
          contentType="thread"
        />
      )}
    </div>
  );
}
