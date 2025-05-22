// lib/firebase/firestore.ts
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
  onSnapshot,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './config';

export interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

export interface QueryOptions {
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  limitCount?: number;
  startAfterDoc?: QueryDocumentSnapshot;
  filters?: Array<{
    field: string;
    operator: any;
    value: any;
  }>;
}

export interface PaginatedResult<T> {
  data: T[];
  lastDoc?: QueryDocumentSnapshot;
  hasMore: boolean;
  total: number;
}

export class FirestoreService {
  /**
   * Get all documents from a collection with optional query options
   */
  static async getCollection<T extends FirestoreDocument>(
    collectionName: string,
    options: QueryOptions = {}
  ): Promise<PaginatedResult<T>> {
    try {
      const collectionRef = collection(db, collectionName);
      let q = query(collectionRef);

      // Apply filters
      if (options.filters) {
        options.filters.forEach(filter => {
          q = query(q, where(filter.field, filter.operator, filter.value));
        });
      }

      // Apply ordering
      if (options.orderByField) {
        q = query(q, orderBy(options.orderByField, options.orderDirection || 'desc'));
      }

      // Apply pagination
      if (options.startAfterDoc) {
        q = query(q, startAfter(options.startAfterDoc));
      }

      if (options.limitCount) {
        q = query(q, limit(options.limitCount + 1)); // +1 to check if there are more
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs;

      // Check if there are more documents
      const hasMore = options.limitCount ? docs.length > options.limitCount : false;
      const resultDocs = hasMore && options.limitCount ? docs.slice(0, -1) : docs;

      const data = resultDocs.map(doc => ({
        id: doc.id,
        ...this.convertTimestamps(doc.data()),
      })) as T[];

      return {
        data,
        lastDoc: hasMore ? resultDocs[resultDocs.length - 1] : undefined,
        hasMore,
        total: data.length,
      };
    } catch (error) {
      console.error(`Error getting collection ${collectionName}:`, error);
      throw new Error(`Gagal mengambil data dari ${collectionName}`);
    }
  }

  /**
   * Get a single document by ID
   */
  static async getDocument<T extends FirestoreDocument>(
    collectionName: string,
    docId: string
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...this.convertTimestamps(docSnap.data()),
        } as T;
      }

      return null;
    } catch (error) {
      console.error(`Error getting document ${docId} from ${collectionName}:`, error);
      throw new Error(`Gagal mengambil dokumen dengan ID ${docId}`);
    }
  }

  /**
   * Create a new document
   */
  static async createDocument<T>(
    collectionName: string,
    data: Omit<T, 'id'>
  ): Promise<T & { id: string }> {
    try {
      const collectionRef = collection(db, collectionName);
      const processedData = this.convertDatesToTimestamps(data);

      const docRef = await addDoc(collectionRef, processedData);

      return {
        ...data,
        id: docRef.id,
      } as T & { id: string };
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw new Error(`Gagal membuat dokumen di ${collectionName}`);
    }
  }

  /**
   * Update an existing document
   */
  static async updateDocument<T>(
    collectionName: string,
    docId: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      const processedData = this.convertDatesToTimestamps(data);

      await updateDoc(docRef, processedData);
    } catch (error) {
      console.error(`Error updating document ${docId} in ${collectionName}:`, error);
      throw new Error(`Gagal mengupdate dokumen dengan ID ${docId}`);
    }
  }

  /**
   * Delete a document
   */
  static async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document ${docId} from ${collectionName}:`, error);
      throw new Error(`Gagal menghapus dokumen dengan ID ${docId}`);
    }
  }

  /**
   * Batch delete multiple documents
   */
  static async batchDelete(collectionName: string, docIds: string[]): Promise<void> {
    try {
      const batch = writeBatch(db);

      docIds.forEach(docId => {
        const docRef = doc(db, collectionName, docId);
        batch.delete(docRef);
      });

      await batch.commit();
    } catch (error) {
      console.error(`Error batch deleting documents from ${collectionName}:`, error);
      throw new Error(`Gagal menghapus beberapa dokumen dari ${collectionName}`);
    }
  }

  /**
   * Batch create multiple documents
   */
  static async batchCreate<T>(
    collectionName: string,
    documents: Array<Omit<T, 'id'>>
  ): Promise<void> {
    try {
      const batch = writeBatch(db);
      const collectionRef = collection(db, collectionName);

      documents.forEach(data => {
        const docRef = doc(collectionRef);
        const processedData = this.convertDatesToTimestamps(data);
        batch.set(docRef, processedData);
      });

      await batch.commit();
    } catch (error) {
      console.error(`Error batch creating documents in ${collectionName}:`, error);
      throw new Error(`Gagal membuat beberapa dokumen di ${collectionName}`);
    }
  }

  /**
   * Listen to collection changes in real-time
   */
  static subscribeToCollection<T extends FirestoreDocument>(
    collectionName: string,
    callback: (data: T[]) => void,
    options: QueryOptions = {}
  ): () => void {
    try {
      const collectionRef = collection(db, collectionName);
      let q = query(collectionRef);

      // Apply filters
      if (options.filters) {
        options.filters.forEach(filter => {
          q = query(q, where(filter.field, filter.operator, filter.value));
        });
      }

      // Apply ordering
      if (options.orderByField) {
        q = query(q, orderBy(options.orderByField, options.orderDirection || 'desc'));
      }

      // Apply limit
      if (options.limitCount) {
        q = query(q, limit(options.limitCount));
      }

      const unsubscribe = onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...this.convertTimestamps(doc.data()),
        })) as T[];

        callback(data);
      });

      return unsubscribe;
    } catch (error) {
      console.error(`Error subscribing to collection ${collectionName}:`, error);
      throw new Error(`Gagal berlangganan ke koleksi ${collectionName}`);
    }
  }

  /**
   * Listen to document changes in real-time
   */
  static subscribeToDocument<T extends FirestoreDocument>(
    collectionName: string,
    docId: string,
    callback: (data: T | null) => void
  ): () => void {
    try {
      const docRef = doc(db, collectionName, docId);

      const unsubscribe = onSnapshot(docRef, docSnap => {
        if (docSnap.exists()) {
          const data = {
            id: docSnap.id,
            ...this.convertTimestamps(docSnap.data()),
          } as T;
          callback(data);
        } else {
          callback(null);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error(`Error subscribing to document ${docId} in ${collectionName}:`, error);
      throw new Error(`Gagal berlangganan ke dokumen ${docId}`);
    }
  }

  /**
   * Count documents in a collection with filters
   */
  static async countDocuments(
    collectionName: string,
    filters?: Array<{ field: string; operator: any; value: any }>
  ): Promise<number> {
    try {
      const collectionRef = collection(db, collectionName);
      let q = query(collectionRef);

      if (filters) {
        filters.forEach(filter => {
          q = query(q, where(filter.field, filter.operator, filter.value));
        });
      }

      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error(`Error counting documents in ${collectionName}:`, error);
      throw new Error(`Gagal menghitung dokumen di ${collectionName}`);
    }
  }

  /**
   * Convert Firestore Timestamps to JavaScript Dates
   */
  private static convertTimestamps(data: DocumentData): any {
    const converted: any = {};

    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Timestamp) {
        converted[key] = value.toDate();
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        converted[key] = this.convertTimestamps(value);
      } else if (Array.isArray(value)) {
        converted[key] = value.map(item =>
          item && typeof item === 'object' ? this.convertTimestamps(item) : item
        );
      } else {
        converted[key] = value;
      }
    }

    return converted;
  }

  /**
   * Convert JavaScript Dates to Firestore Timestamps
   */
  private static convertDatesToTimestamps(data: any): any {
    const converted: any = {};

    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Date) {
        converted[key] = Timestamp.fromDate(value);
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        converted[key] = this.convertDatesToTimestamps(value);
      } else if (Array.isArray(value)) {
        converted[key] = value.map(item =>
          item && typeof item === 'object' ? this.convertDatesToTimestamps(item) : item
        );
      } else {
        converted[key] = value;
      }
    }

    return converted;
  }

  /**
   * Search documents with text query (client-side filtering)
   */
  static async searchDocuments<T extends FirestoreDocument>(
    collectionName: string,
    searchQuery: string,
    searchFields: string[],
    options: QueryOptions = {}
  ): Promise<T[]> {
    try {
      const result = await this.getCollection<T>(collectionName, options);

      if (!searchQuery.trim()) {
        return result.data;
      }

      const query = searchQuery.toLowerCase();

      return result.data.filter(doc => {
        return searchFields.some(field => {
          const fieldValue = doc[field];
          if (typeof fieldValue === 'string') {
            return fieldValue.toLowerCase().includes(query);
          }
          return false;
        });
      });
    } catch (error) {
      console.error(`Error searching documents in ${collectionName}:`, error);
      throw new Error(`Gagal mencari dokumen di ${collectionName}`);
    }
  }
}
