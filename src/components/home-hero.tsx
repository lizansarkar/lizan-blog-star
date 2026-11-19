"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export interface FeaturedItem {
  id: string;
  title: string;
  italicWord?: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  authorName: string;
  authorInitials: string;
  publishedAt: Date;
}

interface HomeHeroProps {
  items: FeaturedItem[];
}

export function HomeHero({ items }: HomeHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const current = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // Render title with styled accent word
  const renderStyledTitle = (title: string, italicWord?: string) => {
    if (!italicWord) return title;
    const parts = title.split(new RegExp(`(${italicWord})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === italicWord.toLowerCase() ? (
        <span key={i} className="font-serif italic font-normal text-amber-400 dark:text-amber-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-neutral-950 text-white shadow-2xl transition-all">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={current.coverImage}
          alt={current.title}
          fill
          priority
          className="object-cover opacity-45 brightness-90 transition-all duration-700 ease-out"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 grid min-h-[520px] grid-cols-1 lg:grid-cols-12 p-6 sm:p-10 lg:p-12 items-end gap-8">
        {/* Left Column: Story details */}
        <div className="lg:col-span-8 flex flex-col justify-end">
          {/* Category & Tag */}
          <div className="flex items-center gap-3 text-xs tracking-wider uppercase font-semibold">
            <span className="rounded-full bg-amber-600/90 px-3 py-1 text-white shadow-sm font-bold">
              {current.category}
            </span>
            <span className="text-neutral-400 font-mono text-[11px]">
              FEATURED STORY
            </span>
          </div>

          {/* Large Title */}
          <h1 className="mt-4 font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-2xl">
            <Link href={`/article/${current.slug}`} className="hover:underline">
              {renderStyledTitle(current.title, current.italicWord || "quiet")}
            </Link>
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
            {current.excerpt}
          </p>

          {/* Action & Byline */}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={`/article/${current.slug}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-xs font-bold text-black hover:bg-neutral-100 shadow-lg transition-transform hover:scale-105"
            >
              <span>Read the story</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-xs font-bold text-white border border-neutral-700">
                {current.authorInitials}
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">{current.authorName}</div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  {format(current.publishedAt, "MMMM d, yyyy")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Carousel Switcher */}
        <div className="lg:col-span-4 flex flex-col justify-end">
          <div className="rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">
            {/* Header with Counter & Prev/Next */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-3 border-b border-white/10">
              <span className="uppercase tracking-wider font-semibold text-white">Featured</span>
              <div className="flex items-center gap-2">
                <span>
                  {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous story"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next story"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Switcher list */}
            <div className="mt-3 space-y-2">
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-all ${
                      isActive
                        ? "bg-white/15 border border-white/20 shadow-sm"
                        : "opacity-60 hover:opacity-100 hover:bg-white/5"
                    }`}
                  >
                    <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-800">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                        {String(idx + 1).padStart(2, "0")} · {item.category}
                      </div>
                      <div className="text-xs font-semibold text-white truncate">
                        {item.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
