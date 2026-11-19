import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Rss } from "lucide-react";
import { getPublishedArticles, ArticlePreview } from "@/lib/articles";

interface SectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { slug } = await params;

  const allArticles: ArticlePreview[] = await getPublishedArticles();

  // Filter articles matching section slug
  const articles = allArticles.filter(
    (a: ArticlePreview) => a.category.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  const categoryName =
    articles[0]?.category ||
    slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

  const sectionDescriptions: Record<string, string> = {
    systems: "Infrastructures, distributed architectures, databases, and low-level software engineering.",
    intelligence: "Artificial intelligence, machine learning agents, reasoning engines, and modern developer tooling.",
    craft: "Code craftsmanship, software architecture patterns, and the art of engineering timeless systems.",
    culture: "The sociological, economic, and human factors shaping software teams and open source communities.",
    engineering: "Deployments, release pipelines, cloud infrastructure, and resilient system operations.",
    design: "Editorial layout, typography, interaction design, and calming user interfaces for dense information.",
    product: "Roadmaps, cost models, unit economics, and building features people actually finish.",
  };

  const description =
    sectionDescriptions[slug.toLowerCase()] ||
    `Curated dispatches and deep dives on ${categoryName.toLowerCase()} written by our editorial desk.`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10 max-w-3xl">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All sections
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Section Dispatch
          </span>
          <span className="text-xs text-muted-foreground">· {articles.length} stories</span>
        </div>
        <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          {categoryName}
        </h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Section actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90 transition-opacity"
          >
            Follow Section
          </button>
          <Link
            href="/feed.xml"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Rss className="h-3.5 w-3.5 text-primary" /> RSS Feed
          </Link>
        </div>
      </div>

      {/* Stories Grid */}
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
                  <span className="text-primary font-semibold">{categoryName}</span>
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
          No published stories found under this section yet.
        </div>
      )}
    </div>
  );
}
