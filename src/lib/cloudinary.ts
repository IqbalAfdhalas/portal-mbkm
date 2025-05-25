// lib/cloudinary.ts - Fixed version
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug: Log config (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Cloudinary Config:', {
    cloud_name:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
        ? 'SET'
        : 'NOT SET',
    api_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET',
  });
}

export default cloudinary;
