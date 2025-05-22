// src/lib/types/journal.ts
export interface Journal {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: Date;
  publishDate: Date;
  category: 'daily-activity' | 'weekly-reflection' | 'project-update';
  location?: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  media: Array<{
    url: string;
    caption?: string;
  }>;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: string;
  name: string;
  position: string;
  university: string;
  image?: string;
  bio: string;
}

export interface JournalFilterOptions {
  category?: 'daily-activity' | 'weekly-reflection' | 'project-update';
  searchQuery?: string;
  authorId?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}
