import { format } from "date-fns";
import { getPublishedArticles, ArticlePreview } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import {
  ArticlesArchiveView,
  ArchiveArticle,
} from "@/components/articles-archive-view";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || "";

  return pageMetadata({
    title: q ? `Search: "${q}"` : "Archive Search",
    description: "Search across essays, dispatches, deep-dives and quiz collections.",
    path: "/search",
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || "";

  const articles: ArticlePreview[] = await getPublishedArticles();

  const formattedArticles: ArchiveArticle[] = articles.map(
    (a: ArticlePreview, idx: number) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      category: a.category,
      coverImage:
        a.coverImage ||
        "https://images.unsplash.com/photo-1759314710754-bb3e11fbaa7b?auto=format&fit=crop&w=1200&q=80",
      authorName:
        idx % 2 === 0 ? "Jules Berger" : idx === 1 ? "Ada Quinn" : "Lizan Sarkar",
      readingTime: a.readingTime,
      publishedDate: format(new Date(a.publishedAt || Date.now()), "d MMM yyyy"),
      tags: a.tags,
    })
  );

  return <ArticlesArchiveView initialArticles={formattedArticles} initialQuery={q} />;
}
