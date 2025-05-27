// src/app/admin/kenali-kami/page.tsx
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  User,
  Users,
  Search,
  RefreshCw,
  BarChart3,
  GraduationCap,
  UserCheck,
  Users2,
} from 'lucide-react';
import Image from 'next/image';
import {
  getAllProfiles,
  deleteProfile,
  createProfile,
  updateProfile,
  ProfileClient,
} from '@/lib/firebaseProfiles';
import ProfileForm from '@/components/ui/ProfilForm';

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Role colors constant
const ROLE_COLORS = {
  Mahasiswa: {
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    badge: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    hoverText: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
  },
  'Mentor BAST ANRI': {
    gradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
    badge: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    hoverText: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
  },
  'Pembimbing Kampus': {
    gradient: 'bg-gradient-to-br from-green-500 to-green-600',
    badge: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    hoverText: 'group-hover:text-green-600 dark:group-hover:text-green-400',
  },
} as const;

const getCardColors = (peran: string) =>
  ROLE_COLORS[peran as keyof typeof ROLE_COLORS] || {
    gradient: 'bg-gradient-to-br from-gray-500 to-gray-600',
    badge: 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200',
    hoverText: 'group-hover:text-gray-600 dark:group-hover:text-gray-400',
  };

// Profile Card Component
const ProfileCard = ({
  profile,
  colors,
  index,
  onEdit,
  onDelete,
}: {
  profile: ProfileClient;
  colors: any;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <div
    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
    style={{ animation: `fadeInUp 0.6s ease-out forwards ${index * 100}ms` }}
  >
    {/* Header */}
    <div className={`${colors.gradient} h-20 relative`}>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
    </div>

    {/* Content */}
    <div className="px-6 pb-2 -mt-8 relative flex-1 flex flex-col">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-gray-700 ring-4 ring-white dark:ring-gray-800 shadow-lg">
          {profile.foto ? (
            <Image
              src={profile.foto}
              alt={profile.nama}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              unoptimized={profile.foto.includes('ui-avatars.com')}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center space-y-2 mb-6 flex-1">
        <h3
          className={`text-lg font-bold text-gray-900 dark:text-white ${colors.hoverText} transition-colors`}
        >
          {profile.nama}
        </h3>
        <div className={`inline-block px-3 py-1 ${colors.badge} text-sm font-medium rounded-full`}>
          {profile.peran}
        </div>

        {profile.asalInstitusi && (
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {profile.asalInstitusi}
          </p>
        )}

        <div className="space-y-1">
          {profile.prodi && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {profile.prodi}
              {profile.angkatan && ` • ${profile.angkatan}`}
            </p>
          )}
          {profile.unit && (
            <p className="text-xs text-gray-500 dark:text-gray-500">{profile.unit}</p>
          )}
        </div>
      </div>
    </div>

    {/* Actions */}
    <div className="px-6 pb-4">
      <div className="flex justify-between gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={onEdit}
          className="flex items-center text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Hapus
        </button>
      </div>
    </div>
  </div>
);

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex justify-center items-center space-x-2 mt-8">
    <button
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
      const showPage =
        pageNum === 1 ||
        pageNum === totalPages ||
        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

      if (!showPage) {
        if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
          return (
            <span key={pageNum} className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              ...
            </span>
          );
        }
        return null;
      }

      return (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            currentPage === pageNum
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {pageNum}
        </button>
      );
    })}

    <button
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
    >
      Next
    </button>
  </div>
);

// Profile Grid Component
const ProfileGrid = ({
  profiles,
  category,
  currentPage,
  onPageChange,
  itemsPerPage,
}: {
  profiles: ProfileClient[];
  category: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = profiles.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(profiles.length / itemsPerPage);

  if (profiles.length === 0) return null;

  const icons = {
    mahasiswa: <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    mentor: <Users2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    pembimbing: <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />,
  };

  const titles = {
    mahasiswa: 'Mahasiswa',
    mentor: 'Mentor BAST ANRI',
    pembimbing: 'Pembimbing Kampus',
  };

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          {icons[category as keyof typeof icons]}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {titles[category as keyof typeof titles]}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{profiles.length} orang</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProfiles.map((profile, index) => {
          const colors = getCardColors(profile.peran);
          return (
            <ProfileCard
              key={profile.id}
              profile={profile}
              colors={colors}
              index={index}
              onEdit={() => {}} // Will be passed from parent
              onDelete={() => {}} // Will be passed from parent
            />
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
};

export default function AdminKenaliKamiPage() {
  const [profiles, setProfiles] = useState<ProfileClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ProfileClient | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterProdi, setFilterProdi] = useState('');
  const [filterAngkatan, setFilterAngkatan] = useState('');
  const [filterUnit, setFilterUnit] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [itemsPerPage] = useState(12);

  // Consolidated pagination state
  const [paginationState, setPaginationState] = useState({
    mahasiswa: 1,
    mentor: 1,
    pembimbing: 1,
  });

  const updatePagination = (category: 'mahasiswa' | 'mentor' | 'pembimbing', page: number) => {
    setPaginationState(prev => ({ ...prev, [category]: page }));
  };

  // Debounced search
  const searchTerm = useDebounce(searchInput, 300);

  // Show toast notification
  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load profiles
  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllProfiles();
      setProfiles(data);
    } catch (error) {
      console.error('Error loading profiles:', error);
      showToast('Gagal memuat data profil', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Optimized filter logic with useMemo
  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          profile.nama.toLowerCase().includes(searchLower) ||
          profile.peran.toLowerCase().includes(searchLower) ||
          profile.asalInstitusi?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Role-based filters
      if (filterRole && profile.peran !== filterRole) return false;
      if (filterProdi && profile.prodi !== filterProdi) return false;
      if (filterAngkatan && profile.angkatan !== filterAngkatan) return false;
      if (filterUnit && profile.unit !== filterUnit) return false;

      return true;
    });
  }, [profiles, searchTerm, filterRole, filterProdi, filterAngkatan, filterUnit]);

  // Get unique values for filter options
  const uniqueRoles = [...new Set(profiles.map(p => p.peran))];
  const uniqueProdi = [...new Set(profiles.filter(p => p.prodi).map(p => p.prodi))];
  const uniqueAngkatan = [...new Set(profiles.filter(p => p.angkatan).map(p => p.angkatan))];
  const uniqueUnit = [...new Set(profiles.filter(p => p.unit).map(p => p.unit))];

  // Simplified statistics with useMemo
  const statistics = useMemo(() => {
    const counts = profiles.reduce(
      (acc, profile) => {
        acc[profile.peran] = (acc[profile.peran] || 0) + 1;
        if (profile.angkatan) acc.angkatan.add(profile.angkatan);
        if (profile.prodi) acc.prodi.add(profile.prodi);
        return acc;
      },
      {
        Mahasiswa: 0,
        'Pembimbing Kampus': 0,
        'Mentor BAST ANRI': 0,
        angkatan: new Set(),
        prodi: new Set(),
      } as any
    );

    return {
      totalMahasiswa: counts['Mahasiswa'],
      totalPembimbing: counts['Pembimbing Kampus'],
      totalMentor: counts['Mentor BAST ANRI'],
      totalAngkatan: counts.angkatan.size,
      totalProdi: counts.prodi.size,
    };
  }, [profiles]);

  // Grouped profiles
  const groupedProfiles = useMemo(
    () => ({
      mahasiswa: filteredProfiles.filter(p => p.peran === 'Mahasiswa'),
      mentor: filteredProfiles.filter(p => p.peran === 'Mentor BAST ANRI'),
      pembimbing: filteredProfiles.filter(p => p.peran === 'Pembimbing Kampus'),
    }),
    [filteredProfiles]
  );

  // Reset dependent filters when role changes
  const handleRoleChange = (role: string) => {
    setFilterRole(role);
    setFilterProdi('');
    setFilterAngkatan('');
    setFilterUnit('');
  };

  // Get available prodi options based on selected role
  const getAvailableProdi = () => {
    if (!filterRole) return uniqueProdi;
    return [...new Set(profiles.filter(p => p.peran === filterRole && p.prodi).map(p => p.prodi))];
  };

  // Get available angkatan options based on selected role and prodi
  const getAvailableAngkatan = () => {
    let filtered = profiles.filter(p => p.angkatan);
    if (filterRole) filtered = filtered.filter(p => p.peran === filterRole);
    if (filterProdi) filtered = filtered.filter(p => p.prodi === filterProdi);
    return [...new Set(filtered.map(p => p.angkatan))];
  };

  // Get available unit options based on selected role
  const getAvailableUnit = () => {
    if (!filterRole) return uniqueUnit;
    return [...new Set(profiles.filter(p => p.peran === filterRole && p.unit).map(p => p.unit))];
  };

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  // Handle create profile
  const handleCreate = async (data: any) => {
    try {
      await createProfile(data);
      await loadProfiles();
      setShowForm(false);
      showToast('Profil berhasil ditambahkan', 'success');
    } catch (error) {
      console.error('Error creating profile:', error);
      showToast('Gagal menambah profil', 'error');
    }
  };

  // Handle update profile
  const handleUpdate = async (data: any) => {
    if (!editingProfile) return;

    try {
      await updateProfile(editingProfile.id, data);
      await loadProfiles();
      setEditingProfile(null);
      showToast('Profil berhasil diperbarui', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Gagal memperbarui profil', 'error');
    }
  };

  // Handle delete profile
  const handleDelete = async (id: string) => {
    try {
      await deleteProfile(id);
      await loadProfiles();
      setDeleteConfirm(null);
      showToast('Profil berhasil dihapus', 'success');
    } catch (error) {
      console.error('Error deleting profile:', error);
      showToast('Gagal menghapus profil', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
          Memuat data profil...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Mohon tunggu sebentar</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Mahasiswa</p>
              <p className="text-2xl font-bold">{statistics.totalMahasiswa}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Pembimbing</p>
              <p className="text-2xl font-bold">{statistics.totalPembimbing}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Mentor</p>
              <p className="text-2xl font-bold">{statistics.totalMentor}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <Users2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Angkatan</p>
              <p className="text-2xl font-bold">{statistics.totalAngkatan}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Program Studi</p>
              <p className="text-2xl font-bold">{statistics.totalProdi}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-full duration-300">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-3 ${
                  toast.type === 'success' ? 'bg-green-200' : 'bg-red-200'
                }`}
              ></div>
              {toast.message}
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Kelola Profil
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Total: {filteredProfiles.length} dari {profiles.length} profil
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadProfiles}
            disabled={loading}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            title="Refresh database"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Profil
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, peran, atau institusi..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Peran
              </label>
              <select
                value={filterRole}
                onChange={e => handleRoleChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              >
                <option value="">Semua Peran</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional Filters Based on Role */}
            {filterRole === 'Mahasiswa' && (
              <>
                {/* Prodi Filter for Mahasiswa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Program Studi
                  </label>
                  <select
                    value={filterProdi}
                    onChange={e => setFilterProdi(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  >
                    <option value="">Semua Prodi</option>
                    {getAvailableProdi().map(prodi => (
                      <option key={prodi} value={prodi}>
                        {prodi}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Angkatan Filter for Mahasiswa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Angkatan
                  </label>
                  <select
                    value={filterAngkatan}
                    onChange={e => setFilterAngkatan(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  >
                    <option value="">Semua Angkatan</option>
                    {getAvailableAngkatan().map(angkatan => (
                      <option key={angkatan} value={angkatan}>
                        {angkatan}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {(filterRole === 'Mentor BAST ANRI' || filterRole === 'Pembimbing Kampus') && (
              /* Unit Filter for Mentor and Pembimbing */
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Unit/Bagian
                </label>
                <select
                  value={filterUnit}
                  onChange={e => setFilterUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                >
                  <option value="">Semua Unit</option>
                  {getAvailableUnit().map(unit => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Clear Filters Button */}
            {(filterRole || filterProdi || filterAngkatan || filterUnit || searchInput) && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterRole('');
                    setFilterProdi('');
                    setFilterAngkatan('');
                    setFilterUnit('');
                    setSearchInput('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Grids */}
      <div className="space-y-8">
        {/* Mahasiswa Grid */}
        <ProfileGridWithHandlers
          profiles={groupedProfiles.mahasiswa}
          category="mahasiswa"
          currentPage={paginationState.mahasiswa}
          onPageChange={page => updatePagination('mahasiswa', page)}
          itemsPerPage={itemsPerPage}
          onEdit={setEditingProfile}
          onDelete={setDeleteConfirm}
        />

        {/* Mentor Grid */}
        <ProfileGridWithHandlers
          profiles={groupedProfiles.mentor}
          category="mentor"
          currentPage={paginationState.mentor}
          onPageChange={page => updatePagination('mentor', page)}
          itemsPerPage={itemsPerPage}
          onEdit={setEditingProfile}
          onDelete={setDeleteConfirm}
        />

        {/* Pembimbing Grid */}
        <ProfileGridWithHandlers
          profiles={groupedProfiles.pembimbing}
          category="pembimbing"
          currentPage={paginationState.pembimbing}
          onPageChange={page => updatePagination('pembimbing', page)}
          itemsPerPage={itemsPerPage}
          onEdit={setEditingProfile}
          onDelete={setDeleteConfirm}
        />
      </div>

      {/* No Results Message */}
      {filteredProfiles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Tidak ada profil ditemukan
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Coba ubah kriteria pencarian atau filter untuk menemukan profil yang Anda cari.
          </p>
          <button
            onClick={() => {
              setFilterRole('');
              setFilterProdi('');
              setFilterAngkatan('');
              setFilterUnit('');
              setSearchInput('');
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all duration-200"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {/* Profile Form Modal */}
      {(showForm || editingProfile) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingProfile ? 'Edit Profil' : 'Tambah Profil Baru'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingProfile(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <ProfileForm
                mode={editingProfile ? 'edit' : 'create'}
                profile={editingProfile || undefined}
                isOpen={true}
                onClose={() => {
                  setShowForm(false);
                  setEditingProfile(null);
                }}
                onSubmit={editingProfile ? handleUpdate : handleCreate}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-4">
              <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
              Konfirmasi Hapus
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Apakah Anda yakin ingin menghapus profil ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-all duration-200"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-all duration-200"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Updated ProfileCard with working edit/delete handlers */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// Update ProfileGrid component to pass handlers
const ProfileGridWithHandlers = ({
  profiles,
  category,
  currentPage,
  onPageChange,
  itemsPerPage,
  onEdit,
  onDelete,
}: {
  profiles: ProfileClient[];
  category: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onEdit: (profile: ProfileClient) => void;
  onDelete: (id: string) => void;
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = profiles.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(profiles.length / itemsPerPage);

  if (profiles.length === 0) return null;

  const icons = {
    mahasiswa: <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    mentor: <Users2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    pembimbing: <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />,
  };

  const titles = {
    mahasiswa: 'Mahasiswa',
    mentor: 'Mentor BAST ANRI',
    pembimbing: 'Pembimbing Kampus',
  };

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          {icons[category as keyof typeof icons]}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {titles[category as keyof typeof titles]}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{profiles.length} orang</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProfiles.map((profile, index) => {
          const colors = getCardColors(profile.peran);
          return (
            <ProfileCard
              key={profile.id}
              profile={profile}
              colors={colors}
              index={index}
              onEdit={() => onEdit(profile)}
              onDelete={() => onDelete(profile.id)}
            />
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
};
