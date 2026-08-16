import { client, isSanityConfigured } from "./client";
import {
  activeHomeHeroSlidesQuery,
  activeInstitutionalDocumentsQuery,
  activeProductsQuery,
  activeSuppliersQuery,
  activeTechnicalCatalogsQuery,
  categoriesQuery,
  featuredProductsQuery,
  productBySlugQuery,
} from "./queries";
import type {
  Category,
  HomeHeroSlide,
  InstitutionalDocument,
  Product,
  Supplier,
  TechnicalCatalog,
} from "./types";
async function safelyFetch<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params);
  } catch {
    return null;
  }
}
export const getProducts = () => safelyFetch<Product[]>(activeProductsQuery);
export const getFeaturedProducts = () =>
  safelyFetch<Product[]>(featuredProductsQuery);
export const getCategories = () => safelyFetch<Category[]>(categoriesQuery);
export const getHomeHeroSlides = () =>
  safelyFetch<HomeHeroSlide[]>(activeHomeHeroSlidesQuery);
export const getSuppliers = () => safelyFetch<Supplier[]>(activeSuppliersQuery);
export const getProductBySlug = (slug: string) =>
  safelyFetch<Product>(productBySlugQuery, { slug });
export const getTechnicalCatalogs = () =>
  safelyFetch<TechnicalCatalog[]>(activeTechnicalCatalogsQuery);
export const getInstitutionalDocuments = () =>
  safelyFetch<InstitutionalDocument[]>(activeInstitutionalDocumentsQuery);
