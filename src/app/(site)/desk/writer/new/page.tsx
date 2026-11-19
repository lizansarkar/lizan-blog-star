"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Send, Sparkles, Plus, Trash2 } from "lucide-react";

export default function NewStoryPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [keyPoints, setKeyPoints] = useState<string[]>([""]);
  const [saved, setSaved] = useState(false);

  const addKeyPoint = () => setKeyPoints((prev) => [...prev, ""]);
  const updateKeyPoint = (index: number, val: string) => {
    setKeyPoints((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };
  const removeKeyPoint = (index: number) => {
    setKeyPoints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (status: "DRAFT" | "PUBLISHED") => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Top action bar */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <Link
          href="/desk/writer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Writer Desk</span>
        </Link>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-emerald-500 font-medium">Saved successfully!</span>
          )}
          <button
            type="button"
            onClick={() => handleSubmit("DRAFT")}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("PUBLISHED")}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground hover:opacity-90 shadow-sm transition-opacity"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Publish Dispatch</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="mt-8 space-y-6">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Dispatch Title..."
          className="w-full font-sans text-3xl sm:text-5xl font-extrabold tracking-tight bg-transparent text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
        />

        {/* Category & Excerpt */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="AI">AI</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Deck / Excerpt
            </label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="One clear sentence setting up the dispatch..."
              className="w-full h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Key Points Builder */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Key Points (Summary Box)
            </span>
            <button
              type="button"
              onClick={addKeyPoint}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <Plus className="h-3 w-3" />
              <span>Add Point</span>
            </button>
          </div>
          <div className="space-y-2">
            {keyPoints.map((point, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => updateKeyPoint(i, e.target.value)}
                  placeholder={`Takeaway #${i + 1}...`}
                  className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {keyPoints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeKeyPoint(i)}
                    className="p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Article Markdown/HTML Editor area */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Story Body (Markdown / Prose)
          </label>
          <textarea
            rows={16}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your story here. Use ## for headings, > for blockquotes, and ``` for code blocks..."
            className="w-full rounded-2xl border border-border bg-card p-5 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
