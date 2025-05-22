//src/app/(admin)/pojok-mbkm/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Calendar,
  MapPin,
  Tag,
  User,
  ChevronDown,
  X,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Plus,
  FileText,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react';
import { Journal } from '@/components/sections/PojokMBKM';
import { dummyJournals, getFilteredJournals, authors } from '@/lib/data/dummyJournals';
import { JournalForm, DeleteConfirmDialog, useJournalCRUD } from '@/components/ui/JournalForm';

interface JournalFilterOptions {
  category?: 'daily-activity' | 'weekly-reflection' | 'project-update';
  searchQuery?: string;
  authorId?: string;
  status?: 'draft' | 'published';
}

// Stats Component
const StatsCards = ({ journals }: { journals: Journal[] }) => {
  const totalJournals = journals.length;
  const publishedJournals = journals.filter(j => j.status === 'published').length;
  const draftJournals = journals.filter(j => j.status === 'draft').length;
  const uniqueAuthors = new Set(journals.map(j => j.authorId)).size;

  const stats = [
    {
      title: 'Total Jurnal',
      value: totalJournals,
      icon: <FileText size={20} />,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Terpublikasi',
      value: publishedJournals,
      icon: <Eye size={20} />,
      color: 'bg-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Draft',
      value: draftJournals,
      icon: <Edit3 size={20} />,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'Penulis',
      value: uniqueAuthors,
      icon: <User size={20} />,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`${stat.bgColor} rounded-lg p-4 border border-gray-200 dark:border-gray-700`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.color} text-white`}>{stat.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Filter Component
const FilterBar = ({
  filterOptions,
  setFilterOptions,
}: {
  filterOptions: JournalFilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<JournalFilterOptions>>;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilterOptions(prev => ({
        ...prev,
        searchQuery: searchTerm,
      }));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setFilterOptions]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterOptions(prev => ({
      ...prev,
      searchQuery: '',
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full p-3 pl-10 pr-10 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Cari jurnal berdasarkan judul, penulis, atau konten..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex gap-2">
          <select
            className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            value={filterOptions.category || ''}
            onChange={e =>
              setFilterOptions(prev => ({
                ...prev,
                category: (e.target.value as any) || undefined,
              }))
            }
          >
            <option value="">Semua Kategori</option>
            <option value="daily-activity">Daily Activity</option>
            <option value="weekly-reflection">Weekly Reflection</option>
            <option value="project-update">Project Update</option>
          </select>

          <select
            className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            value={filterOptions.status || ''}
            onChange={e =>
              setFilterOptions(prev => ({
                ...prev,
                status: (e.target.value as any) || undefined,
              }))
            }
          >
            <option value="">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <select
            className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            value={filterOptions.authorId || ''}
            onChange={e =>
              setFilterOptions(prev => ({
                ...prev,
                authorId: e.target.value || undefined,
              }))
            }
          >
            <option value="">Semua Penulis</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

// Journal Table Component with integrated actions
const JournalTable = ({
  journals,
  onEdit,
  onDelete,
}: {
  journals: Journal[];
  onEdit: (journal: Journal) => void;
  onDelete: (journal: Journal) => void;
}) => {
  const categoryColors = {
    'daily-activity': {
      bg: 'bg-indigo-100 dark:bg-indigo-900/50',
      text: 'text-indigo-700 dark:text-indigo-300',
      icon: <Calendar size={14} />,
      label: 'Daily Activity',
    },
    'weekly-reflection': {
      bg: 'bg-emerald-100 dark:bg-emerald-900/50',
      text: 'text-emerald-700 dark:text-emerald-300',
      icon: <Tag size={14} />,
      label: 'Weekly Reflection',
    },
    'project-update': {
      bg: 'bg-amber-100 dark:bg-amber-900/50',
      text: 'text-amber-700 dark:text-amber-300',
      icon: <MapPin size={14} />,
      label: 'Project Update',
    },
  };

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
          Published
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1"></div>
        Draft
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Jurnal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Penulis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <AnimatePresence mode="wait">
              {journals.map((journal, index) => {
                const categoryInfo = categoryColors[journal.category];

                return (
                  <motion.tr
                    key={journal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        {journal.media && journal.media.length > 0 ? (
                          <img
                            src={journal.media[0].url}
                            alt={journal.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            <FileText size={16} className="text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {journal.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {journal.summary}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryInfo.bg} ${categoryInfo.text}`}
                      >
                        {categoryInfo.icon}
                        <span className="ml-1">{categoryInfo.label}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {journal.authorImage ? (
                          <img
                            src={journal.authorImage}
                            alt={journal.authorName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <User size={12} className="text-blue-600 dark:text-blue-300" />
                          </div>
                        )}
                        <span className="text-sm text-gray-900 dark:text-white">
                          {journal.authorName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(journal.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(journal.publishDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/pojok-mbkm/${journal.id}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Lihat jurnal"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => onEdit(journal)}
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                          title="Edit jurnal"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(journal)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Hapus jurnal"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({
  hasFilters,
  onCreateNew,
}: {
  hasFilters: boolean;
  onCreateNew: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
        <FileText size={24} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {hasFilters ? 'Tidak ada hasil ditemukan' : 'Belum ada jurnal'}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
        {hasFilters
          ? 'Tidak ada jurnal yang cocok dengan filter yang diterapkan. Coba ubah kriteria pencarian.'
          : 'Belum ada jurnal MBKM yang tersedia. Mulai dengan menambahkan jurnal pertama.'}
      </p>
      <button
        onClick={onCreateNew}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={16} className="mr-2" />
        Tambah Jurnal
      </button>
    </motion.div>
  );
};

// Main Admin Component
export default function AdminPojokMBKMPage() {
  const [journals, setJournals] = useState<Journal[]>(dummyJournals);
  const [filteredJournals, setFilteredJournals] = useState<Journal[]>([]);
  const [filterOptions, setFilterOptions] = useState<JournalFilterOptions>({});
  const [loading, setLoading] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingJournal, setEditingJournal] = useState<Journal | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  // Delete confirmation state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [journalToDelete, setJournalToDelete] = useState<Journal | null>(null);

  // CRUD hook
  const { createJournal, updateJournal, deleteJournal, loading: crudLoading } = useJournalCRUD();
  const handleTestCreate = async () => {
    try {
      const newJournal = await createJournal({
        title: 'Jurnal Tes Pertama',
        summary: 'Ini jurnal tes pertama lewat Next.js dan Firestore',
        content: 'Konten lengkap jurnal tes.',
        category: 'daily-activity',
        publishDate: new Date(),
        status: 'draft',
        authorId: 'tes123',
        media: [],
      });
      console.log('Jurnal berhasil dibuat:', newJournal);
    } catch (error) {
      console.error('Gagal membuat jurnal:', error);
    }
  };

  // Filter journals based on filter options
  useEffect(() => {
    setLoading(true);

    // Simulate loading
    setTimeout(() => {
      const filtered = journals.filter(journal => {
        // Apply filters
        if (filterOptions.category && journal.category !== filterOptions.category) {
          return false;
        }

        if (filterOptions.status && journal.status !== filterOptions.status) {
          return false;
        }

        if (filterOptions.authorId && journal.authorId !== filterOptions.authorId) {
          return false;
        }

        if (filterOptions.searchQuery) {
          const query = filterOptions.searchQuery.toLowerCase();
          const inTitle = journal.title.toLowerCase().includes(query);
          const inSummary = journal.summary.toLowerCase().includes(query);
          const inContent = journal.content.toLowerCase().includes(query);
          const inAuthor = journal.authorName.toLowerCase().includes(query);

          if (!(inTitle || inSummary || inContent || inAuthor)) {
            return false;
          }
        }

        return true;
      });

      // Sort by latest
      filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      setFilteredJournals(filtered);
      setLoading(false);
    }, 300);
  }, [journals, filterOptions]);

  // Handle form submission
  const handleFormSubmit = async (data: Partial<Journal>) => {
    try {
      if (formMode === 'create') {
        const newJournal = await createJournal(data);
        setJournals(prev => [newJournal, ...prev]);
      } else if (editingJournal) {
        const updatedJournal = await updateJournal(editingJournal.id, data);
        setJournals(prev =>
          prev.map(journal => (journal.id === editingJournal.id ? updatedJournal : journal))
        );
      }

      // Close form
      setShowForm(false);
      setEditingJournal(null);
      setFormMode('create');
    } catch (error) {
      console.error('Error saving journal:', error);
      // You can add toast notification here
    }
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingJournal(null);
    setFormMode('create');
  };

  // Handle create new journal
  const handleCreateNew = () => {
    setFormMode('create');
    setEditingJournal(null);
    setShowForm(true);
  };

  // Handle edit journal
  const handleEdit = (journal: Journal) => {
    setFormMode('edit');
    setEditingJournal(journal);
    setShowForm(true);
  };

  // Handle delete journal
  const handleDelete = (journal: Journal) => {
    setJournalToDelete(journal);
    setShowDeleteDialog(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!journalToDelete) return;

    try {
      await deleteJournal(journalToDelete.id);
      setJournals(prev => prev.filter(journal => journal.id !== journalToDelete.id));

      // Close dialog
      setShowDeleteDialog(false);
      setJournalToDelete(null);
    } catch (error) {
      console.error('Error deleting journal:', error);
      // You can add toast notification here
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setJournalToDelete(null);
  };

  const hasFilters = Boolean(
    filterOptions.category ||
      filterOptions.status ||
      filterOptions.authorId ||
      filterOptions.searchQuery
  );

  // Show form if form state is active
  if (showForm) {
    return (
      <JournalForm
        journal={editingJournal || undefined}
        authors={authors}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        mode={formMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Manajemen Jurnal MBKM
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Kelola dan pantau jurnal kegiatan mahasiswa MBKM
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Tambah Jurnal
            </button>
          </div>
          <button
            onClick={handleTestCreate}
            className="px-4 py-2 bg-green-600 text-white rounded-lg mb-4"
          >
            Test Create Jurnal (Firestore)
          </button>
        </motion.div>

        {/* Stats */}
        <StatsCards journals={journals} />

        {/* Filters */}
        <FilterBar filterOptions={filterOptions} setFilterOptions={setFilterOptions} />

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : filteredJournals.length > 0 ? (
          <JournalTable journals={filteredJournals} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <EmptyState hasFilters={hasFilters} onCreateNew={handleCreateNew} />
        )}

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          isOpen={showDeleteDialog}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          journalTitle={journalToDelete?.title || ''}
          loading={crudLoading}
        />
      </div>
    </div>
  );
}
