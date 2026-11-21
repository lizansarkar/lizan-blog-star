import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, LayoutGrid, Sparkles } from "lucide-react";
import { HomeHero, type HeroArticle } from "@/components/home-hero";
import { TrendingTicker, type TickerItem } from "@/components/trending-ticker";
import { ArchiveField } from "@/components/archive-field";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CardHover,
  SmoothTitle,
} from "@/components/motion-wrapper";

// Exact live data matching https://lumina.noksha.dev/ and reference screenshot
const heroArticles: HeroArticle[] = [
  {
    id: "hero-1",
    title: "Notes on building a reading product people finish",
    slug: "notes-on-building-a-reading-product-people-finish",
    excerpt: "Completion is a design outcome. It starts with the width of the column.",
    coverImage: "https://images.unsplash.com/photo-1759314710754-bb3e11fbaa7b?auto=format&fit=crop&w=2400&q=80",
    publishedAt: "2026-11-15T06:54:18.633Z",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    categoryName: "Product",
    categorySlug: "product",
    readingTime: "9 min read",
  },
  {
    id: "hero-2",
    title: "The quiet return of local-first software",
    slug: "the-quiet-return-of-local-first-software",
    excerpt: "After a decade of renting every workflow, teams are keeping the source of truth on the machine again.",
    coverImage: "https://images.unsplash.com/photo-1779444480529-7df3c5645991?auto=format&fit=crop&w=2400&q=80",
    publishedAt: "2026-11-10T06:53:27.143Z",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    categoryName: "Engineering",
    categorySlug: "engineering",
    readingTime: "5 min read",
  },
  {
    id: "hero-3",
    title: "The notebook that survived the rewrite",
    slug: "the-notebook-that-survived-the-rewrite",
    excerpt: "The useful notes were the short ones, written in the margin of the work itself.",
    coverImage: "https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?auto=format&fit=crop&w=2400&q=80",
    publishedAt: "2026-11-09T06:53:55.146Z",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    categoryName: "Engineering",
    categorySlug: "engineering",
    readingTime: "5 min read",
  },
  {
    id: "hero-4",
    title: "Why inference costs rewrote product roadmaps",
    slug: "why-inference-costs-rewrote-product-roadmaps",
    excerpt: "A feature that was free to demo became a line item, and the roadmap had to learn arithmetic.",
    coverImage: "https://images.unsplash.com/photo-1587845323226-bad89242c735?auto=format&fit=crop&w=2400&q=80",
    publishedAt: "2026-11-08T06:53:33.463Z",
    authorName: "Ada Quinn",
    authorSlug: "ada-quinn",
    categoryName: "Product",
    categorySlug: "product",
    readingTime: "6 min read",
  },
];

const tickerItems: TickerItem[] = [
  {
    id: "tick-1",
    category: "Engineering",
    title: "The case for boring deployment pipelines",
    slug: "the-case-for-boring-deployment-pipelines",
  },
  {
    id: "tick-2",
    category: "Product",
    title: "Shipping without a status meeting",
    slug: "shipping-without-a-status-meeting",
  },
  {
    id: "tick-3",
    category: "Design",
    title: "A calmer interface for dense information",
    slug: "a-calmer-interface-for-dense-information",
  },
  {
    id: "tick-4",
    category: "Design",
    title: "Type that knows when to stop",
    slug: "type-that-knows-when-to-stop",
  },
  {
    id: "tick-5",
    category: "Engineering",
    title: "The quiet return of local-first software",
    slug: "the-quiet-return-of-local-first-software",
  },
  {
    id: "tick-6",
    category: "Product",
    title: "Notes on building a reading product people finish",
    slug: "notes-on-building-a-reading-product-people-finish",
  },
];

const freshStories = [
  {
    id: "fresh-1",
    title: "Shipping without a status meeting",
    slug: "shipping-without-a-status-meeting",
    formattedDate: "November 7, 2026",
    authorName: "Ada Quinn",
    authorSlug: "ada-quinn",
    categoryName: "Product",
    coverImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "fresh-2",
    title: "A calmer interface for dense information",
    slug: "a-calmer-interface-for-dense-information",
    formattedDate: "November 6, 2026",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    categoryName: "Design",
    coverImage: "https://images.unsplash.com/photo-1771147372634-976f022c0033?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "fresh-3",
    title: "Type that knows when to stop",
    slug: "type-that-knows-when-to-stop",
    formattedDate: "November 5, 2026",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    categoryName: "Design",
    coverImage: "https://images.unsplash.com/photo-1792978081649-c2291ec95b50?auto=format&fit=crop&w=2400&q=80",
  },
];

const recommendedStories = [
  {
    id: "rec-1",
    title: "The case for boring deployment pipelines",
    slug: "the-case-for-boring-deployment-pipelines",
    authorName: "Ada Quinn",
    categoryName: "Engineering",
    coverImage: "https://images.unsplash.com/photo-1565900290201-6116cd97a6b8?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "rec-2",
    title: "Readers finish what you leave room for",
    slug: "readers-finish-what-you-leave-room-for",
    authorName: "Ada Quinn",
    categoryName: "Product",
    coverImage: "https://images.unsplash.com/photo-1529016912215-a4c95c80d1dc?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "rec-3",
    title: "What the deploy log is for",
    slug: "what-the-deploy-log-is-for",
    authorName: "Jules Berger",
    categoryName: "Engineering",
    coverImage: "https://images.unsplash.com/photo-1760307837850-13db8b0d94cb?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "rec-4",
    title: "A quieter model beside the cursor",
    slug: "a-quieter-model-beside-the-cursor",
    authorName: "Ada Quinn",
    categoryName: "AI",
    coverImage: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?auto=format&fit=crop&w=2400&q=80",
  },
];

const issueStories = [
  {
    id: "issue-1",
    title: "The case for boring deployment pipelines",
    slug: "the-case-for-boring-deployment-pipelines",
    excerpt: "The most expensive pipeline is the one only one person can explain on a Friday.",
    categoryName: "Engineering",
    coverImage: "https://images.unsplash.com/photo-1565900290201-6116cd97a6b8?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "issue-2",
    title: "A quieter model beside the cursor",
    slug: "a-quieter-model-beside-the-cursor",
    excerpt: "The useful assistant got small enough to sit in the margin.",
    categoryName: "AI",
    coverImage: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "issue-3",
    title: "What small models changed about writing tools",
    slug: "what-small-models-changed-about-writing-tools",
    excerpt: "The useful assistant got cheaper, which means it can sit closer to the sentence.",
    categoryName: "AI",
    coverImage: "https://images.unsplash.com/photo-1612873003118-f0160ec93f4c?auto=format&fit=crop&w=2400&q=80",
  },
];

const sectionsData = [
  {
    name: "AI",
    slug: "ai",
    count: 2,
    description: "Models, tools, and the work they change.",
    image: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?auto=format&fit=crop&w=2400&q=80",
  },
  {
    name: "Design",
    slug: "design",
    count: 3,
    description: "Typography, density, and calm interfaces.",
    image: "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?auto=format&fit=crop&w=2400&q=80",
  },
  {
    name: "Engineering",
    slug: "engineering",
    count: 4,
    description: "Pipelines, local-first architectures, and systems.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2400&q=80",
  },
  {
    name: "Product",
    slug: "product",
    count: 4,
    description: "Outcomes, roadmaps, and building things people finish.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=2400&q=80",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. Hero Carousel */}
      <HomeHero articles={heroArticles} />

      {/* 2. Trending Ticker */}
      <TrendingTicker items={tickerItems} />

      {/* 3. Section: Fresh from the desk, worth finishing */}
      <section className="mt-20" aria-labelledby="stories-heading">
        <FadeIn>
          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-3.5 py-1 text-sm font-medium">
                <LayoutGrid className="size-3.5" aria-hidden={true} />
                Latest
              </p>
              <h2
                id="stories-heading"
                className="mt-5 max-w-[12em] text-4xl leading-[1.04] font-semibold tracking-[-0.03em] sm:text-5xl"
              >
                Fresh from the desk, <span className="text-primary italic">worth finishing</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] sm:text-base leading-relaxed text-muted-foreground lg:pb-1">
              Pieces on engineering, design, product, and the tools people actually finish. Each one carries audio, key points, and a short quiz.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.12} className="mt-10 grid gap-8 md:grid-cols-3">
          {freshStories.map((story) => (
            <StaggerItem key={story.id}>
              <CardHover yDelta={-8}>
                <article className="group">
                  <Link
                    href={`/article/${story.slug}`}
                    className="relative block aspect-4/3 overflow-hidden md:aspect-4/5 rounded-[1.4rem] bg-muted shadow-xs transition-shadow duration-500 hover:shadow-lg"
                  >
                    <Image
                      src={story.coverImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      sizes="(min-width: 768px) 30vw, 100vw"
                    />
                    <span className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-neutral-900 uppercase backdrop-blur-md">
                      {story.categoryName}
                    </span>
                    <span className="absolute right-4 bottom-4 grid size-12 translate-y-3 place-items-center rounded-full bg-white text-neutral-950 opacity-0 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </Link>
                  <p className="mt-5 text-sm text-muted-foreground">{story.formattedDate}</p>
                  <h3 className="mt-2 text-xl sm:text-[22px] leading-snug font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                    <Link href={`/article/${story.slug}`} className="link-sweep">
                      {story.title}
                    </Link>
                  </h3>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3.5 text-sm">
                    <Link
                      href={`/author/${story.authorSlug}`}
                      className="underline-offset-4 transition-colors hover:text-primary hover:underline text-muted-foreground font-medium"
                    >
                      {story.authorName}
                    </Link>
                    <Link
                      href={`/article/${story.slug}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      Read
                      <ArrowRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.2} className="mt-14 flex justify-center">
          <Link
            href="/articles"
            className="group inline-flex h-13 sm:h-14 items-center gap-3 rounded-full border bg-card pr-3 pl-6 sm:pl-7 text-sm sm:text-base font-semibold shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground/30 hover:shadow-md hover:scale-[1.02] cursor-pointer"
          >
            <span>Browse all articles</span>
            <span className="grid size-8 sm:size-9 place-items-center rounded-full bg-foreground text-background transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              <ArrowRight className="size-4 sm:size-4.5" />
            </span>
          </Link>
        </FadeIn>
      </section>

      {/* 4. Section: Recommended reads */}
      <section className="mt-20" aria-labelledby="recommended-heading">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-3.5 py-1 text-sm font-medium">
                <Sparkles className="size-3.5 text-primary" aria-hidden={true} />
                Recommended
              </p>
              <h2 id="recommended-heading" className="mt-5 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                Recommended reads
              </h2>
            </div>
            <div className="max-w-sm space-y-2 text-sm sm:text-[15px] leading-relaxed text-muted-foreground sm:text-right">
              <p>Popular with readers right now.</p>
              <Link href="/login" className="font-semibold text-foreground underline-offset-4 hover:underline">
                Sign in for picks based on your reading
              </Link>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedStories.map((story) => (
            <StaggerItem key={story.id}>
              <CardHover yDelta={-7}>
                <Link
                  href={`/article/${story.slug}`}
                  className="group flex h-full flex-col rounded-3xl border bg-card p-3.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_30px_60px_-32px_rgba(30,20,10,0.45)]"
                >
                  <span className="relative block aspect-4/3 overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src={story.coverImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    />
                  </span>
                  <span className="flex flex-1 flex-col px-1 pt-4 pb-1">
                    <span className="group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-border px-2.5 py-0.5 rounded-full text-[11px] font-medium text-primary">
                      Popular with readers
                    </span>
                    <span className="mt-3 line-clamp-2 text-lg sm:text-[19px] leading-snug font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                      {story.title}
                    </span>
                    <span className="mt-auto pt-3 text-sm text-muted-foreground">
                      {story.authorName} · {story.categoryName}
                    </span>
                  </span>
                </Link>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 5. Section: Ask the archive anything (With Three.js ArchiveField) */}
      <FadeIn yOffset={30}>
        <section
          aria-labelledby="ask-heading"
          className="relative isolate mt-20 overflow-hidden rounded-[2.2rem] bg-neutral-950 text-white shadow-2xl"
          style={{
            backgroundImage:
              "radial-gradient(70% 90% at 75% 40%, rgba(192,107,61,0.55), transparent 60%), radial-gradient(60% 70% at 20% 90%, rgba(70,40,64,0.7), transparent 65%)",
          }}
        >
          <ArchiveField />
          <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-transparent" />
          <div className="relative grid gap-10 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:px-16 lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-[0.16em] uppercase backdrop-blur-md">
                <Sparkles className="size-3.5 text-[#f2a877]" />
                Ask Lizan
              </p>
              <h2
                id="ask-heading"
                className="mt-5 max-w-[14ch] text-4xl leading-[1.04] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl"
              >
                Ask the archive <span className="text-[#f2a877] italic">anything.</span>
              </h2>
              <p className="mt-5 max-w-md text-base sm:text-lg leading-relaxed text-white/75">
                The assistant has read all 14 stories on Lizan. Ask a question and it answers with links, so you can go deeper in seconds.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <Link
                  href="/chat?ask=Where%20should%20I%20start%3F"
                  className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:text-white"
                >
                  Where should I start?
                </Link>
                <Link
                  href="/chat?ask=Explain%20local-first%20in%20a%20minute"
                  className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:text-white"
                >
                  Explain local-first in a minute
                </Link>
                <Link
                  href="/chat?ask=What%20changed%20in%20AI%20writing%20tools%3F"
                  className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:text-white"
                >
                  What changed in AI writing tools?
                </Link>
                <Link
                  href="/chat?ask=Best%20stories%20on%20design%20systems"
                  className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:text-white"
                >
                  Best stories on design systems
                </Link>
              </div>
              <Link
                href="/chat"
                className="group/cta mt-9 inline-flex h-13 sm:h-14 items-center gap-3 rounded-full bg-white pr-3 pl-6 sm:pl-7 text-sm sm:text-base font-semibold text-neutral-950 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] cursor-pointer"
              >
                <span>Open Ask Lizan</span>
                <span className="grid size-9 sm:size-10 place-items-center rounded-full bg-neutral-950 text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:bg-white group-hover/cta:text-primary">
                  <ArrowRight className="size-4 sm:size-4.5 transition-transform duration-500 group-hover/cta:-rotate-45" />
                </span>
              </Link>
            </div>

            {/* Right Simulated Glass Chat Card */}
            <div className="hidden lg:block">
              <div className="ml-auto max-w-sm rounded-[1.8rem] border border-white/15 bg-black/30 p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs sm:text-sm text-white/70">
                  <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  Lizan assistant
                </div>
                <div className="mt-4 space-y-3.5 text-sm">
                  <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-neutral-950 font-medium">
                    Where should I start if I like AI?
                  </p>
                  <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/10 px-4 py-3 leading-relaxed text-white/90">
                    Start with{" "}
                    <Link
                      href="/article/a-quieter-model-beside-the-cursor"
                      className="font-semibold text-[#f2a877] hover:underline"
                    >
                      A quieter model beside the cursor
                    </Link>
                    {", then "}
                    <Link
                      href="/article/what-small-models-changed-about-writing-tools"
                      className="font-semibold text-[#f2a877] hover:underline"
                    >
                      What small models changed about writing tools
                    </Link>
                    .
                  </div>
                  <div
                    className="flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3.5 py-2"
                    aria-hidden="true"
                  >
                    <span className="size-1.5 animate-pulse rounded-full bg-white/70" style={{ animationDelay: "0ms" }} />
                    <span className="size-1.5 animate-pulse rounded-full bg-white/70" style={{ animationDelay: "180ms" }} />
                    <span className="size-1.5 animate-pulse rounded-full bg-white/70" style={{ animationDelay: "360ms" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 6. Section: In this issue */}
      <section className="mt-20" aria-labelledby="issue-heading">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                This week
              </p>
              <h2 id="issue-heading" className="mt-2 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                In this issue
              </h2>
            </div>
            <Link href="/articles" className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold">
              <span className="link-sweep">All stories</span>
              <ArrowRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.12} className="mt-8 grid gap-5 md:grid-cols-3">
          {issueStories.map((story) => (
            <StaggerItem key={story.id}>
              <CardHover yDelta={-7}>
                <Link
                  href={`/article/${story.slug}`}
                  className="group flex h-full min-h-64 overflow-hidden rounded-[1.6rem] border border-border bg-card text-card-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-xl"
                >
                  <span className="relative w-32 shrink-0 overflow-hidden sm:w-2/5">
                    <Image
                      src={story.coverImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      sizes="(min-width: 768px) 14vw, 140px"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                      {story.categoryName}
                    </span>
                    <span className="mt-2 text-lg sm:text-[19px] leading-snug font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                      {story.title}
                    </span>
                    <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {story.excerpt}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
                      Read more
                      <ArrowRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 7. Section: Editor's pick and most read */}
      <FadeIn yOffset={25}>
        <section className="mt-12 grid overflow-hidden rounded-[2.2rem] md:grid-cols-2" aria-label="Editor's pick and most read">
          {/* Left: Editor's pick */}
          <Link
            href="/article/what-the-deploy-log-is-for"
            className="group relative flex flex-col justify-center overflow-hidden bg-foreground p-8 text-background sm:p-14 dark:bg-card dark:text-foreground"
          >
            <span
              className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/25 blur-3xl transition duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125"
              aria-hidden="true"
            />
            <p className="relative text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Editor&apos;s pick
            </p>
            <p className="relative mt-4 text-3xl leading-[1.08] font-semibold tracking-[-0.02em] sm:text-[2.6rem]">
              What <span className="text-primary italic">the</span> deploy log is for
            </p>
            <p className="relative mt-4 line-clamp-3 max-w-md text-sm sm:text-base leading-relaxed text-background/70 dark:text-muted-foreground">
              If only one person can explain the pipeline, the pipeline is already late.
            </p>
            <span className="relative mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm sm:text-base font-semibold text-primary-foreground shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
              <span>Read the pick</span>
              <ArrowRight className="size-4.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Right: Most read */}
          <Link
            href="/article/the-case-for-boring-deployment-pipelines"
            className="group relative flex min-h-80 items-end overflow-hidden p-5 sm:p-7"
          >
            <Image
              src="https://images.unsplash.com/photo-1565900290201-6116cd97a6b8?auto=format&fit=crop&w=2400&q=80"
              alt=""
              fill
              className="object-cover transition duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <span className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
            <span className="relative max-w-sm rounded-2xl bg-card/95 p-6 text-foreground shadow-xl backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
              <span className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                Most read
              </span>
              <span className="mt-2 block text-2xl leading-tight font-semibold tracking-tight">
                The case for boring deployment pipelines
              </span>
              <span className="mt-2 block text-sm text-muted-foreground">
                by Ada Quinn
              </span>
            </span>
          </Link>
        </section>
      </FadeIn>

      {/* 8. Section: Browse by section */}
      <section className="mt-20" aria-labelledby="categories-heading">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Sections
              </p>
              <h2 id="categories-heading" className="mt-2 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                Browse by section
              </h2>
            </div>
            <Link href="/articles" className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold">
              <span className="link-sweep">Everything</span>
              <ArrowRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
          {sectionsData.map((sec) => (
            <StaggerItem key={sec.slug}>
              <CardHover yDelta={-8}>
                <Link
                  href={`/category/${sec.slug}`}
                  className="group relative flex aspect-[3/4] items-end overflow-hidden rounded-[1.6rem] p-4 sm:p-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl"
                >
                  <Image
                    src={sec.image}
                    alt=""
                    fill
                    className="object-cover transition duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    sizes="(min-width: 1024px) 22vw, 50vw"
                  />
                  <span className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
                  <span className="relative w-full text-white">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-lg font-semibold tracking-tight sm:text-xl">
                        {sec.name}
                      </span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:bg-white group-hover:text-neutral-950">
                        <ArrowUpRight className="size-4.5" />
                      </span>
                    </span>
                    <span className="mt-1 block text-xs text-white/70 font-medium">
                      {sec.count} stories
                    </span>
                    <span className="mt-0 line-clamp-2 hidden max-h-0 text-sm text-white/80 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:mt-2 group-hover:max-h-12 group-hover:opacity-100 sm:block">
                      {sec.description}
                    </span>
                  </span>
                </Link>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
