import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const apiKey = process.env.CLOUDINARY_API_KEY!;
const apiSecret = process.env.CLOUDINARY_API_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { publicId } = req.body;
  if (!publicId) {
    return res.status(400).json({ message: 'publicId is required' });
  }

  // Generate signature
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

  // Kirim request ke Cloudinary
  const formData = new URLSearchParams();
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (data.result !== 'ok') {
    return res.status(500).json({ message: 'Failed to delete image', data });
  }

  return res.status(200).json({ message: 'Image deleted successfully', data });
}
