import { notFound } from "next/navigation";
import { getPublishedArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { ArticleReadingView } from "@/components/article-reading-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 3 fallback related articles matching media_1795182596112_e5006058.jpg
const defaultRelated = [
  {
    id: "rel-1",
    title: "The case for boring deployment pipelines",
    slug: "the-case-for-boring-deployment-pipelines",
    excerpt: "The most expensive pipeline is the one only one person can explain on a Friday.",
    category: "Engineering",
    coverImage: "https://images.unsplash.com/photo-1565900290201-6116cd97a6b8?auto=format&fit=crop&w=2400&q=80",
    authorName: "Ada Quinn",
    publishedAt: "2026-11-04T06:53:23.461Z",
    readingTime: 8,
  },
  {
    id: "rel-2",
    title: "The quiet return of local-first software",
    slug: "the-quiet-return-of-local-first-software",
    excerpt: "After a decade of renting every workflow, teams are keeping the source of truth on the machine again.",
    category: "Engineering",
    coverImage: "https://images.unsplash.com/photo-1779444480529-7df3c5645991?auto=format&fit=crop&w=2400&q=80",
    authorName: "John Berger",
    publishedAt: "2026-11-10T06:53:27.143Z",
    readingTime: 5,
  },
  {
    id: "rel-3",
    title: "A quieter model beside the cursor",
    slug: "a-quieter-model-beside-the-cursor",
    excerpt: "The useful assistant got small enough to sit in the margins.",
    category: "AI",
    coverImage: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?auto=format&fit=crop&w=2400&q=80",
    authorName: "Ada Quinn",
    publishedAt: "2026-11-03T06:53:44.467Z",
    readingTime: 5,
  },
];

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const articles = await getPublishedArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return pageMetadata({
    title: `${article.title} · Lizan`,
    description: article.excerpt,
    path: `/article/${slug}`,
    image: article.coverImage || undefined,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articles = await getPublishedArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles excluding current
  const related = articles
    .filter((a) => a.slug !== slug)
    .map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      category: a.category,
      coverImage: a.coverImage || "https://images.unsplash.com/photo-1565900290201-6116cd97a6b8?auto=format&fit=crop&w=2400&q=80",
      authorName: a.authorName,
      publishedAt: a.publishedAt,
      readingTime: a.readingTime,
    }));

  const finalRelated = related.length >= 3 ? related : defaultRelated;

  return (
    <div className="pb-16 sm:pb-24">
      <ArticleReadingView
        article={article}
        relatedArticles={finalRelated}
      />
    </div>
  );
}
