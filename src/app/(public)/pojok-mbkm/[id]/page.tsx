'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJournalById, getAuthorById, getRelatedJournals } from '@/lib/firebaseJournals';
import { Author } from '@/lib/types/journal';
import { Journal } from '@/components/sections/PojokMBKM';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiBookOpen, FiArrowLeft, FiUser } from 'react-icons/fi';

// ===== JOURNAL MEDIA GALLERY COMPONENT =====
const JournalMedia = ({ media }: { media: Journal['media'] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!media || media.length === 0) return null;

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
        Galeri Media
      </h3>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Media Grid */}
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
            </div>
            {item.caption && (
              <div className="p-3 bg-white dark:bg-gray-800">
                <p className="text-gray-700 dark:text-gray-200 text-sm">{item.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ===== AUTHOR INFO COMPONENT =====
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
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
        Tentang Penulis
      </h3>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Author Avatar */}
        {author.image ? (
          <div className="relative w-24 aspect-square rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md">
            <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {author.name.charAt(0)}
          </div>
        )}

        {/* Author Details */}
        <div className="flex-1">
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
        </div>
      </div>
    </motion.div>
  );
};

// ===== RELATED JOURNALS COMPONENT =====
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
    >
      <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
        Jurnal Terkait
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedJournals.map((journal, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={journal.id}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={journal.media?.[0]?.url || '/api/placeholder/300/200'}
                alt={journal.title}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {journal.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed">
              {journal.summary}
            </p>
            <Link
              href={`/pojok-mbkm/${journal.id}`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
            >
              Baca Selengkapnya
              <svg
                className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ===== JOURNAL BANNER COMPONENT =====
const JournalBanner = ({ journal }: { journal: Journal }) => {
  const categoryLabel = {
    'daily-activity': 'Daily Activity',
    'weekly-reflection': 'Weekly Reflection',
    'project-update': 'Project Update',
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-300"></div>
        <div className="absolute top-0 right-20 w-48 h-48 rounded-full bg-indigo-400"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-purple-400"></div>
      </div>

      {/* Banner Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 pt-32 relative z-10">
        {/* Category Badge */}
        <div className="inline-block mb-6">
          <span className="inline-flex items-center px-3 py-1.5 bg-blue-500 bg-opacity-30 border border-blue-400 text-blue-50 rounded-md font-medium text-sm backdrop-blur-sm">
            {categoryLabel[journal.category]}
          </span>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl"
        >
          {journal.title}
        </motion.h1>

        {/* Meta Information */}
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

      {/* Wave Effect */}
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

// ===== FLOATING ACTION BUTTONS =====
const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all"
        title="Kembali ke atas"
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

// ===== MAIN JOURNAL DETAIL COMPONENT =====
const JournalDetail = ({ journal }: { journal: Journal }) => {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <JournalBanner journal={journal} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3">
            {/* Featured Image */}
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

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md mb-8"
            >
              <div
                className="prose dark:prose-invert prose-lg max-w-none 
                prose-headings:text-gray-800 dark:prose-headings:text-white prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-8 prose-headings:leading-tight first:prose-headings:mt-0
                prose-h1:text-3xl prose-h1:mb-8 prose-h1:pb-3 prose-h1:border-b prose-h1:border-gray-200 dark:prose-h1:border-gray-700
                prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-blue-800 dark:prose-h2:text-blue-300
                prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-gray-800 dark:prose-h3:text-gray-200
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:text-justify prose-p:leading-loose prose-p:mb-6 prose-p:hyphens-auto
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                prose-em:text-gray-600 dark:prose-em:text-gray-400 prose-em:italic prose-em:font-medium
                prose-ul:mb-6 prose-ul:space-y-2 prose-ol:mb-6 prose-ol:space-y-2
                prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-loose prose-li:pl-2
                prose-ul>li:before:bg-blue-500 prose-ul>li:before:w-2 prose-ul>li:before:h-2
                prose-ol>li:marker:text-blue-600 dark:prose-ol>li:marker:text-blue-400 prose-ol>li:marker:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-blue-800 dark:prose-blockquote:text-blue-200
                prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-700 prose-pre:p-4 prose-pre:rounded-lg prose-pre:mb-6 prose-pre:overflow-x-auto
                prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-10 prose-hr:border-t-2
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors
                prose-img:rounded-lg prose-img:shadow-md prose-img:mb-6 prose-img:mx-auto
                [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              >
                <ReactMarkdown>{journal.content}</ReactMarkdown>
              </div>
            </motion.div>

            {/* Additional Media Gallery */}
            {journal.media && journal.media.length > 1 && (
              <JournalMedia media={journal.media.slice(1)} />
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <AuthorInfo authorId={journal.authorId} />
          </div>
        </div>

        {/* Related Journals - Full Width Section */}
        <RelatedJournals journalId={journal.id} category={journal.category} />
      </div>

      {/* Floating Action Buttons */}
      <FloatingActions />
    </div>
  );
};

// ===== LOADING COMPONENT =====
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
      <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg animate-pulse">
        Memuat jurnal...
      </p>
    </div>
  </div>
);

// ===== ERROR COMPONENT =====
const ErrorScreen = () => (
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
        Maaf, jurnal yang Anda cari tidak ada atau telah dihapus. Silakan kembali ke halaman Pojok
        MBKM untuk melihat jurnal lainnya.
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

// ===== MAIN PAGE COMPONENT =====
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
        const foundJournal = await getJournalById(journalId);

        // Simulate loading delay
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

  // Render loading state
  if (loading) {
    return <LoadingScreen />;
  }

  // Render error state
  if (error || !journal) {
    return <ErrorScreen />;
  }

  // Render main content
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <JournalDetail journal={journal} />
    </div>
  );
}
