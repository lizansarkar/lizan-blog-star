"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowUpRight, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export interface BrowserStory {
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
  featured?: boolean;
}

interface ArticlesBrowserProps {
  stories: BrowserStory[];
  initialCategory?: string;
  initialTag?: string;
  initialQuery?: string;
}

export function ArticlesBrowser({
  stories,
  initialCategory = "all",
  initialTag = "all",
  initialQuery = "",
}: ArticlesBrowserProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "oldest">("newest");

  // All categories
  const categories = useMemo(() => {
    const list = Array.from(new Set(stories.map((s) => s.category)));
    return ["All sections", ...list];
  }, [stories]);

  // All tags
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    stories.forEach((s) => s.tags?.forEach((t) => tagSet.add(t.toLowerCase())));
    return ["All tags", ...Array.from(tagSet).sort()];
  }, [stories]);

  // Filtered stories
  const filteredStories = useMemo(() => {
    let list = [...stories];

    // Search query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.excerpt.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.authorName.toLowerCase().includes(q) ||
          s.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory.toLowerCase() !== "all" && selectedCategory !== "All sections") {
      list = list.filter(
        (s) => s.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Tag filter
    if (selectedTag && selectedTag.toLowerCase() !== "all" && selectedTag !== "All tags") {
      list = list.filter((s) =>
        s.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "popular") {
      list.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (sortBy === "oldest") {
      list.sort(
        (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    } else {
      list.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return list;
  }, [stories, query, selectedCategory, selectedTag, sortBy]);

  // Featured story is the first item if no search active, or first matching
  const featuredStory = filteredStories.length > 0 ? filteredStories[0] : null;
  const remainingStories = filteredStories.length > 1 ? filteredStories.slice(1) : [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      {/* 1. Header (Matches media_1795168261949_f528f07b.jpg) */}
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-primary">Read our blog</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Browse our stories
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pieces from the desk on engineering, design, product, and the tools people finish.
        </p>
      </header>

      {/* 2. Main Two-Column Layout */}
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
        {/* Left Sticky Sidebar Filter Card */}
        <aside className="sticky top-24">
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-4 text-sm shadow-[0_10px_30px_-24px_rgba(12,12,14,0.35)] ring-1 ring-border">
            {/* Search Input */}
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-2">
              <label htmlFor="articles-q" className="text-sm font-medium text-foreground">
                Search
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="articles-q"
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="h-10 w-full rounded-full border border-input bg-background pr-9 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-primary/40"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute top-1/2 right-1 size-8 -translate-y-1/2 grid place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </form>

            {/* Filter / Sort Dropdown */}
            <div className="grid gap-2">
              <label htmlFor="filter-sort" className="text-sm font-medium text-foreground">
                Filter
              </label>
              <div className="relative">
                <select
                  id="filter-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="flex h-9 w-full appearance-none items-center justify-between rounded-lg border border-input bg-background py-1.5 pr-8 pl-3 text-sm outline-none cursor-pointer focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most read</option>
                  <option value="oldest">Oldest</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Browse by Section */}
            <div className="space-y-2 border-t border-border/60 pt-4">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Browse by section
              </p>
              <ul className="space-y-0.5">
                {categories.map((cat) => {
                  const isAll = cat === "All sections";
                  const isActive = isAll
                    ? selectedCategory.toLowerCase() === "all" || selectedCategory === "All sections"
                    : selectedCategory.toLowerCase() === cat.toLowerCase();

                  return (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(isAll ? "all" : cat)}
                        className={`inline-flex h-7 w-full cursor-pointer items-center justify-start rounded-xl px-2.5 text-[0.8rem] font-medium transition-all ${
                          isActive
                            ? "bg-secondary text-secondary-foreground font-semibold shadow-xs"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Browse by Tag */}
            <div className="space-y-2 border-t border-border/60 pt-4">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Browse by tag
              </p>
              <ul className="space-y-0.5 max-h-60 overflow-y-auto [scrollbar-width:thin]">
                {tags.map((tag) => {
                  const isAll = tag === "All tags";
                  const isActive = isAll
                    ? selectedTag.toLowerCase() === "all" || selectedTag === "All tags"
                    : selectedTag.toLowerCase() === tag.toLowerCase();

                  return (
                    <li key={tag}>
                      <button
                        type="button"
                        onClick={() => setSelectedTag(isAll ? "all" : tag)}
                        className={`inline-flex h-7 w-full cursor-pointer items-center justify-start rounded-xl px-2.5 text-[0.8rem] font-medium transition-all ${
                          isActive
                            ? "bg-secondary text-secondary-foreground font-semibold shadow-xs"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {tag}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div>
          {featuredStory ? (
            <div className="grid gap-10">
              {/* Top Featured Wide Card */}
              <motion.article
                initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center"
              >
                <Link
                  href={`/article/${featuredStory.slug}`}
                  className="group relative block aspect-4/3 overflow-hidden rounded-3xl bg-muted shadow-xs hover:shadow-xl transition-shadow duration-500"
                >
                  <Image
                    src={featuredStory.coverImage}
                    alt={featuredStory.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </Link>

                <div className="lg:pl-2">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Featured
                  </p>
                  <h2 className="mt-2 text-3xl sm:text-4xl leading-tight font-bold tracking-tight text-foreground transition-colors duration-300 hover:text-primary">
                    <Link href={`/article/${featuredStory.slug}`}>
                      {featuredStory.title}
                    </Link>
                  </h2>
                  <p className="mt-3.5 line-clamp-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {featuredStory.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold text-foreground">
                        {featuredStory.authorName.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <Link
                          href={`/author/${featuredStory.authorSlug}`}
                          className="block truncate text-sm font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
                        >
                          {featuredStory.authorName}
                        </Link>
                        <span className="block text-xs text-muted-foreground">
                          {featuredStory.publishedAt
                            ? format(new Date(featuredStory.publishedAt), "MMMM d, yyyy")
                            : "Recently"}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/article/${featuredStory.slug}`}
                      aria-label={`Read ${featuredStory.title}`}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <ArrowUpRight className="size-5" />
                    </Link>
                  </div>
                </div>
              </motion.article>

              {/* Remaining Stories Grid (2 Columns) */}
              {remainingStories.length > 0 && (
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
                  {remainingStories.map((story, idx) => (
                    <motion.article
                      key={story.id}
                      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.65,
                        delay: Math.min(idx * 0.05, 0.35),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        y: -7,
                        scale: 1.015,
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      }}
                      className="group flex flex-col justify-between"
                    >
                      <div>
                        <Link
                          href={`/article/${story.slug}`}
                          className="relative block aspect-16/10 overflow-hidden rounded-3xl bg-muted shadow-xs group-hover:shadow-xl transition-shadow duration-500"
                        >
                          <Image
                            src={story.coverImage}
                            alt={story.title}
                            fill
                            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                            sizes="(min-width: 1024px) 30vw, 100vw"
                          />
                        </Link>

                        <p className="mt-4 text-xs font-semibold text-primary uppercase tracking-wider">
                          {story.category}
                        </p>

                        <h2 className="mt-1 text-xl sm:text-[22px] leading-snug font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                          <Link href={`/article/${story.slug}`}>
                            {story.title}
                          </Link>
                        </h2>

                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {story.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/40 pt-3">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold text-foreground">
                            {story.authorName.charAt(0)}
                          </span>
                          <div className="min-w-0">
                            <Link
                              href={`/author/${story.authorSlug}`}
                              className="block truncate text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                            >
                              {story.authorName}
                            </Link>
                            <span className="block text-xs text-muted-foreground">
                              {story.publishedAt
                                ? format(new Date(story.publishedAt), "MMM d, yyyy")
                                : ""}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/article/${story.slug}`}
                          aria-label={`Read ${story.title}`}
                          className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          <ArrowUpRight className="size-4.5" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-base font-semibold text-foreground">No stories found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try clearing your search query or choosing another section.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("all");
                  setSelectedTag("all");
                }}
                className="mt-4 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
