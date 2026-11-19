"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Tag, ArrowRight, CornerDownLeft } from "lucide-react";
import { SearchableItem } from "@/lib/search";

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut: Cmd+K or Ctrl+K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Debounced search fetch
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error("Search fetch error", err);
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    router.push(`/article/${slug}`);
  };

  return (
    <>
      {/* Search trigger button for Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-border/80 bg-muted/30 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all shadow-xs"
        aria-label="Search stories"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search archive...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, topics, tags (typo-tolerant)..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-muted-foreground hover:text-foreground p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-border px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground hover:bg-muted"
              >
                ESC
              </button>
            </div>

            {/* Results list */}
            <div className="overflow-y-auto p-2 divide-y divide-border/40">
              {loading ? (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  Searching index...
                </div>
              ) : results.length > 0 ? (
                results.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.slug)}
                    className="w-full text-left p-3 rounded-xl hover:bg-muted/60 transition-colors flex items-start justify-between group"
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        {item.category && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                            {item.category}
                          </span>
                        )}
                        {item.readingTime && (
                          <span className="text-[10px] text-muted-foreground">
                            · {item.readingTime} min read
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </p>
                      {item.excerpt && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                    <CornerDownLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </button>
                ))
              ) : query.trim() ? (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  No matches found for &quot;{query}&quot;. Try broader terms.
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Suggested searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Local-First", "Pipelines", "Distributed", "SQLite", "Design", "AI"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-foreground hover:border-primary/50 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 text-[11px] text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Search forgives minor typos automatically.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="p-3 border-t border-border bg-muted/20 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{results.length} result(s)</span>
              <Link
                href="/articles"
                onClick={() => setIsOpen(false)}
                className="hover:text-foreground flex items-center gap-1 font-medium"
              >
                Browse all archive stories <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
