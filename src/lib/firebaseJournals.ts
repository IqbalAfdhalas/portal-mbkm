import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, Timestamp } from 'firebase/firestore';
import { Journal, Author } from '@/lib/types/journal';

// Helper convert Timestamp ke Date
const toDateIfTimestamp = (value: any) => (value instanceof Timestamp ? value.toDate() : value);

const journalsCollection = collection(db, 'journals');

// Ambil semua jurnal, urutkan dari terbaru
export const getAllJournals = async (): Promise<Journal[]> => {
  const q = query(journalsCollection, orderBy('publishDate', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data() as Omit<Journal, 'id'>;
    return {
      id: doc.id,
      ...data,
      publishDate: toDateIfTimestamp(data.publishDate),
      createdAt: toDateIfTimestamp(data.createdAt),
      updatedAt: toDateIfTimestamp(data.updatedAt),
    };
  });
};

// Ambil satu jurnal berdasarkan ID
export const getJournalById = async (id: string): Promise<Journal | null> => {
  const docRef = doc(db, 'journals', id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.data() as Omit<Journal, 'id'>;

  return {
    id: snapshot.id,
    ...data,
    publishDate: toDateIfTimestamp(data.publishDate),
    createdAt: toDateIfTimestamp(data.createdAt),
    updatedAt: toDateIfTimestamp(data.updatedAt),
  };
};

// Ambil author berdasarkan ID
export const getAuthorById = async (id: string): Promise<Author | null> => {
  const docRef = doc(db, 'authors', id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Author, 'id'>),
  };
};

// Ambil semua author
export const getAllAuthors = async (): Promise<Author[]> => {
  const snapshot = await getDocs(collection(db, 'authors'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Author, 'id'>),
  }));
};

export const getRelatedJournals = async (
  currentId: string,
  category: string,
  limit: number = 3
): Promise<Journal[]> => {
  const q = query(journalsCollection, orderBy('publishDate', 'desc'));
  const snapshot = await getDocs(q);

  const related = snapshot.docs
    .map(doc => {
      const data = doc.data() as Omit<Journal, 'id'>;
      return {
        id: doc.id,
        ...data,
        publishDate: toDateIfTimestamp(data.publishDate),
        createdAt: toDateIfTimestamp(data.createdAt),
        updatedAt: toDateIfTimestamp(data.updatedAt),
      };
    })
    .filter(journal => journal.id !== currentId && journal.category === category)
    .slice(0, limit);

  return related;
};
