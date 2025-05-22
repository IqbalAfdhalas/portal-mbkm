// lib/services/mediaService.ts
import { v4 as uuidv4 } from 'uuid';

export interface MediaFile {
  url: string;
  caption?: string;
  fileName: string;
  size: number;
  type: string;
}

export class MediaService {
  private static readonly UPLOAD_PATH = '/api/upload/journal-media';
  private static readonly BASE_URL = '/images/journal';

  /**
   * Upload multiple media files to local storage
   */
  static async uploadMedia(files: File[]): Promise<MediaFile[]> {
    const uploadPromises = files.map(file => this.uploadSingleFile(file));
    return await Promise.all(uploadPromises);
  }

  /**
   * Upload single file to local storage
   */
  private static async uploadSingleFile(file: File): Promise<MediaFile> {
    try {
      // Generate unique filename
      const fileExtension = file.name.split('.').pop() || '';
      const uniqueFileName = `${uuidv4()}.${fileExtension}`;

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', uniqueFileName);

      // Upload to API route
      const response = await fetch(this.UPLOAD_PATH, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();

      return {
        url: `${this.BASE_URL}/${uniqueFileName}`,
        fileName: uniqueFileName,
        size: file.size,
        type: file.type,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Gagal mengupload file');
    }
  }

  /**
   * Delete media file from local storage
   */
  static async deleteMedia(fileName: string): Promise<void> {
    try {
      const response = await fetch(`${this.UPLOAD_PATH}?fileName=${fileName}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Gagal menghapus file');
    }
  }

  /**
   * Delete multiple media files
   */
  static async deleteMultipleMedia(fileNames: string[]): Promise<void> {
    const deletePromises = fileNames.map(fileName => this.deleteMedia(fileName));
    await Promise.all(deletePromises);
  }

  /**
   * Validate file type and size
   */
  static validateFile(file: File): { isValid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Tipe file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP.',
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'Ukuran file terlalu besar. Maksimal 10MB.',
      };
    }

    return { isValid: true };
  }

  /**
   * Validate multiple files
   */
  static validateFiles(files: File[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    files.forEach((file, index) => {
      const validation = this.validateFile(file);
      if (!validation.isValid) {
        errors.push(`File ${index + 1}: ${validation.error}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Resize image before upload (client-side)
   */
  static resizeImage(file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw resized image
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          blob => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error('Failed to resize image'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Process files before upload (resize if needed)
   */
  static async processFiles(files: File[]): Promise<File[]> {
    const processPromises = files.map(async file => {
      // Only resize images larger than 1200px width
      if (file.type.startsWith('image/') && file.size > 500 * 1024) {
        // 500KB
        try {
          return await this.resizeImage(file);
        } catch (error) {
          console.warn('Failed to resize image, using original:', error);
          return file;
        }
      }
      return file;
    });

    return await Promise.all(processPromises);
  }
}
