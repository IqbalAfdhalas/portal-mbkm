// components/ui/JournalForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useJournalCRUD } from '@/hooks/useJournalCRUD';

import {
  Save,
  ArrowLeft,
  Upload,
  X,
  Calendar,
  MapPin,
  User,
  FileText,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from 'lucide-react';
import { Journal, Author } from '@/lib/types/journal';

interface JournalFormProps {
  journal?: Journal;
  authors: Author[];
  onSubmit?: (data: Partial<Journal>) => Promise<void>;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

interface FormData {
  title: string;
  summary: string;
  content: string;
  category: 'daily-activity' | 'weekly-reflection' | 'project-update';
  location: string;
  authorId: string;
  publishDate: string;
  status: 'draft' | 'published';
  media: Array<{ url: string; caption?: string }>;
}

export const JournalForm: React.FC<JournalFormProps> = ({
  journal,
  authors,
  onSubmit,
  onCancel,
  mode,
}) => {
  const [previewMode, setPreviewMode] = useState(false);
  const { createJournal, updateJournal, loading, error, clearError } = useJournalCRUD();

  const [formData, setFormData] = useState<FormData>({
    title: journal?.title || '',
    summary: journal?.summary || '',
    content: journal?.content || '',
    category: journal?.category || 'daily-activity',
    location: journal?.location || '',
    authorId: journal?.authorId || '',
    publishDate: journal?.publishDate
      ? new Date(journal.publishDate).toISOString().split('T')[0]
      : '',
    status: journal?.status || 'draft',
    media: journal?.media || [],
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.title.trim()) newErrors.title = 'Judul wajib diisi';
    if (!formData.summary.trim()) newErrors.summary = 'Ringkasan wajib diisi';
    if (!formData.content.trim()) newErrors.content = 'Konten wajib diisi';
    if (!formData.authorId) newErrors.authorId = 'Penulis wajib dipilih';
    if (!formData.publishDate) newErrors.publishDate = 'Tanggal publikasi wajib diisi';

    if (formData.title.length > 200) {
      newErrors.title = 'Judul maksimal 200 karakter';
    }

    if (formData.summary.length > 500) {
      newErrors.summary = 'Ringkasan maksimal 500 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    clearError();

    try {
      const journalData = {
        ...formData,
        publishDate: new Date(formData.publishDate),
      };

      // Langsung panggil prop onSubmit
      if (onSubmit) {
        await onSubmit(journalData);
      }

      onCancel();
    } catch (error) {
      console.error('Error saving journal:', error);
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        const data = await res.json();

        if (data.url) {
          const newMedia = {
            url: data.url,
            caption: '',
          };

          setFormData(prev => ({
            ...prev,
            media: [...prev.media, newMedia],
          }));
        } else {
          console.error('Upload failed:', data.error);
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };

  const removeMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const updateMediaCaption = (index: number, caption: string) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.map((item, i) => (i === index ? { ...item, caption } : item)),
    }));
  };

  const categoryOptions = [
    { value: 'daily-activity', label: 'Daily Activity', icon: <Calendar size={16} /> },
    { value: 'weekly-reflection', label: 'Weekly Reflection', icon: <FileText size={16} /> },
    { value: 'project-update', label: 'Project Update', icon: <MapPin size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onCancel}
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {mode === 'create' ? 'Tambah Jurnal Baru' : 'Edit Jurnal'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {mode === 'create'
                    ? 'Buat jurnal kegiatan MBKM yang baru'
                    : 'Perbarui informasi jurnal'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {previewMode ? <EyeOff size={16} /> : <Eye size={16} />}
                <span className="ml-2">{previewMode ? 'Edit' : 'Preview'}</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                <button
                  onClick={clearError}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              {previewMode ? (
                <div className="prose dark:prose-invert max-w-none">
                  <h1>{formData.title || 'Judul Jurnal'}</h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {formData.summary || 'Ringkasan jurnal...'}
                  </p>
                  <div className="whitespace-pre-wrap">
                    {formData.content || 'Konten jurnal...'}
                  </div>
                  {formData.media.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.media.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <img
                            src={item.url}
                            alt={item.caption || `Media ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          {item.caption && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                              {item.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Judul Jurnal *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan judul jurnal..."
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {formData.title.length}/200 karakter
                    </p>
                  </div>

                  {/* Summary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ringkasan *
                    </label>
                    <textarea
                      value={formData.summary}
                      onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none ${
                        errors.summary ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tulis ringkasan singkat tentang jurnal..."
                    />
                    {errors.summary && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.summary}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {formData.summary.length}/500 karakter
                    </p>
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Konten Jurnal *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={12}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none ${
                        errors.content ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tulis konten lengkap jurnal di sini..."
                    />
                    {errors.content && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.content}
                      </p>
                    )}
                  </div>

                  {/* Media Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Media (Opsional)
                    </label>

                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                        id="media-upload"
                      />
                      <label
                        htmlFor="media-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Upload size={16} className="mr-2" />
                        Upload Gambar
                      </label>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Pilih satu atau lebih gambar untuk ditambahkan ke jurnal
                      </p>
                    </div>

                    {formData.media.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.media.map((item, index) => (
                          <div
                            key={index}
                            className="relative border border-gray-200 dark:border-gray-600 rounded-lg p-3"
                          >
                            <button
                              type="button"
                              onClick={() => removeMedia(index)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                            >
                              <X size={12} />
                            </button>
                            <img
                              src={item.url}
                              alt={`Media ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg mb-2"
                            />
                            <input
                              type="text"
                              value={item.caption || ''}
                              onChange={e => updateMediaCaption(index, e.target.value)}
                              placeholder="Caption (opsional)"
                              className="w-full text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Pengaturan Publikasi
              </h3>

              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        status: e.target.value as 'draft' | 'published',
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Publish Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tanggal Publikasi *
                  </label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={e => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.publishDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.publishDate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.publishDate}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        category: e.target.value as typeof formData.category,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Penulis *
                  </label>
                  <select
                    value={formData.authorId}
                    onChange={e => {
                      const selectedAuthor = authors.find(author => author.id === e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        authorId: selectedAuthor?.id || '',
                        authorName: selectedAuthor?.name || '',
                        authorImage: selectedAuthor?.image || '',
                      }));
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.authorId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Penulis</option>
                    {authors.map(author => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                  {errors.authorId && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.authorId}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lokasi (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: Jakarta, Indonesia"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={loading}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      {mode === 'create' ? 'Simpan' : 'Update'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// components/journal/DeleteConfirmDialog.tsx
interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  journalTitle: string;
  loading?: boolean;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  journalTitle,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6"
      >
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/50 rounded-full">
          <X size={24} className="text-red-600 dark:text-red-400" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
          Hapus Jurnal
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
          Apakah Anda yakin ingin menghapus jurnal{' '}
          <span className="font-semibold">"{journalTitle}"</span>? Tindakan ini tidak dapat
          dibatalkan.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Hapus'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
