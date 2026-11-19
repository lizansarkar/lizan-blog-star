"use client";

import { useState } from "react";
import Link from "next/link";
import { ThumbsUp, Bookmark, MessageSquare, ArrowUp, Sparkles, Share2 } from "lucide-react";

interface ArticleInteractionsProps {
  title: string;
  slug: string;
  initialLikes?: number;
  initialCommentsCount?: number;
}

export function ArticleInteractions({
  title,
  slug,
  initialLikes = 12,
  initialCommentsCount = 4,
}: ArticleInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Sticky Left Reaction Dock (Matches story.jpg) */}
      <aside className="hidden xl:flex fixed left-8 top-1/3 z-30 flex-col items-center gap-3 rounded-full border border-border/80 bg-background/90 p-2 shadow-lg backdrop-blur-md">
        {/* Like */}
        <button
          type="button"
          onClick={handleLike}
          title="Applaud story"
          className={`flex h-10 w-10 flex-col items-center justify-center rounded-full transition-all ${
            liked
              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-[10px] font-mono font-bold leading-none mt-0.5">{likes}</span>
        </button>

        {/* Bookmark */}
        <button
          type="button"
          onClick={handleSave}
          title="Save story"
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
            saved
              ? "bg-primary/20 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </button>

        {/* Comments anchor */}
        <a
          href="#comments"
          title="Comments"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all relative"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            {initialCommentsCount}
          </span>
        </a>

        <div className="h-4 w-px bg-border/80 my-1" />

        {/* Scroll to Top */}
        <button
          type="button"
          onClick={scrollToTop}
          title="Scroll to top"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </aside>

      {/* Floating Ask Lizan Pill in bottom-right corner (Matches story.jpg) */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href={`/ask?q=Tell+me+about+${encodeURIComponent(title)}`}
          className="group flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-neutral-900/90 px-4 py-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-neutral-900"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span>Ask Lizan about this</span>
        </Link>
      </div>
    </>
  );
}
