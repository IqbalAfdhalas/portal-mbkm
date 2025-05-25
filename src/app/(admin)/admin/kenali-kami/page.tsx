// src/app/admin/kenali-kami/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Grid, List, X } from 'lucide-react';
import { profileData, ProfileType } from '@/constants/profileData';

type ViewMode = 'table' | 'grid';
type FilterRole = 'Semua' | 'Pembimbing Kampus' | 'Mentor BAST ANRI' | 'Mahasiswa';
type FilterAngkatan = 'Semua' | '2024' | '2025';
type FilterProdi =
  | 'Semua'
  | 'Manajemen Informatika'
  | 'Ilmu Komunikasi'
  | 'Sejarah'
  | 'Bahasa Inggris'
  | 'Tehnik Mesin'
  | 'Biologi';

export default function AdminKenaliKami() {
  const [profiles, setProfiles] = useState<ProfileType[]>(profileData);
  const [filteredProfiles, setFilteredProfiles] = useState<ProfileType[]>(profileData);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<FilterRole>('Semua');
  const [filterAngkatan, setFilterAngkatan] = useState<FilterAngkatan>('Semua');
  const [filterProdi, setFilterProdi] = useState<FilterProdi>('Semua');
  const [filterUnit, setFilterUnit] = useState<string>('Semua');
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter dan search
  useEffect(() => {
    let filtered = [...profiles];

    if (searchTerm) {
      filtered = filtered.filter(
        profile =>
          profile.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (profile.asalInstitusi &&
            profile.asalInstitusi.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (profile.unit && profile.unit.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (profile.prodi && profile.prodi.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterRole !== 'Semua') {
      filtered = filtered.filter(profile => profile.peran === filterRole);
    }

    if (filterAngkatan !== 'Semua') {
      filtered = filtered.filter(profile => profile.angkatan === filterAngkatan);
    }

    if (filterProdi !== 'Semua') {
      filtered = filtered.filter(profile => profile.prodi === filterProdi);
    }

    if (filterUnit !== 'Semua') {
      filtered = filtered.filter(profile => profile.unit === filterUnit);
    }

    setFilteredProfiles(filtered);
    setCurrentPage(1);
  }, [profiles, searchTerm, filterRole, filterAngkatan, filterProdi, filterUnit]);

  // Pagination
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProfiles = filteredProfiles.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus profil ini?')) {
      setProfiles(prev => prev.filter(p => p.id !== id));
      setSelectedProfiles(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedProfiles.length === 0) return;
    if (
      confirm(`Apakah Anda yakin ingin menghapus ${selectedProfiles.length} profil yang dipilih?`)
    ) {
      setProfiles(prev => prev.filter(p => !selectedProfiles.includes(p.id)));
      setSelectedProfiles([]);
    }
  };

  const handleSelectProfile = (id: string) => {
    setSelectedProfiles(prev =>
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProfiles.length === currentProfiles.length) {
      setSelectedProfiles([]);
    } else {
      setSelectedProfiles(currentProfiles.map(p => p.id));
    }
  };

  const getRoleColor = (role: ProfileType['peran']) => {
    switch (role) {
      case 'Mahasiswa':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Pembimbing Kampus':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Mentor BAST ANRI':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterRole('Semua');
    setFilterAngkatan('Semua');
    setFilterProdi('Semua');
    setFilterUnit('Semua');
  };

  const uniqueUnits = Array.from(
    new Set(profiles.filter(p => p.peran === 'Mentor BAST ANRI' && p.unit).map(p => p.unit))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kelola Kenali Kami</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manajemen data profil mahasiswa, pembimbing, dan mentor
          </p>
        </div>
        <button
          onClick={() => alert('Fitur tambah profil akan segera hadir')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Profil
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Profil</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{profiles.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mahasiswa</h3>
          <p className="text-2xl font-bold text-blue-600">
            {profiles.filter(p => p.peran === 'Mahasiswa').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pembimbing</h3>
          <p className="text-2xl font-bold text-green-600">
            {profiles.filter(p => p.peran === 'Pembimbing Kampus').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mentor</h3>
          <p className="text-2xl font-bold text-purple-600">
            {profiles.filter(p => p.peran === 'Mentor BAST ANRI').length}
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex flex-col gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari nama, institusi, unit, atau prodi..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filterRole}
              onChange={e => setFilterRole(e.target.value as FilterRole)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Semua">Semua Peran</option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Pembimbing Kampus">Pembimbing Kampus</option>
              <option value="Mentor BAST ANRI">Mentor BAST ANRI</option>
            </select>

            {(filterRole === 'Mahasiswa' || filterRole === 'Semua') && (
              <select
                value={filterAngkatan}
                onChange={e => setFilterAngkatan(e.target.value as FilterAngkatan)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="Semua">Semua Angkatan</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            )}

            {(filterRole === 'Mahasiswa' ||
              filterRole === 'Pembimbing Kampus' ||
              filterRole === 'Semua') && (
              <select
                value={filterProdi}
                onChange={e => setFilterProdi(e.target.value as FilterProdi)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="Semua">Semua Prodi</option>
                <option value="Manajemen Informatika">Manajemen Informatika</option>
                <option value="Ilmu Komunikasi">Ilmu Komunikasi</option>
                <option value="Sejarah">Sejarah</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
                <option value="Tehnik Mesin">Tehnik Mesin</option>
                <option value="Biologi">Biologi</option>
              </select>
            )}

            {(filterRole === 'Mentor BAST ANRI' || filterRole === 'Semua') && (
              <select
                value={filterUnit}
                onChange={e => setFilterUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="Semua">Semua Unit</option>
                {uniqueUnits.map(unit => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            )}

            {(searchTerm ||
              filterRole !== 'Semua' ||
              filterAngkatan !== 'Semua' ||
              filterProdi !== 'Semua' ||
              filterUnit !== 'Semua') && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}

            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 ml-auto">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            {selectedProfiles.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Hapus ({selectedProfiles.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedProfiles.length === currentProfiles.length &&
                        currentProfiles.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Peran
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Institusi/Unit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Prodi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Angkatan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {currentProfiles.map(profile => (
                  <tr key={profile.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProfiles.includes(profile.id)}
                        onChange={() => handleSelectProfile(profile.id)}
                        className="rounded border-gray-300 dark:border-gray-600"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                          {profile.foto && !profile.foto.includes('ilustrasi') ? (
                            <img
                              src={profile.foto}
                              alt={profile.nama}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {profile.nama.trim().charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {profile.nama.trim()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(profile.peran)}`}
                      >
                        {profile.peran}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      {profile.asalInstitusi || profile.unit || '-'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      {profile.prodi || '-'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      {profile.angkatan || '-'}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert('Fitur edit akan segera hadir')}
                          className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(profile.id)}
                          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProfiles.map(profile => (
                <div
                  key={profile.id}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProfiles.includes(profile.id)}
                        onChange={() => handleSelectProfile(profile.id)}
                        className="mr-3 rounded border-gray-300 dark:border-gray-600"
                      />
                      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                        {profile.foto && !profile.foto.includes('ilustrasi') ? (
                          <img
                            src={profile.foto}
                            alt={profile.nama}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {profile.nama.trim().charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => alert('Fitur edit akan segera hadir')}
                        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(profile.id)}
                        className="p-1 text-red-600 hover:text-red-800 dark:text-red-400"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {profile.nama.trim()}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(profile.peran)} mb-2`}
                  >
                    {profile.peran}
                  </span>
                  <div className="space-y-1">
                    {(profile.asalInstitusi || profile.unit) && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {profile.asalInstitusi || profile.unit}
                      </p>
                    )}
                    {profile.prodi && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Prodi: {profile.prodi}
                      </p>
                    )}
                    {profile.angkatan && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Angkatan: {profile.angkatan}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
              Tidak ada data ditemukan
            </p>
            <p className="text-sm text-gray-400 mb-4">Coba ubah filter atau kata kunci pencarian</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredProfiles.length)} dari{' '}
                {filteredProfiles.length} data
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Sebelumnya
                </button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded">{currentPage}</span>
                <span className="text-gray-500">dari {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
