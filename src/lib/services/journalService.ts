// lib/services/journalService.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Journal, Author, JournalFilterOptions, PaginationOptions } from '@/lib/types/journal';
import { MediaService } from './mediaService';

export interface JournalResponse {
  journals: Journal[];
  total: number;
  hasMore: boolean;
  lastDoc?: QueryDocumentSnapshot;
}

export class JournalService {
  private static readonly COLLECTION_NAME = 'journals';
  private static readonly AUTHORS_COLLECTION = 'authors';

  /**
   * Convert Firestore document to Journal object
   */
  private static docToJournal(doc: QueryDocumentSnapshot): Journal {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      date: data.date?.toDate() || new Date(),
      publishDate: data.publishDate?.toDate() || new Date(),
      category: data.category,
      location: data.location,
      authorId: data.authorId,
      authorName: data.authorName,
      authorImage: data.authorImage,
      media: data.media || [],
      status: data.status,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  }

  /**
   * Convert Journal object to Firestore data
   */
  private static journalToDoc(journal: Partial<Journal>) {
    return {
      ...journal,
      date: journal.date ? Timestamp.fromDate(journal.date) : null,
      publishDate: journal.publishDate ? Timestamp.fromDate(journal.publishDate) : null,
      createdAt: journal.createdAt ? Timestamp.fromDate(journal.createdAt) : Timestamp.now(),
      updatedAt: journal.updatedAt ? Timestamp.fromDate(journal.updatedAt) : Timestamp.now(),
    };
  }

  /**
   * Get all journals with filtering and pagination
   */
  static async getJournals(
    filters: JournalFilterOptions = {},
    pagination: PaginationOptions = { page: 1, limit: 10 },
    lastDoc?: QueryDocumentSnapshot
  ): Promise<JournalResponse> {
    try {
      const journalsRef = collection(db, this.COLLECTION_NAME);
      let q = query(journalsRef);

      // Apply filters
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }

      if (filters.authorId) {
        q = query(q, where('authorId', '==', filters.authorId));
      }

      // Order by updatedAt (newest first)
      q = query(q, orderBy('updatedAt', 'desc'));

      // Pagination
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      q = query(q, limit(pagination.limit + 1)); // +1 to check if there are more

      const snapshot = await getDocs(q);
      const docs = snapshot.docs;

      // Check if there are more documents
      const hasMore = docs.length > pagination.limit;
      const journalDocs = hasMore ? docs.slice(0, -1) : docs;

      let journals = journalDocs.map(doc => this.docToJournal(doc));

      // Apply client-side search filter (Firestore doesn't support full-text search)
      if (filters.searchQuery) {
        const searchQuery = filters.searchQuery.toLowerCase();
        journals = journals.filter(
          journal =>
            journal.title.toLowerCase().includes(searchQuery) ||
            journal.summary.toLowerCase().includes(searchQuery) ||
            journal.content.toLowerCase().includes(searchQuery) ||
            journal.authorName.toLowerCase().includes(searchQuery)
        );
      }

      return {
        journals,
        total: journals.length, // Note: This is not the total count from DB
        hasMore,
        lastDoc: hasMore ? journalDocs[journalDocs.length - 1] : undefined,
      };
    } catch (error) {
      console.error('Error getting journals:', error);
      throw new Error('Gagal mengambil data jurnal');
    }
  }

  /**
   * Get single journal by ID
   */
  static async getJournal(id: string): Promise<Journal | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return this.docToJournal(docSnap as QueryDocumentSnapshot);
      }

      return null;
    } catch (error) {
      console.error('Error getting journal:', error);
      throw new Error('Gagal mengambil data jurnal');
    }
  }

  /**
   * Create new journal
   */
  static async createJournal(journalData: Partial<Journal>): Promise<Journal> {
    try {
      // Get author info
      const author = await this.getAuthor(journalData.authorId!);
      if (!author) {
        throw new Error('Penulis tidak ditemukan');
      }

      const now = new Date();
      const dataToSave = {
        ...journalData,
        authorName: author.name,
        authorImage: author.image,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(
        collection(db, this.COLLECTION_NAME),
        this.journalToDoc(dataToSave)
      );

      return {
        ...dataToSave,
        id: docRef.id,
      } as Journal;
    } catch (error) {
      console.error('Error creating journal:', error);
      throw new Error('Gagal membuat jurnal');
    }
  }

  /**
   * Update existing journal
   */
  static async updateJournal(id: string, journalData: Partial<Journal>): Promise<Journal> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);

      // Get existing journal
      const existingJournal = await this.getJournal(id);
      if (!existingJournal) {
        throw new Error('Jurnal tidak ditemukan');
      }

      // Get author info if authorId changed
      let authorName = existingJournal.authorName;
      let authorImage = existingJournal.authorImage;

      if (journalData.authorId && journalData.authorId !== existingJournal.authorId) {
        const author = await this.getAuthor(journalData.authorId);
        if (!author) {
          throw new Error('Penulis tidak ditemukan');
        }
        authorName = author.name;
        authorImage = author.image;
      }

      const dataToUpdate = {
        ...journalData,
        authorName,
        authorImage,
        updatedAt: new Date(),
      };

      await updateDoc(docRef, this.journalToDoc(dataToUpdate));

      return {
        ...existingJournal,
        ...dataToUpdate,
      } as Journal;
    } catch (error) {
      console.error('Error updating journal:', error);
      throw new Error('Gagal mengupdate jurnal');
    }
  }

  /**
   * Delete journal and its media files
   */
  static async deleteJournal(id: string): Promise<void> {
    try {
      // Get journal to access media files
      const journal = await this.getJournal(id);
      if (!journal) {
        throw new Error('Jurnal tidak ditemukan');
      }

      // Delete media files
      if (journal.media && journal.media.length > 0) {
        const fileNames = journal.media
          .map(media => media.url.split('/').pop())
          .filter(Boolean) as string[];

        try {
          await MediaService.deleteMultipleMedia(fileNames);
        } catch (mediaError) {
          console.warn('Failed to delete some media files:', mediaError);
          // Continue with journal deletion even if media deletion fails
        }
      }

      // Delete journal document
      const docRef = doc(db, this.COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting journal:', error);
      throw new Error('Gagal menghapus jurnal');
    }
  }

  /**
   * Bulk delete journals
   */
  static async deleteMultipleJournals(ids: string[]): Promise<void> {
    try {
      const batch = writeBatch(db);

      // Get all journals to access media files
      const journals = await Promise.all(ids.map(id => this.getJournal(id)));
      const validJournals = journals.filter(Boolean) as Journal[];

      // Collect all media files
      const allMediaFiles: string[] = [];
      validJournals.forEach(journal => {
        if (journal.media && journal.media.length > 0) {
          const fileNames = journal.media
            .map(media => media.url.split('/').pop())
            .filter(Boolean) as string[];
          allMediaFiles.push(...fileNames);
        }
      });

      // Delete media files
      if (allMediaFiles.length > 0) {
        try {
          await MediaService.deleteMultipleMedia(allMediaFiles);
        } catch (mediaError) {
          console.warn('Failed to delete some media files:', mediaError);
        }
      }

      // Add delete operations to batch
      ids.forEach(id => {
        const docRef = doc(db, this.COLLECTION_NAME, id);
        batch.delete(docRef);
      });

      await batch.commit();
    } catch (error) {
      console.error('Error deleting multiple journals:', error);
      throw new Error('Gagal menghapus jurnal');
    }
  }

  /**
   * Get author by ID
   */
  static async getAuthor(authorId: string): Promise<Author | null> {
    try {
      const docRef = doc(db, this.AUTHORS_COLLECTION, authorId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name,
          position: data.position,
          university: data.university,
          image: data.image,
          bio: data.bio,
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting author:', error);
      return null;
    }
  }

  /**
   * Get all authors
   */
  static async getAuthors(): Promise<Author[]> {
    try {
      const authorsRef = collection(db, this.AUTHORS_COLLECTION);
      const q = query(authorsRef, orderBy('name', 'asc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          position: data.position,
          university: data.university,
          image: data.image,
          bio: data.bio,
        };
      });
    } catch (error) {
      console.error('Error getting authors:', error);
      throw new Error('Gagal mengambil data penulis');
    }
  }

  /**
   * Create or update author
   */
  static async saveAuthor(authorData: Partial<Author>): Promise<Author> {
    try {
      if (authorData.id) {
        // Update existing author
        const docRef = doc(db, this.AUTHORS_COLLECTION, authorData.id);
        await updateDoc(docRef, authorData);
        return { ...authorData, id: authorData.id } as Author;
      } else {
        // Create new author
        const docRef = await addDoc(collection(db, this.AUTHORS_COLLECTION), authorData);
        return { ...authorData, id: docRef.id } as Author;
      }
    } catch (error) {
      console.error('Error saving author:', error);
      throw new Error('Gagal menyimpan data penulis');
    }
  }

  /**
   * Get journal statistics
   */
  static async getJournalStats(): Promise<{
    total: number;
    published: number;
    draft: number;
    uniqueAuthors: number;
  }> {
    try {
      const journalsRef = collection(db, this.COLLECTION_NAME);
      const snapshot = await getDocs(journalsRef);

      const journals = snapshot.docs.map(doc => this.docToJournal(doc));
      const published = journals.filter(j => j.status === 'published').length;
      const draft = journals.filter(j => j.status === 'draft').length;
      const uniqueAuthors = new Set(journals.map(j => j.authorId)).size;

      return {
        total: journals.length,
        published,
        draft,
        uniqueAuthors,
      };
    } catch (error) {
      console.error('Error getting journal stats:', error);
      throw new Error('Gagal mengambil statistik jurnal');
    }
  }
}
