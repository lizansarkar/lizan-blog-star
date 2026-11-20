import { getPublishedArticles, type ArticlePreview } from "@/lib/articles";
import { ArticlesArchiveView, type ArchiveStory } from "@/components/articles-archive-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "All Articles",
  description: "Browse the complete archive of essays and dispatches across engineering, design, product, and AI.",
  path: "/articles",
});

export default async function ArticlesIndexPage() {
  const articles: ArticlePreview[] = await getPublishedArticles();

  const stories: ArchiveStory[] = articles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    category: a.category,
    coverImage: a.coverImage || "https://images.unsplash.com/photo-1759314710754-bb3e11fbaa7b?auto=format&fit=crop&w=2400&q=80",
    authorName: a.authorName,
    authorSlug: a.authorName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    publishedAt: a.publishedAt,
    readingTime: a.readingTime || 5,
    tags: a.tags || [],
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <ArticlesArchiveView stories={stories} />
    </div>
  );
}
