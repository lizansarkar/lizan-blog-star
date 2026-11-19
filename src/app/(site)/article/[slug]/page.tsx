import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Clock, Eye, Headphones, Bookmark, Share2, HelpCircle, ArrowLeft, MessageSquare } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";
import { extractHeadings, calculateReadingTime } from "@/lib/logic";
import { pageMetadata } from "@/lib/seo";
import { ArticleInteractions } from "@/components/article-interactions";
import { StoryQuiz } from "@/components/story-quiz";
import { StoryDiscussion } from "@/components/story-discussion";
import { stories as seedStories } from "../../../../../prisma/seed";

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

  // Find matching seed story for full text, quizzes, and key points
  const seedMatch = seedStories.find(
    (s) => s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
  );

  const paragraphs = seedMatch?.paragraphs || [article.excerpt];
  const headings = extractHeadings(paragraphs);
  const readingTime = calculateReadingTime(paragraphs);
  const wordCount = paragraphs.join(" ").split(/\s+/).length;
  const keyPoints = seedMatch?.keyPoints || [
    "A resilient system is one anyone on the team can run, read, and undo.",
    "Four named stages are enough for most architectures: build, migrate, release, watch.",
    "Every step should fail loudly with an actionable message.",
    "Keep novelty in the product; the path that ships it should be dull enough to trust.",
    "The most valuable documentation is written directly in the margin of the work.",
  ];

  // First paragraph drop cap setup
  const firstParagraph = paragraphs[0] || "";
  const firstLetter = firstParagraph.charAt(0);
  const restOfFirstParagraph = firstParagraph.slice(1);

  return (
    <article className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Sticky interactions bar (likes, bookmark, comments, scroll-to-top, Ask Lizan) */}
      <ArticleInteractions title={article.title} slug={slug} initialLikes={18} initialCommentsCount={3} />

      {/* Header Container (Matches story.jpg) */}
      <header className="mx-auto max-w-3xl text-center space-y-4 pt-4">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground font-mono">
          <Link href="/articles" className="hover:text-foreground">
            Articles
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-semibold">{article.category}</span>
        </div>

        {/* Tags */}
        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-muted-foreground font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} min read
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          {article.title}
        </h1>

        {/* Dek / Subtitle */}
        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {article.excerpt}
        </p>

        {/* Author Byline */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-white font-bold text-xs border border-border">
            {article.authorName === "Lizan Sarkar" ? "LS" : "JB"}
          </div>
          <div className="text-left text-xs">
            <div className="font-semibold text-foreground">{article.authorName}</div>
            <div className="text-muted-foreground font-mono text-[11px] flex items-center gap-2">
              <span>{format(article.publishedAt, "d MMMM yyyy")}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                159 reads
              </span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-border/60 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 font-mono">
            <span>Share</span>
            <span className="font-semibold text-foreground hover:underline cursor-pointer">X</span>
            <span className="font-semibold text-foreground hover:underline cursor-pointer">in</span>
            <span className="font-semibold text-foreground hover:underline cursor-pointer">f</span>
            <span className="font-semibold text-foreground hover:underline cursor-pointer">✉</span>
          </div>

          <span>·</span>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-muted transition-colors text-foreground"
          >
            <Headphones className="w-3.5 h-3.5 text-primary" />
            <span>Listen · {readingTime} min</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-muted transition-colors text-foreground"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
        </div>
      </header>

      {/* Featured Cover Banner */}
      {article.coverImage && (
        <div className="relative mx-auto mt-8 aspect-[21/9] max-w-5xl overflow-hidden rounded-3xl bg-neutral-900 shadow-md">
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

      {/* Main Grid: Content (Left) + Outline (Right) */}
      <div className="mx-auto mt-12 max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* AT A GLANCE Box (Matches story.jpg) */}
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8">
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>At A Glance</span>
            </div>

            {/* Key Points with numbered circles */}
            <div className="space-y-3.5">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white text-[11px] font-bold mt-0.5 shadow-sm">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Metadata Footer Grid */}
            <div className="mt-8 pt-6 border-t border-amber-500/20 grid grid-cols-3 sm:grid-cols-6 gap-3 text-center text-[10px] font-mono">
              <div>
                <span className="block text-muted-foreground uppercase text-[9px]">Section</span>
                <span className="font-semibold text-foreground">{article.category}</span>
              </div>
              <div>
                <span className="block text-muted-foreground uppercase text-[9px]">Reading Time</span>
                <span className="font-semibold text-foreground">{readingTime} min</span>
              </div>
              <div>
                <span className="block text-muted-foreground uppercase text-[9px]">Length</span>
                <span className="font-semibold text-foreground">{wordCount} words</span>
              </div>
              <div>
                <span className="block text-muted-foreground uppercase text-[9px]">Sections</span>
                <span className="font-semibold text-foreground">{headings.length || 6}</span>
              </div>
              <div>
                <span className="block text-muted-foreground uppercase text-[9px]">Published</span>
                <span className="font-semibold text-foreground">{format(article.publishedAt, "d MMM yyyy")}</span>
              </div>
              <div>
                <span className="block text-muted-foreground uppercase text-[9px]">Readers</span>
                <span className="font-semibold text-foreground">159</span>
              </div>
            </div>
          </div>

          {/* Article Body with Drop Cap on Paragraph 1 */}
          <div className="prose prose-neutral dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed space-y-6">
            {/* First paragraph with drop cap */}
            <p className="text-foreground/90">
              <span className="float-left text-5xl font-serif font-bold text-amber-600 dark:text-amber-400 pr-3 leading-none -mt-1">
                {firstLetter}
              </span>
              {restOfFirstParagraph}
            </p>

            {/* Subsequent paragraphs */}
            {paragraphs.slice(1).map((p, index) => {
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
                  <blockquote key={index} className="border-l-4 border-amber-600 pl-4 italic text-muted-foreground my-6">
                    {p.replace(/^>\s+/, "")}
                  </blockquote>
                );
              }
              if (p.startsWith("```")) {
                const code = p.replace(/```\w*\n?|```/g, "");
                return (
                  <pre key={index} className="rounded-2xl bg-neutral-900 text-neutral-100 p-5 font-mono text-xs sm:text-sm overflow-x-auto my-6">
                    <code>{code.trim()}</code>
                  </pre>
                );
              }
              return (
                <p key={index} className="text-foreground/90 leading-relaxed">
                  {p}
                </p>
              );
            })}
          </div>

          {/* Quiz Section - Server Scored */}
          {seedMatch?.quiz && (
            <StoryQuiz
              slug={slug}
              title={seedMatch.quiz.title}
              questions={seedMatch.quiz.questions.map((q) => ({
                prompt: q.prompt,
                choices: q.choices,
              }))}
            />
          )}

          {/* Interactive Comments Section */}
          <StoryDiscussion slug={slug} />
        </div>

        {/* Right Sticky Sidebar (Matches story.jpg) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70 text-xs font-mono">
              <span className="font-bold uppercase tracking-wider text-foreground">On This Page</span>
              <span className="text-muted-foreground">{readingTime} min left</span>
            </div>

            {headings.length > 0 ? (
              <nav className="space-y-2 text-xs">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block transition-colors hover:text-amber-500 ${
                      h.level === 3
                        ? "pl-3 text-muted-foreground"
                        : "font-semibold text-foreground hover:translate-x-0.5 transition-transform"
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            ) : (
              <p className="text-xs text-muted-foreground">Continuous editorial piece.</p>
            )}

            <div className="pt-4 border-t border-border/70">
              <Link
                href={`/ask?q=Tell+me+about+${encodeURIComponent(article.title)}`}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 py-2.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
              >
                <span>Ask Lizan about this essay</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
