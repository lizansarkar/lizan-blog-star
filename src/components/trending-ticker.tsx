"use client";

import Link from "next/link";

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
  if (!items || items.length === 0) return null;

  return (
    <section
      aria-label="Trending stories"
      className="mt-5 flex items-stretch overflow-hidden rounded-full border border-border bg-card shadow-[0_10px_40px_-28px_rgba(0,0,0,0.35)]"
    >
      {/* Left fixed badge */}
      <p className="relative z-10 flex shrink-0 items-center gap-2 border-r border-border bg-card pr-4 pl-5 text-xs font-semibold tracking-[0.16em] uppercase">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/60 motion-reduce:hidden" />
          <span className="relative size-2 rounded-full bg-primary" />
        </span>
        Trending
      </p>

      {/* Marquee conveyor */}
      <div className="marquee relative min-w-0 flex-1 overflow-hidden mask-x-from-90% mask-x-to-100% motion-reduce:overflow-x-auto">
        <div
          className="marquee-track flex w-max hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": "56s" } as React.CSSProperties}
        >
          {/* First loop */}
          <ul className="flex shrink-0 items-center">
            {items.map((item, idx) => (
              <li key={item.id} className="flex items-center">
                <Link
                  href={`/article/${item.slug}`}
                  className="group flex items-center gap-3 px-6 py-3.5 whitespace-nowrap"
                >
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                    {item.category}
                  </span>
                  <span className="link-sweep text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                </Link>
                <span className="size-1 rounded-full bg-foreground/25" aria-hidden="true" />
              </li>
            ))}
          </ul>

          {/* Duplicate loop for seamless infinite marquee */}
          <ul className="flex shrink-0 items-center" aria-hidden="true">
            {items.map((item, idx) => (
              <li key={`dup-${item.id}`} className="flex items-center">
                <Link
                  href={`/article/${item.slug}`}
                  tabIndex={-1}
                  className="group flex items-center gap-3 px-6 py-3.5 whitespace-nowrap"
                >
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                    {item.category}
                  </span>
                  <span className="link-sweep text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                </Link>
                <span className="size-1 rounded-full bg-foreground/25" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
