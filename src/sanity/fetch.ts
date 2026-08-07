import { client, isSanityConfigured } from "./client";
import {
  activeProductsQuery,
  categoriesQuery,
  featuredProductsQuery,
  productBySlugQuery,
} from "./queries";
import type { Category, Product } from "./types";
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
export const getProductBySlug = (slug: string) =>
  safelyFetch<Product>(productBySlugQuery, { slug });
