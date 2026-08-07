import { createClient } from "next-sanity";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const isSanityConfigured = Boolean(projectId);
export const client = createClient({
  projectId: projectId || "missing-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  useCdn: true,
});
