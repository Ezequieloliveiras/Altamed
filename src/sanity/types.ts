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
export interface AboutGalleryItem {
  _key?: string;
  image?: SanityImage;
  title?: string;
  description?: string;
  order?: number;
}
export interface AboutPage {
  title?: string;
  eyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: SanityImage;
  aboutTitle?: string;
  aboutContent?: string;
  aboutImage?: SanityImage;
  mission?: string;
  vision?: string;
  values?: string;
  differentials?: { _key?: string; title?: string; description?: string }[];
  gallery?: AboutGalleryItem[];
  stats?: {
    _key?: string;
    prefix?: string;
    value?: number;
    suffix?: string;
    title?: string;
    description?: string;
  }[];
  areas?: { _key?: string; title?: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
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
export interface HomeHeroSlide {
  _id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  desktopImage?: SanityImage;
  mobileImage?: SanityImage;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  active?: boolean;
  order?: number;
}
export interface InstitutionalDocument {
  _id: string;
  title: string;
  acronym?: string;
  category: string;
  description?: string;
  updatedAt?: string;
  pdfUrl?: string;
  pdfOriginalFilename?: string;
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
