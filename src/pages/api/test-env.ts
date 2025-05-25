// pages/api/test-env.ts - File untuk test environment variables
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const envVars = {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET',
  };

  console.log('Environment Variables Check:', envVars);

  return res.status(200).json({
    message: 'Environment variables check',
    env: envVars,
    // Jangan tampilkan nilai asli untuk keamanan
    cloudName: process.env.CLOUDINARY_CLOUD_NAME?.substring(0, 3) + '***',
  });
}
