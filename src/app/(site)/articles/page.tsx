import { format } from "date-fns";
import { getPublishedArticles, ArticlePreview } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import {
  ArticlesArchiveView,
  ArchiveArticle,
} from "@/components/articles-archive-view";

export const metadata = pageMetadata({
  title: "Search & All Dispatches",
  description:
    "Browse the complete archive of essays and dispatches across engineering, design, product, and AI.",
  path: "/articles",
});

export default async function ArticlesIndexPage() {
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

  return <ArticlesArchiveView initialArticles={formattedArticles} />;
}
