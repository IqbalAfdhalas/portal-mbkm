// src/data/gallery/galeryData.ts

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  caption?: string;
  category: string;
  year: string;
  date: string;
}

// Helper functions for filtering and organizing data
export const getCategories = (images: GalleryImage[]): string[] => {
  const categories = Array.from(new Set(images.map(image => image.category)));
  return ['all', ...categories.sort()];
};

export const getYears = (images: GalleryImage[]): string[] => {
  const years = Array.from(new Set(images.map(image => image.year)));
  return ['all', ...years.sort().reverse()];
};

export const filterImages = (
  images: GalleryImage[],
  category: string = 'all',
  year: string = 'all',
  searchQuery: string = ''
): GalleryImage[] => {
  return images.filter(image => {
    const matchesCategory = category === 'all' || image.category === category;
    const matchesYear = year === 'all' || image.year === year;
    const matchesSearch =
      searchQuery === '' ||
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (image.caption && image.caption.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesYear && matchesSearch;
  });
};

export const getImageById = (images: GalleryImage[], id: string): GalleryImage | undefined => {
  return images.find(image => image.id === id);
};

export const getImagesByCategory = (images: GalleryImage[], category: string): GalleryImage[] => {
  return images.filter(image => image.category === category);
};

export const getImagesByYear = (images: GalleryImage[], year: string): GalleryImage[] => {
  return images.filter(image => image.year === year);
};
