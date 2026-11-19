import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, BookOpen, Clock } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";
import { HomeHero, type FeaturedItem } from "@/components/home-hero";
import { TrendingTicker } from "@/components/trending-ticker";
import { stories as seedStories } from "../../../prisma/seed";

export default async function HomePage() {
  const articles = await getPublishedArticles();

  // Prepare featured carousel items
  const featuredList: FeaturedItem[] = seedStories.slice(0, 4).map((story, idx) => ({
    id: `featured-${idx}`,
    title: story.title,
    italicWord: idx === 0 ? "quiet" : idx === 1 ? "rewrote" : idx === 2 ? "calmer" : "boring",
    slug: story.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: story.category,
    excerpt: story.excerpt,
    coverImage: story.cover,
    authorName: idx === 0 ? "Lizan Sarkar" : "Jules Berger",
    authorInitials: idx === 0 ? "LS" : "JB",
    publishedAt: new Date(Date.now() - story.daysAgo * 86400000),
  }));

  // Prepare trending ticker items
  const tickerItems = seedStories.slice(1, 6).map((story, idx) => ({
    id: `ticker-${idx}`,
    category: story.category,
    title: story.title,
    slug: story.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));

  // Recommended reads (top 4 stories from image)
  const recommended = seedStories.slice(0, 4).map((story, idx) => ({
    id: `rec-${idx}`,
    title: story.title,
    slug: story.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: story.category,
    authorName: idx === 0 ? "Lizan Sarkar" : idx === 1 ? "Mira Okafor" : idx === 2 ? "Theo Lindqvist" : "Jules Berger",
    cover: story.cover,
  }));

  // Remaining dispatches
  const moreStories = articles.slice(4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Featured Story Hero Carousel (Matches home.jpg) */}
      <section>
        <HomeHero items={featuredList} />
      </section>

      {/* 2. Trending Ticker Bar (Matches home.jpg) */}
      <section>
        <TrendingTicker items={tickerItems} />
      </section>

      {/* 3. Recommended Reads Section (Matches home.jpg) */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/70 pb-4">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Recommended reads
          </h2>
          <div className="text-xs text-muted-foreground">
            Popular with readers right now ·{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Sign in for picks based on your reading
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((story) => (
            <article
              key={story.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-900">
                  <Image
                    src={story.cover}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="mt-3.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Popular with readers
                  </span>
                  <h3 className="mt-1 font-sans text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/article/${story.slug}`}>
                      {story.title}
                    </Link>
                  </h3>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 text-[11px] text-muted-foreground flex items-center justify-between">
                <span>{story.authorName}</span>
                <span className="font-semibold text-foreground">{story.category}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Ask Lizan Band (Matches home.jpg "Ask the archive anything.") */}
      <section className="rounded-3xl border border-amber-900/30 bg-gradient-to-r from-neutral-950 via-neutral-900 to-amber-950/40 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        {/* Subtle warm glow background */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Lizan · Powered by Gemini</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ask the archive{" "}
              <span className="font-serif italic font-normal text-amber-400">
                anything.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
              The assistant has read all 14 stories on Lizan Blog Star. Ask a question and get real stories back as links.
            </p>
          </div>

          {/* Interactive prompt pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/ask?q=Where+should+I+start+if+I+like+AI"
              className="inline-flex items-center justify-between gap-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 text-xs font-semibold text-white backdrop-blur-md transition-all hover:scale-105"
            >
              <span>Where should I start if I like AI?</span>
              <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
            </Link>

            <Link
              href="/ask"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-xs font-bold text-black hover:bg-neutral-100 shadow-md transition-all hover:scale-105"
            >
              Launch Chat
            </Link>
          </div>
        </div>
      </section>

      {/* 5. More Dispatches Grid */}
      <section className="space-y-6 pt-4 pb-12">
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-foreground">
            From the Sections
          </h2>
          <Link href="/articles" className="text-xs font-semibold text-primary hover:underline">
            View all 14 dispatches →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moreStories.slice(0, 6).map((story) => (
            <article
              key={story.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="font-semibold text-primary uppercase text-[10px] tracking-wider">
                    {story.category}
                  </span>
                  <span>{story.readingTime} min read</span>
                </div>

                <h3 className="font-sans text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/article/${story.slug}`}>
                    {story.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {story.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border/50 text-[11px] text-muted-foreground flex items-center justify-between">
                <span>{story.authorName}</span>
                <span className="text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
                  Read →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
