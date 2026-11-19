import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Tag as TagIcon } from "lucide-react";
import { getPublishedArticles, ArticlePreview } from "@/lib/articles";

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();

  const allArticles: ArticlePreview[] = await getPublishedArticles();

  // Filter articles that have this tag
  const articles = allArticles.filter((a: ArticlePreview) => {
    return a.tags.some(
      (t) =>
        t.toLowerCase() === decodedSlug ||
        t.toLowerCase().replace(/\s+/g, "-") === decodedSlug
    );
  });

  const displayTagName = decodedSlug.replace(/-/g, " ");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10 max-w-3xl">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All stories
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <TagIcon className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Topic Tag
          </span>
          <span className="text-xs text-muted-foreground">· {articles.length} dispatches</span>
        </div>
        <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-foreground capitalize">
          #{displayTagName}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          All articles, essays, and notes indexed under the topic #{displayTagName}.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: ArticlePreview) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <div>
                {article.coverImage && (
                  <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  <span className="text-primary font-semibold">{article.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {article.readingTime}m read
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{article.authorName}</span>
                <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          No stories found with the tag #{displayTagName}.
        </div>
      )}
    </div>
  );
}
