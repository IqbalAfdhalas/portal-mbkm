//src/app/forum/thread/report/page.tsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { submitReport } from '@/services/forum/moderationService';

const reportReasons = [
  { id: 'inappropriate', label: 'Konten tidak pantas' },
  { id: 'spam', label: 'Spam atau promosi berlebihan' },
  { id: 'harassment', label: 'Pelecehan atau intimidasi' },
  { id: 'misinformation', label: 'Informasi salah atau menyesatkan' },
  { id: 'copyright', label: 'Pelanggaran hak cipta' },
  { id: 'other', label: 'Lainnya' },
];

export default function ReportThreadPage() {
  const params = useParams();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const threadId = params.threadId as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason) {
      toast.error('Silakan pilih alasan pelaporan');
      return;
    }

    try {
      setIsSubmitting(true);

      if (!user) {
        toast.error('Anda harus login untuk melaporkan konten');
        router.push('/login');
        return;
      }

      await submitReport({
        contentType: 'thread',
        contentId: threadId,
        reporterId: user.uid,
        reporterName: user.displayName || 'Anonymous',
        reason,
        details,
        createdAt: new Date(),
        status: 'pending',
      });

      toast.success('Laporan berhasil dikirim');
      router.push(`/forum/thread/${threadId}`);
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Gagal mengirim laporan');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Login Diperlukan</h1>
        <p className="mb-6">Silakan login terlebih dahulu untuk melaporkan konten.</p>
        <Link href="/login">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/forum/thread/${threadId}`}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light mb-6"
        >
          <FiArrowLeft className="mr-2" /> Kembali ke Thread
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Laporkan Thread</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alasan Pelaporan
              </label>
              <div className="space-y-2">
                {reportReasons.map(reportReason => (
                  <div key={reportReason.id} className="flex items-center">
                    <input
                      type="radio"
                      id={reportReason.id}
                      name="reportReason"
                      value={reportReason.id}
                      checked={reason === reportReason.id}
                      onChange={() => setReason(reportReason.id)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                    />
                    <label
                      htmlFor={reportReason.id}
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      {reportReason.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Detail (Opsional)
              </label>
              <textarea
                id="details"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder="Berikan detail tambahan mengenai laporan ini..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <Link href={`/forum/thread/${threadId}`}>
                <button
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
