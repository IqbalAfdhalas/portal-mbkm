// src/app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Image as ImageIcon, BookOpen, Users, Clock, TrendingUp } from 'lucide-react';
import { getAllProfiles } from '@/lib/firebaseProfiles';
import { getGalleryItems } from '@/lib/firebaseGallery';
import { getAllJournals } from '@/lib/firebaseJournals';
import type { ProfileClient } from '@/lib/firebaseProfiles';
import type { GalleryImage } from '@/data/gallery/galeryData';
import type { Journal } from '@/lib/types/journal';

interface DashboardStats {
  totalMahasiswa: number;
  totalPembimbing: number;
  totalMentor: number;
  totalGalleryItems: number;
  totalJournals: number;
  loading: boolean;
}

interface RecentActivity {
  id: string;
  type: 'profile' | 'gallery' | 'journal';
  title: string;
  description: string;
  date: Date;
  icon: React.ReactNode;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMahasiswa: 0,
    totalPembimbing: 0,
    totalMentor: 0,
    totalGalleryItems: 0,
    totalJournals: 0,
    loading: true,
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profiles, galleryItems, journals] = await Promise.all([
          getAllProfiles(),
          getGalleryItems(),
          getAllJournals(),
        ]);

        // Count profiles by role
        const mahasiswa = profiles.filter(p => p.peran === 'Mahasiswa').length;
        const pembimbing = profiles.filter(p => p.peran === 'Pembimbing Kampus').length;
        const mentor = profiles.filter(p => p.peran === 'Mentor BAST ANRI').length;

        setStats({
          totalMahasiswa: mahasiswa,
          totalPembimbing: pembimbing,
          totalMentor: mentor,
          totalGalleryItems: galleryItems.length,
          totalJournals: journals.length,
          loading: false,
        });

        // Generate recent activities
        const activities: RecentActivity[] = [];

        // Recent profiles (last 5)
        profiles
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, 3)
          .forEach(profile => {
            activities.push({
              id: profile.id,
              type: 'profile',
              title: `${profile.nama} ditambahkan`,
              description: `${profile.peran} - ${profile.asalInstitusi || 'Institusi tidak diketahui'}`,
              date: profile.createdAt,
              icon: <Users className="w-4 h-4" />,
            });
          });

        // Recent gallery items (last 3)
        galleryItems
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 2)
          .forEach(item => {
            activities.push({
              id: item.id.toString(),
              type: 'gallery',
              title: `Foto "${item.title}" ditambahkan`,
              description: `Kategori: ${item.category} - ${item.year}`,
              date: new Date(item.date),
              icon: <ImageIcon className="w-4 h-4" />,
            });
          });

        // Recent journals (last 2)
        journals
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, 2)
          .forEach(journal => {
            activities.push({
              id: journal.id,
              type: 'journal',
              title: `Jurnal "${journal.title}" dipublikasi`,
              description: `Kategori: ${journal.category}`,
              date: journal.createdAt,
              icon: <BookOpen className="w-4 h-4" />,
            });
          });

        // Sort activities by date and take top 5
        const sortedActivities = activities
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .slice(0, 5);

        setRecentActivities(sortedActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hari ini';
    if (diffDays === 2) return 'Kemarin';
    if (diffDays <= 7) return `${diffDays - 1} hari yang lalu`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} minggu yang lalu`;
    return date.toLocaleDateString('id-ID');
  };

  if (stats.loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-1" />
          Terakhir diperbarui: {new Date().toLocaleTimeString('id-ID')}
        </div>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Kenali Kami Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="flex items-center flex-1">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Kenali Kami</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Kelola data mahasiswa, pembimbing, dan mentor
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-blue-500 mr-1" />
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  {stats.totalMahasiswa + stats.totalPembimbing + stats.totalMentor} total profil
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/kenali-kami"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Kelola data
            </Link>
          </div>
        </div>

        {/* Galeri Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="flex items-center flex-1">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mr-4">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Galeri</h2>
              <p className="text-gray-600 dark:text-gray-300">Kelola foto dan video kegiatan</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600 dark:text-green-400">
                  {stats.totalGalleryItems} media tersimpan
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/galeri"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Kelola Galeri
            </Link>
          </div>
        </div>

        {/* Pojok MBKM Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="flex items-center flex-1">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mr-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Pojok MBKM</h2>
              <p className="text-gray-600 dark:text-gray-300">Kelola jurnal kegiatan mahasiswa</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-purple-500 mr-1" />
                <span className="text-xs text-purple-600 dark:text-purple-400">
                  {stats.totalJournals} jurnal dipublikasi
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/pojok-mbkm"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Kelola Jurnal
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {recentActivities.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivities.map((activity, index) => (
                <div
                  key={`${activity.type}-${activity.id}-${index}`}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === 'profile'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                          : activity.type === 'gallery'
                            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                            : 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                      }`}
                    >
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {formatDate(activity.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Tidak ada aktivitas terbaru
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Mahasiswa</p>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {stats.totalMahasiswa}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Pembimbing</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                {stats.totalPembimbing}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Mentor</p>
              <h3 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mt-1">
                {stats.totalMentor}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Media Galeri</p>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                {stats.totalGalleryItems}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Jurnal</p>
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                {stats.totalJournals}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
