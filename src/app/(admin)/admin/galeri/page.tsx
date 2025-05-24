// src/app/(admin)/admin/galeri/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  Tag,
  Image as ImageIcon,
  RefreshCw,
  AlertCircle,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryImage } from '@/data/gallery/galeryData';
import { GalleryForm, DeleteConfirmDialog } from '@/components/ui/GalleryForm';
import {
  getGalleryItems,
  deleteGalleryItem,
  getAvailableCategories,
  getAvailableYears,
} from '@/lib/firebaseGallery';

// Loading Component
const LoadingGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

// Empty State Component
const EmptyState = ({ onAddNew }: { onAddNew: () => void }) => (
  <motion.div
    className="text-center py-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 mx-auto mb-6">
      <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mt-3" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Foto</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
      Mulai tambahkan foto untuk galeri Anda dengan mengklik tombol di bawah ini.
    </p>
    <button
      onClick={onAddNew}
      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
    >
      <Plus className="w-4 h-4 mr-2" />
      Tambah Foto Pertama
    </button>
  </motion.div>
);

// Gallery Item Component
interface GalleryItemProps {
  item: GalleryImage;
  viewMode: 'grid' | 'list';
  onEdit: (item: GalleryImage) => void;
  onDelete: (item: GalleryImage) => void;
  onView: (item: GalleryImage) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, viewMode, onEdit, onDelete, onView }) => {
  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        layout
      >
        <div className="flex items-center p-4">
          {/* Image */}
          <img
            src={item.src}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-lg mr-4 cursor-pointer hover:opacity-75 transition-opacity"
            onClick={() => onView(item)}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {item.title}
            </h3>
            {item.caption && (
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mt-1">
                {item.caption}
              </p>
            )}
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Tag className="w-3 h-3 mr-1" />
                {item.category}
              </span>
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {item.date}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onView(item)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              title="Lihat"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(item)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Hapus"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow group"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      layout
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
          onClick={() => onView(item)}
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <button
            onClick={() => onView(item)}
            className="p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-lg transition-colors"
            title="Lihat"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(item)}
            className="p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-lg transition-colors"
            title="Hapus"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
          {item.title}
        </h3>
        {item.caption && (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
            {item.caption}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {item.date}
          </span>
          <span>{item.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Image Preview Modal
interface ImagePreviewModalProps {
  item: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ item, isOpen, onClose }) => {
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Image */}
            <img
              src={item.src}
              alt={item.title}
              className="w-full max-h-[60vh] object-contain bg-gray-100 dark:bg-gray-900"
            />

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h2>
              {item.caption && (
                <p className="text-gray-600 dark:text-gray-400 mb-4">{item.caption}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {item.category}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {item.date}
                </span>
                <span>{item.year}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Component
export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Form and modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<GalleryImage | null>(null);
  const [deleteItem, setDeleteItem] = useState<GalleryImage | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewItem, setPreviewItem] = useState<GalleryImage | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Filter and view states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  // Load data
  const loadItems = async () => {
    try {
      setLoading(true);
      setError('');

      const [itemsData, categories, years] = await Promise.all([
        getGalleryItems(),
        getAvailableCategories(),
        getAvailableYears(),
      ]);

      setItems(itemsData);
      setAvailableCategories(categories);
      setAvailableYears(years);
    } catch (err) {
      console.error('Error loading gallery items:', err);
      setError('Gagal memuat data galeri. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Filter items
  useEffect(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(item => item.year === selectedYear);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.caption && item.caption.toLowerCase().includes(query))
      );
    }

    setFilteredItems(filtered);
  }, [items, selectedCategory, selectedYear, searchQuery]);

  // Load data on mount
  useEffect(() => {
    loadItems();
  }, []);

  // Handle form actions
  const handleAddNew = () => {
    setEditItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: GalleryImage) => {
    setEditItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: GalleryImage) => {
    setDeleteItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleView = (item: GalleryImage) => {
    setPreviewItem(item);
    setIsPreviewOpen(true);
  };

  const handleFormSuccess = () => {
    loadItems(); // Reload data after successful form submission
  };

  const handleConfirmDelete = async () => {
    if (!deleteItem) return;

    try {
      setIsDeleting(true);
      await deleteGalleryItem(deleteItem.id.toString());

      // Remove item from local state
      setItems(prev => prev.filter(item => item.id !== deleteItem.id));

      setIsDeleteDialogOpen(false);
      setDeleteItem(null);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Gagal menghapus foto. Silakan coba lagi.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedYear('all');
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kelola Galeri</h1>
        </div>
        <LoadingGrid />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kelola Galeri</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Total: {filteredItems.length} dari {items.length} foto
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadItems}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Foto
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
          <span className="text-red-700 dark:text-red-300">{error}</span>
          <button
            onClick={() => setError('')}
            className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Filters and Controls */}
      <div className="mb-6 space-y-4">
        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari foto..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category and Year Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Semua Kategori</option>
              {availableCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Semua Tahun</option>
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedYear !== 'all') && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2 inline" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <EmptyState onAddNew={handleAddNew} />
      ) : filteredItems.length === 0 ? (
        <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mt-2" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Tidak Ditemukan
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Tidak ada foto yang sesuai dengan filter yang dipilih.
          </p>
          <button
            onClick={clearFilters}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
          >
            Reset Filter
          </button>
        </motion.div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredItems.map(item => (
            <GalleryItem
              key={item.id}
              item={item}
              viewMode={viewMode}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <GalleryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        editItem={editItem}
        availableCategories={availableCategories}
        availableYears={availableYears}
        onCategoriesUpdate={loadItems}
        onYearsUpdate={loadItems}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        item={deleteItem}
        isDeleting={isDeleting}
      />

      <ImagePreviewModal
        item={previewItem}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
