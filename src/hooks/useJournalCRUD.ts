import { useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

import { Journal } from '@/lib/types/journal';
import { getAuthorById } from '@/lib/firebaseJournals';

const journalsCollection = collection(db, 'journals');

export const useJournalCRUD = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createJournal = async (data: Partial<Journal>): Promise<Journal> => {
    // Prevent multiple submissions
    if (loading) {
      throw new Error('Sedang memproses, harap tunggu...');
    }

    setLoading(true);
    setError(null);

    try {
      if (!data.authorId) {
        throw new Error('Author ID is required');
      }

      const authorData = await getAuthorById(data.authorId);
      if (!authorData) {
        throw new Error('Penulis tidak ditemukan');
      }

      const newJournalData = {
        ...data,
        publishDate: data.publishDate
          ? Timestamp.fromDate(new Date(data.publishDate))
          : serverTimestamp(),
        authorName: authorData.name,
        authorImage: authorData.image || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(journalsCollection, newJournalData);

      // Ambil lagi datanya biar dapet Timestamp dari Firestore
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        throw new Error('Jurnal tidak ditemukan setelah dibuat');
      }

      const journalData = snapshot.data() as Omit<Journal, 'id'>;

      return {
        id: docRef.id,
        ...journalData,
        publishDate:
          journalData.publishDate instanceof Timestamp
            ? journalData.publishDate.toDate()
            : journalData.publishDate,
        createdAt:
          journalData.createdAt instanceof Timestamp
            ? journalData.createdAt.toDate()
            : journalData.createdAt,
        updatedAt:
          journalData.updatedAt instanceof Timestamp
            ? journalData.updatedAt.toDate()
            : journalData.updatedAt,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal membuat jurnal';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateJournal = async (id: string, data: Partial<Journal>): Promise<Journal> => {
    // Prevent multiple submissions
    if (loading) {
      throw new Error('Sedang memproses, harap tunggu...');
    }

    setLoading(true);
    setError(null);

    try {
      if (!id) {
        throw new Error('Journal ID is required');
      }

      const docRef = doc(db, 'journals', id);

      type FirestoreUpdateData = {
        [key: string]: any;
      };

      const updatedData: FirestoreUpdateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      if (data.publishDate) {
        updatedData.publishDate = Timestamp.fromDate(new Date(data.publishDate));
      }

      await updateDoc(docRef, updatedData);

      // ambil snapshot baru
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        throw new Error('Journal not found after update');
      }

      const journalData = snapshot.data() as Omit<Journal, 'id'>;
      return {
        id: snapshot.id,
        ...journalData,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengupdate jurnal';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteJournal = async (id: string): Promise<void> => {
    // Prevent multiple submissions
    if (loading) {
      throw new Error('Sedang memproses, harap tunggu...');
    }

    setLoading(true);
    setError(null);

    try {
      if (!id) {
        throw new Error('Journal ID is required');
      }

      const docRef = doc(db, 'journals', id);
      await deleteDoc(docRef);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus jurnal';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    createJournal,
    updateJournal,
    deleteJournal,
    loading,
    error,
    clearError,
  };
};
