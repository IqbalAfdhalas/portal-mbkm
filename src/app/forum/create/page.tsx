// src/app/forum/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ForumEditor from '@/components/forum/ForumEditor';
import Link from 'next/link';
import { createThread } from '@/lib/forum/actions';

export default function CreateThreadPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { id: 'pengumuman', name: 'Pengumuman Resmi' },
    { id: 'diskusi', name: 'Diskusi Umum' },
    { id: 'tanya-jawab', name: 'Tanya Jawab' },
    { id: 'pengalaman', name: 'Berbagi Pengalaman' },
  ];

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Judul thread tidak boleh kosong');
      return;
    }

    if (!content.trim()) {
      setError('Konten thread tidak boleh kosong');
      return;
    }

    if (!category) {
      setError('Silakan pilih kategori');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      // Memanggil fungsi createThread dari actions
      await createThread({
        title,
        content,
        categoryId: category,
        tags,
      });

      // Redirect ke halaman forum
      router.push('/forum');
    } catch (err) {
      console.error('Error creating thread:', err);
      setError('Gagal membuat thread. Silakan coba lagi nanti.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Buat Thread Baru</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Bagikan pertanyaan, pengalaman, atau diskusi Anda dengan komunitas MBKM BAST ANRI
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Judul Thread
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#087E8B] dark:bg-gray-700 dark:text-white"
            placeholder="Masukkan judul thread"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Kategori
          </label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#087E8B] dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Konten
          </label>
          <ForumEditor value={content} onChange={setContent} />
        </div>

        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tags (Opsional)
          </label>
          <div className="flex">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#087E8B] dark:bg-gray-700 dark:text-white"
              placeholder="Tambahkan tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-300"
            >
              Tambah
            </button>
          </div>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#087E8B]/10 text-[#087E8B] dark:bg-[#087E8B]/20"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-[#087E8B] hover:text-[#0B3954]"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/forum"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#087E8B] hover:bg-[#0B3954] text-white rounded-md transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Membuat...' : 'Buat Thread'}
          </button>
        </div>
      </form>
    </div>
  );
}
