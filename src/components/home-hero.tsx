"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { format } from "date-fns";

export interface HeroArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string | Date;
  authorName: string;
  authorSlug: string;
  categoryName: string;
  categorySlug: string;
  readingTime?: string;
  tags?: { name: string; slug: string }[];
}

interface HomeHeroProps {
  articles: HeroArticle[];
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    () => false
  );
}

function padZero(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}

export function HomeHero({ articles }: HomeHeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const [docVisible, setDocVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  const total = articles.length;
  const isAutoPlaying = total > 1 && isPlaying && !prefersReduced && !isHovered && !isFocused && inView && docVisible;

  // Viewport observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.25 }
    );
    observer.observe(el);

    const onVis = () => setDocVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const goTo = (idx: number) => {
    const next = (idx + total) % total;
    if (next !== activeIdx) {
      setPrevIdx(activeIdx);
      setActiveIdx(next);
    }
  };

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo(activeIdx - 1);
    if (e.key === "ArrowRight") goTo(activeIdx + 1);
  };

  // Touch swipes
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = (e.changedTouches[0]?.clientX ?? touchStartRef.current) - touchStartRef.current;
    touchStartRef.current = null;
    if (Math.abs(diff) >= 48) {
      goTo(activeIdx + (diff < 0 ? 1 : -1));
    }
  };

  if (!total) return null;

  const activeArticle = articles[activeIdx];

  return (
    <div
      ref={containerRef}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
      className="relative isolate h-[min(86svh,44rem)] min-h-[34rem] overflow-hidden rounded-[2rem] bg-neutral-950 text-white shadow-[0_40px_120px_-60px_rgba(20,12,6,0.65)] sm:h-[min(80svh,46rem)] lg:min-h-[36rem]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      <p className="sr-only" aria-live={isAutoPlaying ? "off" : "polite"}>
        Story {activeIdx + 1} of {total}: {activeArticle.title}
      </p>

      {/* Slides */}
      {articles.map((article, idx) => {
        const isActive = idx === activeIdx;
        const isPrev = idx === prevIdx;
        const words = article.title.split(" ");
        const italicIdx = words.length > 3 ? 1 : -1;
        const formattedDate = article.publishedAt
          ? format(new Date(article.publishedAt), "MMMM d, yyyy")
          : "";
        const initials = article.authorName
          ? article.authorName
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
          : "LZ";

        return (
          <article
            key={article.id}
            data-active={isActive}
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${total}`}
            aria-hidden={!isActive}
            inert={!isActive ? true : undefined}
            className={`hero-slide absolute inset-0 ${
              isActive
                ? "z-20 opacity-100 transition-opacity duration-1400 ease-cinema"
                : isPrev
                ? "z-10 opacity-100"
                : "invisible z-0 opacity-0"
            }`}
          >
            {/* Background Parallax & Zoom */}
            <div className="hero-parallax absolute inset-x-0 -top-[14%] bottom-0">
              <div className="hero-zoom absolute inset-0 will-change-transform">
                <Image
                  src={article.coverImage}
                  alt=""
                  fill
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Overlays matching exact noksha.dev styling */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10" />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_100%,rgba(192,107,61,0.28),transparent_55%)]" />

            {/* Content Foreground */}
            <div className="relative z-10 flex h-full flex-col justify-end px-6 pt-20 pb-8 sm:px-12 sm:pb-12 lg:pr-[26rem] lg:pb-14 xl:px-16 xl:pr-[28rem]">
              {/* Category & Badge */}
              <div className="hero-rise flex flex-wrap items-center gap-2.5" style={{ "--d": "0.12s" } as React.CSSProperties}>
                <Link
                  href={`/category/${article.categorySlug}`}
                  className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-primary-foreground uppercase transition hover:brightness-110"
                >
                  {article.categoryName}
                </Link>
                <span className="text-xs font-medium tracking-[0.14em] text-white/70 uppercase">
                  Featured story
                </span>
              </div>

              {/* Title with word animation & italic highlight */}
              <h1 className="mt-5 max-w-[18ch] text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.25rem]">
                <Link href={`/article/${article.slug}`} className="outline-none focus-visible:underline">
                  {words.map((word, wIdx) => (
                    <span key={`${word}-${wIdx}`}>
                      <span className="hero-word inline-block overflow-hidden pb-[0.1em] align-bottom -mb-[0.1em]">
                        <span
                          className={`inline-block ${wIdx === italicIdx ? "text-[#f2a877] italic" : ""}`}
                          style={{ "--i": wIdx } as React.CSSProperties}
                        >
                          {word}
                        </span>
                      </span>
                      {wIdx < words.length - 1 ? " " : ""}
                    </span>
                  ))}
                </Link>
              </h1>

              {/* Excerpt */}
              <p
                className="hero-rise mt-5 line-clamp-3 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-lg"
                style={{ "--d": "0.55s" } as React.CSSProperties}
              >
                {article.excerpt}
              </p>

              {/* Bottom CTA & Author byline */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link
                  href={`/article/${article.slug}`}
                  className="group/cta inline-flex h-13 sm:h-14 items-center gap-3 rounded-full bg-white pr-2.5 pl-6 sm:pl-7 text-sm sm:text-base font-semibold text-neutral-950 shadow-lg transition-all duration-500 ease-out-expo hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] cursor-pointer"
                >
                  Read the story
                  <span className="grid size-9 sm:size-10 place-items-center rounded-full bg-neutral-950 text-white transition duration-500 ease-out-expo group-hover/cta:translate-x-0.5 group-hover/cta:bg-white group-hover/cta:text-primary">
                    <ArrowRight className="size-4 sm:size-5 transition-transform duration-500 ease-out-expo group-hover/cta:-rotate-45" />
                  </span>
                </Link>

                <div className="flex items-center gap-3">
                  <span className="grid size-10 sm:size-11 place-items-center rounded-full border border-white/25 bg-white/10 text-xs sm:text-sm font-semibold text-white backdrop-blur-md">
                    {initials}
                  </span>
                  <div className="text-sm">
                    {article.authorSlug ? (
                      <Link
                        href={`/author/${article.authorSlug}`}
                        className="block font-medium text-white hover:underline text-sm sm:text-[15px]"
                      >
                        {article.authorName}
                      </Link>
                    ) : (
                      <span className="block font-medium text-white text-sm sm:text-[15px]">{article.authorName}</span>
                    )}
                    {formattedDate && <span className="text-xs text-white/60">{formattedDate}</span>}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}

      {/* Mobile Top Segment Indicators */}
      {total > 1 && (
        <div className="absolute inset-x-5 top-5 z-30 flex items-center gap-3 sm:inset-x-8 sm:top-7 lg:hidden">
          <div className="flex flex-1 gap-1.5">
            {articles.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Show story ${idx + 1}: ${item.title}`}
                aria-current={idx === activeIdx ? "true" : undefined}
                className="group/seg relative h-6 flex-1 cursor-pointer"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition-colors group-hover/seg:bg-white/40">
                  {idx < activeIdx && <span className="absolute inset-0 bg-white" />}
                  {idx === activeIdx && (
                    <span
                      key={`${activeIdx}-seg`}
                      className="hero-progress absolute inset-0 bg-white"
                      style={{
                        "--hero-duration": "7000ms",
                        animationPlayState: isAutoPlaying ? "running" : "paused",
                      } as React.CSSProperties}
                      onAnimationEnd={() => goTo(activeIdx + 1)}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            className="grid size-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
          >
            {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
        </div>
      )}

      {/* Desktop Bottom-Right Switcher Box */}
      {total > 1 && (
        <aside
          className="absolute right-6 bottom-6 z-30 hidden w-[21.5rem] rounded-[1.6rem] border border-white/15 bg-black/35 p-2 shadow-2xl backdrop-blur-xl lg:block xl:right-8 xl:bottom-8"
          aria-label="Featured story list"
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-2 px-3 pt-1.5 pb-2.5">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-white/65 uppercase">
              Featured
            </p>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs text-white/70 tabular-nums">
                {padZero(activeIdx + 1)} / {padZero(total)}
              </span>
              <button
                type="button"
                onClick={() => goTo(activeIdx - 1)}
                aria-label="Previous story"
                className="grid size-7 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIdx + 1)}
                aria-label="Next story"
                className="grid size-7 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <ChevronRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                className="grid size-7 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              </button>
            </div>
          </div>

          {/* List of 4 cards */}
          <ol className="space-y-1">
            {articles.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group/item relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-2xl p-2 text-left transition-colors duration-500 ${
                      isActive ? "bg-white/14" : "hover:bg-white/8"
                    }`}
                  >
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
                      <Image
                        src={item.coverImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-white">
                        {item.title}
                      </span>
                      <span className="mt-0.5 flex items-center gap-2 text-[11px] text-white/60">
                        <span className="text-primary font-medium">{item.categoryName}</span>
                        <span>·</span>
                        <span>{item.readingTime || "5 min read"}</span>
                      </span>
                    </span>

                    {/* Active progress indicator line */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20">
                        <span
                          key={`${activeIdx}-bar`}
                          className="hero-progress block h-full bg-white"
                          style={{
                            "--hero-duration": "7000ms",
                            animationPlayState: isAutoPlaying ? "running" : "paused",
                          } as React.CSSProperties}
                          onAnimationEnd={() => goTo(activeIdx + 1)}
                        />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      )}
    </div>
  );
}
