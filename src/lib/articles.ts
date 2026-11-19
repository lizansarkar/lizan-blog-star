import { prisma } from "@/lib/prisma";
import { stories as seedStories } from "../../prisma/seed";

export interface ArticlePreview {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage?: string | null;
  publishedAt: Date;
  updatedAt?: Date;
  authorName: string;
  authorAvatar?: string | null;
  readingTime: number;
  tags: string[];
}

export const seedArticles: ArticlePreview[] = seedStories.map((story, i) => ({
  id: `seed-${i + 1}`,
  title: story.title,
  slug: story.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  excerpt: story.excerpt,
  category: story.category,
  coverImage: story.cover,
  publishedAt: new Date(Date.now() - story.daysAgo * 86400000),
  updatedAt: new Date(Date.now() - story.daysAgo * 86400000),
  authorName: i === 0 ? "Lizan Sarkar" : "Jules Berger",
  authorAvatar: null,
  readingTime: 3 + (i % 4),
  tags: story.tags,
}));

export async function getFeaturedArticle(): Promise<ArticlePreview> {
  try {
    const article = await prisma.article.findFirst({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
      },
    });

    if (article) {
      return {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        category: article.category.name,
        coverImage: article.coverImage,
        publishedAt: article.publishedAt || article.createdAt,
        updatedAt: article.updatedAt,
        authorName: article.author.name,
        authorAvatar: article.author.avatar,
        readingTime: 4,
        tags: article.tags.map((t) => t.tag.name),
      };
    }
  } catch {
    // Database fallback
  }

  return seedArticles[0];
}

export async function getPublishedArticles(): Promise<ArticlePreview[]> {
  try {
    const articles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
      },
    });

    if (articles.length > 0) {
      return articles.map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        category: article.category.name,
        coverImage: article.coverImage,
        publishedAt: article.publishedAt || article.createdAt,
        updatedAt: article.updatedAt,
        authorName: article.author.name,
        authorAvatar: article.author.avatar,
        readingTime: 4,
        tags: article.tags.map((t) => t.tag.name),
      }));
    }
  } catch {
    // Database fallback
  }

  return seedArticles;
}
