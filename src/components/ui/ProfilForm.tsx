// src/components/ui/ProfilForm.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, User, Loader2 } from 'lucide-react';
import { ProfileType } from '@/constants/profileData';

// Master data dummy
const masterData = {
  prodiList: [
    'Manajemen Informatika',
    'Ilmu Komunikasi',
    'Sejarah',
    'Bahasa Inggris',
    'Tehnik Mesin',
    'Biologi',
  ],
  angkatanList: ['2024', '2025'],
  unitList: ['Tata Usaha', 'Preservasi', 'Akuisisi', 'Pengolahan', 'Pelayanan'],
};

interface ProfilFormProps {
  profile?: ProfileType | null;
  onSave: (profileData: ProfileType) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProfilForm({
  profile,
  onSave,
  onCancel,
  isLoading = false,
}: ProfilFormProps) {
  const [formData, setFormData] = useState<Partial<ProfileType>>({
    nama: '',
    peran: 'Mahasiswa',
    foto: '',
    asalInstitusi: '',
    prodi: undefined,
    angkatan: undefined,
    unit: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate form data when editing
  useEffect(() => {
    if (profile) {
      setFormData(profile);
      setPreviewImage(profile.foto || '');
    } else {
      // Reset form for new profile
      setFormData({
        nama: '',
        peran: 'Mahasiswa',
        foto: '',
        asalInstitusi: '',
        prodi: undefined,
        angkatan: undefined,
        unit: '',
      });
      setPreviewImage('');
    }
    setErrors({});
  }, [profile]);

  // Auto-set institusi untuk mahasiswa dan pembimbing kampus
  useEffect(() => {
    if (formData.peran === 'Mahasiswa' || formData.peran === 'Pembimbing Kampus') {
      setFormData(prev => ({ ...prev, asalInstitusi: 'Universitas Syiah Kuala' }));
    }
  }, [formData.peran]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, foto: 'File harus berupa gambar' }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, foto: 'Ukuran file maksimal 5MB' }));
      return;
    }

    try {
      setUploading(true);
      setErrors(prev => ({ ...prev, foto: '' }));

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData(prev => ({ ...prev, foto: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors(prev => ({ ...prev, foto: 'Gagal mengupload gambar' }));
    } finally {
      setUploading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.nama?.trim()) {
      newErrors.nama = 'Nama wajib diisi';
    }

    if (!formData.peran) {
      newErrors.peran = 'Peran wajib dipilih';
    }

    // Conditional validation based on role
    if (formData.peran === 'Mahasiswa') {
      if (!formData.asalInstitusi?.trim()) {
        newErrors.asalInstitusi = 'Asal institusi wajib diisi untuk mahasiswa';
      }
      if (!formData.prodi?.trim()) {
        newErrors.prodi = 'Program studi wajib diisi untuk mahasiswa';
      }
      if (!formData.angkatan?.trim()) {
        newErrors.angkatan = 'Angkatan wajib diisi untuk mahasiswa';
      }
    } else if (formData.peran === 'Pembimbing Kampus') {
      if (!formData.asalInstitusi?.trim()) {
        newErrors.asalInstitusi = 'Asal institusi wajib diisi untuk pembimbing';
      }
      if (!formData.prodi?.trim()) {
        newErrors.prodi = 'Program studi wajib diisi untuk pembimbing';
      }
    } else if (formData.peran === 'Mentor BAST ANRI') {
      if (!formData.unit?.trim()) {
        newErrors.unit = 'Unit kerja wajib diisi untuk mentor';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);
      setErrors(prev => ({ ...prev, general: '' }));

      // Clean up form data based on role
      const cleanedData = { ...formData };

      if (formData.peran === 'Mentor BAST ANRI') {
        delete cleanedData.asalInstitusi;
        delete cleanedData.prodi;
        delete cleanedData.angkatan;
      } else if (formData.peran === 'Pembimbing Kampus') {
        delete cleanedData.unit;
        delete cleanedData.angkatan;
      } else if (formData.peran === 'Mahasiswa') {
        delete cleanedData.unit;
      }

      // Simulate saving delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const savedProfile: ProfileType = {
        id: profile?.id || `new_${Date.now()}`,
        nama: cleanedData.nama || '',
        peran: cleanedData.peran || 'Mahasiswa',
        foto: cleanedData.foto || '',
        asalInstitusi: cleanedData.asalInstitusi,
        prodi: cleanedData.prodi,
        angkatan: cleanedData.angkatan,
        unit: cleanedData.unit,
      };

      onSave(savedProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors(prev => ({
        ...prev,
        general: error instanceof Error ? error.message : 'Gagal menyimpan profil',
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !saving && !uploading) {
      onCancel();
    }
  };

  const getRoleFields = () => {
    switch (formData.peran) {
      case 'Mahasiswa':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Asal Institusi *
              </label>
              <input
                type="text"
                name="asalInstitusi"
                value="Universitas Syiah Kuala"
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Program Studi *
              </label>
              <select
                name="prodi"
                value={formData.prodi || ''}
                onChange={handleInputChange}
                disabled={saving || uploading}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.prodi ? 'border-red-500' : 'border-gray-300'
                } ${saving || uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">Pilih Program Studi</option>
                {masterData.prodiList.map(prodi => (
                  <option key={prodi} value={prodi}>
                    {prodi}
                  </option>
                ))}
              </select>
              {errors.prodi && <p className="text-red-500 text-sm mt-1">{errors.prodi}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Angkatan *
              </label>
              <select
                name="angkatan"
                value={formData.angkatan || ''}
                onChange={handleInputChange}
                disabled={saving || uploading}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.angkatan ? 'border-red-500' : 'border-gray-300'
                } ${saving || uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">Pilih Angkatan</option>
                {masterData.angkatanList.map(angkatan => (
                  <option key={angkatan} value={angkatan}>
                    {angkatan}
                  </option>
                ))}
              </select>
              {errors.angkatan && <p className="text-red-500 text-sm mt-1">{errors.angkatan}</p>}
            </div>
          </>
        );

      case 'Pembimbing Kampus':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Asal Institusi *
              </label>
              <input
                type="text"
                name="asalInstitusi"
                value="Universitas Syiah Kuala"
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Program Studi *
              </label>
              <select
                name="prodi"
                value={formData.prodi || ''}
                onChange={handleInputChange}
                disabled={saving || uploading}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.prodi ? 'border-red-500' : 'border-gray-300'
                } ${saving || uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">Pilih Program Studi</option>
                {masterData.prodiList.map(prodi => (
                  <option key={prodi} value={prodi}>
                    {prodi}
                  </option>
                ))}
              </select>
              {errors.prodi && <p className="text-red-500 text-sm mt-1">{errors.prodi}</p>}
            </div>
          </>
        );

      case 'Mentor BAST ANRI':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unit Kerja *
            </label>
            <select
              name="unit"
              value={formData.unit || ''}
              onChange={handleInputChange}
              disabled={saving || uploading}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.unit ? 'border-red-500' : 'border-gray-300'
              } ${saving || uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <option value="">Pilih Unit Kerja</option>
              {masterData.unitList.map(unit => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  const isFormDisabled = saving || uploading || isLoading;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {profile ? 'Edit Profil' : 'Tambah Profil Baru'}
          </h2>
          <button
            onClick={onCancel}
            disabled={isFormDisabled}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="mx-6 mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Foto Profil
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden relative">
                {uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || isFormDisabled}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mengupload...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Foto
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Maksimal 5MB, format JPG, PNG, atau GIF
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isFormDisabled}
                  className="hidden"
                />
              </div>
            </div>
            {errors.foto && <p className="text-red-500 text-sm mt-1">{errors.foto}</p>}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama || ''}
                onChange={handleInputChange}
                disabled={isFormDisabled}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.nama ? 'border-red-500' : 'border-gray-300'
                } ${isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Peran *
              </label>
              <select
                name="peran"
                value={formData.peran || 'Mahasiswa'}
                onChange={handleInputChange}
                disabled={isFormDisabled}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.peran ? 'border-red-500' : 'border-gray-300'
                } ${isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Pembimbing Kampus">Pembimbing Kampus</option>
                <option value="Mentor BAST ANRI">Mentor BAST ANRI</option>
              </select>
              {errors.peran && <p className="text-red-500 text-sm mt-1">{errors.peran}</p>}
            </div>
          </div>

          {/* Dynamic Fields Based on Role */}
          <div className="space-y-6">{getRoleFields()}</div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              onClick={onCancel}
              disabled={isFormDisabled}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isFormDisabled}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>{profile ? 'Update Profil' : 'Simpan Profil'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
