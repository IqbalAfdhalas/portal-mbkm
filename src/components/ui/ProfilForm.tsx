// src/components/ui/ProfileForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { ProfileInput, ProfileClient } from '@/lib/firebaseProfiles';
import ProfileImageUpload from './ProfileImageUpload';

interface ProfileFormProps {
  mode: 'create' | 'edit';
  profile?: ProfileClient;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileInput) => Promise<void>;
}

const PERAN_OPTIONS = ['Pembimbing Kampus', 'Mentor BAST ANRI', 'Mahasiswa'] as const;

const PRODI_OPTIONS = [
  'Manajemen Informatika',
  'Ilmu Komunikasi',
  'Sejarah',
  'Bahasa Inggris',
  'Tehnik Mesin',
  'Biologi',
] as const;

const ANGKATAN_OPTIONS = ['2024', '2025'] as const;

export default function ProfileForm({
  mode,
  profile,
  isOpen,
  onClose,
  onSubmit,
}: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileInput>({
    nama: '',
    peran: 'Mahasiswa',
    foto: null,
    asalInstitusi: '',
    prodi: undefined,
    angkatan: undefined,
    unit: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data
  useEffect(() => {
    if (mode === 'edit' && profile) {
      setFormData({
        nama: profile.nama,
        peran: profile.peran,
        foto: profile.foto,
        asalInstitusi: profile.asalInstitusi || '',
        prodi: profile.prodi,
        angkatan: profile.angkatan,
        unit: profile.unit || '',
      });
    } else {
      // Reset form for create mode
      setFormData({
        nama: '',
        peran: 'Mahasiswa',
        foto: null,
        asalInstitusi: '',
        prodi: undefined,
        angkatan: undefined,
        unit: '',
      });
    }
    setErrors({});
  }, [mode, profile, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi';
    }

    // Conditional validations based on peran
    if (formData.peran === 'Mahasiswa') {
      if (!formData.asalInstitusi?.trim()) {
        newErrors.asalInstitusi = 'Asal institusi wajib diisi untuk mahasiswa';
      }
      if (!formData.prodi) {
        newErrors.prodi = 'Program studi wajib dipilih untuk mahasiswa';
      }
      if (!formData.angkatan) {
        newErrors.angkatan = 'Angkatan wajib dipilih untuk mahasiswa';
      }
    }

    if (formData.peran === 'Pembimbing Kampus') {
      if (!formData.asalInstitusi?.trim()) {
        newErrors.asalInstitusi = 'Asal institusi wajib diisi untuk pembimbing kampus';
      }
      if (!formData.prodi) {
        newErrors.prodi = 'Program studi wajib dipilih untuk pembimbing kampus';
      }
    }

    if (formData.peran === 'Mentor BAST ANRI') {
      if (!formData.unit?.trim()) {
        newErrors.unit = 'Unit kerja wajib diisi untuk mentor BAST ANRI';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Clean up form data - remove empty strings and set undefined for optional fields
      const cleanData: ProfileInput = {
        nama: formData.nama.trim(),
        peran: formData.peran,
        foto: formData.foto,
      };

      // Add optional fields only if they have values
      if (formData.asalInstitusi?.trim()) {
        cleanData.asalInstitusi = formData.asalInstitusi.trim();
      }

      if (formData.prodi) {
        cleanData.prodi = formData.prodi;
      }

      if (formData.angkatan) {
        cleanData.angkatan = formData.angkatan;
      }

      if (formData.unit?.trim()) {
        cleanData.unit = formData.unit.trim();
      }

      await onSubmit(cleanData);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ProfileInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {mode === 'create' ? 'Tambah Profil' : 'Edit Profil'}
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <ProfileImageUpload
            currentImage={formData.foto}
            profileName={formData.nama}
            onImageChange={imageUrl => handleInputChange('foto', imageUrl)}
            disabled={isSubmitting}
          />

          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nama Lengkap *
            </label>
            <input
              type="text"
              value={formData.nama}
              onChange={e => handleInputChange('nama', e.target.value)}
              disabled={isSubmitting}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 ${
                errors.nama
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.nama && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nama}</p>
            )}
          </div>

          {/* Peran */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Peran *
            </label>
            <select
              value={formData.peran}
              onChange={e => handleInputChange('peran', e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
            >
              {PERAN_OPTIONS.map(peran => (
                <option key={peran} value={peran}>
                  {peran}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional Fields based on Peran */}
          {(formData.peran === 'Mahasiswa' || formData.peran === 'Pembimbing Kampus') && (
            <>
              {/* Asal Institusi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asal Institusi *
                </label>
                <input
                  type="text"
                  value={formData.asalInstitusi}
                  onChange={e => handleInputChange('asalInstitusi', e.target.value)}
                  disabled={isSubmitting}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 ${
                    errors.asalInstitusi
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Contoh: Universitas Indonesia"
                />
                {errors.asalInstitusi && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.asalInstitusi}
                  </p>
                )}
              </div>

              {/* Program Studi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Program Studi *
                </label>
                <select
                  value={formData.prodi || ''}
                  onChange={e => handleInputChange('prodi', e.target.value || undefined)}
                  disabled={isSubmitting}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 ${
                    errors.prodi
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">Pilih Program Studi</option>
                  {PRODI_OPTIONS.map(prodi => (
                    <option key={prodi} value={prodi}>
                      {prodi}
                    </option>
                  ))}
                </select>
                {errors.prodi && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.prodi}</p>
                )}
              </div>
            </>
          )}

          {/* Angkatan - only for Mahasiswa */}
          {formData.peran === 'Mahasiswa' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Angkatan *
              </label>
              <select
                value={formData.angkatan || ''}
                onChange={e => handleInputChange('angkatan', e.target.value || undefined)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 ${
                  errors.angkatan
                    ? 'border-red-500 dark:border-red-400'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Pilih Angkatan</option>
                {ANGKATAN_OPTIONS.map(angkatan => (
                  <option key={angkatan} value={angkatan}>
                    {angkatan}
                  </option>
                ))}
              </select>
              {errors.angkatan && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.angkatan}</p>
              )}
            </div>
          )}

          {/* Unit - only for Mentor BAST ANRI */}
          {formData.peran === 'Mentor BAST ANRI' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Unit Kerja *
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={e => handleInputChange('unit', e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 ${
                  errors.unit
                    ? 'border-red-500 dark:border-red-400'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Contoh: Bidang Akuisisi dan Penyerahan Arsip"
              />
              {errors.unit && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.unit}</p>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === 'create' ? 'Menyimpan...' : 'Memperbarui...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {mode === 'create' ? 'Simpan' : 'Perbarui'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
