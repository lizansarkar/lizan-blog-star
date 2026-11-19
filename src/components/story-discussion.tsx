"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, Send, Reply, Sparkles } from "lucide-react";

interface CommentItem {
  id: string;
  author: string;
  isAuthor?: boolean;
  timeAgo: string;
  content: string;
  likes: number;
  liked?: boolean;
}

interface StoryDiscussionProps {
  slug: string;
  initialComments?: CommentItem[];
}

const defaultComments: CommentItem[] = [
  {
    id: "c1",
    author: "Sam Ibarra",
    timeAgo: "2 days ago",
    content: "The 2 a.m. test is going straight into our team doc. We had a deploy last month where nobody could tell from the log whether the migration had run.",
    likes: 18,
  },
  {
    id: "c2",
    author: "Lizan Sarkar",
    isAuthor: true,
    timeAgo: "1 day ago",
    content: "That exact moment is why I wrote this. Splitting migrate into its own named step was the single biggest fix for us.",
    likes: 24,
  },
  {
    id: "c3",
    author: "Elena Rostova",
    timeAgo: "14 hours ago",
    content: "We moved to local-first replication using CRDTs on SQLite. Latency dropped to zero for our offline field inspectors.",
    likes: 9,
  },
];

export function StoryDiscussion({ slug, initialComments = defaultComments }: StoryDiscussionProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [sortOrder, setSortOrder] = useState<"top" | "newest">("top");
  const [submitting, setSubmitting] = useState(false);

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const liked = !c.liked;
          return {
            ...c,
            liked,
            likes: liked ? c.likes + 1 : c.likes - 1,
          };
        }
        return c;
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    const added: CommentItem = {
      id: `c_${Date.now()}`,
      author: authorName.trim() || "Reader",
      timeAgo: "Just now",
      content: newComment.trim(),
      likes: 1,
      liked: true,
    };

    setComments((prev) => [added, ...prev]);
    setNewComment("");
    setSubmitting(false);
  };

  const sorted = [...comments].sort((a, b) => {
    if (sortOrder === "top") return b.likes - a.likes;
    return 0; // maintain newest insertion
  });

  return (
    <div id="comments" className="mt-14 border-t border-border pt-10 space-y-6">
      {/* Header and Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="font-sans text-xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>Discussion ({comments.length} comments)</span>
        </h3>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Sort by:</span>
          <button
            onClick={() => setSortOrder("top")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              sortOrder === "top"
                ? "bg-muted font-semibold text-foreground"
                : "hover:text-foreground"
            }`}
          >
            Top
          </button>
          <span>·</span>
          <button
            onClick={() => setSortOrder("newest")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              sortOrder === "newest"
                ? "bg-muted font-semibold text-foreground"
                : "hover:text-foreground"
            }`}
          >
            Newest
          </button>
        </div>
      </div>

      {/* Write a comment form */}
      <form
        onSubmit={handleAddComment}
        className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs"
      >
        <div className="space-y-3">
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name (optional, defaults to Reader)"
            className="w-full text-xs bg-muted/30 border border-border/70 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            placeholder="Contribute your experience or question to this dispatch..."
            className="w-full text-xs sm:text-sm bg-transparent border border-border/70 rounded-xl p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            required
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-muted-foreground">
              Supports constructive discussion & markdown.
            </span>
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              <Send className="h-3 w-3" /> Post Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {sorted.map((comment) => (
          <div
            key={comment.id}
            className={`rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all ${
              comment.isAuthor ? "border-l-4 border-l-primary bg-primary/5" : ""
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{comment.author}</span>
                {comment.isAuthor && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Author
                  </span>
                )}
              </div>
              <span className="text-muted-foreground font-mono text-[11px]">{comment.timeAgo}</span>
            </div>

            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
              {comment.content}
            </p>

            <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-4 text-xs">
              <button
                type="button"
                onClick={() => handleLike(comment.id)}
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  comment.liked ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{comment.likes}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewComment(`@${comment.author} `);
                }}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Reply className="h-3.5 w-3.5" /> Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
