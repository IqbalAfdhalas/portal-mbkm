//src/app/forum/thread/[threadId]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ForumEditor from '@/components/forum/ForumEditor';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { getThreadById, updateThread } from '@/services/forum/threadService';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { toast } from 'react-hot-toast';

interface Thread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
  tags: string[];
}

export default function EditThreadPage() {
  const params = useParams();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [thread, setThread] = useState<Thread | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchingThread, setFetchingThread] = useState(true);

  const threadId = params.threadId as string;

  useEffect(() => {
    const fetchThread = async () => {
      try {
        setFetchingThread(true);
        const threadData = await getThreadById(threadId);

        if (!threadData) {
          toast.error('Thread tidak ditemukan');
          router.push('/forum');
          return;
        }

        // Check if user is authorized to edit
        if (user && threadData.authorId !== user.uid) {
          toast.error('Anda tidak memiliki izin untuk mengedit thread ini');
          router.push(`/forum/thread/${threadId}`);
          return;
        }

        setThread(threadData);
        setTitle(threadData.title);
        setContent(threadData.content);
        setTags(threadData.tags || []);
      } catch (error) {
        console.error('Error fetching thread:', error);
        toast.error('Gagal memuat thread');
      } finally {
        setFetchingThread(false);
      }
    };

    if (!loading && user) {
      fetchThread();
    } else if (!loading && !user) {
      // Redirect if not logged in
      toast.error('Anda harus login terlebih dahulu');
      router.push('/login');
    }
  }, [threadId, router, user, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Judul thread tidak boleh kosong');
      return;
    }

    if (!content.trim()) {
      toast.error('Konten thread tidak boleh kosong');
      return;
    }

    try {
      setIsSubmitting(true);

      // Process tags (remove duplicates, empty tags, etc.)
      const processedTags = tags
        .filter(tag => tag.trim() !== '')
        .map(tag => tag.trim().toLowerCase())
        .filter((tag, index, self) => self.indexOf(tag) === index);

      await updateThread(threadId, {
        title,
        content,
        tags: processedTags,
        updatedAt: new Date(),
      });

      toast.success('Thread berhasil diperbarui');
      router.push(`/forum/thread/${threadId}`);
    } catch (error) {
      console.error('Error updating thread:', error);
      toast.error('Gagal memperbarui thread');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagInput = e.target.value;
    const tagArray = tagInput.split(',').map(tag => tag.trim());
    setTags(tagArray);
  };

  if (loading || fetchingThread) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/forum/thread/${threadId}`}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light mb-6"
        >
          <FiArrowLeft className="mr-2" /> Kembali ke Thread
        </Link>

        <h1 className="text-2xl font-bold mb-6">Edit Thread</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Judul Thread
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Masukkan judul thread"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Konten Thread
            </label>
            <ForumEditor
              value={content}
              onChange={setContent}
              placeholder="Apa yang ingin kamu diskusikan?"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Tags (pisahkan dengan koma)
            </label>
            <input
              type="text"
              id="tags"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={tags.join(', ')}
              onChange={handleTagChange}
              placeholder="Contoh: digitalisasi, arsip, magang"
            />
          </div>

          <div className="flex justify-end">
            <Link href={`/forum/thread/${threadId}`}>
              <button
                type="button"
                className="px-4 py-2 mr-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
