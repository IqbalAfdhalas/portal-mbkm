// lib/utils/mediaUtils.ts

/**
 * Convert file size to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Check if file is an image
 */
export const isImageFile = (file: File | string): boolean => {
  if (typeof file === 'string') {
    const ext = getFileExtension(file);
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
  }

  return file.type.startsWith('image/');
};

/**
 * Generate unique filename with timestamp
 */
export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const extension = getFileExtension(originalName);
  const nameWithoutExt = originalName.replace(`.${extension}`, '');
  const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '_');

  return `${sanitizedName}_${timestamp}.${extension}`;
};

/**
 * Validate image dimensions
 */
export const validateImageDimensions = (
  file: File,
  maxWidth: number = 2000,
  maxHeight: number = 2000
): Promise<{ isValid: boolean; width: number; height: number; error?: string }> => {
  return new Promise(resolve => {
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        resolve({
          isValid: false,
          width,
          height,
          error: `Dimensi gambar terlalu besar. Maksimal ${maxWidth}x${maxHeight}px`,
        });
      } else {
        resolve({
          isValid: true,
          width,
          height,
        });
      }

      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      resolve({
        isValid: false,
        width: 0,
        height: 0,
        error: 'File bukan gambar yang valid',
      });
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Create image thumbnail
 */
export const createImageThumbnail = (
  file: File,
  maxWidth: number = 300,
  maxHeight: number = 300,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;

      // Calculate thumbnail dimensions
      let thumbWidth = width;
      let thumbHeight = height;

      if (width > height) {
        if (width > maxWidth) {
          thumbWidth = maxWidth;
          thumbHeight = (height * maxWidth) / width;
        }
      } else {
        if (height > maxHeight) {
          thumbHeight = maxHeight;
          thumbWidth = (width * maxHeight) / height;
        }
      }

      canvas.width = thumbWidth;
      canvas.height = thumbHeight;

      // Draw thumbnail
      ctx?.drawImage(img, 0, 0, thumbWidth, thumbHeight);

      // Convert to blob
      canvas.toBlob(
        blob => {
          if (blob) {
            const thumbnailFile = new File([blob], `thumb_${file.name}`, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(thumbnailFile);
          } else {
            reject(new Error('Failed to create thumbnail'));
          }
        },
        file.type,
        quality
      );

      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for thumbnail'));
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Compress image file
 */
export const compressImage = (
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 1200,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // Calculate new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw compressed image
      ctx?.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob(
        blob => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        file.type,
        quality
      );

      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for compression'));
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Load image from URL and get dimensions
 */
export const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};

/**
 * Convert data URL to File
 */
export const dataURLtoFile = (dataURL: string, filename: string): File => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

/**
 * Read file as data URL
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Extract filename from URL
 */
export const extractFilenameFromUrl = (url: string): string => {
  return url.split('/').pop() || '';
};

/**
 * Check if URL is a valid image URL
 */
export const isValidImageUrl = (url: string): boolean => {
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
  return imageExtensions.test(url);
};

/**
 * Sanitize filename for safe storage
 */
export const sanitizeFilename = (filename: string): string => {
  // Remove special characters and replace spaces with underscores
  return filename
    .replace(/[^\w\-_.]/g, '')
    .replace(/\s+/g, '_')
    .toLowerCase();
};
