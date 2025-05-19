// src/components/sections/ForumPreview.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Tipe data untuk postingan forum
type Post = {
  id: string;
  username: string;
  userPhotoURL: string;
  content: string;
  createdAt: Date;
  isAnnouncement: boolean;
  isPinned: boolean;
  likes: string[];
  commentCount: number;
  tags: string[];
};

// Tipe data untuk komentar
type Comment = {
  id: string;
  postId: string;
  parentId: string | null;
  username: string;
  userPhotoURL: string;
  content: string;
  createdAt: Date;
  likes: string[];
  isPinned: boolean;
};

const Forum = () => {
  // Data contoh untuk preview forum
  const samplePosts: Post[] = [
    {
      id: '1',
      username: 'Admin MBKM',
      userPhotoURL: '/images/admin-avatar.jpg',
      content: 'Pengumuman: Pendaftaran program MBKM semester genap tahun 2025 akan dibuka mulai tanggal 25 Mei 2025. Silakan persiapkan berkas-berkas yang diperlukan.',
      createdAt: new Date('2025-05-15T10:00:00'),
      isAnnouncement: true,
      isPinned: true,
      likes: ['user1', 'user2', 'user3'],
      commentCount: 5,
      tags: ['#Pengumuman', '#Pendaftaran']
    },
    {
      id: '2',
      username: 'Mahasiswa123',
      userPhotoURL: '/images/student-avatar.jpg',
      content: 'Halo teman-teman, ada yang sudah pernah mengikuti program MBKM di ANRI? Saya ingin tahu lebih banyak tentang pengalaman kalian selama magang di sana.',
      createdAt: new Date('2025-05-17T14:30:00'),
      isAnnouncement: false,
      isPinned: false,
      likes: ['user4', 'user5'],
      commentCount: 3,
      tags: ['#Diskusi', '#Pertanyaan']
    }
  ];

  const sampleComments: Comment[] = [
    {
      id: 'c1',
      postId: '1',
      parentId: null,
      username: 'Mahasiswa456',
      userPhotoURL: '/images/student-avatar2.jpg',
      content: 'Terima kasih atas informasinya! Apakah ada dokumen khusus yang perlu disiapkan selain transkrip nilai?',
      createdAt: new Date('2025-05-15T10:15:00'),
      likes: ['user1', 'user2'],
      isPinned: true
    },
    {
      id: 'c2',
      postId: '2',
      parentId: null,
      username: 'AlumniMBKM',
      userPhotoURL: '/images/alumni-avatar.jpg',
      content: 'Pengalaman saya selama magang di ANRI sangat bermanfaat. Kamu akan belajar banyak tentang pengelolaan arsip dan dokumentasi. Lingkungan kerjanya juga sangat supportif!',
      createdAt: new Date('2025-05-17T15:00:00'),
      likes: ['user3', 'user4', 'user5'],
      isPinned: false
    }
  ];

  // State untuk menampilkan komentar
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  // Fungsi untuk format tanggal
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Komponen Badge Admin
  const AdminBadge = () => (
    <span className="inline-flex items-center px-2 py-0.5 ml-2 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
      Admin
    </span>
  );

  // Komponen Badge Pengumuman
  const AnnouncementBadge = () => (
    <span className="inline-flex items-center px-2 py-0.5 mb-2 text-xs font-medium rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
      Pengumuman
    </span>
  );

  // Komponen untuk pin icon
  const PinnedIcon = () => (
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.828 5l-2-2H19v2H9.828zM17 7H7.828l-2-2H3v13h14V7zm-6 8H7v-2h4v2zm0-4H7V9h4v2z" />
    </svg>
  );

  // Toggle komentar
  const toggleComments = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <section
      id="Forum"
      className="py-20 bg-white dark:bg-gradient-to-b dark:from-[#1E293B] dark:to-[#0F172A]"
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Diskusi Komunitas
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Forum MBKM BAST ANRI
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Bergabunglah dalam diskusi dengan admin dan mahasiswa lain untuk berbagi informasi, pengalaman, dan pengetahuan seputar program MBKM BAST ANRI.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-6 flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                Semua Postingan
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Pengumuman
              </button>
            </div>
            <Link
              href="/Forum"
              title="Lihat semua diskusi"
              className="text-primary-light dark:text-blue-400 font-medium inline-flex items-center hover:underline"
            >
              Lihat semua
              <svg
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Post list */}
          <div className="space-y-6">
            {samplePosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-4">
                  {/* Post header */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={post.userPhotoURL}
                          alt={post.username}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {post.username}
                          </span>
                          {post.username.includes('Admin') && <AdminBadge />}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </div>
                    {post.isPinned && (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <PinnedIcon />
                        <span className="ml-1">Disematkan</span>
                      </div>
                    )}
                  </div>

                  {/* Post content */}
                  <div className="mb-4">
                    {post.isAnnouncement && <AnnouncementBadge />}
                    <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Post actions */}
                  <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          ></path>
                        </svg>
                        <span>{post.likes.length}</span>
                      </button>
                      <button 
                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
                        onClick={() => toggleComments(post.id)}
                      >
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          ></path>
                        </svg>
                        <span>{post.commentCount}</span>
                      </button>
                    </div>
                    <button className="text-sm text-primary-light dark:text-blue-400 hover:underline">
                      Balas
                    </button>
                  </div>
                </div>

                {/* Comments section */}
                {expandedPost === post.id && (
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
                    {sampleComments
                      .filter(comment => comment.postId === post.id)
                      .map(comment => (
                        <div 
                          key={comment.id} 
                          className={`mb-3 p-3 ${comment.isPinned ? 'bg-blue-50 dark:bg-blue-900/20 rounded' : ''}`}
                        >
                          <div className="flex items-start space-x-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                              <Image
                                src={comment.userPhotoURL}
                                alt={comment.username}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="font-medium text-gray-900 dark:text-white text-sm">
                                  {comment.username}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                  {formatDate(comment.createdAt)}
                                </span>
                                {comment.isPinned && (
                                  <div className="ml-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <PinnedIcon />
                                    <span className="ml-1">Disematkan</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                                {comment.content}
                              </p>
                              <div className="flex items-center mt-2 space-x-4">
                                <button className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
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
                                      strokeWidth="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    ></path>
                                  </svg>
                                  <span>{comment.likes.length}</span>
                                </button>
                                <button className="text-xs text-primary-light dark:text-blue-400 hover:underline">
                                  Balas
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    
                    {/* Comment input */}
                    <div className="mt-4 flex items-start space-x-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image
                          src="/images/default-avatar.jpg"
                          alt="Avatar Anda"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <textarea
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Tulis komentar..."
                          rows={2}
                        ></textarea>
                        <div className="flex justify-end mt-2">
                          <button className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark transition-colors">
                            Kirim
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              href="/Forum"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              Jelajahi Forum Diskusi
              <svg
                className="w-5 h-5 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Forum;