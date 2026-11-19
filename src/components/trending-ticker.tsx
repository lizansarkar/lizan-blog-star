"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface TickerItem {
  id: string;
  category: string;
  title: string;
  slug: string;
}

interface TrendingTickerProps {
  items: TickerItem[];
}

export function TrendingTicker({ items }: TrendingTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  const current = items[index];

  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-2xl border border-border/70 bg-card/40 text-xs transition-colors">
      <div className="flex items-center gap-2 shrink-0">
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="font-bold tracking-wider uppercase text-foreground">
          Trending
        </span>
      </div>

      <div className="h-3 w-px bg-border/60 shrink-0" />

      <div className="overflow-hidden whitespace-nowrap text-muted-foreground flex items-center gap-2">
        <span className="font-mono text-primary font-semibold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-semibold uppercase tracking-wider text-[10px] text-foreground">
          {current.category}
        </span>
        <Link
          href={`/article/${current.slug}`}
          className="text-foreground hover:text-primary transition-colors hover:underline truncate"
        >
          {current.title}
        </Link>
      </div>
    </div>
  );
}
