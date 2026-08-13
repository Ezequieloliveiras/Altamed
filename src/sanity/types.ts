export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}
export interface ProductSpecification {
  key: string;
  value: string;
}
export interface SanityImage {
  asset?: { _ref?: string; url?: string };
  alt?: string;
}
export interface TechnicalCatalog {
  _id: string;
  title: string;
  slug: string;
  specialty: string;
  description?: string;
  coverImage?: SanityImage;
  pdfUrl?: string;
  active?: boolean;
  order?: number;
}
export interface Product {
  _id: string;
  name: string;
  slug: string;
  code?: string;
  brand?: string;
  shortDescription?: string;
  description?: string;
  images?: SanityImage[];
  specifications?: ProductSpecification[];
  featured?: boolean;
  active?: boolean;
  order?: number;
  category?: Category;
}
export interface Supplier {
  _id: string;
  name: string;
  logo?: SanityImage;
  alt?: string;
  url?: string;
  order?: number;
  active?: boolean;
}
