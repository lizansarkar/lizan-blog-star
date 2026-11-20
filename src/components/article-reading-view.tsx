"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Clock,
  Eye,
  Headphones,
  Bookmark,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ArrowUp,
  Link2,
  Sparkles,
  RotateCcw,
  RotateCw,
  Play,
  Pause,
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

export function ArticleReadingView({
  article,
  relatedArticles,
}: ArticleReadingProps) {
  // Top running line (scroll progress bar)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Audio player state
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Left dock reaction counts
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);
  const [saved, setSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Useful card state
  const [usefulVote, setUsefulVote] = useState<"useful" | "not-for-me" | null>(
    null,
  );
  const [usefulCount, setUsefulCount] = useState(14);
  const [following, setFollowing] = useState(false);

  // Discussion state
  const [comments, setComments] = useState<Comment[]>(defaultStoryComments);
  const [newCommentText, setNewCommentText] = useState("");
  const [showComments, setShowComments] = useState(true);

  // Table of Contents active heading
  const [activeHeading, setActiveHeading] = useState("beside-the-file");

  // Track window scroll progress for top running line and TOC
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      const headings = ["beside-the-file", "short-on-purpose", "what-survived"];
      const scrollPos = window.scrollY + 220;

      for (const id of headings) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height + 200) {
            setActiveHeading(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => {
    if (userVote === "like") {
      setUserVote(null);
      setLikes((l) => l - 1);
    } else {
      if (userVote === "dislike") setDislikes((d) => d - 1);
      setUserVote("like");
      setLikes((l) => l + 1);
    }
  };

  const handleDislike = () => {
    if (userVote === "dislike") {
      setUserVote(null);
      setDislikes((d) => d - 1);
    } else {
      if (userVote === "like") setLikes((l) => l - 1);
      setUserVote("dislike");
      setDislikes((d) => d + 1);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const readingTime =
    article.slug === "the-notebook-that-survived-the-rewrite"
      ? 1
      : article.readingTime || 1;

  const authorName =
    article.slug === "the-notebook-that-survived-the-rewrite"
      ? "Jules Berger"
      : article.authorName;

  const formattedDate = article.publishedAt
    ? format(new Date(article.publishedAt), "d MMMM yyyy")
    : "9 November 2026";

  return (
    <div className="w-full relative">
      {/* 1. TOP RUNNING LINE (Progress bar at the very top of the viewport) */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#c25e37] z-[100] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(194,94,55,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main 7XL Container */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        {/* Header & Hero Area (Matches media_1795183089924_9d22ddfd.jpg) */}
        <header className="mx-auto max-w-7xl pt-6 pb-2 text-center">
          {/* Breadcrumb: Articles > Engineering */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-neutral-500 font-medium flex items-center justify-center gap-1.5 mb-2"
          >
            <Link
              href="/articles"
              className="hover:text-neutral-900 dark:hover:text-white transition"
            >
              Articles
            </Link>
            <span className="text-neutral-400">&gt;</span>
            <span className="text-neutral-900 dark:text-neutral-100 font-semibold">
              {article.category}
            </span>
          </nav>

          {/* Tags row: [ENGINEERING] pill + reading time */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-neutral-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min read
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.14]">
            {article.title}
          </h1>

          {/* Standfirst / Dek */}
          <p className="mt-3.5 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Byline */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white font-bold text-[10px]">
              {authorName === "Lizan Sarkar" ? "LS" : "J"}
            </div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-200">
              {authorName}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              <span>{formattedDate}</span>
              <span>·</span>
              <Eye className="w-3 h-3 ml-0.5" />
              <span>132 reads</span>
            </span>
          </div>

          {/* Red-Circled Action Bar from User's First Image */}
          <div className="w-full max-w-4xl mx-auto border-y border-neutral-200/80 dark:border-neutral-800 py-2.5 my-6 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-300">
            {/* Left: Share + Social Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={copyUrl}
                className="rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1 flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition cursor-pointer"
              >
                <Share2 className="size-3.5 text-neutral-500" />
                <span>Share</span>
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="size-7 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                𝕏
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="size-7 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                in
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Facebook"
                className="size-7 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                f
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                title="Share via Email"
                className="size-7 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                ✉
              </a>

              <button
                type="button"
                onClick={copyUrl}
                title="Copy Link"
                className="size-7 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition cursor-pointer"
              >
                <Link2 className="size-3.5 text-neutral-600 dark:text-neutral-300" />
              </button>
            </div>

            {/* Right: Listen · 1 min + Save */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAudioOpen(!isAudioOpen)}
                className={`rounded-full border px-3.5 py-1 flex items-center gap-1.5 text-xs font-medium transition cursor-pointer ${
                  isAudioOpen
                    ? "border-[#c25e37] bg-[#c25e37]/10 text-[#c25e37]"
                    : "border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50"
                }`}
              >
                <Headphones className="size-3.5 text-[#c25e37]" />
                <span>Listen · {readingTime} min</span>
              </button>

              <button
                type="button"
                onClick={() => setSaved(!saved)}
                className={`rounded-full border px-3.5 py-1 text-xs font-medium transition cursor-pointer ${
                  saved
                    ? "border-[#c25e37] bg-[#c25e37] text-white"
                    : "border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* Expandable Audio Dispatch Bar if toggled */}
          {isAudioOpen && (
            <div className="my-4 flex justify-center animate-in fade-in duration-200">
              <div className="inline-flex items-center gap-3 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-1.5 shadow-sm text-xs">
                <button
                  type="button"
                  onClick={() => setAudioProgress((p) => Math.max(0, p - 10))}
                  aria-label="Rewind 15 seconds"
                  className="text-neutral-400 hover:text-neutral-900 transition"
                >
                  <RotateCcw className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  className="flex size-6 items-center justify-center rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition"
                >
                  {isPlaying ? (
                    <Pause className="size-3 fill-current" />
                  ) : (
                    <Play className="size-3 fill-current ml-0.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setAudioProgress((p) => Math.min(100, p + 10))}
                  aria-label="Forward 15 seconds"
                  className="text-neutral-400 hover:text-neutral-900 transition"
                >
                  <RotateCw className="size-3.5" />
                </button>
                <span className="font-mono text-[10px] text-neutral-400">
                  {isPlaying ? "0:42" : "0:00"} / 1:15
                </span>
                <span className="text-[11px] font-medium text-neutral-400">
                  Audio narration
                </span>
              </div>
            </div>
          )}

          {/* Large Cover Image */}
          <div className="relative mx-auto mt-2 aspect-[2.1/1] max-w-7xl overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800 shadow-xs">
            <Image
              src={
                article.coverImage ||
                "https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?auto=format&fit=crop&w=2400&q=80"
              }
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 960px, 100vw"
            />
          </div>
          <p className="mt-2 text-center text-[11px] text-neutral-400 dark:text-neutral-500">
            A quiet morning · Journal entries from the local-first design
            sprint.
          </p>
        </header>

        {/* 2. Main 3-Column Reading Layout (Left Dock + Reading Body + Right TOC) */}
        <div className="mx-auto max-w-7xl mt-10 grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)_16rem] gap-6 lg:gap-8 items-start relative">
          {/* Left Sticky Reaction Dock (Matches media_1795183132761_5bb9a4a7.png) */}
          <aside className="hidden lg:flex sticky top-28 flex-col items-center gap-3 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 py-3 px-2 shadow-sm backdrop-blur-md text-neutral-500">
            {/* Thumbs up + count */}
            <button
              type="button"
              onClick={handleLike}
              title="Thumbs up"
              className={`flex flex-col items-center justify-center transition cursor-pointer ${
                userVote === "like"
                  ? "text-[#c25e37]"
                  : "hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <ThumbsUp
                className={`size-4 ${userVote === "like" ? "fill-current" : ""}`}
              />
              <span className="text-[10px] font-mono font-bold leading-none mt-1">
                {likes}
              </span>
            </button>

            {/* Thumbs down + count */}
            <button
              type="button"
              onClick={handleDislike}
              title="Thumbs down"
              className={`flex flex-col items-center justify-center transition cursor-pointer ${
                userVote === "dislike"
                  ? "text-neutral-900 dark:text-white"
                  : "hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <ThumbsDown
                className={`size-4 ${userVote === "dislike" ? "fill-current" : ""}`}
              />
              <span className="text-[10px] font-mono font-bold leading-none mt-1">
                {dislikes}
              </span>
            </button>

            {/* Comments anchor */}
            <a
              href="#comments"
              title="Comments"
              className="flex flex-col items-center justify-center hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
            >
              <MessageSquare className="size-4" />
              <span className="text-[10px] font-mono font-bold leading-none mt-1">
                {comments.length}
              </span>
            </a>

            <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />

            {/* Scroll to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              title="Scroll to top"
              className="flex items-center justify-center hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
            >
              <ArrowUp className="size-4" />
            </button>
          </aside>

          {/* Center Column: Reading Content Card + Interactive Cards */}
          <div className="w-full space-y-6">
            <article className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-10 lg:p-14 shadow-sm">
              {/* Key Takeaways Box */}
              <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 p-5 sm:p-6 mb-8">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c25e37] uppercase tracking-wider mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c25e37]" />
                  <span>Key takeaways</span>
                </div>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 italic mb-5 leading-relaxed">
                  &ldquo;The useful notes were the short ones, written in the
                  margins of the work itself.&rdquo;
                </p>

                {/* 3-column metadata table */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/80 text-[11px]">
                  <div>
                    <span className="block text-neutral-400 uppercase text-[10px] font-semibold">
                      Section
                    </span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {article.category}
                    </span>
                  </div>
                  <div>
                    <span className="block text-neutral-400 uppercase text-[10px] font-semibold">
                      Reading time
                    </span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {article.readingTime || 1} min
                    </span>
                  </div>
                  <div>
                    <span className="block text-neutral-400 uppercase text-[10px] font-semibold">
                      Format
                    </span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      Field dispatch
                    </span>
                  </div>
                  <div>
                    <span className="block text-neutral-400 uppercase text-[10px] font-semibold">
                      Published
                    </span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {formattedDate}
                    </span>
                  </div>
                  <div>
                    <span className="block text-neutral-400 uppercase text-[10px] font-semibold">
                      Dispatch
                    </span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      Issue #3
                    </span>
                  </div>
                  <div>
                    <span className="block text-neutral-400 uppercase text-[10px] font-semibold">
                      Words
                    </span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      750 words
                    </span>
                  </div>
                </div>
              </div>

              {/* Story Text matching media_1795183132761_5bb9a4a7.png exactly */}
              <div className="space-y-8 leading-relaxed text-neutral-700 dark:text-neutral-300 text-[15px] sm:text-base">
                {/* Section 01 */}
                <section id="beside-the-file" className="scroll-mt-24">
                  <span className="text-xs font-bold text-[#c25e37] uppercase tracking-widest">
                    01
                  </span>
                  <h2 className="mt-1 font-sans text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                    Beside the file
                  </h2>
                  <div className="mt-3.5 space-y-3.5">
                    <p>
                      A second system for notes becomes a second job. The
                      notebook that lasts is the one that opens beside the file
                      you are already editing.
                    </p>
                    <p>
                      The rewrite always promised a cleaner place for thoughts.
                      The thoughts that mattered were already in the margin of
                      the work, written while the problem was still warm.
                    </p>
                  </div>
                </section>

                {/* Section 02 */}
                <section
                  id="short-on-purpose"
                  className="scroll-mt-24 pt-6 border-t border-neutral-100 dark:border-neutral-800/80"
                >
                  <span className="text-xs font-bold text-[#c25e37] uppercase tracking-widest">
                    02
                  </span>
                  <h2 className="mt-1 font-sans text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                    Short on purpose
                  </h2>
                  <div className="mt-3.5 space-y-3.5">
                    <p>
                      We kept the entries short on purpose. A paragraph you can
                      finish is a paragraph you will trust later.
                    </p>
                    <p>
                      A long note is a draft of a document nobody asked for. A
                      short one is a reminder you can check without leaving the
                      task.
                    </p>
                  </div>
                </section>

                {/* Section 03 */}
                <section
                  id="what-survived"
                  className="scroll-mt-24 pt-6 border-t border-neutral-100 dark:border-neutral-800/80"
                >
                  <span className="text-xs font-bold text-[#c25e37] uppercase tracking-widest">
                    03
                  </span>
                  <h2 className="mt-1 font-sans text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                    What survived
                  </h2>
                  <div className="mt-3.5 space-y-3.5">
                    <p>
                      After the rewrite, the surviving notes were the ones with
                      a date, a file, and one sentence. The taxonomy did not
                      survive. The sentence did.
                    </p>
                    <p>
                      If a note cannot be found from the work it describes, it
                      is already lost. Put it where the next person will be
                      standing.
                    </p>
                  </div>
                </section>
              </div>

              {/* Tags row at bottom of content card */}
              <div className="mt-10 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2 text-xs text-neutral-500">
                <span className="font-medium text-neutral-400">
                  Filed under:
                </span>
                <span className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-0.5 text-neutral-600 dark:text-neutral-300">
                  notes
                </span>
                <span className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-0.5 text-neutral-600 dark:text-neutral-300">
                  writing
                </span>
              </div>
            </article>

            {/* Post-Article Interactive Cards */}

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
                      setUsefulCount((c) =>
                        usefulVote === "useful" ? c - 1 : c + 1,
                      );
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
                    onClick={() =>
                      setUsefulVote(
                        usefulVote === "not-for-me" ? null : "not-for-me",
                      )
                    }
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
                  {article.authorName === "Lizan Sarkar" ? "LS" : "J"}
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Written by
                  </p>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {article.authorName}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                    Staff writer at Lizan. Writing on systems, local-first
                    software, and editorial tools.
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
            <div
              id="comments"
              className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-xs space-y-4"
            >
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
                  {showComments
                    ? "Hide comments from the community ▴"
                    : "Show comments from the community ▾"}
                </button>

                {showComments && (
                  <div className="mt-3.5 space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    {comments.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-xl border border-neutral-100 dark:border-neutral-800/80 p-3 bg-neutral-50/50 dark:bg-neutral-950/30 text-xs"
                      >
                        <div className="flex items-center justify-between text-neutral-500 mb-1">
                          <span className="font-semibold text-neutral-900 dark:text-white">
                            {c.author}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {c.time}
                          </span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {c.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar: ON THIS PAGE (Matches media_1795183132761_5bb9a4a7.png) */}
          <aside className="hidden lg:block sticky top-28">
            <div className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm text-xs">
              {/* Header: ON THIS PAGE + 1 min left */}
              <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-neutral-500 pb-1">
                <span>On This Page</span>
                <span className="font-mono text-neutral-400">1 min left</span>
              </div>

              {/* Reading Progress Line underneath the header (pointed to by the red arrow) */}
              <div className="h-[2.5px] w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mt-1 mb-3">
                <div
                  className="h-full bg-[#c25e37] transition-all duration-150 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              {/* Section Links with active terracotta vertical indicator */}
              <nav className="space-y-2 mt-2">
                <a
                  href="#beside-the-file"
                  className={`block transition-colors ${
                    activeHeading === "beside-the-file"
                      ? "border-l-2 border-[#c25e37] pl-2 text-neutral-900 dark:text-white font-semibold"
                      : "pl-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  Beside the file
                </a>

                <a
                  href="#short-on-purpose"
                  className={`block transition-colors ${
                    activeHeading === "short-on-purpose"
                      ? "border-l-2 border-[#c25e37] pl-2 text-neutral-900 dark:text-white font-semibold"
                      : "pl-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  Short on purpose
                </a>

                <a
                  href="#what-survived"
                  className={`block transition-colors ${
                    activeHeading === "what-survived"
                      ? "border-l-2 border-[#c25e37] pl-2 text-neutral-900 dark:text-white font-semibold"
                      : "pl-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  What survived
                </a>
              </nav>
            </div>
          </aside>
        </div>

        {/* 3. "Read next" 3-Card Grid Section (Max-w-7xl) */}
        <section className="mx-auto max-w-7xl mt-20">
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
    </div>
  );
}
