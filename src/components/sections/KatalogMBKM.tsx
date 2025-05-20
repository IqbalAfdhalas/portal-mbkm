// src/components/sections/KatalogMBKM.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiGrid, FiList } from 'react-icons/fi';
import ProfileCard from '@/components/ui/ProfileCard';
import ProfileListItem from '@/components/ui/ProfileListItem';
import StatisticsCard from '@/components/ui/StatisticsCard';
import { profileData } from '@/constants/profileData';

// Types
type Role = 'Pembimbing Kampus' | 'Mentor BAST ANRI' | 'Mahasiswa' | 'Semua';
type Program =
  | 'ManajemenInformatika'
  | 'IlmuKomunikasi'
  | 'Sejarah'
  | 'BahasaInggris'
  | 'TehnikMesin'
  | 'Semua';
type Batch = '2024' | '2025' | 'Semua';
type Unit = 'Akuisisi' | 'Pengolahan' | 'Preservasi' | 'Pelayanan' | 'Tata Usaha' | 'Semua';
type ViewMode = 'grid' | 'list';

const KatalogMBKM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<Program>('Semua');
  const [selectedBatch, setSelectedBatch] = useState<Batch>('Semua');
  const [selectedRole, setSelectedRole] = useState<Role>('Semua');
  const [selectedUnit, setSelectedUnit] = useState<Unit>('Semua');
  const [filteredData, setFilteredData] = useState(profileData);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = viewMode === 'grid' ? 8 : 10;

  // Calculate statistics
  const stats = {
    totalMahasiswa: profileData.filter(p => p.peran === 'Mahasiswa').length,
    totalProdi: [...new Set(profileData.map(p => p.prodi))].length,
    totalAngkatan: [...new Set(profileData.filter(p => p.angkatan).map(p => p.angkatan))].length,
    totalPembimbingMentor: profileData.filter(
      p => p.peran === 'Pembimbing Kampus' || p.peran === 'Mentor BAST ANRI'
    ).length,
  };

  // Apply filters
  useEffect(() => {
    let result = [...profileData];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        profile =>
          profile.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (profile.asalInstitusi &&
            profile.asalInstitusi.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Program filter
    if (selectedProgram !== 'Semua') {
      result = result.filter(profile => profile.prodi === selectedProgram);
    }

    // Batch filter
    if (selectedBatch !== 'Semua') {
      result = result.filter(profile => profile.angkatan === selectedBatch);
    }

    // Role filter
    if (selectedRole !== 'Semua') {
      result = result.filter(profile => profile.peran === selectedRole);
    }

    // Unit filter (only applies to Mentor BAST ANRI)
    if (selectedUnit !== 'Semua') {
      result = result.filter(
        profile => profile.peran !== 'Mentor BAST ANRI' || profile.unit === selectedUnit
      );
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchTerm, selectedProgram, selectedBatch, selectedRole, selectedUnit]);

  const sortedData = [...filteredData].sort((a, b) => {
    const aYear = parseInt(a.angkatan || '0');
    const bYear = parseInt(b.angkatan || '0');
    return bYear - aYear; // descending
  });

  const pembimbingKampus = sortedData.filter(profile => profile.peran === 'Pembimbing Kampus');
  const mentorBASTANRI = sortedData.filter(profile => profile.peran === 'Mentor BAST ANRI');
  const mahasiswa = sortedData.filter(profile => profile.peran === 'Mahasiswa');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProgram(e.target.value as Program);
  };

  const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBatch(e.target.value as Batch);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value as Role);
    // Reset unit filter when changing role
    if (e.target.value !== 'Mentor BAST ANRI') {
      setSelectedUnit('Semua');
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value as Unit);
  };

  // Toggle view mode
  const toggleViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    setCurrentPage(1); // Reset to first page when changing view mode
  };

  // Pagination functions
  const paginate = (data: typeof profileData, page: number) => {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const nextPage = (role: string) => {
    const data =
      role === 'Pembimbing Kampus'
        ? pembimbingKampus
        : role === 'Mentor BAST ANRI'
          ? mentorBASTANRI
          : mahasiswa;

    const totalPages = Math.ceil(data.length / cardsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Render paginated cards
  const renderPaginatedProfiles = (data: typeof profileData, role: string) => {
    const paginatedData = paginate(data, currentPage);
    const totalPages = Math.ceil(data.length / cardsPerPage);

    return (
      <>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedData.map(profile => (
              <motion.div key={profile.id} variants={itemVariants}>
                <ProfileCard profile={profile} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {paginatedData.map(profile => (
              <motion.div key={profile.id} variants={itemVariants}>
                <ProfileListItem profile={profile} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {data.length > cardsPerPage && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-primary-light text-white hover:bg-primary transition-colors dark:bg-primary-light dark:hover:bg-primary'
                }`}
              aria-label="Previous page"
            >
              <FiChevronLeft />
            </button>

            <span className="text-gray-600 dark:text-gray-300 font-medium">
              Halaman {currentPage} dari {totalPages}
            </span>

            <button
              onClick={() => nextPage(role)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-primary-light text-white hover:bg-primary transition-colors dark:bg-primary-light dark:hover:bg-primary'
                }`}
              aria-label="Next page"
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <section
      id="katalog-mbkm"
      className="py-20 min-h-[100vh] bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0f172a] dark:via-dark-surface dark:to-[#0f172a]"
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Header - Revised to match Program.tsx style */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            PROFIL UNGGULAN
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Profil MBKM BAST ANRI
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Direktori lengkap seluruh anggota program MBKM BAST ANRI, termasuk mahasiswa, pembimbing
            kampus, dan mentor BAST ANRI dari berbagai program studi, angkatan, dan unit kerja.
          </p>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <StatisticsCard
            title="Total Mahasiswa"
            value={stats.totalMahasiswa}
            icon="users"
            color="blue"
          />
          <StatisticsCard title="Total Prodi" value={stats.totalProdi} icon="book" color="purple" />
          <StatisticsCard
            title="Total Angkatan"
            value={stats.totalAngkatan}
            icon="calendar"
            color="green"
          />
          <StatisticsCard
            title="Pembimbing & Mentor"
            value={stats.totalPembimbingMentor}
            icon="briefcase"
            color="orange"
          />
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            {/* Search box */}
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atau asal institusi..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:text-white"
              />
            </div>

            {/* View mode toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => toggleViewMode('grid')}
                className={`flex items-center justify-center p-2 rounded-md ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 text-primary-light shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                aria-label="Grid view"
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => toggleViewMode('list')}
                className={`flex items-center justify-center p-2 rounded-md ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-600 text-primary-light shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                aria-label="List view"
              >
                <FiList size={18} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Filter:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-grow">
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:text-white"
              >
                <option value="Semua">Semua Peran</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Pembimbing Kampus">Pembimbing Kampus</option>
                <option value="Mentor BAST ANRI">Mentor BAST ANRI</option>
              </select>

              <select
                value={selectedProgram}
                onChange={handleProgramChange}
                className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:text-white"
              >
                <option value="Semua">Semua Prodi</option>
                <option value="ManajemenInformatika">Manajemen Informatika</option>
                <option value="IlmuKomunikasi">Ilmu Komunikasi</option>
                <option value="Sejarah">Sejarah</option>
                <option value="BahasaInggris">Bahasa Inggris</option>
                <option value="TehnikMesin">Tehnik Mesin</option>
              </select>

              <select
                value={selectedBatch}
                onChange={handleBatchChange}
                className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:text-white"
              >
                <option value="Semua">Semua Angkatan</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>

              {/* Only show Unit filter when Peran is Mentor BAST ANRI */}
              {(selectedRole === 'Semua' || selectedRole === 'Mentor BAST ANRI') && (
                <select
                  value={selectedUnit}
                  onChange={handleUnitChange}
                  className={`px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:text-white ${
                    selectedRole !== 'Mentor BAST ANRI' && selectedRole !== 'Semua'
                      ? 'opacity-50'
                      : ''
                  }`}
                  disabled={selectedRole !== 'Mentor BAST ANRI' && selectedRole !== 'Semua'}
                >
                  <option value="Semua">Semua Unit</option>
                  <option value="Akuisisi">Akuisisi</option>
                  <option value="Pengolahan">Pengolahan</option>
                  <option value="Preservasi">Preservasi</option>
                  <option value="Pelayanan">Pelayanan</option>
                  <option value="Tata Usaha">Tata Usaha</option>
                </select>
              )}
            </div>
          </div>
        </motion.div>

        {/* Pembimbing Kampus */}
        {pembimbingKampus.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary-light dark:text-primary-light font-heading border-b pb-2 dark:border-gray-700">
                PEMBIMBING KAMPUS
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {pembimbingKampus.length} orang
              </span>
            </div>

            {renderPaginatedProfiles(pembimbingKampus, 'Pembimbing Kampus')}
          </motion.div>
        )}

        {/* Mentor BAST ANRI */}
        {mentorBASTANRI.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary-light dark:text-primary-light font-heading border-b pb-2 dark:border-gray-700">
                MENTOR BAST ANRI
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {mentorBASTANRI.length} orang
              </span>
            </div>

            {renderPaginatedProfiles(mentorBASTANRI, 'Mentor BAST ANRI')}
          </motion.div>
        )}

        {/* Mahasiswa */}
        {mahasiswa.length > 0 && (
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary-light dark:text-primary-light font-heading border-b pb-2 dark:border-gray-700">
                MAHASISWA
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {mahasiswa.length} orang
              </span>
            </div>

            {renderPaginatedProfiles(mahasiswa, 'Mahasiswa')}
          </motion.div>
        )}

        {/* No Results */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <svg
                className="w-20 h-20 text-gray-300 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                Tidak ada data yang sesuai dengan filter yang dipilih.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedProgram('Semua');
                  setSelectedBatch('Semua');
                  setSelectedRole('Semua');
                  setSelectedUnit('Semua');
                }}
                className="px-6 py-2 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors dark:bg-primary-light dark:hover:bg-primary"
              >
                Reset Filter
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default KatalogMBKM;
