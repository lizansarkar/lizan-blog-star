import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Clock, Tag, ArrowLeft, CheckCircle2, Video, Volume2, HelpCircle } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";
import { extractHeadings, calculateReadingTime } from "@/lib/logic";
import { pageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const articles = await getPublishedArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/article/${slug}`,
    image: article.coverImage || undefined,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articles = await getPublishedArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Find original seed story details for rich content, quizzes, and key points
  const { stories: seedStories } = await import("../../../../../prisma/seed");
  const seedMatch = seedStories.find(
    (s) => s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
  );

  const paragraphs = seedMatch?.paragraphs || [article.excerpt];
  const headings = extractHeadings(paragraphs);
  const readingTime = calculateReadingTime(paragraphs);
  const keyPoints = seedMatch?.keyPoints || [
    "Published as part of the Lizan Blog Star editorial dispatches.",
    "Engineered with calm reading and high clarity in mind.",
  ];

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to issue</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
            {article.category}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} min read
          </span>
        </div>

        <h1 className="mt-4 font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
          {article.title}
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          {article.excerpt}
        </p>

        {/* Byline */}
        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-muted-foreground border-y border-border/60 py-3">
          <span>By <strong className="text-foreground">{article.authorName}</strong></span>
          <span>·</span>
          <span>Published on {format(article.publishedAt, "MMMM d, yyyy")}</span>
        </div>
      </header>

      {/* Featured Cover */}
      {article.coverImage && (
        <div className="relative mx-auto mt-8 aspect-[21/9] max-w-5xl overflow-hidden rounded-3xl bg-muted shadow-md">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      {/* Layout Grid: Content + Outline */}
      <div className="mx-auto mt-12 max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Points Callout */}
          {keyPoints.length > 0 && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
                <CheckCircle2 className="h-4 w-4" />
                <span>Key Points at a Glance</span>
              </div>
              <ul className="space-y-2 text-sm text-foreground leading-relaxed">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Media Embeds if available */}
          {seedMatch?.videoUrl && (
            <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
              <Video className="h-5 w-5 text-primary" />
              <div className="text-xs">
                <div className="font-semibold text-foreground">Video Edition Available</div>
                <a
                  href={seedMatch.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Watch companion stream on YouTube
                </a>
              </div>
            </div>
          )}

          {seedMatch?.audioUrl && (
            <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-primary" />
              <div className="text-xs flex-1">
                <div className="font-semibold text-foreground">Listen Mode</div>
                <audio controls className="w-full mt-2 h-8">
                  <source src={seedMatch.audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-neutral dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed space-y-6">
            {paragraphs.map((p, index) => {
              if (p.startsWith("## ")) {
                const text = p.replace(/^##\s+/, "");
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <h2 key={index} id={id} className="scroll-mt-24 font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-4">
                    {text}
                  </h2>
                );
              }
              if (p.startsWith("### ")) {
                const text = p.replace(/^###\s+/, "");
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <h3 key={index} id={id} className="scroll-mt-24 font-sans text-xl font-bold tracking-tight text-foreground pt-2">
                    {text}
                  </h3>
                );
              }
              if (p.startsWith("> ")) {
                return (
                  <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                    {p.replace(/^>\s+/, "")}
                  </blockquote>
                );
              }
              if (p.startsWith("```")) {
                const code = p.replace(/```\w*\n?|```/g, "");
                return (
                  <pre key={index} className="rounded-xl bg-muted p-4 font-mono text-xs sm:text-sm overflow-x-auto text-foreground">
                    <code>{code.trim()}</code>
                  </pre>
                );
              }
              return (
                <p key={index} className="text-foreground/90">
                  {p}
                </p>
              );
            })}
          </div>

          {/* End-of-story Quiz */}
          {seedMatch?.quiz && (
            <div className="mt-12 rounded-3xl border border-primary/30 bg-card p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <HelpCircle className="h-4 w-4" />
                <span>Test Your Understanding</span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-foreground">
                {seedMatch.quiz.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Answer the questions below to test what you learned in this dispatch.
              </p>

              <div className="mt-6 space-y-6">
                {seedMatch.quiz.questions.map((q, qIndex) => (
                  <div key={qIndex} className="rounded-2xl border border-border/80 bg-background/50 p-4">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      {qIndex + 1}. {q.prompt}
                    </p>
                    <div className="grid gap-2">
                      {q.choices.map((choice, cIndex) => (
                        <button
                          key={cIndex}
                          type="button"
                          className="flex items-center text-left p-2.5 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-[10px] font-mono mr-2.5 shrink-0">
                            {String.fromCharCode(65 + cIndex)}
                          </span>
                          <span>{choice}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-6">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar Column: Sticky Outline */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Article Outline
            </h4>
            {headings.length > 0 ? (
              <nav className="space-y-2 text-xs">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block transition-colors hover:text-primary ${
                      h.level === 3
                        ? "pl-3 text-muted-foreground"
                        : "font-semibold text-foreground"
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            ) : (
              <p className="text-xs text-muted-foreground">Continuous editorial piece.</p>
            )}

            <div className="mt-8 border-t border-border/60 pt-4 space-y-3">
              <Link
                href="/ask"
                className="flex items-center justify-between text-xs font-semibold text-primary p-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <span>Ask Lizan about this</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
