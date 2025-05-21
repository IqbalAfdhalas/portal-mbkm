// src/app/pojok-mbkm/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJournalById, getAuthorById } from '@/lib/data/dummyJournals';
import { Journal } from '@/components/sections/PojokMBKM';
import ReactMarkdown from 'react-markdown';

// Komponen untuk menampilkan galeri media jurnal
const JournalMedia = ({ media }: { media: Journal['media'] }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Galeri Media</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {media.map((item, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg">
            <img
              src={item.url}
              alt={item.caption || 'Media jurnal'}
              className="w-full h-auto object-cover"
            />
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                <p className="text-white text-sm">{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Komponen untuk menampilkan info penulis
const AuthorInfo = ({ authorId }: { authorId: string }) => {
  const author = getAuthorById(authorId);

  if (!author) return null;

  return (
    <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tentang Penulis</h3>
      <div className="flex items-start space-x-4">
        {author.image && (
          <img
            src={author.image}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{author.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{author.position}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{author.university}</p>
          <p className="text-sm text-gray-700 dark:text-gray-400">{author.bio}</p>
        </div>
      </div>
    </div>
  );
};

// Komponen detail jurnal
const JournalDetail = ({ journal }: { journal: Journal }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const categoryLabel = {
    'daily-activity': 'Daily Activity',
    'weekly-reflection': 'Weekly Reflection',
    'project-update': 'Project Update',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/#pojok-mbkm"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Pojok MBKM
        </Link>
      </div>

      <div className="mb-4">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">
          {categoryLabel[journal.category]}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{journal.title}</h1>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center">
          {journal.authorImage ? (
            <img
              src={journal.authorImage}
              alt={journal.authorName}
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></div>
          )}
          <span className="text-gray-700 dark:text-gray-300">{journal.authorName}</span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">{formatDate(journal.date)}</span>
        {journal.location && (
          <span className="text-gray-500 dark:text-gray-400">{journal.location}</span>
        )}
      </div>

      {journal.media && journal.media.length > 0 && (
        <div className="mb-8">
          <img
            src={journal.media[0].url}
            alt={journal.title}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{journal.content}</ReactMarkdown>
      </div>

      <JournalMedia media={journal.media} />

      <AuthorInfo authorId={journal.authorId} />
    </div>
  );
};

// Halaman detail jurnal
export default function JournalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const journalId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundJournal = getJournalById(journalId);

      if (foundJournal) {
        setJournal(foundJournal);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !journal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Jurnal Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Maaf, jurnal yang Anda cari tidak ada atau telah dihapus.
          </p>
          <Link
            href="/#pojok-mbkm"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Kembali ke Pojok MBKM
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <JournalDetail journal={journal} />
    </div>
  );
}
