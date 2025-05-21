// src/components/admin/JournalForm.tsx
import React, { useState, useEffect } from 'react';
import { Journal, JournalMedia } from '@/types/journal';
import dynamic from 'next/dynamic';

// Import RichTextEditor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false });

interface JournalFormProps {
  initialData?: Journal;
  onSubmit: (data: Partial<Journal>) => void;
  isSubmitting?: boolean;
}

const JournalForm: React.FC<JournalFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  // Default empty journal data
  const defaultJournal: Partial<Journal> = {
    title: '',
    content: '',
    summary: '',
    date: new Date().toISOString().split('T')[0],
    category: 'daily-activity',
    location: '',
    authorName: '',
    media: [],
    status: 'draft',
  };

  const [formData, setFormData] = useState<Partial<Journal>>(initialData || defaultJournal);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreview, setMediaPreview] = useState<string[]>([]);
  const [mediaCaptions, setMediaCaptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize media captions if editing an existing journal
  useEffect(() => {
    if (initialData?.media && initialData.media.length > 0) {
      setMediaPreview(initialData.media.map(m => m.url));
      setMediaCaptions(initialData.media.map(m => m.caption || ''));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Limit to 3 media files
    if (mediaFiles.length + files.length > 3) {
      setError('Maksimal 3 media yang dapat diunggah');
      return;
    }

    setError(null);

    // Create array from FileList and add to existing mediaFiles
    const newFiles = Array.from(files);
    setMediaFiles(prev => [...prev, ...newFiles]);

    // Create preview URLs for the new files
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setMediaPreview(prev => [...prev, ...newPreviews]);

    // Initialize empty captions for new files
    setMediaCaptions(prev => [...prev, ...Array(newFiles.length).fill('')]);
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const newCaptions = [...mediaCaptions];
    newCaptions[index] = caption;
    setMediaCaptions(newCaptions);
  };

  const removeMedia = (index: number) => {
    // Remove the file, preview and caption at the given index
    setMediaFiles(prev => prev.filter((_, i) => i !== index));

    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(mediaPreview[index]);
    setMediaPreview(prev => prev.filter((_, i) => i !== index));

    setMediaCaptions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.title ||
      !formData.content ||
      !formData.summary ||
      !formData.date ||
      !formData.location
    ) {
      setError('Silakan isi semua bidang yang diperlukan');
      return;
    }

    // Create media objects from previews and captions
    const media: JournalMedia[] = mediaPreview.map((url, index) => ({
      url,
      caption: mediaCaptions[index] || '',
    }));

    // Submit the form data with media
    onSubmit({
      ...formData,
      media,
      publishDate: formData.status === 'published' ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {initialData ? 'Edit Jurnal' : 'Buat Jurnal Baru'}
      </h2>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">{error}</div>}

      {/* Basic Information */}
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Ringkasan <span className="text-red-500">*</span>
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Ringkasan singkat tentang jurnal ini (maksimal 200 karakter)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Kegiatan <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date ? formData.date.split('T')[0] : ''}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="daily-activity">Aktivitas Harian</option>
              <option value="weekly-reflection">Refleksi Mingguan</option>
              <option value="project-update">Update Proyek</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Lokasi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Contoh: Gedung BAST ANRI Jakarta"
          />
        </div>

        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Penulis <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Konten <span className="text-red-500">*</span>
          </label>
          <RichTextEditor initialContent={formData.content || ''} onChange={handleContentChange} />
        </div>

        {/* Media Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Media (Maksimal 3)</label>

          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleMediaUpload}
              multiple
              disabled={mediaPreview.length >= 3}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
              "
            />
            <p className="text-xs text-gray-500 mt-1">
              Format yang didukung: JPG, PNG, GIF (maks 5MB per file)
            </p>
          </div>

          {/* Media Previews */}
          {mediaPreview.length > 0 && (
            <div className="space-y-4">
              {mediaPreview.map((url, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-3 border border-gray-200 rounded-md"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={mediaCaptions[index] || ''}
                      onChange={e => handleCaptionChange(index, e.target.value)}
                      placeholder="Tambahkan keterangan gambar..."
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="flex-shrink-0 text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Publication Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status Publikasi</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={formData.status === 'draft'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Draft</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="published"
                checked={formData.status === 'published'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Publikasikan</span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Menyimpan...' : initialData ? 'Simpan Perubahan' : 'Simpan Jurnal'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default JournalForm;
