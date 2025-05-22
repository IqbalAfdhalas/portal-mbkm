import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState } from 'react';
import { Journal } from '@/lib/types/journal';

export const useJournalCRUD = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const journalsRef = collection(db, 'journals');

  const createJournal = async (data: Partial<Journal>): Promise<Journal> => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(journalsRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...data } as Journal;
    } catch (err) {
      const message = 'Gagal membuat jurnal';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateJournal = async (id: string, data: Partial<Journal>): Promise<Journal> => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, 'journals', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      return { id, ...data } as Journal;
    } catch (err) {
      const message = 'Gagal mengupdate jurnal';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteJournal = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, 'journals', id);
      await deleteDoc(docRef);
    } catch (err) {
      const message = 'Gagal menghapus jurnal';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const getJournal = async (id: string): Promise<Journal | null> => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, 'journals', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Journal;
      }
      return null;
    } catch (err) {
      const message = 'Gagal mengambil data jurnal';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const getAllJournals = async (): Promise<Journal[]> => {
    setLoading(true);
    setError(null);
    try {
      const q = query(journalsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Journal[];
      return result;
    } catch (err) {
      const message = 'Gagal mengambil daftar jurnal';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createJournal,
    updateJournal,
    deleteJournal,
    getJournal,
    getAllJournals,
    loading,
    error,
  };
};
