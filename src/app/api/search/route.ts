import { NextRequest, NextResponse } from "next/server";
import { fuzzySearch, SearchableItem } from "@/lib/search";
import { getPublishedArticles, ArticlePreview } from "@/lib/articles";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ results: [], query: "" });
  }

  try {
    const articles: ArticlePreview[] = await getPublishedArticles();

    const searchable: SearchableItem[] = articles.map((a: ArticlePreview) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      category: a.category,
      tags: a.tags,
      author: a.authorName,
      readingTime: a.readingTime,
    }));

    const results = fuzzySearch(q, searchable, 8);

    return NextResponse.json({
      query: q,
      results: results.map((r) => r.item),
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ query: q, results: [] });
  }
}
