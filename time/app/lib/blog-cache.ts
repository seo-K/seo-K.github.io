import fs from "node:fs/promises";
import path from "node:path";

export type CachedBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  sourceLink: string;
  pubDate: string;
};

export async function getCachedBlogPosts(): Promise<CachedBlogPost[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "blog-cache.json");
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as CachedBlogPost[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
