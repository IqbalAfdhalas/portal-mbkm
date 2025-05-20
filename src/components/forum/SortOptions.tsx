// src/components/forum/SortOptions.tsx
import React from 'react';

interface SortOptionsProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-options">
      <select
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
        className="form-select py-2 pl-3 pr-10 text-base rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#087E8B] focus:border-[#087E8B] sm:text-sm"
      >
        <option value="newest">Terbaru</option>
        <option value="popular">Terpopuler</option>
        <option value="most_comments">Paling Banyak Komentar</option>
        <option value="most_viewed">Paling Banyak Dilihat</option>
      </select>
    </div>
  );
};

export default SortOptions;
