// src/components/ui/GalleryForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  AlertTriangle,
  Upload,
  Save,
  Plus,
  Edit3,
  Image as ImageIcon,
  Check,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryImage } from '@/data/gallery/galeryData';
import {
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  validateImageFile,
  fileToBase64,
  getAvailableCategories,
  getAvailableYears,
  addCategory,
  deleteCategory,
  addYear,
  deleteYear,
  type GalleryFormData,
} from '@/lib/firebaseGallery';

// Custom Select with Add Option Component
interface CustomSelectProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
  onAddNew: (newValue: string) => void;
  onRemove?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  addLabel?: string;
  error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  options,
  onValueChange,
  onAddNew,
  onRemove,
  placeholder = 'Pilih...',
  required = false,
  disabled = false,
  addLabel = 'Tambah Baru',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === '__add_new__') {
      setIsAddingNew(true);
      setNewValue('');
    } else {
      onValueChange(selectedValue);
      setIsOpen(false);
    }
  };

  const handleAddNew = () => {
    const trimmedValue = newValue.trim();
    if (trimmedValue && !options.includes(trimmedValue)) {
      onAddNew(trimmedValue);
      onValueChange(trimmedValue);
      setIsAddingNew(false);
      setNewValue('');
      setIsOpen(false);
    }
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewValue('');
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Main Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-3 py-2 text-left border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
      >
        <span
          className={value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {/* Options */}
            {options.map(option => (
              <div
                key={option}
                className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="flex-1 px-3 py-2 text-left text-gray-900 dark:text-white flex items-center justify-between"
                >
                  <span>{option}</span>
                  {value === option && <Check className="w-4 h-4 text-blue-500" />}
                </button>
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      // Call onRemove callback jika ada
                      if (onRemove) {
                        onRemove(option);
                      }
                    }}
                    className="p-1 mx-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
                    title={`Hapus ${option}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {/* Add New Option */}
            <div className="border-t border-gray-200 dark:border-gray-600">
              {!isAddingNew ? (
                <button
                  type="button"
                  onClick={() => handleSelect('__add_new__')}
                  className="w-full px-3 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {addLabel}
                </button>
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newValue}
                      onChange={e => setNewValue(e.target.value)}
                      placeholder={`Masukkan ${label.toLowerCase()} baru`}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddNew();
                        } else if (e.key === 'Escape') {
                          handleCancelAdd();
                        }
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleAddNew}
                      disabled={!newValue.trim()}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelAdd}
                      className="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setIsOpen(false);
            setIsAddingNew(false);
            setNewValue('');
          }}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

// Delete Confirmation Dialog Component
interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: GalleryImage | null;
  isDeleting?: boolean;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  item,
  isDeleting = false,
}) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Konfirmasi Hapus
                </h3>
              </div>
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.category} • {item.year} • {item.date}
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Apakah Anda yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan.
              </p>

              {/* Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  disabled={isDeleting}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Gallery Form Component
interface GalleryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editItem?: GalleryImage | null;
  availableCategories?: string[];
  availableYears?: string[];
  onCategoriesUpdate: () => void;
  onYearsUpdate: () => void;
}

const GalleryForm: React.FC<GalleryFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editItem,
  availableCategories = ['Activity', 'Event', 'Education'],
  availableYears = [],
  onCategoriesUpdate,
  onYearsUpdate,
}) => {
  const [previewImage, setPreviewImage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<GalleryFormData>({
    title: '',
    caption: '',
    category: 'Activity',
    year: new Date().getFullYear().toString(),
    date: new Date().toISOString().split('T')[0],
  });

  // Set form data when editing
  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title,
        caption: editItem.caption || '',
        category: editItem.category,
        year: editItem.year,
        date: editItem.date,
      });
      setPreviewImage(editItem.src);
    } else {
      setFormData({
        title: '',
        caption: '',
        category: availableCategories[0] || 'Activity',
        year: new Date().getFullYear().toString(),
        date: new Date().toISOString().split('T')[0],
      });
      setPreviewImage('');
    }

    setErrors({});
  }, [isOpen, editItem, availableCategories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddCategory = async (newCategory: string) => {
    try {
      await addCategory(newCategory);
      onCategoriesUpdate();
    } catch (error) {
      console.error('Gagal tambah kategori:', error);
      alert('Gagal menambahkan kategori ke database.');
    }
  };

  const handleRemoveCategory = async (categoryToRemove: string) => {
    if (availableCategories.length <= 1) {
      alert('Minimal harus ada 1 kategori');
      return;
    }

    if (formData.category === categoryToRemove) {
      const remainingCategories = availableCategories.filter(cat => cat !== categoryToRemove);
      setFormData(prev => ({ ...prev, category: remainingCategories[0] }));
    }

    try {
      await deleteCategory(categoryToRemove);
      onCategoriesUpdate();
    } catch (error) {
      console.error('Gagal hapus kategori:', error);
      alert('Gagal menghapus kategori dari database.');
    }
  };

  const handleAddYear = async (newYear: string) => {
    if (!/^\d{4}$/.test(newYear)) {
      alert('Format tahun tidak valid. Gunakan format 4 digit (contoh: 2024)');
      return;
    }

    const yearNum = parseInt(newYear);
    if (yearNum < 1900 || yearNum > new Date().getFullYear() + 10) {
      alert('Tahun harus antara 1900 sampai ' + (new Date().getFullYear() + 10));
      return;
    }

    try {
      await addYear(newYear);
      onYearsUpdate();
    } catch (error) {
      console.error('Gagal tambah tahun:', error);
      alert('Gagal menambahkan tahun ke database.');
    }
  };

  const handleRemoveYear = async (yearToRemove: string) => {
    if (availableYears.length <= 1) {
      alert('Minimal harus ada 1 tahun');
      return;
    }

    if (formData.year === yearToRemove) {
      const remainingYears = availableYears.filter(year => year !== yearToRemove);
      setFormData(prev => ({ ...prev, year: remainingYears[0] }));
    }

    try {
      await deleteYear(yearToRemove);
      onYearsUpdate();
    } catch (error) {
      console.error('Gagal hapus tahun:', error);
      alert('Gagal menghapus tahun dari database.');
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage('');
    setFormData(prev => ({ ...prev, image: undefined }));
    // Reset input file
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, image: validation.error || 'File tidak valid' }));
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setPreviewImage(base64);
      setFormData(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, image: 'Gagal memuat preview gambar' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul harus diisi';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori harus dipilih';
    }

    if (!formData.year) {
      newErrors.year = 'Tahun harus diisi';
    }

    if (!formData.date) {
      newErrors.date = 'Tanggal harus diisi';
    }

    if (!editItem && !formData.image) {
      newErrors.image = 'Gambar harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (editItem) {
        await updateGalleryItem(editItem.id.toString(), formData);
      } else {
        await addGalleryItem(formData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({ ...prev, submit: 'Gagal menyimpan data. Silakan coba lagi.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                  {editItem ? (
                    <Edit3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editItem ? 'Edit Foto' : 'Tambah Foto Baru'}
                </h3>
              </div>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gambar {!editItem && <span className="text-red-500">*</span>}
                  </label>

                  {/* Preview */}
                  {previewImage && (
                    <div className="mb-4 relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors"
                        title="Hapus gambar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Klik untuk upload</span> atau drag and
                          drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, JPEG, WebP (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isSubmitting}
                      />
                    </label>
                  </div>

                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Judul <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Masukkan judul foto"
                    disabled={isSubmitting}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                  )}
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    name="caption"
                    value={formData.caption}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Masukkan deskripsi foto (opsional)"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Category and Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Kategori"
                    name="category"
                    value={formData.category}
                    options={availableCategories}
                    onValueChange={value => handleSelectChange('category', value)}
                    onAddNew={handleAddCategory}
                    onRemove={handleRemoveCategory}
                    required
                    disabled={isSubmitting}
                    addLabel="Tambah Kategori"
                    error={errors.category}
                  />

                  <CustomSelect
                    label="Tahun"
                    name="year"
                    value={formData.year}
                    options={availableYears}
                    onValueChange={value => handleSelectChange('year', value)}
                    onAddNew={handleAddYear}
                    onRemove={handleRemoveYear}
                    required
                    disabled={isSubmitting}
                    addLabel="Tambah Tahun"
                    error={errors.year}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={isSubmitting}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {editItem ? 'Mengupdate...' : 'Menyimpan...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editItem ? 'Update' : 'Simpan'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Export both components
export { DeleteConfirmDialog, GalleryForm };
export default GalleryForm;
