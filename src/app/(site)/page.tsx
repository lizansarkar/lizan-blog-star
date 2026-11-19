import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Sparkles, ArrowRight, BookOpen, Clock, Tag, Flame } from "lucide-react";
import { getFeaturedArticle, getPublishedArticles } from "@/lib/articles";
import { ArchiveField } from "@/components/archive-field";

export default async function HomePage() {
  const [featured, articles] = await Promise.all([
    getFeaturedArticle(),
    getPublishedArticles(),
  ]);

  const recentArticles = articles.filter((a) => a.id !== featured.id);

  return (
    <div className="relative overflow-hidden pb-16">
      {/* Editorial Issue Header */}
      <section className="border-b border-border/70 bg-card/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-widest">
              Issue #01 · The Inaugural Edition
            </div>
            <h1 className="mt-3 font-sans text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
              Lizan Blog Star
            </h1>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground max-w-2xl">
              A calm publication for people who build software, shape digital products, and care how the work reads.
            </p>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {format(new Date(), "MMMM yyyy")} · Edited by Lizan Sarkar
          </div>
        </div>
      </section>

      {/* Featured Lead Story */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Story Text */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10">
              <div>
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                    {featured.category}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readingTime} min read
                  </span>
                </div>

                <h2 className="mt-4 font-sans text-2xl sm:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  <Link href={`/article/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>

                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-4">
                <div className="text-xs text-muted-foreground">
                  By <span className="font-semibold text-foreground">{featured.authorName}</span> · {format(featured.publishedAt, "MMM d, yyyy")}
                </div>
                <Link
                  href={`/article/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform"
                >
                  <span>Read story</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Story Cover Image */}
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-muted overflow-hidden">
              {featured.coverImage ? (
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/60 text-muted-foreground">
                  <BookOpen className="h-12 w-12" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ask Lizan Ambient Feature Banner */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-background p-8 sm:p-10 shadow-sm">
          <ArchiveField />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Lizan · AI Assistant</span>
            </div>
            <h2 className="mt-4 font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Explore the entire archive with Gemini
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Ask anything about our published essays, architecture decisions, or engineering practices. Lizan&apos;s assistant searches the publication and answers with citations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/ask"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-95 transition-opacity"
              >
                <span>Launch Assistant</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex h-10 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                Browse All Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Stories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <h3 className="font-sans text-2xl font-bold tracking-tight text-foreground">
              Recent Dispatches
            </h3>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {recentArticles.length} stories available
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recentArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div>
                {/* Story Cover */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                      <BookOpen className="h-8 w-8" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-semibold text-foreground uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <h4 className="mt-4 font-sans text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/article/${article.slug}`}>
                    {article.title}
                  </Link>
                </h4>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              {/* Meta */}
              <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{article.authorName}</span>
                <span>{article.readingTime} min read</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
