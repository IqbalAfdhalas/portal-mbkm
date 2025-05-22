// src/components/sections/PojokMBKM.tsx
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  MapPin,
  Tag,
  User,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  X,
  Filter,
} from 'lucide-react';
import { getAllJournals } from '@/lib/firebaseJournals';

// TypeScript interfaces
export interface Journal {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: Date;
  publishDate: Date;
  category: 'daily-activity' | 'weekly-reflection' | 'project-update';
  location?: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  media: Array<{
    url: string;
    caption?: string;
  }>;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

interface JournalFilterOptions {
  category?: 'daily-activity' | 'weekly-reflection' | 'project-update';
  searchQuery?: string;
  authorId?: string;
  // Can easily add more filter options here in the future
}

interface PaginationOptions {
  page: number;
  limit: number;
}

// Styled Journal Card Component
const JournalCard = ({ journal, index }: { journal: Journal; index: number }) => {
  const categoryColors = {
    'daily-activity': {
      bg: 'bg-indigo-100 dark:bg-indigo-900/50',
      text: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-200 dark:border-indigo-800',
      icon: <Calendar size={14} className="mr-1" />,
    },
    'weekly-reflection': {
      bg: 'bg-emerald-100 dark:bg-emerald-900/50',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: <Tag size={14} className="mr-1" />,
    },
    'project-update': {
      bg: 'bg-amber-100 dark:bg-amber-900/50',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800',
      icon: <MapPin size={14} className="mr-1" />,
    },
  };

  const categoryInfo = categoryColors[journal.category];
  const formattedDate = new Date(journal.publishDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
    >
      {journal.media && journal.media.length > 0 && (
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <img
              src={journal.media[0].url}
              alt={journal.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute top-3 left-3 z-20">
            <span
              className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${categoryInfo.bg} ${categoryInfo.text} ${categoryInfo.border}`}
            >
              {categoryInfo.icon}
              {journal.category === 'daily-activity'
                ? 'Daily Activity'
                : journal.category === 'weekly-reflection'
                  ? 'Weekly Reflection'
                  : 'Project Update'}
            </span>
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {journal.title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-grow">
          {journal.summary}
        </p>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-auto">
          <div className="flex items-center space-x-2">
            <div className="relative">
              {journal.authorImage ? (
                <img
                  src={journal.authorImage}
                  alt={journal.authorName}
                  className="w-6 h-6 rounded-full object-cover border-2 border-white dark:border-gray-800"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <User size={12} className="text-blue-600 dark:text-blue-300" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {journal.authorName}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</span>
            </div>
          </div>
          <Link
            href={`/pojok-mbkm/${journal.id}`}
            className="px-3 py-1 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Baca
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Journal Grid with animation
const JournalGrid = ({ journals }: { journals: Journal[] }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={journals.map(j => j.id).join('-')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {journals.map((journal, index) => (
          <JournalCard key={journal.id} journal={journal} index={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

// Dropdown Filter Component
const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
  icon,
}: {
  label: string;
  options: { value: string | undefined; label: string }[];
  value: string | undefined;
  onChange: (value: any) => void;
  icon?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span>
            {label}: {selectedOption?.label || 'Semua'}
          </span>
        </div>
        <ChevronDown
          size={14}
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {options.map(option => (
              <button
                key={option.label}
                className={`w-full px-3 py-2 text-left text-xs transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  value === option.value
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Compact Filter Bar Component
const FilterBar = ({
  journals,
  filterOptions,
  setFilterOptions,
  isLoading,
}: {
  journals: Journal[];
  filterOptions: JournalFilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<JournalFilterOptions>>;
  isLoading: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Handle search clear
  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterOptions(prev => ({
      ...prev,
      searchQuery: '',
    }));
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Filter options
  const categoryOptions = [
    { value: undefined, label: 'Semua' },
    { value: 'daily-activity', label: 'Daily Activity' },
    { value: 'weekly-reflection', label: 'Weekly Reflection' },
    { value: 'project-update', label: 'Project Update' },
  ];

  // Get unique authors from dummy data
  const authorOptions = [
    { value: undefined, label: 'Semua' },
    ...Array.from(new Set(journals.map(journal => journal.authorId))).map(authorId => {
      const journal = journals.find(j => j.authorId === authorId);
      return {
        value: authorId,
        label: journal?.authorName || 'Unknown',
      };
    }),
  ];

  return (
    <div className="mb-4 space-y-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={14} className="text-gray-500 dark:text-gray-400" />
        </div>
        <input
          ref={searchInputRef}
          type="search"
          className="block w-full p-2 pl-9 pr-10 text-xs border rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
          placeholder="Cari jurnal..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isLoading ? (
            <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full" />
          ) : searchTerm ? (
            <button
              onClick={handleClearSearch}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterDropdown
          label="Kategori"
          options={categoryOptions}
          value={filterOptions.category}
          onChange={value => setFilterOptions(prev => ({ ...prev, category: value }))}
          icon={<Tag size={14} />}
        />

        <FilterDropdown
          label="Penulis"
          options={authorOptions}
          value={filterOptions.authorId}
          onChange={value => setFilterOptions(prev => ({ ...prev, authorId: value }))}
          icon={<User size={14} />}
        />

        {/* You can easily add more filter dropdowns here in the future */}
      </div>
    </div>
  );
};

// Compact Pagination Component
const JournalPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  // Create pagination array with ellipsis for many pages
  const generatePagination = () => {
    let pages = [];
    const MAX_VISIBLE = 3; // Reduced from 5 to make it more compact

    if (totalPages <= MAX_VISIBLE) {
      // Show all pages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Always include first and last page
      pages.push(1);

      // Current page is close to beginning
      if (currentPage <= 2) {
        pages.push(2, '...');
      }
      // Current page is close to end
      else if (currentPage >= totalPages - 1) {
        pages.push('...', totalPages - 1);
      }
      // Current page is in the middle
      else {
        pages.push('...', currentPage, '...');
      }

      // Add last page if not included
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const paginationItems = generatePagination();

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-8 h-8 rounded-md ${
            currentPage === 1
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-label="Previous page"
        >
          <ArrowLeft size={14} />
        </motion.button>

        <div className="flex items-center space-x-1">
          {paginationItems.map((page, index) =>
            typeof page === 'number' ? (
              <motion.button
                key={`page-${page}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center w-8 h-8 rounded-md text-xs font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </motion.button>
            ) : (
              <span
                key={`ellipsis-${index}`}
                className="w-6 text-center text-gray-500 dark:text-gray-400"
              >
                …
              </span>
            )
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-8 h-8 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-label="Next page"
        >
          <ArrowRight size={14} />
        </motion.button>
      </nav>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ searchQuery }: { searchQuery?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-10 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700"
    >
      <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
        <Search size={18} className="text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
        {searchQuery ? 'Tidak ada hasil ditemukan' : 'Belum ada jurnal tersedia'}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
        {searchQuery
          ? `Tidak ada jurnal yang cocok dengan pencarian "${searchQuery}". Coba gunakan kata kunci lain atau hapus filter.`
          : 'Belum ada jurnal MBKM yang dipublikasikan. Silakan cek kembali nanti.'}
      </p>
    </motion.div>
  );
};

// Loading Skeleton (more compact)
const JournalSkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="h-40 w-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-3"></div>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

const JournalSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <JournalSkeletonCard key={index} />
      ))}
    </div>
  );
};

// Main PojokMBKM Component - Redesigned to match About.tsx style
const PojokMBKM = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [filterOptions, setFilterOptions] = useState<JournalFilterOptions>({});
  const [pagination, setPagination] = useState<PaginationOptions>({ page: 1, limit: 6 });
  const [totalJournals, setTotalJournals] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data based on filters and pagination

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const allJournals = await getAllJournals();

        // Filter published journals aja
        const publishedJournals = allJournals.filter(journal => journal.status === 'published');

        setTotalJournals(publishedJournals.length);

        const start = (pagination.page - 1) * pagination.limit;
        const end = start + pagination.limit;
        setJournals(publishedJournals.slice(start, end));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pagination]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      page: 1,
    }));
  }, [filterOptions]);

  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      page,
    }));
    // Smooth scroll to top of section
    document.getElementById('pojok-mbkm')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get stats for header
  const getHeaderStats = () => {
    const totalPublished = journals.length;
    const uniqueAuthors = new Set(journals.map(j => j.authorId)).size;

    return { totalPublished, uniqueAuthors };
  };

  const { totalPublished, uniqueAuthors } = getHeaderStats();

  return (
    <section
      id="pojok-mbkm"
      className="py-16 bg-gray-50 dark:bg-gradient-to-b dark:from-[#2D3748] dark:to-[#1A202C]"
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Dokumentasi MBKM
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mt-2 mb-4">
            Pojok MBKM
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Kumpulan jurnal kegiatan mahasiswa dalam program Merdeka Belajar Kampus Merdeka
          </p>

          {/* Compact Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Jurnal</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{totalPublished}</p>
              </div>
            </div>

            <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                <User size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">Mahasiswa</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{uniqueAuthors}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
          <FilterBar
            journals={journals}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            isLoading={isLoading}
          />
        </div>

        {isLoading ? (
          <JournalSkeletonGrid />
        ) : journals.length > 0 ? (
          <>
            <JournalGrid journals={journals} />
            <JournalPagination
              totalItems={totalJournals}
              itemsPerPage={pagination.limit}
              currentPage={pagination.page}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyState searchQuery={filterOptions.searchQuery} />
        )}
      </div>
    </section>
  );
};

export default PojokMBKM;
