// src/components/forum/CategoryFilter.tsx
import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'announcement', name: 'Pengumuman Resmi' },
    { id: 'general', name: 'Diskusi Umum' },
    { id: 'qa', name: 'Tanya Jawab' },
    { id: 'experience', name: 'Berbagi Pengalaman' },
  ];

  return (
    <div className="category-filter">
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
              selectedCategory === category.id
                ? 'bg-[#087E8B] text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
