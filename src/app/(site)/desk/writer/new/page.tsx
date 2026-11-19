"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Table,
  Link2,
  ImageIcon,
  Video,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

export default function StoryEditorPage() {
  const router = useRouter();
  const [title, setTitle] = useState("The case for boring deployment pipelines");
  const [dek, setDek] = useState("The most expensive pipeline is the one only one person can explain on a Friday.");
  const [status, setStatus] = useState<"Published" | "Scheduled" | "Draft">("Published");
  const [category, setCategory] = useState("Engineering");
  const [tags, setTags] = useState("devops, shipping");
  const [content, setContent] = useState(
    `The most expensive pipeline is not the slowest one or the one with the biggest cloud bill. It is the one only one person can explain on a Friday afternoon. If the explanation needs a whiteboard, the pipeline is already late.\n\nThis piece makes the case for restraint: what boring means in practice, the four stages most teams need, how to tell whether your own pipeline is drifting toward clever, and a checklist you can work through this week.`
  );
  const [aiDrafting, setAiDrafting] = useState(false);
  const [published, setPublished] = useState(false);

  // AI Dek Drafter (Simulates Google Gemini "Write it for me")
  const handleWriteDek = () => {
    setAiDrafting(true);
    setTimeout(() => {
      setDek("Predictable releases, additive migrations, and rollback buttons built for 2 a.m. heroics.");
      setAiDrafting(false);
    }, 700);
  };

  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!title.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/articles/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          dek,
          content,
          category,
          tags,
          status: "PUBLISHED",
        }),
      });

      if (res.ok) {
        setPublished(true);
        setTimeout(() => {
          setPublished(false);
          router.push(`/article/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setPublished(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12 space-y-6">
      {/* Top Writer Subnav (Matches editor.jpg) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background font-bold text-xs">
            L
          </div>
          <span className="font-bold text-base text-foreground">Lizan.</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-mono uppercase text-muted-foreground">
            Writer desk
          </span>
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-2 rounded-full border border-border bg-card p-1 text-xs">
          <Link
            href="/desk/writer"
            className="rounded-full px-3.5 py-1 text-muted-foreground hover:text-foreground font-medium"
          >
            Stories
          </Link>
          <span className="rounded-full bg-foreground text-background px-3.5 py-1 font-semibold shadow-sm">
            Editor
          </span>
          <span className="rounded-full px-3.5 py-1 text-muted-foreground font-medium opacity-60">
            Categories & tags
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Link href="/desk/reader" className="hover:text-foreground">Reader desk</Link>
          <span>·</span>
          <Link href="/" className="inline-flex items-center gap-1 text-primary hover:underline font-semibold">
            <span>View site</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Editor Header Navigation */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <Link
            href="/desk/writer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All stories</span>
          </Link>
          <h1 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Edit story
          </h1>
          <p className="text-xs text-muted-foreground">
            Changes go live when you save a published story.
          </p>
        </div>

        <Link
          href="/article/the-case-for-boring-deployment-pipelines"
          target="_blank"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <span>View live</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Main Editor Grid (Left: Document, Right: Settings Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Document Editor Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Story Title..."
            className="w-full font-sans text-3xl sm:text-5xl font-extrabold tracking-tight bg-transparent text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
          />

          {/* Dek / Subtitle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-muted-foreground">Dek</span>
              <button
                type="button"
                onClick={handleWriteDek}
                disabled={aiDrafting}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <Sparkles className="h-3 w-3" />
                <span>{aiDrafting ? "Drafting..." : "Write it for me"}</span>
              </button>
            </div>
            <textarea
              rows={2}
              value={dek}
              onChange={(e) => setDek(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-card p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Tiptap Toolbar (Matches editor.jpg) */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border/80 bg-card p-1.5 text-xs text-muted-foreground">
            <button type="button" title="Bold" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <Bold className="h-3.5 w-3.5" />
            </button>
            <button type="button" title="Italic" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <Italic className="h-3.5 w-3.5" />
            </button>
            <div className="h-4 w-px bg-border/60 mx-1" />
            <button type="button" title="Heading 2" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground font-bold">
              <Heading2 className="h-3.5 w-3.5" />
            </button>
            <button type="button" title="Heading 3" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground font-bold">
              <Heading3 className="h-3.5 w-3.5" />
            </button>
            <div className="h-4 w-px bg-border/60 mx-1" />
            <button type="button" title="Bullet List" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <List className="h-3.5 w-3.5" />
            </button>
            <button type="button" title="Numbered List" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <ListOrdered className="h-3.5 w-3.5" />
            </button>
            <button type="button" title="Blockquote" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <Quote className="h-3.5 w-3.5" />
            </button>
            <button type="button" title="Code Block" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <Code className="h-3.5 w-3.5" />
            </button>
            <div className="h-4 w-px bg-border/60 mx-1" />
            <button type="button" title="Insert Table" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <Table className="h-3.5 w-3.5" />
            </button>
            <button type="button" title="Insert Link" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <Link2 className="h-3.5 w-3.5" />
            </button>
            <button type="button" title="Upload Image" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <ImageIcon className="h-3.5 w-3.5" />
            </button>
            <button type="button" title="YouTube Video" className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground">
              <Video className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Story Body */}
          <textarea
            rows={18}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-2xl border border-border/80 bg-card p-6 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Sidebar Cards Column (Matches editor.jpg) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Publish Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Publish</h3>

            <div className="space-y-1.5">
              <label className="text-[11px] text-muted-foreground">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePublish}
                className="flex-1 h-9 inline-flex items-center justify-center rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                {published ? "Saved!" : "Publish"}
              </button>
              <button
                type="button"
                title="Delete story"
                className="h-9 w-9 flex items-center justify-center rounded-xl border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Organize Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Organize</h3>

            <div className="space-y-1.5">
              <label className="text-[11px] text-muted-foreground">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
              </input>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-muted-foreground">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="text-[10px] text-muted-foreground">Separate tags with commas. Up to 8.</span>
            </div>
          </div>

          {/* Cover Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Cover</h3>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-900">
              <Image
                src="https://images.unsplash.com/photo-1565900290201-6116cd97a6b8?auto=format&fit=crop&w=1200&q=80"
                alt="Cover preview"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2 pt-1">
              <input
                type="text"
                readOnly
                value="https://images.unsplash.com/photo-1565900290201-6116cd97a6b8"
                className="w-full h-7 rounded-lg border border-border bg-background px-2 font-mono text-[10px] text-muted-foreground truncate"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 h-7 rounded-lg border border-border bg-background hover:bg-muted text-[11px] font-medium text-foreground transition-colors"
                >
                  Choose file
                </button>
                <button
                  type="button"
                  className="flex-1 h-7 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-[11px] font-medium text-amber-600 dark:text-amber-400 transition-colors"
                >
                  Remove background
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
