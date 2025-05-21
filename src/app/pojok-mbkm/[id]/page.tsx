'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJournalById, getAuthorById, getRelatedJournals } from '@/lib/data/dummyJournals';
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

// Enhanced author info component
const AuthorInfo = ({ authorId }: { authorId: string }) => {
  const author = getAuthorById(authorId);

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
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// New component for related journals
const RelatedJournals = ({ journalId, category }: { journalId: string; category: string }) => {
  const relatedJournals = getRelatedJournals(journalId, category, 3);

  if (!relatedJournals || relatedJournals.length === 0) return null;

  const categoryLabel = {
    'daily-activity': 'Daily Activity',
    'weekly-reflection': 'Weekly Reflection',
    'project-update': 'Project Update',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
        Jurnal Terkait
      </h3>

      <div className="grid grid-cols-1 gap-6">
        {relatedJournals.map((journal, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={journal.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
          >
            <Link href={`/pojok-mbkm/${journal.id}`}>
              <div className="flex flex-row h-32">
                <div className="w-1/3 overflow-hidden relative">
                  {journal.media && journal.media.length > 0 ? (
                    <img
                      src={journal.media[0].url}
                      alt={journal.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <FiBookOpen className="text-white text-4xl" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md bg-blue-500 text-white">
                      {categoryLabel[journal.category]}
                    </span>
                  </div>
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm">
                    {journal.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <FiCalendar className="mr-1" />
                    <span>
                      {new Date(journal.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
            {/* Feature image - properly displayed */}
            {journal.media && journal.media.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src={journal.media[0].url}
                  alt={journal.title}
                  className="w-full h-auto object-cover"
                />
                {journal.media[0].caption && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 italic">
                    {journal.media[0].caption}
                  </div>
                )}
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8"
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

            {/* Gallery - if there are more than one media items */}
            {journal.media && journal.media.length > 1 && (
              <JournalMedia media={journal.media.slice(1)} />
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Author info in sidebar */}
            <AuthorInfo authorId={journal.authorId} />

            {/* Related Journals in sidebar */}
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
        const foundJournal = getJournalById(journalId);

        // Simulate network delay for loading animation
        await new Promise(resolve => setTimeout(resolve, 800));

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
