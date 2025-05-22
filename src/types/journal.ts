// src/lib/types/journal.ts
export interface Journal {
  id: string;
  title: string;
  content: string; // Rich text content
  summary: string; // Short preview text
  date: Date; // Date of the activity
  publishDate: Date;
  category: 'daily-activity' | 'weekly-reflection' | 'project-update';
  location?: string; // Where activity took place
  authorId: string;
  authorName: string;
  authorImage?: string;
  media: {
    url: string;
    caption?: string;
  }[];
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

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
