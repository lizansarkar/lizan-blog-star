import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Sparkles } from "lucide-react";
import { fuzzySearch, SearchableItem } from "@/lib/search";
import { getPublishedArticles, ArticlePreview } from "@/lib/articles";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || "";

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

  const results = q.trim() ? fuzzySearch(q, searchable, 20) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to issue
        </Link>
        <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {q.trim() ? (
            <>
              Search results for{" "}
              <span className="text-primary">&quot;{q}&quot;</span>
            </>
          ) : (
            "Archive Search"
          )}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Typo-tolerant search across all essays, dispatches, deep-dives and
          quiz collections.
        </p>
      </div>

      {/* Search Input Box */}
      <form method="GET" action="/search" className="mb-10">
        <div className="flex gap-2 max-w-xl">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search keywords, topics, technologies..."
            className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="rounded-xl bg-foreground px-5 py-2.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results List */}
      {q.trim() ? (
        results.length > 0 ? (
          <div className="space-y-6">
            <p className="text-xs font-medium text-muted-foreground">
              Found {results.length} relevant story{" "}
              {results.length === 1 ? "" : "matches"}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {results.map(({ item }) => (
                <Link
                  key={item.id}
                  href={`/article/${item.slug}`}
                  className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {item.category}
                      </span>
                      {item.readingTime && (
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          · <Clock className="h-3 w-3" /> {item.readingTime} min
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    {item.excerpt && (
                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                    <span>By {item.author}</span>
                    <span className="text-primary font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read story →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-base font-semibold text-foreground">
              No matches found
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any stories matching your query. Try
              searching for &quot;systems&quot;, &quot;SQLite&quot;, or ask our
              AI assistant.
            </p>
            <Link
              href="/ask"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" /> Ask Lizan AI
            </Link>
          </div>
        )
      ) : (
        <div className="rounded-2xl border border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
          Enter a search term above or try searching by category in our{" "}
          <Link
            href="/articles"
            className="text-primary font-medium hover:underline"
          >
            full archive
          </Link>
          .
        </div>
      )}
    </div>
  );
}
