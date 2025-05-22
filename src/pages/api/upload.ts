import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/lib/cloudinary';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Form parse error' });
    }

    const fileField = files.file;
    if (!fileField) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = Array.isArray(fileField) ? fileField[0] : fileField;

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: 'mbkm-journals',
      });

      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return res.status(500).json({ error: 'Upload failed' });
    }
  });
}
