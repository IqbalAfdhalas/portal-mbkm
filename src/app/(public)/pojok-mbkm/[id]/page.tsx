'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJournalById, getAuthorById, getRelatedJournals } from '@/lib/firebaseJournals';
import { Author } from '@/lib/types/journal';
import { Journal } from '@/components/sections/PojokMBKM';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiMapPin,
  FiShare2,
  FiClock,
  FiBookOpen,
  FiArrowLeft,
  FiUser,
  FiTag,
} from 'react-icons/fi';

// Component for displaying journal media gallery with interactivity
const JournalMedia = ({ media }: { media: Journal['media'] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!media || media.length === 0) return null;

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
        Galeri Media
      </h3>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer bg-gray-100 dark:bg-gray-700"
            onClick={() => setSelectedImage(item.url)}
          >
            <div className="relative w-full h-48">
              <img
                src={item.url}
                alt={item.caption || 'Media jurnal'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {item.caption && (
              <div className="p-3 bg-white dark:bg-gray-800">
                <p className="text-gray-700 dark:text-gray-200 text-sm">{item.caption}</p>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
              <span className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AuthorInfo = ({ authorId }: { authorId: string }) => {
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      const res = await getAuthorById(authorId);
      setAuthor(res);
    };
    fetchAuthor();
  }, [authorId]);

  if (!author) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
        Tentang Penulis
      </h3>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {author.image ? (
          <div className="relative w-24 aspect-square rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md">
            <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {author.name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{author.name}</h4>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-md">
              {author.position}
            </span>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-md">
              {author.university}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{author.bio}</p>

          {/* Social links */}
          <div className="mt-4 flex space-x-3">
            {/* ...social icons tadi, bisa kamu biarin persis kayak sebelumnya */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// New component for related journals
const RelatedJournals = ({ journalId, category }: { journalId: string; category: string }) => {
  const [relatedJournals, setRelatedJournals] = useState<Journal[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      const res = await getRelatedJournals(journalId, category, 3);
      setRelatedJournals(res);
    };
    fetchRelated();
  }, [journalId, category]);

  if (relatedJournals.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6">Jurnal Terkait</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedJournals.map(journal => (
          <div key={journal.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <img
              src={journal.media?.[0]?.url}
              alt={journal.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h4 className="text-lg font-semibold mb-1">{journal.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {journal.summary}
            </p>
            <a
              href={`/pojok-mbkm/${journal.id}`}
              className="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Baca
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Banner component with animation for the header
const JournalBanner = ({ journal }: { journal: Journal }) => {
  const categoryLabel = {
    'daily-activity': 'Daily Activity',
    'weekly-reflection': 'Weekly Reflection',
    'project-update': 'Project Update',
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-300"></div>
        <div className="absolute top-0 right-20 w-48 h-48 rounded-full bg-indigo-400"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-purple-400"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 pt-32 relative z-10">
        <div className="inline-block mb-6">
          <span className="inline-flex items-center px-3 py-1.5 bg-blue-500 bg-opacity-30 border border-blue-400 text-blue-50 rounded-md font-medium text-sm backdrop-blur-sm">
            {categoryLabel[journal.category]}
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl"
        >
          {journal.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 text-blue-100"
        >
          <div className="flex items-center">
            <FiUser className="mr-2" />
            <span>{journal.authorName}</span>
          </div>

          <div className="flex items-center">
            <FiCalendar className="mr-2" />
            <span>
              {new Date(journal.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          {journal.location && (
            <div className="flex items-center">
              <FiMapPin className="mr-2" />
              <span>{journal.location}</span>
            </div>
          )}

          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span>
              {Math.ceil(journal.content.trim().split(/\s+/).length / 200) || 1} menit membaca
            </span>
          </div>
        </motion.div>
      </div>

      {/* Wave effect at bottom of banner */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-12 fill-gray-100 dark:fill-gray-900"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

// Floating action buttons
const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all"
        title="Share"
      >
        <FiShare2 size={20} />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all"
        title="Back to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
};

// Completely revised journal detail component
const JournalDetail = ({ journal }: { journal: Journal }) => {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <JournalBanner journal={journal} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="w-full lg:w-2/3">
            {/* Feature image - improved layout with proper aspect ratio */}
            {journal.media && journal.media.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 rounded-xl overflow-hidden shadow-lg relative"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={journal.media[0].url}
                    alt={journal.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                {journal.media[0].caption && (
                  <div className="p-4 bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
                    <p className="italic">{journal.media[0].caption}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md mb-8"
            >
              <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:text-gray-800 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300">
                <ReactMarkdown>{journal.content}</ReactMarkdown>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md"
            >
              <div className="flex flex-wrap gap-2 items-center">
                <FiTag className="text-blue-500 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Tags:</span>
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-md hover:bg-blue-100 dark:hover:bg-blue-800/30 cursor-pointer transition-colors">
                  MBKM
                </span>
                <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-md hover:bg-purple-100 dark:hover:bg-purple-800/30 cursor-pointer transition-colors">
                  Kampus Merdeka
                </span>
                <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-md hover:bg-green-100 dark:hover:bg-green-800/30 cursor-pointer transition-colors">
                  Magang
                </span>
              </div>
            </motion.div>

            {/* Gallery with improved layout - if there are more than one media items */}
            {journal.media && journal.media.length > 1 && (
              <JournalMedia media={journal.media.slice(1)} />
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Author info in sidebar */}
            <AuthorInfo authorId={journal.authorId} />

            {/* Related Journals in sidebar with improved image layout */}
            <RelatedJournals journalId={journal.id} category={journal.category} />
          </div>
        </div>
      </div>

      {/* Floating action buttons */}
      <FloatingActions />
    </div>
  );
};

// Enhanced page component with new layout
export default function JournalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJournal = async () => {
      if (params?.id) {
        const journalId = Array.isArray(params.id) ? params.id[0] : params.id;
        const foundJournal = await getJournalById(journalId); // <-- ini dia

        await new Promise(resolve => setTimeout(resolve, 800)); // loading simulasi

        if (foundJournal) {
          setJournal(foundJournal);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchJournal();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg animate-pulse">
            Memuat jurnal...
          </p>
        </div>
      </div>
    );
  }

  if (error || !journal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <svg
            className="w-16 h-16 text-blue-500 mx-auto mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Jurnal Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Maaf, jurnal yang Anda cari tidak ada atau telah dihapus. Silakan kembali ke halaman
            Pojok MBKM untuk melihat jurnal lainnya.
          </p>
          <Link
            href="/#pojok-mbkm"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 inline-flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Kembali ke Pojok MBKM
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <JournalDetail journal={journal} />
    </div>
  );
}
