import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authors = req.body;

    const batchPromises = authors.map((author: any) =>
      setDoc(doc(collection(db, 'authors'), author.id), author)
    );

    await Promise.all(batchPromises);

    res.status(200).json({ message: 'Authors saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save authors' });
  }
}
