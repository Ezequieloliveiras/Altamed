import type { MetadataRoute } from "next";
import { client, isSanityConfigured } from "@/sanity/client";

export const revalidate = 60;

const siteUrl = "https://www.altamedtecnologia.com.br";

type SitemapProduct = {
  slug: string;
  _updatedAt?: string;
};

const productsSitemapQuery = `*[
  _type == "product" &&
  ativo == true &&
  defined(slug.current) &&
  !(_id in path("drafts.**"))
] {
  "slug": slug.current,
  _updatedAt
}`;

async function getProductsForSitemap(): Promise<SitemapProduct[]> {
  if (!isSanityConfigured) return [];

  try {
    return await client.fetch<SitemapProduct[]>(productsSitemapQuery);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/quemsomos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/produtos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contato`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/catalogos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/licencas-e-certificacoes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const seenProductSlugs = new Set<string>();
  const productPages: MetadataRoute.Sitemap = (await getProductsForSitemap())
    .filter((product) => {
      if (!product.slug || seenProductSlugs.has(product.slug)) return false;
      seenProductSlugs.add(product.slug);
      return true;
    })
    .map((product) => ({
      url: `${siteUrl}/produtos/${product.slug}`,
      lastModified: product._updatedAt ? new Date(product._updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticPages, ...productPages];
}
