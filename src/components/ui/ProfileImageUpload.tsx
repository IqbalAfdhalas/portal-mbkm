// src/components/ui/ProfileImageUpload.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, User, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { generateAvatarUrl } from '@/lib/firebaseProfiles';

interface ProfileImageUploadProps {
  currentImage?: string | null;
  profileName?: string;
  onImageChange: (imageUrl: string | null) => void;
  disabled?: boolean;
}

export default function ProfileImageUpload({
  currentImage,
  profileName = '',
  onImageChange,
  disabled = false,
}: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate avatar URL untuk preview
  const avatarUrl = profileName ? generateAvatarUrl(profileName) : null;
  const displayImage = previewImage || avatarUrl;

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validasi file
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Upload ke Cloudinary via API route
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'kenali_kami_profiles');
      formData.append('folder', 'kenali-kami');

      console.log('Starting upload...');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed with status:', response.status, errorText);
        throw new Error(`Upload gagal: ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload response data:', data);

      // Check both possible response formats
      if (data.success && data.secure_url) {
        console.log('Upload successful, setting image:', data.secure_url);
        setPreviewImage(data.secure_url);
        onImageChange(data.secure_url);
      } else if (data.url) {
        // Fallback for old response format
        console.log('Upload successful (fallback), setting image:', data.url);
        setPreviewImage(data.url);
        onImageChange(data.url);
      } else {
        console.error('Invalid response format:', data);
        throw new Error(data.error || 'Upload gagal - format response tidak valid');
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error instanceof Error) {
        alert(`Upload gagal: ${error.message}`);
      } else {
        alert('Upload gagal. Silakan coba lagi.');
      }
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Foto Profil
      </label>

      <div className="flex items-center space-x-6">
        {/* Image Preview */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-200 dark:border-gray-600">
            {displayImage ? (
              <Image
                src={displayImage}
                alt="Preview"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority={true}
                unoptimized={displayImage.includes('ui-avatars.com')} // Disable optimization for external avatar service
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>

          {/* Remove button */}
          {previewImage && !disabled && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              title="Hapus foto"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleUploadClick}
              disabled={disabled || isUploading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Foto
                </>
              )}
            </button>

            {previewImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={disabled}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 disabled:opacity-50"
              >
                Hapus
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Format: JPG, PNG, GIF. Maksimal 5MB.
            {!previewImage && profileName && (
              <span className="block mt-1">Avatar akan dibuat otomatis jika tidak ada foto.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
