"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Loader2, ArrowRight, ArrowUpRight, Hash, Clock } from "lucide-react";
import { format } from "date-fns";

export interface ArchiveStory {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  authorName: string;
  authorSlug: string;
  publishedAt: string | Date;
  readingTime: number;
  tags: string[];
  viewCount?: number;
}

interface ArticlesArchiveViewProps {
  stories: ArchiveStory[];
  initialQuery?: string;
  initialCategory?: string;
}

const POPULAR_TAGS = [
  "shipping",
  "devices",
  "editorial",
  "writing",
  "typography",
  "reading",
  "teams",
];

export function ArticlesArchiveView({
  stories,
  initialQuery = "",
  initialCategory = "all",
}: ArticlesArchiveViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLength, setSelectedLength] = useState<"any" | "short" | "medium" | "long">("any");
  const [selectedSort, setSelectedSort] = useState<"newest" | "popular" | "relevance">("newest");

  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce query
  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsDebouncing(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard shortcut: "/" or Cmd+K focuses search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const isInput = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
      if ((e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) && !isInput) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: stories.length };
    stories.forEach((s) => {
      const cat = s.category.toLowerCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [stories]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(stories.map((s) => s.category)));
    return [
      { id: "all", name: "All", count: stories.length },
      ...unique.map((name) => ({
        id: name.toLowerCase(),
        name,
        count: categoryCounts[name.toLowerCase()] || 0,
      })),
    ];
  }, [stories, categoryCounts]);

  // Filter and sort stories
  const filteredStories = useMemo(() => {
    let result = [...stories];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (s) => s.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by query (fuzzy substring & tags)
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.excerpt.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.authorName.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by length
    if (selectedLength === "short") {
      result = result.filter((s) => s.readingTime <= 5);
    } else if (selectedLength === "medium") {
      result = result.filter((s) => s.readingTime > 5 && s.readingTime <= 10);
    } else if (selectedLength === "long") {
      result = result.filter((s) => s.readingTime > 10);
    }

    // Sort
    if (selectedSort === "popular") {
      result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (selectedSort === "newest") {
      result.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return result;
  }, [stories, selectedCategory, debouncedQuery, selectedLength, selectedSort]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedLength !== "any" ||
    query.trim().length > 0 ||
    selectedSort !== "newest";

  const handleResetFilters = () => {
    setQuery("");
    setDebouncedQuery("");
    setSelectedCategory("all");
    setSelectedLength("any");
    setSelectedSort("newest");
  };

  return (
    <div className="space-y-8">
      {/* 1. Header (Matches media_1795156272550_1b4ba17b.jpg) */}
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          Search
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Find your next <span className="text-primary italic">good read</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Results update as you type. Search titles, writers, sections, tags, and key points. Typos are fine.
        </p>
      </div>

      {/* 2. Search Input Box */}
      <div className="relative group/search max-w-4xl">
        <label htmlFor="search-input" className="sr-only">
          Search stories
        </label>
        <div className="relative flex items-center">
          {isDebouncing ? (
            <Loader2 className="pointer-events-none absolute left-5 size-5 animate-spin text-primary" />
          ) : (
            <Search className="pointer-events-none absolute left-5 size-5 text-muted-foreground transition-colors group-focus-within/search:text-primary" />
          )}

          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, writers, topics..."
            className="h-14 w-full rounded-full border border-border bg-card pr-28 pl-13 text-base shadow-sm transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <div className="absolute right-3 flex items-center gap-2">
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="grid size-8 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            ) : (
              <kbd className="hidden h-7 items-center rounded-md border bg-muted px-2 font-mono text-xs text-muted-foreground sm:inline-flex">
                ⌘ K
              </kbd>
            )}

            <button
              type="button"
              onClick={() => setDebouncedQuery(query)}
              aria-label="Search"
              className="grid size-10 place-items-center rounded-full bg-foreground text-background transition duration-300 ease-out-expo hover:scale-105"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Popular Tag Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="flex items-center gap-1 font-semibold text-muted-foreground uppercase tracking-wider text-[11px] mr-1">
          <Hash className="size-3 text-primary" />
          Popular
        </span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setQuery(tag);
              setDebouncedQuery(tag);
            }}
            className={`cursor-pointer rounded-full border px-3 py-1 transition duration-200 ${
              query.toLowerCase() === tag.toLowerCase()
                ? "border-primary bg-primary text-primary-foreground font-semibold"
                : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 4. Filter Toolbar (Categories & Length & Sort) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.name} <span className="opacity-70">{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Right Filters: Length & Sort */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Length Filter Pills */}
          <div className="flex items-center rounded-full border border-border bg-card p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setSelectedLength("any")}
              className={`rounded-full px-2.5 py-1 font-medium transition ${
                selectedLength === "any"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Any length
            </button>
            <button
              type="button"
              onClick={() => setSelectedLength("short")}
              className={`rounded-full px-2.5 py-1 font-medium transition ${
                selectedLength === "short"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              &lt; 5 min
            </button>
            <button
              type="button"
              onClick={() => setSelectedLength("medium")}
              className={`rounded-full px-2.5 py-1 font-medium transition ${
                selectedLength === "medium"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              5-10 min
            </button>
            <button
              type="button"
              onClick={() => setSelectedLength("long")}
              className={`rounded-full px-2.5 py-1 font-medium transition ${
                selectedLength === "long"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              10+ min
            </button>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center rounded-full border border-border bg-card p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setSelectedSort("newest")}
              className={`rounded-full px-3 py-1 font-medium transition ${
                selectedSort === "newest"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Newest
            </button>
            <button
              type="button"
              onClick={() => setSelectedSort("popular")}
              className={`rounded-full px-3 py-1 font-medium transition ${
                selectedSort === "popular"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Most read
            </button>
          </div>
        </div>
      </div>

      {/* 5. Results Counter and Reset */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">
            {filteredStories.length}
          </span>{" "}
          {filteredStories.length === 1 ? "story" : "stories"} in this section
          {debouncedQuery.trim() && (
            <span>
              {" "}
              matching &ldquo;<span className="text-primary font-medium">{debouncedQuery}</span>&rdquo;
            </span>
          )}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="font-medium text-primary hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* 6. Story Cards Grid (3 Columns matching media_1795156272550_1b4ba17b.jpg) */}
      {filteredStories.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => {
            const formattedDate = story.publishedAt
              ? format(new Date(story.publishedAt), "d MMM yyyy")
              : "";

            return (
              <article
                key={story.id}
                className="group flex flex-col justify-between overflow-hidden rounded-[1.4rem] border border-border bg-card p-3 transition duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-32px_rgba(30,20,10,0.45)]"
              >
                <div>
                  {/* Aspect Cover Image */}
                  <Link
                    href={`/article/${story.slug}`}
                    className="relative block aspect-4/3 overflow-hidden rounded-2xl bg-muted"
                  >
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover transition duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    />
                    <span className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-neutral-900 uppercase backdrop-blur-md">
                      {story.category}
                    </span>
                    <span className="absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-neutral-950 opacity-0 shadow-lg transition duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>

                  {/* Meta: Category · Reading Time · Date */}
                  <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-semibold text-primary uppercase tracking-wider">
                      {story.category}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {story.readingTime} min
                    </span>
                    {formattedDate && (
                      <>
                        <span>·</span>
                        <span>{formattedDate}</span>
                      </>
                    )}
                  </div>

                  {/* Title with link-sweep */}
                  <h2 className="mt-2 text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                    <Link href={`/article/${story.slug}`} className="link-sweep">
                      {story.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {story.excerpt}
                  </p>
                </div>

                {/* Footer Byline */}
                <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{story.authorName}</span>
                  <Link
                    href={`/article/${story.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                  >
                    Read
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <p className="text-base font-semibold text-foreground">
            No stories found matching your criteria.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try searching for a different keyword or resetting your filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:brightness-110"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
