"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  RotateCcw,
  RotateCw,
  Play,
  Pause,
  Bookmark,
  Heart,
  Share2,
  Type,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Send,
  Check,
} from "lucide-react";

export interface ArticleReadingProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    coverImage?: string | null;
    publishedAt: Date | string;
    authorName: string;
    readingTime: number;
    tags?: string[];
  };
  relatedArticles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    coverImage: string;
    authorName: string;
    publishedAt: Date | string;
    readingTime: number;
  }>;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
  likes: number;
}

const defaultStoryComments: Comment[] = [
  {
    id: "c1",
    author: "Ada Quinn",
    avatar: "A",
    time: "2 days ago",
    text: "The point about keeping novelty in the product rather than the deployment log resonates deeply. We rewrote our sync protocol last spring and the only thing that kept us sane was an unformatted markdown diary.",
    likes: 12,
  },
  {
    id: "c2",
    author: "Lizan Sarkar",
    avatar: "L",
    time: "1 day ago",
    text: "Exactly. The moment you need a diagram to explain how to get a commit onto staging on a Friday, the tool is owning the team instead of the team owning the tool.",
    likes: 18,
  },
  {
    id: "c3",
    author: "Elena Rostova",
    avatar: "E",
    time: "18 hours ago",
    text: "Writing in the margins forces brevity. If an architectural decision can't be explained in two sentences in the header of the file, it's probably too complicated.",
    likes: 8,
  },
];

export function ArticleReadingView({ article, relatedArticles }: ArticleReadingProps) {
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<"1x" | "1.25x" | "1.5x">("1x");
  const [audioProgress, setAudioProgress] = useState(0);

  // Reaction state
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(14);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  // Feedback state
  const [usefulVote, setUsefulVote] = useState<"useful" | "not-for-me" | null>(null);
  const [usefulCount, setUsefulCount] = useState(14);
  const [following, setFollowing] = useState(false);

  // Discussion state
  const [comments, setComments] = useState<Comment[]>(defaultStoryComments);
  const [newCommentText, setNewCommentText] = useState("");
  const [showComments, setShowComments] = useState(true);

  // Active section for TOC
  const [activeHeading, setActiveHeading] = useState("beside-the-file");

  useEffect(() => {
    const handleScroll = () => {
      const headings = ["beside-the-file", "short-on-purpose", "what-survived"];
      const scrollPos = window.scrollY + 200;

      for (const id of headings) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height + 300) {
            setActiveHeading(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Audio simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newC: Comment = {
      id: `c_${Date.now()}`,
      author: "Reader",
      avatar: "R",
      time: "Just now",
      text: newCommentText.trim(),
      likes: 1,
    };
    setComments([newC, ...comments]);
    setNewCommentText("");
    setShowComments(true);
  };

  const formattedDate = article.publishedAt
    ? format(new Date(article.publishedAt), "d MMMM yyyy")
    : "9 November 2026";

  const nextSpeed = () => {
    if (audioSpeed === "1x") setAudioSpeed("1.25x");
    else if (audioSpeed === "1.25x") setAudioSpeed("1.5x");
    else setAudioSpeed("1x");
  };

  return (
    <div className="w-full">
      {/* 1. Header & Hero Area (Matches media_1795182596112_e5006058.jpg) */}
      <header className="mx-auto max-w-3xl pt-8 pb-4 text-center">
        {/* Eyebrow: Section */}
        <p className="text-[11px] font-semibold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
          SECTION · {article.category.toUpperCase()}
        </p>

        {/* Issue Pill */}
        <div className="mt-2.5">
          <span className="inline-flex items-center rounded-full border border-[#c25e37]/25 bg-[#c25e37]/8 px-3 py-0.5 text-[11px] font-semibold text-[#c25e37] uppercase tracking-wider">
            Field dispatch · Spring 2026
          </span>
        </div>

        {/* Main Title */}
        <h1 className="mt-3.5 font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.12]">
          {article.title}
        </h1>

        {/* Standfirst / Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author Byline */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white font-bold text-[10px]">
            {article.authorName.charAt(0)}
          </div>
          <span className="font-semibold text-neutral-900 dark:text-neutral-200">
            {article.authorName}
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-neutral-500 dark:text-neutral-400">
            {formattedDate} · {article.readingTime} min read
          </span>
        </div>

        {/* Audio Dispatch Player Bar */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 py-1.5 shadow-xs text-xs text-neutral-600 dark:text-neutral-300">
            <button
              type="button"
              onClick={() => setAudioProgress((p) => Math.max(0, p - 10))}
              aria-label="Rewind 15 seconds"
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
            >
              <RotateCcw className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
              className="flex size-6 items-center justify-center rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition shadow-xs"
            >
              {isPlaying ? <Pause className="size-3 fill-current" /> : <Play className="size-3 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => setAudioProgress((p) => Math.min(100, p + 10))}
              aria-label="Forward 15 seconds"
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
            >
              <RotateCw className="size-3.5" />
            </button>

            {/* Scrubber timeline */}
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 sm:w-28 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative">
                <div
                  className="h-full bg-[#c25e37] transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-neutral-400">
                {isPlaying ? "1:24" : "0:00"} / 4:12
              </span>
            </div>

            <button
              type="button"
              onClick={nextSpeed}
              className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 font-mono text-[10px] font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 transition"
            >
              {audioSpeed}
            </button>

            <span className="hidden sm:inline text-[11px] font-medium text-neutral-400">
              Audio dispatch
            </span>
          </div>
        </div>

        {/* Large Cover Image */}
        <div className="relative mx-auto mt-6 aspect-[2.1/1] max-w-4xl overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800 shadow-xs">
          <Image
            src={article.coverImage || "https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?auto=format&fit=crop&w=2400&q=80"}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        </div>
        <p className="mt-2 text-center text-[11px] text-neutral-400 dark:text-neutral-500">
          A quiet morning · Journal entries from the local-first design sprint.
        </p>
      </header>

      {/* 2. Main Body Grid: Floating Dock (Left) + Reading Card (Center) + Outline (Right) */}
      <div className="mx-auto max-w-5xl mt-8 px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)_13rem] gap-6 lg:gap-8 items-start relative">
        {/* Left Sticky Reaction Dock */}
        <aside className="hidden lg:flex sticky top-28 flex-col items-center gap-1.5 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 p-1.5 shadow-sm backdrop-blur-md text-neutral-500">
          <button
            type="button"
            onClick={() => setBookmarked(!bookmarked)}
            aria-label="Bookmark"
            title="Bookmark"
            className={`flex size-9 items-center justify-center rounded-full transition ${
              bookmarked ? "text-[#c25e37] bg-[#c25e37]/10" : "hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            <Bookmark className={`size-4 ${bookmarked ? "fill-current" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              setLiked(!liked);
              setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
            }}
            aria-label="Like"
            title="Applaud story"
            className={`flex flex-col size-9 items-center justify-center rounded-full transition ${
              liked ? "text-[#c25e37] bg-[#c25e37]/10" : "hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            <Heart className={`size-3.5 ${liked ? "fill-current" : ""}`} />
            <span className="text-[9px] font-bold leading-none mt-0.5">{likeCount}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: article.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            aria-label="Share"
            title="Share"
            className="flex size-9 items-center justify-center rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <Share2 className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (fontSize === "base") setFontSize("lg");
              else if (fontSize === "lg") setFontSize("sm");
              else setFontSize("base");
            }}
            aria-label="Toggle font size"
            title="Toggle font size"
            className="flex size-9 items-center justify-center rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <Type className="size-4" />
          </button>
        </aside>

        {/* Center: The Main White Content Card */}
        <div className="w-full space-y-6">
          <article className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-10 lg:p-12 shadow-sm">
            {/* Key Takeaways Box (Matches media_1795182596112_e5006058.jpg) */}
            <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 p-5 sm:p-6 mb-8">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c25e37] uppercase tracking-wider mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c25e37]" />
                <span>Key takeaways</span>
              </div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 italic mb-5 leading-relaxed">
                &ldquo;The useful notes were the short ones, written in the margins of the work itself.&rdquo;
              </p>

              {/* 3-column metadata table */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/80 text-[11px]">
                <div>
                  <span className="block text-neutral-400 uppercase text-[10px] font-semibold">Section</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{article.category}</span>
                </div>
                <div>
                  <span className="block text-neutral-400 uppercase text-[10px] font-semibold">Reading time</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{article.readingTime} min</span>
                </div>
                <div>
                  <span className="block text-neutral-400 uppercase text-[10px] font-semibold">Format</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">Field dispatch</span>
                </div>
                <div>
                  <span className="block text-neutral-400 uppercase text-[10px] font-semibold">Published</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{formattedDate}</span>
                </div>
                <div>
                  <span className="block text-neutral-400 uppercase text-[10px] font-semibold">Dispatch</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">Issue #3</span>
                </div>
                <div>
                  <span className="block text-neutral-400 uppercase text-[10px] font-semibold">Words</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">750 words</span>
                </div>
              </div>
            </div>

            {/* Story Text with dynamic font size */}
            <div
              className={`space-y-8 leading-relaxed text-neutral-700 dark:text-neutral-300 ${
                fontSize === "lg" ? "text-lg" : fontSize === "sm" ? "text-sm" : "text-[15px] sm:text-base"
              }`}
            >
              {/* Section 01 */}
              <section id="beside-the-file" className="scroll-mt-24">
                <span className="text-xs font-bold text-[#c25e37] uppercase tracking-widest">
                  01
                </span>
                <h2 className="mt-1 font-sans text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  Beside the file
                </h2>
                <div className="mt-3 space-y-3.5">
                  <p>
                    For three weeks in October, three engineers lived on the local-first branch. We didn&apos;t keep a backlog or sprint tickets; the file you were in was the file you were actually writing.
                  </p>
                  <p>
                    The notebook began as a reaction to a single pull request that broke the build on a Friday. The thought was simple: document the human cost of a failing deploy and never let it happen to the core protocol again.
                  </p>
                </div>
              </section>

              {/* Section 02 */}
              <section id="short-on-purpose" className="scroll-mt-24 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <span className="text-xs font-bold text-[#c25e37] uppercase tracking-widest">
                  02
                </span>
                <h2 className="mt-1 font-sans text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  Short on purpose
                </h2>
                <div className="mt-3 space-y-3.5">
                  <p>
                    Writing in the margin is an art form. Long-winded architecture paragraphs were treated as code smell in this sprint: if you couldn&apos;t state the invariant in a sentence, the interface was broken.
                  </p>
                  <p>
                    A field dispatch is not a dissertation. It&apos;s a quick map showing where the rocks are so the next engineer can walk without breaking their stride.
                  </p>
                </div>
              </section>

              {/* Section 03 */}
              <section id="what-survived" className="scroll-mt-24 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <span className="text-xs font-bold text-[#c25e37] uppercase tracking-widest">
                  03
                </span>
                <h2 className="mt-1 font-sans text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  What survived
                </h2>
                <div className="mt-3 space-y-3.5">
                  <p>
                    After the rewrite, the codebase was pristine. What survived, however, was neither the tests nor the commit messages. The notebook alone survived.
                  </p>
                  <p>
                    The local-first engine had outlived the server infrastructure it was built to bypass. Clear documentation that captures the human problem will outlast any specific line of code.
                  </p>
                </div>
              </section>
            </div>

            {/* Tags row at bottom of content card */}
            <div className="mt-10 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-medium text-neutral-400">Filed under:</span>
              <span className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-0.5 text-neutral-600 dark:text-neutral-300">
                systems
              </span>
              <span className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-0.5 text-neutral-600 dark:text-neutral-300">
                writing
              </span>
            </div>
          </article>

          {/* 3. Post-Article Interactive Cards (Stacked) */}

          {/* Card A: Was this story useful? */}
          <div className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                  Was this story useful?
                </h3>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  Your feedback helps us commission better pieces.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setUsefulVote(usefulVote === "useful" ? null : "useful");
                    setUsefulCount((c) => (usefulVote === "useful" ? c - 1 : c + 1));
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    usefulVote === "useful"
                      ? "border-[#c25e37] bg-[#c25e37] text-white"
                      : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 text-neutral-800 dark:text-neutral-200"
                  }`}
                >
                  <ThumbsUp className="size-3.5" />
                  <span>Useful ({usefulCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUsefulVote(usefulVote === "not-for-me" ? null : "not-for-me")}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                    usefulVote === "not-for-me"
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  <ThumbsDown className="size-3.5" />
                  <span>Not for me</span>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
              <span>Share your notes with the desk</span>
              <Link
                href={`/ask?q=Tell+me+about+${encodeURIComponent(article.title)}`}
                className="inline-flex items-center gap-1 text-[#c25e37] font-semibold hover:underline"
              >
                <Sparkles className="size-3.5" />
                <span>Ask Lizan AI about this dispatch</span>
              </Link>
            </div>
          </div>

          {/* Card B: Author Bio Card */}
          <div className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-neutral-900 text-white font-bold text-sm shrink-0">
                {article.authorName.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Written by
                </p>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {article.authorName}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                  Staff writer at Lizan. Writing on systems, local-first software, and editorial tools.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFollowing(!following)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                following
                  ? "border-[#c25e37] bg-[#c25e37]/10 text-[#c25e37]"
                  : "border-neutral-200/90 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              }`}
            >
              {following ? "Following" : "+ Follow"}
            </button>
          </div>

          {/* Card C: Conversation / Discussion Card */}
          <div className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-[#c25e37]" />
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                  Conversation ({comments.length})
                </h3>
              </div>
              <span className="text-xs text-neutral-400">
                Dispatches from readers and engineers
              </span>
            </div>

            {/* Comment Post Box */}
            <form onSubmit={handlePostComment} className="flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add to the dispatch... (Markdown supported)"
                className="h-10 flex-1 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:bg-white dark:focus:bg-neutral-900 transition"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-xs cursor-pointer"
              >
                Post dispatch
              </button>
            </form>

            {/* Toggle show/hide comments */}
            <div>
              <button
                type="button"
                onClick={() => setShowComments(!showComments)}
                className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
              >
                {showComments ? "Hide comments from the community ▴" : "Show comments from the community ▾"}
              </button>

              {showComments && (
                <div className="mt-3.5 space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  {comments.map((c) => (
                    <div key={c.id} className="rounded-xl border border-neutral-100 dark:border-neutral-800/80 p-3 bg-neutral-50/50 dark:bg-neutral-950/30 text-xs">
                      <div className="flex items-center justify-between text-neutral-500 mb-1">
                        <span className="font-semibold text-neutral-900 dark:text-white">{c.author}</span>
                        <span className="text-[11px] text-neutral-400">{c.time}</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar: On this page */}
        <aside className="hidden lg:block sticky top-28">
          <div className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-xs text-xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 dark:border-neutral-800 text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
              <span>On this page</span>
              <span className="font-mono text-[#c25e37]">01 / 03</span>
            </div>

            <nav className="mt-3 space-y-1.5">
              <a
                href="#beside-the-file"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                  activeHeading === "beside-the-file"
                    ? "text-[#c25e37] font-semibold bg-[#c25e37]/8 border-l-2 border-[#c25e37]"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
                }`}
              >
                <span>1. Beside the file</span>
              </a>

              <a
                href="#short-on-purpose"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                  activeHeading === "short-on-purpose"
                    ? "text-[#c25e37] font-semibold bg-[#c25e37]/8 border-l-2 border-[#c25e37]"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
                }`}
              >
                <span>2. Short on purpose</span>
              </a>

              <a
                href="#what-survived"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                  activeHeading === "what-survived"
                    ? "text-[#c25e37] font-semibold bg-[#c25e37]/8 border-l-2 border-[#c25e37]"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
                }`}
              >
                <span>3. What survived</span>
              </a>
            </nav>
          </div>
        </aside>
      </div>

      {/* 4. "Read next" 3-Card Grid Section (Matches media_1795182596112_e5006058.jpg) */}
      <section className="mx-auto max-w-5xl mt-20 px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Read next
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Pieces on systems, local-first, and editor craft.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.slice(0, 3).map((story) => (
            <article
              key={story.id}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-3 sm:p-3.5 hover:shadow-md transition-all duration-300"
            >
              <div>
                <Link
                  href={`/article/${story.slug}`}
                  className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 mb-3"
                >
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </Link>

                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                  <span className="font-semibold text-[#c25e37] uppercase tracking-wider text-[10.5px]">
                    {story.category}
                  </span>
                  <span>·</span>
                  <span>{story.authorName}</span>
                </div>

                <h3 className="mt-1.5 text-[15px] font-bold leading-snug tracking-tight text-neutral-950 dark:text-white transition-colors group-hover:text-[#c25e37] line-clamp-2">
                  <Link href={`/article/${story.slug}`}>{story.title}</Link>
                </h3>

                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {story.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
