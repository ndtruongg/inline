export interface IPost {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  feature_image: string;
  slug: string;
  is_featured: boolean;
  is_published: boolean;
  category_id: number;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}
