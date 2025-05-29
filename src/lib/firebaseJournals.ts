import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { Journal, Author, PopularJournalsResult, ViewsOperationResult } from '@/lib/types/journal';
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
          date: toDateIfTimestamp(data.date),
          createdAt: toDateIfTimestamp(data.createdAt),
          updatedAt: toDateIfTimestamp(data.updatedAt),
          views: data.views || 0, // ← NEW: Default views to 0 if not exists
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
        date: toDateIfTimestamp(data.date),
        createdAt: toDateIfTimestamp(data.createdAt),
        updatedAt: toDateIfTimestamp(data.updatedAt),
        views: data.views || 0, // ← NEW: Default views to 0 if not exists
      };

      console.log(`✅ [Journals] Journal fetched: ${journal.title}`);
      return journal;
    },
    CACHE_TTL.LONG
  );
};

// ===============================
// NEW: VIEWS RELATED FUNCTIONS
// ===============================

/**
 * Increment views count for a journal
 */
export const incrementJournalViews = async (journalId: string): Promise<ViewsOperationResult> => {
  if (!journalId || typeof journalId !== 'string' || journalId.trim() === '') {
    return {
      success: false,
      error: 'Invalid journal ID',
    };
  }

  try {
    console.log(`👁️ [Views] Incrementing views for journal: ${journalId}`);

    const docRef = doc(db, 'journals', journalId);

    // Use Firestore increment for atomic operation
    await updateDoc(docRef, {
      views: increment(1),
      updatedAt: new Date(),
    });

    // Invalidate related caches
    performanceCache.invalidate(CACHE_KEYS.JOURNAL_BY_ID(journalId));
    performanceCache.invalidate(CACHE_KEYS.JOURNALS_ALL);
    performanceCache.invalidate(CACHE_KEYS.POPULAR_JOURNALS);

    // Get updated journal to return new views count
    const updatedJournal = await getJournalById(journalId);
    const newViewsCount = updatedJournal?.views || 0;

    console.log(`✅ [Views] Views incremented for ${journalId}. New count: ${newViewsCount}`);

    return {
      success: true,
      newViewsCount,
    };
  } catch (error) {
    console.error('❌ [Views] Failed to increment views:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Get popular journals by views count
 */
export const getPopularJournals = async (limit: number = 10): Promise<PopularJournalsResult> => {
  return performanceCache.cachedFetch(
    CACHE_KEYS.POPULAR_JOURNALS,
    async () => {
      console.log(`🔥 [Popular] Fetching top ${limit} popular journals...`);

      await firebaseOptimization.warmupConnection();

      // Query journals ordered by views desc
      const q = query(
        journalsCollection,
        orderBy('views', 'desc'),
        orderBy('publishDate', 'desc') // Secondary sort for same views
      );

      const snapshot = await getDocs(q);

      const allJournals = snapshot.docs.map(doc => {
        const data = doc.data() as Omit<Journal, 'id'>;
        return {
          id: doc.id,
          ...data,
          publishDate: toDateIfTimestamp(data.publishDate),
          date: toDateIfTimestamp(data.date),
          createdAt: toDateIfTimestamp(data.createdAt),
          updatedAt: toDateIfTimestamp(data.updatedAt),
          views: data.views || 0,
        };
      });

      // Filter only published journals and apply limit
      const publishedJournals = allJournals
        .filter(journal => journal.status === 'published')
        .slice(0, limit);

      // Calculate stats
      const totalViews = publishedJournals.reduce((sum, journal) => sum + journal.views, 0);
      const averageViews =
        publishedJournals.length > 0 ? Math.round(totalViews / publishedJournals.length) : 0;

      console.log(
        `✅ [Popular] Found ${publishedJournals.length} popular journals. Total views: ${totalViews}`
      );

      return {
        journals: publishedJournals,
        totalViews,
        averageViews,
      };
    },
    CACHE_TTL.MEDIUM // Cache for 5 minutes
  );
};

/**
 * Get journals with highest views in specific category
 */
export const getPopularJournalsByCategory = async (
  category: 'daily-activity' | 'weekly-reflection' | 'project-update',
  limit: number = 5
): Promise<Journal[]> => {
  const cacheKey = `popular_journals_${category}_${limit}`;

  return performanceCache.cachedFetch(
    cacheKey,
    async () => {
      console.log(`🔥 [Popular] Fetching popular journals for category: ${category}`);

      const allJournals = await getAllJournals();

      const categoryJournals = allJournals
        .filter(journal => journal.category === category && journal.status === 'published')
        .sort((a, b) => {
          // Sort by views desc, then by publishDate desc
          if (b.views !== a.views) return b.views - a.views;
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        })
        .slice(0, limit);

      console.log(`✅ [Popular] Found ${categoryJournals.length} popular journals in ${category}`);
      return categoryJournals;
    },
    CACHE_TTL.MEDIUM
  );
};

// ===============================
// EXISTING FUNCTIONS (Updated)
// ===============================

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
            date: toDateIfTimestamp(data.date),
            createdAt: toDateIfTimestamp(data.createdAt),
            updatedAt: toDateIfTimestamp(data.updatedAt),
            views: data.views || 0, // ← NEW: Handle views field
          };
        })
        .filter(
          journal =>
            journal.id !== currentId &&
            journal.category === category &&
            journal.status === 'published'
        )
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

  // Collect unique author IDs
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
      key: 'popularJournals', // ← NEW: Add popular journals to dashboard
      priority: 'high',
      queryFn: async () => {
        const result = await getPopularJournals(5);
        return result.journals;
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
 */
export const invalidateJournalCaches = (journalId?: string) => {
  performanceCache.invalidate(CACHE_KEYS.JOURNALS_ALL);
  performanceCache.invalidate(CACHE_KEYS.POPULAR_JOURNALS); // ← NEW: Invalidate popular journals cache

  if (journalId) {
    performanceCache.invalidate(CACHE_KEYS.JOURNAL_BY_ID(journalId));

    // Invalidate related journals cache juga
    const cachedJournal = performanceCache.get<Journal>(CACHE_KEYS.JOURNAL_BY_ID(journalId));
    if (cachedJournal && cachedJournal.category) {
      performanceCache.invalidate(CACHE_KEYS.RELATED_JOURNALS(journalId, cachedJournal.category));
      // ← NEW: Invalidate category-specific popular journals
      performanceCache.invalidate(`popular_journals_${cachedJournal.category}_5`);
    }
  }

  console.log('🧹 [Journals] Cache invalidated');
};

/**
 * Clear all journal-related caches - for force refresh
 */
export const clearAllJournalCaches = () => {
  console.log('🧹 [Cache] Clearing all journal caches...');

  // Clear all journal caches
  performanceCache.invalidate(CACHE_KEYS.JOURNALS_ALL);
  performanceCache.invalidate(CACHE_KEYS.AUTHORS_ALL);
  performanceCache.invalidate(CACHE_KEYS.POPULAR_JOURNALS);

  // Clear all cached individual journals
  const cacheKeys = performanceCache.getAllKeys();
  cacheKeys.forEach(key => {
    if (
      key.startsWith('journal_') ||
      key.startsWith('author_') ||
      key.startsWith('popular_journals_')
    ) {
      performanceCache.invalidate(key);
    }
  });

  console.log('✅ [Cache] All caches cleared');
};

/**
 * Preload critical data untuk better UX
 */
export const preloadCriticalData = async () => {
  try {
    // Preload dalam background tanpa await
    Promise.all([
      getAllJournals(),
      getAllAuthors(),
      getPopularJournals(5), // ← NEW: Preload popular journals
    ]);

    console.log('🚀 [Journals] Critical data preloading started');
  } catch (error) {
    console.warn('⚠️ [Journals] Preload failed:', error);
  }
};
