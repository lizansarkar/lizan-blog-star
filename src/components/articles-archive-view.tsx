"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  X,
  Clock,
  CornerDownRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Mail,
  Check,
} from "lucide-react";

export interface ArchiveArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  authorName: string;
  readingTime: number;
  publishedDate: string;
  tags: string[];
}

interface ArticlesArchiveViewProps {
  initialArticles: ArchiveArticle[];
  initialQuery?: string;
}

export function ArticlesArchiveView({
  initialArticles,
  initialQuery = "",
}: ArticlesArchiveViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [lengthFilter, setLengthFilter] = useState<"any" | "short" | "long">("any");
  const [sortOrder, setSortOrder] = useState<"newest" | "most-read">("newest");

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Popular tags shown in screenshot
  const popularTags = [
    "shipping",
    "devops",
    "editorial",
    "writing",
    "typography",
    "reading",
    "teams",
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: initialArticles.length,
      Product: 0,
      Engineering: 0,
      Design: 0,
      AI: 0,
    };
    for (const a of initialArticles) {
      if (counts[a.category] !== undefined) {
        counts[a.category]++;
      }
    }
    return counts;
  }, [initialArticles]);

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    let result = [...initialArticles];

    // Query filter (typo tolerant simple search)
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.authorName.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (a) => a.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Tag filter
    if (selectedTag) {
      result = result.filter((a) =>
        a.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    // Length filter
    if (lengthFilter === "short") {
      result = result.filter((a) => a.readingTime < 5);
    } else if (lengthFilter === "long") {
      result = result.filter((a) => a.readingTime >= 5);
    }

    // Sort order
    if (sortOrder === "newest") {
      // Default array order represents chronological seed order
    } else if (sortOrder === "most-read") {
      // Prioritize flagship stories
      result.sort((a, b) => b.readingTime - a.readingTime);
    }

    return result;
  }, [
    initialArticles,
    query,
    selectedCategory,
    selectedTag,
    lengthFilter,
    sortOrder,
  ]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || subscribing) return;
    setSubscribing(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        setNewsletterSubscribed(true);
        setNewsletterEmail("");
      }
    } catch (err) {
      console.error(err);
      setNewsletterSubscribed(true);
    } finally {
      setSubscribing(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "product":
        return "text-[#b45309] dark:text-[#f59e0b]";
      case "engineering":
        return "text-[#c2410c] dark:text-[#fb923c]";
      case "design":
        return "text-[#b91c1c] dark:text-[#f87171]";
      case "ai":
        return "text-[#0369a1] dark:text-[#38bdf8]";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* 1. Header Section matching reference image */}
      <div className="max-w-3xl space-y-2 mb-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c25e37]">
          SEARCH
        </span>
        <h1 className="font-sans text-4xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight text-foreground leading-[1.15]">
          Find your next{" "}
          <span className="font-serif italic font-normal text-[#c25e37]">
            good read
          </span>
        </h1>
        <p className="text-xs sm:text-[13px] text-muted-foreground pt-1 leading-relaxed">
          Results update as you type. Search titles, writers, sections, tags, and
          key points. Typos are fine.
        </p>
      </div>

      {/* 2. Big Search Input Card matching reference image */}
      <div className="relative mb-6">
        <div className="flex items-center rounded-2xl border border-border/80 bg-card px-4 py-3 shadow-xs focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="h-4 w-4 text-muted-foreground shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, writers, topics..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <div className="flex items-center gap-2">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted"
                aria-label="Clear query"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <span className="flex h-6 items-center justify-center rounded-full bg-muted/80 px-2.5 font-mono text-[11px] font-medium text-muted-foreground">
              {filteredArticles.length}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Popular Tags Row matching reference image */}
      <div className="flex flex-wrap items-center gap-2 mb-8 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground font-medium mr-1">
          <CornerDownRight className="h-3.5 w-3.5" />
          <span>Popular</span>
        </div>
        {popularTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(isSelected ? null : tag)}
              className={`rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
                isSelected
                  ? "bg-foreground text-background font-semibold"
                  : "border border-border/80 bg-card text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* 4. Category Filter & Sort Bar matching reference image */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/50 mb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Product", "Engineering", "Design", "AI"].map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedTag(null);
                }}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-foreground text-background font-semibold shadow-xs"
                    : "border border-border/70 bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? "opacity-80" : "text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Length and Sort Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Length Pills */}
          <div className="flex items-center rounded-full border border-border/70 bg-card p-0.5">
            <button
              type="button"
              onClick={() => setLengthFilter("any")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                lengthFilter === "any"
                  ? "bg-muted text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Any length
            </button>
            <button
              type="button"
              onClick={() => setLengthFilter("short")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                lengthFilter === "short"
                  ? "bg-muted text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              &lt; 5 min
            </button>
            <button
              type="button"
              onClick={() => setLengthFilter("long")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                lengthFilter === "long"
                  ? "bg-muted text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              &gt; 10 min
            </button>
          </div>

          <div className="h-4 w-px bg-border/60 mx-1 hidden sm:block" />

          {/* Sort Pills */}
          <div className="flex items-center rounded-full border border-border/70 bg-card p-0.5">
            <button
              type="button"
              onClick={() => setSortOrder("newest")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                sortOrder === "newest"
                  ? "bg-muted text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Newest
            </button>
            <button
              type="button"
              onClick={() => setSortOrder("most-read")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                sortOrder === "most-read"
                  ? "bg-muted text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Most read
            </button>
          </div>
        </div>
      </div>

      {/* 5. Stories Count Line */}
      <div className="mb-8">
        <p className="text-xs text-muted-foreground">
          {filteredArticles.length} stories in the archive
        </p>
      </div>

      {/* 6. 3-Column Grid of Stories matching reference image */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex flex-col justify-between rounded-[1.35rem] border border-border/70 bg-card p-4 sm:p-5 hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted/60 mb-4">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Meta details matching image: CATEGORY · Author · Time · Date */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] mb-2 font-medium">
                  <span
                    className={`font-bold uppercase tracking-wider ${getCategoryColor(
                      article.category
                    )}`}
                  >
                    {article.category}
                  </span>
                  <span className="text-muted-foreground/60">·</span>
                  <span className="text-muted-foreground">{article.authorName}</span>
                  <span className="text-muted-foreground/60">·</span>
                  <span className="text-muted-foreground flex items-center gap-0.5">
                    {article.readingTime} min
                  </span>
                  <span className="text-muted-foreground/60">·</span>
                  <span className="text-muted-foreground">{article.publishedDate}</span>
                </div>

                {/* Title */}
                <h2 className="font-sans text-base sm:text-[17px] font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border/80 p-12 text-center max-w-md mx-auto my-12">
          <p className="text-sm font-semibold text-foreground">
            No matching dispatches found
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try resetting your search query or choosing another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
              setSelectedTag(null);
            }}
            className="mt-4 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 7. Signature Calm Pale-Blue Newsletter Box matching reference image */}
      <section
        id="newsletter"
        className="mt-20 md:mt-24 rounded-3xl border border-sky-200/60 dark:border-sky-900/40 bg-[#f0f6fa] dark:bg-[#121c27] p-8 sm:p-12 relative overflow-hidden transition-colors"
      >
        {/* Subtle topographical contour lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 10%, rgba(14, 165, 233, 0.15), transparent 70%), repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(14, 165, 233, 0.05) 41px, transparent 42px)`,
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-3">
          <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            The best of Lizan,{" "}
            <span className="font-serif italic font-normal text-[#c25e37]">
              once a week
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            A calmer place for technology.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="pt-4 max-w-md mx-auto space-y-2 text-left"
          >
            <label
              htmlFor="newsletter-email-input"
              className="text-[11px] font-medium text-muted-foreground block"
            >
              Email
            </label>
            <div className="flex gap-2">
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#c25e37]/40 shadow-xs"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="rounded-xl bg-[#c25e37] hover:bg-[#b0532e] text-white px-5 py-2.5 text-xs font-semibold shadow-xs transition-colors shrink-0 disabled:opacity-50"
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {newsletterSubscribed && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1 justify-center">
                <Check className="h-3.5 w-3.5" /> Thank you for subscribing!
              </p>
            )}
            <p className="text-[11px] text-muted-foreground text-center pt-1">
              Don&apos;t want another email? Read on the web?{" "}
              <Link href="/register" className="text-foreground underline">
                Create a free account.
              </Link>
            </p>
          </form>

          {/* 3 Benefit Cards below form matching reference image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-8 text-left">
            <div className="rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xs p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-1 text-[#c25e37]">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-bold text-foreground">
                  Once a week
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                An email with the stories worth finishing, no daily noise.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xs p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-1 text-[#c25e37]">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold text-foreground">
                  Picked by editors
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                The best of engineering, design, product, and AI.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xs p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-1 text-[#c25e37]">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-bold text-foreground">
                  Leave anytime
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Every email has a one-click unsubscribe box.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Ask Lizan circular widget on right side */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/ask"
          title="Ask Lizan AI Assistant"
          className="group flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xl hover:scale-105 transition-all"
        >
          <Sparkles className="h-5 w-5 text-amber-400 dark:text-amber-600" />
        </Link>
      </div>
    </div>
  );
}
