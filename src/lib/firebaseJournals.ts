import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, Timestamp } from 'firebase/firestore';
import { Journal, Author } from '@/lib/types/journal';
import { performanceCache, CACHE_KEYS, CACHE_TTL } from './utils/performanceCache';
import { firebaseOptimization } from './utils/firebaseOptimization';

// Helper convert Timestamp ke Date
const toDateIfTimestamp = (value: any) => (value instanceof Timestamp ? value.toDate() : value);

const journalsCollection = collection(db, 'journals');

// Ambil semua jurnal dengan caching dan optimization
export const getAllJournals = async (): Promise<Journal[]> => {
  return performanceCache.cachedFetch(
    CACHE_KEYS.JOURNALS_ALL,
    async () => {
      console.log('🔍 [Journals] Fetching all journals from Firestore...');

      // Ensure Firebase connection is warmed up
      await firebaseOptimization.warmupConnection();

      const q = query(journalsCollection, orderBy('publishDate', 'desc'));
      const snapshot = await getDocs(q);

      const journals = snapshot.docs.map(doc => {
        const data = doc.data() as Omit<Journal, 'id'>;
        return {
          id: doc.id,
          ...data,
          publishDate: toDateIfTimestamp(data.publishDate),
          createdAt: toDateIfTimestamp(data.createdAt),
          updatedAt: toDateIfTimestamp(data.updatedAt),
        };
      });

      console.log(`✅ [Journals] Fetched ${journals.length} journals from Firestore`);
      return journals;
    },
    CACHE_TTL.MEDIUM
  );
};

// Ambil satu jurnal berdasarkan ID dengan caching
export const getJournalById = async (id: string): Promise<Journal | null> => {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error('Invalid journal ID');
  }

  return performanceCache.cachedFetch(
    CACHE_KEYS.JOURNAL_BY_ID(id),
    async () => {
      console.log(`🔍 [Journals] Fetching journal by ID: ${id}`);

      await firebaseOptimization.warmupConnection();

      const docRef = doc(db, 'journals', id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        console.log(`❌ [Journals] Journal not found: ${id}`);
        return null;
      }

      const data = snapshot.data() as Omit<Journal, 'id'>;
      const journal = {
        id: snapshot.id,
        ...data,
        publishDate: toDateIfTimestamp(data.publishDate),
        createdAt: toDateIfTimestamp(data.createdAt),
        updatedAt: toDateIfTimestamp(data.updatedAt),
      };

      console.log(`✅ [Journals] Journal fetched: ${journal.title}`);
      return journal;
    },
    CACHE_TTL.LONG
  );
};

// Ambil author berdasarkan ID dengan caching
export const getAuthorById = async (id: string): Promise<Author | null> => {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error('Invalid author ID');
  }

  return performanceCache.cachedFetch(
    `author_${id}`,
    async () => {
      console.log(`🔍 [Authors] Fetching author by ID: ${id}`);

      await firebaseOptimization.warmupConnection();

      const docRef = doc(db, 'authors', id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        console.log(`❌ [Authors] Author not found: ${id}`);
        return null;
      }

      const author = {
        id: snapshot.id,
        ...(snapshot.data() as Omit<Author, 'id'>),
      };

      console.log(`✅ [Authors] Author fetched: ${author.name || 'Unknown'}`);
      return author;
    },
    CACHE_TTL.VERY_LONG
  );
};

// Ambil semua author dengan caching
export const getAllAuthors = async (): Promise<Author[]> => {
  return performanceCache.cachedFetch(
    CACHE_KEYS.AUTHORS_ALL,
    async () => {
      console.log('🔍 [Authors] Fetching all authors from Firestore...');

      await firebaseOptimization.warmupConnection();

      const snapshot = await getDocs(collection(db, 'authors'));
      const authors = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Author, 'id'>),
      }));

      console.log(`✅ [Authors] Fetched ${authors.length} authors from Firestore`);
      return authors;
    },
    CACHE_TTL.VERY_LONG
  );
};

// Ambil related journals dengan caching
export const getRelatedJournals = async (
  currentId: string,
  category: string,
  limit: number = 3
): Promise<Journal[]> => {
  return performanceCache.cachedFetch(
    CACHE_KEYS.RELATED_JOURNALS(currentId, category),
    async () => {
      console.log(
        `🔍 [Journals] Fetching related journals for ${currentId}, category: ${category}`
      );

      await firebaseOptimization.warmupConnection();

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

      console.log(`✅ [Journals] Found ${related.length} related journals`);
      return related;
    },
    CACHE_TTL.MEDIUM
  );
};

// ===============================
// OPTIMIZED BATCH OPERATIONS
// ===============================

/**
 * Load journal dengan author data secara parallel
 */
export const getJournalWithAuthor = async (journalId: string) => {
  const journal = await getJournalById(journalId);
  if (!journal) return null;

  // Load author jika ada authorId
  if (journal.authorId) {
    const author = await getAuthorById(journal.authorId);
    return {
      journal,
      author,
    };
  }

  return { journal, author: null };
};

/**
 * Load multiple journals dengan authors secara parallel
 * Fixed: menggunakan authorId yang benar dari interface Journal
 */
export const getJournalsWithAuthors = async (journalIds: string[]) => {
  if (!journalIds.length) return [];

  // Load semua journals parallel
  const journalQueries = journalIds.reduce(
    (acc, id) => {
      acc[`journal_${id}`] = () => getJournalById(id);
      return acc;
    },
    {} as Record<string, () => Promise<Journal | null>>
  );

  const journalResults = await firebaseOptimization.executeParallel(journalQueries);
  const journals = Object.values(journalResults).filter(Boolean) as Journal[];

  // Collect unique author IDs (fixed: menggunakan authorId, bukan authorIds)
  const authorIds = new Set<string>();
  journals.forEach(journal => {
    if (journal.authorId) {
      authorIds.add(journal.authorId);
    }
  });

  // Load all authors parallel jika ada
  if (authorIds.size > 0) {
    const authorQueries = Array.from(authorIds).reduce(
      (acc, id) => {
        acc[`author_${id}`] = () => getAuthorById(id);
        return acc;
      },
      {} as Record<string, () => Promise<Author | null>>
    );

    const authorResults = await firebaseOptimization.executeParallel(authorQueries);
    const authors = Object.values(authorResults).filter(Boolean) as Author[];

    // Map authors back to journals
    const authorMap = new Map(authors.map(author => [author.id, author]));

    return journals.map(journal => ({
      journal,
      author: journal.authorId ? authorMap.get(journal.authorId) || null : null,
    }));
  }

  return journals.map(journal => ({ journal, author: null }));
};

/**
 * Progressive loading untuk dashboard/homepage
 */
export const loadJournalsDashboard = async (onDataReady?: (key: string, data: any) => void) => {
  return firebaseOptimization.executeProgressive([
    {
      key: 'recentJournals',
      priority: 'high',
      queryFn: async () => {
        const journals = await getAllJournals();
        return journals.slice(0, 6); // 6 jurnal terbaru
      },
      onComplete: onDataReady,
    },
    {
      key: 'allAuthors',
      priority: 'medium',
      queryFn: () => getAllAuthors(),
      onComplete: onDataReady,
    },
    {
      key: 'allJournals',
      priority: 'low',
      queryFn: () => getAllJournals(),
      onComplete: onDataReady,
    },
  ]);
};

/**
 * Load data untuk journal detail page
 */
export const loadJournalDetailPage = async (
  journalId: string,
  onDataReady?: (key: string, data: any) => void
) => {
  return firebaseOptimization.executeProgressive([
    {
      key: 'mainJournal',
      priority: 'high',
      queryFn: () => getJournalWithAuthor(journalId),
      onComplete: onDataReady,
    },
    {
      key: 'relatedJournals',
      priority: 'medium',
      queryFn: async () => {
        const journal = await getJournalById(journalId);
        if (!journal) return [];
        return getRelatedJournals(journalId, journal.category);
      },
      onComplete: onDataReady,
    },
  ]);
};

/**
 * Invalidate related caches when data changes
 * Fixed: proper type checking untuk journal
 */
export const invalidateJournalCaches = (journalId?: string) => {
  performanceCache.invalidate(CACHE_KEYS.JOURNALS_ALL);

  if (journalId) {
    performanceCache.invalidate(CACHE_KEYS.JOURNAL_BY_ID(journalId));

    // Invalidate related journals cache juga
    const cachedJournal = performanceCache.get<Journal>(CACHE_KEYS.JOURNAL_BY_ID(journalId));
    if (cachedJournal && cachedJournal.category) {
      performanceCache.invalidate(CACHE_KEYS.RELATED_JOURNALS(journalId, cachedJournal.category));
    }
  }

  console.log('🧹 [Journals] Cache invalidated');
};

/**
 * Preload critical data untuk better UX
 */
export const preloadCriticalData = async () => {
  try {
    // Preload dalam background tanpa await
    Promise.all([getAllJournals(), getAllAuthors()]);

    console.log('🚀 [Journals] Critical data preloading started');
  } catch (error) {
    console.warn('⚠️ [Journals] Preload failed:', error);
  }
};
