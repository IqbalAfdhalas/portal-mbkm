// components/ui/AuthorManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Edit3, Trash2, X, Save, User, Upload } from 'lucide-react';
import { Author } from '@/lib/types/journal';

interface AuthorManagementProps {
  authors: Author[];
  onClose: () => void;
  onSave: (authors: Author[]) => Promise<void>;
}

interface AuthorFormData {
  id: string;
  name: string;
  bio: string;
  position: string;
  university: string;
  image: string;
}

const AuthorManagement: React.FC<AuthorManagementProps> = ({ authors, onClose, onSave }) => {
  const [authorList, setAuthorList] = useState<Author[]>(authors);
  const [showForm, setShowForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [loading, setSaving] = useState(false);
  const [formData, setFormData] = useState<AuthorFormData>({
    id: '',
    name: '',
    bio: '',
    position: '',
    university: '',
    image: '',
  });

  const [errors, setErrors] = useState<Partial<AuthorFormData>>({});

  // setelah semua useState
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch('/api/authors/list');
        const data = await res.json();
        setAuthorList(data);
      } catch (error) {
        console.error('Gagal ambil data authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      bio: '',
      position: '',
      university: '',
      image: '',
    });

    setErrors({});
    setEditingAuthor(null);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (author: Author) => {
    setFormData({
      id: author.id,
      name: author.name,
      bio: author.bio || '',
      position: author.position || '',
      university: author.university || '',
      image: author.image || '',
    });

    setEditingAuthor(author);
    setShowForm(true);
  };

  const handleDelete = (authorId: string) => {
    const updatedAuthors = authorList.filter(author => author.id !== authorId);
    setAuthorList(updatedAuthors);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AuthorFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const authorData: Author = {
      id: editingAuthor ? editingAuthor.id : `author_${Date.now()}`,
      name: formData.name.trim(),
      bio: formData.bio.trim(),
      position: formData.position.trim(),
      university: formData.university.trim(),
      image: formData.image.trim(),
    };
    if (editingAuthor) {
      // Update existing author
      const updatedAuthors = authorList.map(author =>
        author.id === editingAuthor.id ? authorData : author
      );
      setAuthorList(updatedAuthors);
    } else {
      // Add new author
      setAuthorList([...authorList, authorData]);
    }

    setShowForm(false);
    resetForm();
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/authors/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authorList),
      });

      const result = await res.json();
      console.log(result);
      onClose();
    } catch (error) {
      console.error('Error saving authors:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Users size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Kelola Penulis
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tambah dan edit data penulis jurnal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {showForm ? (
            <div className="overflow-y-auto max-h-[70vh] p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {editingAuthor ? 'Edit Penulis' : 'Tambah Penulis Baru'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Lengkapi informasi penulis di bawah ini
                </p>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Posisi/Jabatan
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Mahasiswa MBKM"
                    />
                  </div>

                  {/* University */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Universitas
                    </label>
                    <input
                      type="text"
                      value={formData.university}
                      onChange={e => setFormData(prev => ({ ...prev, university: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Nama universitas"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio/Deskripsi
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    placeholder="Ceritakan sedikit tentang penulis..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Foto Profil
                  </label>

                  <div className="flex items-start space-x-4">
                    {formData.image ? (
                      <div className="relative">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <User size={24} className="text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="author-image-upload"
                      />
                      <label
                        htmlFor="author-image-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Upload size={16} className="mr-2" />
                        Upload Foto
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Pilih foto profil (opsional)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    {editingAuthor ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Author List Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Daftar Penulis ({authorList.length})
                  </h3>
                </div>
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} className="mr-2" />
                  Tambah Penulis
                </button>
              </div>

              {/* Author List */}
              <div className="flex-1 overflow-y-auto p-6">
                {authorList.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Belum ada penulis
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Tambahkan penulis pertama untuk mulai membuat jurnal
                    </p>
                    <button
                      onClick={handleAddNew}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} className="mr-2" />
                      Tambah Penulis
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence>
                      {authorList.map((author, index) => (
                        <motion.div
                          key={author.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-start space-x-3">
                            {author.image ? (
                              <img
                                src={author.image}
                                alt={author.name}
                                className="w-12 h-12 object-cover rounded-full"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                                <User size={16} className="text-blue-600 dark:text-blue-400" />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                {author.name}
                              </h4>

                              {author.position && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {author.position}
                                </p>
                              )}
                              {author.university && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {author.university}
                                </p>
                              )}
                            </div>

                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleEdit(author)}
                                className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                title="Edit penulis"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(author.id)}
                                className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                                title="Hapus penulis"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {author.bio && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">
                              {author.bio}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!showForm && (
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSaveAll}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Save size={16} className="mr-2" />
              )}
              Simpan Perubahan
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthorManagement;
