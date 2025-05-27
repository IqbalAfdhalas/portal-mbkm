// pages/api/upload.ts - Version yang diperbaiki
import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/lib/cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== UPLOAD API CALLED ===');
  console.log('Method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Cek environment variables
  const envCheck = {
    CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
  };

  console.log('Environment variables:', envCheck);

  if (
    !envCheck.CLOUDINARY_CLOUD_NAME ||
    !envCheck.CLOUDINARY_API_KEY ||
    !envCheck.CLOUDINARY_API_SECRET
  ) {
    console.error('Missing Cloudinary environment variables');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error - Missing Cloudinary credentials',
    });
  }

  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024, // 10MB limit
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    console.log('=== FORM PARSE RESULT ===');

    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({
        success: false,
        error: 'Form parse error',
        details: err.message,
      });
    }

    console.log('Fields received:', fields);
    console.log('Files received:', Object.keys(files));

    const fileField = files.file;
    if (!fileField) {
      console.error('No file field found in upload');
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
        availableFields: Object.keys(files),
      });
    }

    const file = Array.isArray(fileField) ? fileField[0] : fileField;

    console.log('=== FILE DETAILS ===');
    console.log('File info:', {
      originalFilename: file.originalFilename,
      size: file.size,
      mimetype: file.mimetype,
      filepath: file.filepath,
    });

    // Cek apakah file benar-benar ada
    try {
      const fileExists = fs.existsSync(file.filepath);
      console.log('File exists on disk:', fileExists);

      if (!fileExists) {
        return res.status(400).json({
          success: false,
          error: 'File not found on server',
        });
      }

      const stats = fs.statSync(file.filepath);
      console.log('File stats:', {
        size: stats.size,
        isFile: stats.isFile(),
      });
    } catch (fsError) {
      console.error('File system error:', fsError);
      return res.status(500).json({
        success: false,
        error: 'File system error',
        details: fsError instanceof Error ? fsError.message : 'Unknown error',
      });
    }

    // Validasi file type
    if (!file.mimetype?.startsWith('image/')) {
      console.error('Invalid file type:', file.mimetype);
      return res.status(400).json({
        success: false,
        error: 'Invalid file type. Only images are allowed.',
        receivedType: file.mimetype,
      });
    }

    // Validasi file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.size);
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 10MB.',
        fileSize: file.size,
        maxSize: 10 * 1024 * 1024,
      });
    }

    try {
      console.log('=== STARTING CLOUDINARY UPLOAD ===');

      // Get folder from fields or use default
      const folder = Array.isArray(fields.folder)
        ? fields.folder[0]
        : fields.folder || 'kenali-kami';

      console.log('Upload config:', {
        folder: folder,
        resource_type: 'image',
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      });

      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: folder,
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto',
      });

      console.log('=== CLOUDINARY UPLOAD SUCCESS ===');
      console.log('Result:', {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
      });

      // Cleanup temporary file
      try {
        fs.unlinkSync(file.filepath);
        console.log('Temporary file cleaned up');
      } catch (cleanupError) {
        console.warn('Failed to cleanup temp file:', cleanupError);
      }

      // Return response that matches client expectations
      return res.status(200).json({
        success: true,
        secure_url: result.secure_url,
        url: result.secure_url, // Also include 'url' for backward compatibility
        public_id: result.public_id,
        width: result.width,
        height: result.height,
      });
    } catch (error) {
      console.error('=== CLOUDINARY UPLOAD ERROR ===');
      console.error('Error details:', error);

      // Cleanup temp file on error
      try {
        fs.unlinkSync(file.filepath);
      } catch (cleanupError) {
        console.warn('Failed to cleanup temp file after error:', cleanupError);
      }

      // Return error response that matches client expectations
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          error: 'Upload failed',
          details: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Upload failed - Unknown error',
      });
    }
  });
}
