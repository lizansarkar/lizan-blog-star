import { MetadataRoute } from "next";
import { getPublishedArticles, ArticlePreview } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const articles: ArticlePreview[] = await getPublishedArticles();

  const staticPages = [
    "",
    "/articles",
    "/about",
    "/ask",
    "/privacy",
    "/terms",
    "/section/systems",
    "/section/intelligence",
    "/section/craft",
    "/section/culture",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const articleEntries = articles.map((a: ArticlePreview) => ({
    url: `${baseUrl}/article/${a.slug}`,
    lastModified: new Date(a.updatedAt || a.publishedAt || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...articleEntries];
}
