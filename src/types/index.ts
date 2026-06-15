export interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  description?: string;
  isFeatured: boolean;
  isPublished: boolean;
  orderIndex: number;
}

export interface Album {
  id: string;
  title: string;
  slug: string;
  description?: string;
  isPublished: boolean;
  orderIndex: number;
  coverPhoto?: Photo;
}

export interface SiteConfigEntry {
  key: string;
  value: string;
}
