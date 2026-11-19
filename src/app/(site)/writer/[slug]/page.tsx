import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, MapPin, Globe, UserCheck } from "lucide-react";
import { getPublishedArticles, ArticlePreview } from "@/lib/articles";

interface WriterPageProps {
  params: Promise<{ slug: string }>;
}

export default async function WriterPage({ params }: WriterPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();

  const allArticles: ArticlePreview[] = await getPublishedArticles();

  // Filter articles by author
  const articles = allArticles.filter((a: ArticlePreview) => {
    const authorSlug = a.authorName.toLowerCase().replace(/\s+/g, "-");
    return authorSlug === decodedSlug || a.id === decodedSlug;
  });

  const isLizan = decodedSlug.includes("lizan") || articles.length === 0;
  const authorName = isLizan ? "Lizan Sarkar" : articles[0]?.authorName || "Lizan Sarkar";
  const authorRole = isLizan ? "Founder & Editor-in-Chief" : "Staff Columnist";
  const authorBio = isLizan
    ? "Software architect and writer exploring distributed systems, local-first computing, and generative reasoning pipelines. Creator of Lizan Blog Star."
    : "Writing on emerging software architectures, design systems, and human-computer symbiosis.";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Back button */}
      <Link
        href="/articles"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to archive
      </Link>

      {/* Writer Masthead Card */}
      <div className="rounded-3xl border border-border bg-card p-6 md:p-10 mb-12 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-foreground text-background font-bold text-2xl md:text-3xl shadow-inner">
              {authorName.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {authorRole}
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <h1 className="font-sans text-2xl md:text-4xl font-bold text-foreground">
                {authorName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Worldwide
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" /> lizan.dev
                </span>
                <span>·</span>
                <span>{articles.length || 14} published stories</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              className="flex-1 md:flex-none rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              <UserCheck className="h-3.5 w-3.5" /> Follow Author
            </button>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground max-w-2xl leading-relaxed">
          {authorBio}
        </p>
      </div>

      {/* Dispatches by this author */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-sans text-xl font-bold text-foreground">
            Published Stories
          </h2>
          <span className="text-xs text-muted-foreground">
            {articles.length || allArticles.length} pieces
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(articles.length > 0 ? articles : allArticles).map((article: ArticlePreview) => (
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
                <span>Dispatch</span>
                <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform">
                  Read story →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
