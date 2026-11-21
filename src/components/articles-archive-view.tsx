"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Loader2, ArrowRight, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

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
  "devops",
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
  const [selectedLength, setSelectedLength] = useState<
    "any" | "short" | "long"
  >("any");
  const [selectedSort, setSelectedSort] = useState<"newest" | "popular">(
    "newest",
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce query
  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsDebouncing(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard shortcut: "/" or Cmd+K focuses search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const isInput =
        active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
      if (
        (e.key === "/" ||
          ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) &&
        !isInput
      ) {
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
    // Defined order matching reference image: All, Product, Engineering, Design, AI
    const predefined = ["Product", "Engineering", "Design", "AI"];
    return [
      { id: "all", name: "All", count: stories.length },
      ...predefined.map((name) => ({
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
        (s) => s.category.toLowerCase() === selectedCategory.toLowerCase(),
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
          s.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Filter by length (< 5 min or 5+ min)
    if (selectedLength === "short") {
      result = result.filter((s) => s.readingTime < 5);
    } else if (selectedLength === "long") {
      result = result.filter((s) => s.readingTime >= 5);
    }

    // Sort
    if (selectedSort === "popular") {
      result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (selectedSort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
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
    <div className="w-full">
      {/* 1. Header (Matches media_1795178742346_26d89610.jpg) */}
      <div>
        <p className="text-[11px] font-semibold tracking-wider text-[#c25e37] uppercase">
          SEARCH
        </p>
        <h1 className="mt-2 font-sans text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Find your next{" "}
          <span className="font-serif italic font-normal text-[#c25e37]">
            good read
          </span>
        </h1>
        <p className="mt-2.5 max-w-xl text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Results update as you type. Search titles, writers, sections, tags,
          and key points. Typos are fine.
        </p>
      </div>

      {/* 2. Search Input Box */}
      <div className="relative mt-7 max-w-3xl sm:max-w-4xl">
        <label htmlFor="search-input" className="sr-only">
          Search stories
        </label>
        <div className="relative flex items-center">
          {isDebouncing ? (
            <Loader2 className="pointer-events-none absolute left-4 size-4 animate-spin text-[#c25e37]" />
          ) : (
            <Search className="pointer-events-none absolute left-4 size-4 text-neutral-400" />
          )}

          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, writers, topics..."
            className="h-13 w-full rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 pr-28 pl-12 text-sm sm:text-base text-neutral-900 dark:text-white shadow-xs placeholder:text-neutral-400 focus:border-[#c25e37] focus:outline-none focus:ring-1 focus:ring-[#c25e37] transition"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="grid size-8 place-items-center rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            ) : (
              <kbd className="hidden h-6 items-center rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-2 font-mono text-[10px] text-neutral-400 sm:inline-flex">
                /
              </kbd>
            )}

            <button
              type="button"
              onClick={() => setDebouncedQuery(query)}
              aria-label="Search"
              className="grid size-9 sm:size-10 place-items-center rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition shadow-xs cursor-pointer"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Popular Tag Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-[13px]">
        <span className="flex items-center gap-0.5 text-xs font-semibold text-neutral-400 tracking-wider mr-1">
          <ArrowUpRight className="size-3.5 text-neutral-400 stroke-[2.5]" />
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
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs sm:text-[13px] transition ${
              query.toLowerCase() === tag.toLowerCase()
                ? "border-[#c25e37] bg-[#c25e37] text-white font-semibold shadow-xs"
                : "border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 4. Filter Toolbar (Categories & Length & Sort) */}
      <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer shrink-0 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm transition ${
                  isActive
                    ? "bg-neutral-950 text-white font-semibold shadow-xs dark:bg-white dark:text-neutral-950"
                    : "border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800"
                }`}
              >
                {cat.name} <span className="opacity-75">{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Right Filters: Length & Sort */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Length Filter Pills */}
          <div className="flex items-center rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 text-xs sm:text-[13px]">
            <button
              type="button"
              onClick={() => setSelectedLength("any")}
              className={`rounded-full px-3 sm:px-3.5 py-1 font-medium transition cursor-pointer ${
                selectedLength === "any"
                  ? "bg-neutral-950 text-white font-semibold dark:bg-white dark:text-neutral-950 shadow-2xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Any length
            </button>
            <button
              type="button"
              onClick={() => setSelectedLength("short")}
              className={`rounded-full px-3 sm:px-3.5 py-1 font-medium transition cursor-pointer ${
                selectedLength === "short"
                  ? "bg-neutral-950 text-white font-semibold dark:bg-white dark:text-neutral-950 shadow-2xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              &lt; 5 min
            </button>
            <button
              type="button"
              onClick={() => setSelectedLength("long")}
              className={`rounded-full px-3 sm:px-3.5 py-1 font-medium transition cursor-pointer ${
                selectedLength === "long"
                  ? "bg-neutral-950 text-white font-semibold dark:bg-white dark:text-neutral-950 shadow-2xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              5+ min
            </button>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 text-xs sm:text-[13px]">
            <button
              type="button"
              onClick={() => setSelectedSort("newest")}
              className={`rounded-full px-3.5 sm:px-4 py-1 font-medium transition cursor-pointer ${
                selectedSort === "newest"
                  ? "bg-neutral-950 text-white font-semibold dark:bg-white dark:text-neutral-950 shadow-2xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Newest
            </button>
            <button
              type="button"
              onClick={() => setSelectedSort("popular")}
              className={`rounded-full px-3.5 sm:px-4 py-1 font-medium transition cursor-pointer ${
                selectedSort === "popular"
                  ? "bg-neutral-950 text-white font-semibold dark:bg-white dark:text-neutral-950 shadow-2xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Most read
            </button>
          </div>
        </div>
      </div>

      {/* 5. Results Counter and Reset */}
      <div className="mt-5 mb-4 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <p>
          <span className="font-semibold text-neutral-900 dark:text-white">
            {filteredStories.length}
          </span>{" "}
          stories in the archive
          {debouncedQuery.trim() && (
            <span>
              {" "}
              matching &ldquo;
              <span className="text-[#c25e37] font-medium">
                {debouncedQuery}
              </span>
              &rdquo;
            </span>
          )}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="font-medium text-[#c25e37] hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* 6. Story Cards Grid (3 Columns matching media_1795178742346_26d89610.jpg) */}
      {filteredStories.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story, index) => {
              const formattedDate = story.publishedAt
                ? format(new Date(story.publishedAt), "d MMM yyyy")
                : "";

              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.65,
                    delay: Math.min(index * 0.05, 0.35),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -7,
                    scale: 1.015,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  }}
                  key={story.id}
                  className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-3.5 sm:p-4 hover:shadow-xl transition-shadow duration-500"
                >
                  <div>
                    {/* Aspect Cover Image */}
                    <Link
                      href={`/article/${story.slug}`}
                      className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 mb-3.5"
                    >
                      <Image
                        src={story.coverImage}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </Link>

                    {/* Meta: Category · Author · Reading Time · Date */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                      <span className="font-semibold text-[#c25e37] uppercase tracking-wider text-[10.5px]">
                        {story.category}
                      </span>
                      <span>·</span>
                      <span className="font-medium text-neutral-600 dark:text-neutral-300">
                        {story.authorName}
                      </span>
                      <span>·</span>
                      <span>{story.readingTime} min</span>
                      {formattedDate && (
                        <>
                          <span>·</span>
                          <span>{formattedDate}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="mt-2 text-[15px] sm:text-base font-bold leading-snug tracking-tight text-neutral-950 dark:text-white transition-colors duration-300 group-hover:text-[#c25e37] line-clamp-2">
                      <Link href={`/article/${story.slug}`}>{story.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {story.excerpt}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <p className="text-base font-semibold text-neutral-900 dark:text-white">
            No stories found matching your criteria.
          </p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Try searching for a different keyword or resetting your filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#c25e37] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:brightness-110"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
