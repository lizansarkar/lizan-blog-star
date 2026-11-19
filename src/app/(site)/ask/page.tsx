"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Send, Bot, ArrowUpRight, Copy, Check, Plus, MessageSquare, Loader2 } from "lucide-react";

interface StorySuggestion {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover?: string;
  authorName?: string;
  readingTime?: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: StorySuggestion[];
}

export default function AskLizanPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Lizan Blog Star is a calmer publication about engineering, design, product, and the tools people actually finish. Every story comes with key points, a listen mode, and a short quiz.\n\nI'm the reader assistant. I've read the whole archive, so ask me for a topic, a quick read, a summary, or a place to start. More on the About page.",
      suggestions: [
        {
          id: "1",
          title: "The case for boring deployment pipelines",
          slug: "the-case-for-boring-deployment-pipelines",
          category: "Engineering",
          excerpt: "The most expensive pipeline is the one only one person can explain on a Friday.",
          cover: "https://images.unsplash.com/photo-1565900290201-6116cd97a6b8?auto=format&fit=crop&w=300&q=80",
          authorName: "Lizan Sarkar",
          readingTime: 5,
        },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const sampleSuggestions = [
    "What should I read next?",
    "More on Engineering",
    "Show me more",
    "Where should I start?",
    "What's popular right now?",
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.answer,
            suggestions: data.suggestions?.map((s: any) => ({
              ...s,
              cover: s.coverImage || "https://images.unsplash.com/photo-1565900290201-6116cd97a6b8?auto=format&fit=crop&w=300&q=80",
            })),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't reach the model right now. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12 space-y-6">
      {/* Header (Matches ask-lumina.jpg) */}
      <div className="space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
          Reader assistant
        </span>
        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Ask Lizan
        </h1>
        <p className="text-xs text-muted-foreground">
          Ask for a topic or a place to start. Your chats are saved on this device, or to your account when you are signed in.
        </p>
      </div>

      {/* Main Split Chat Card (Matches ask-lumina.jpg) */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Sidebar: Your chats */}
        <div className="lg:col-span-4 border-r border-border/70 p-5 flex flex-col justify-between bg-muted/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-foreground">Your chats</span>
              <button
                type="button"
                onClick={() => setMessages(messages.slice(0, 1))}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
              >
                <Plus className="h-3 w-3" />
                <span>New chat</span>
              </button>
            </div>

            {/* Chat sessions */}
            <div className="space-y-2">
              <div className="rounded-xl border border-border/80 bg-card p-3 shadow-sm text-xs space-y-1 cursor-pointer">
                <div className="font-semibold text-foreground line-clamp-1">
                  What should I read about deployment?
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">0 seconds ago</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60 text-[11px] text-muted-foreground font-mono">
            Powered by Google Gemini
          </div>
        </div>

        {/* Right Panel: Chat Stream */}
        <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 bg-background/50">
          {/* Top Assistant Status Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-border/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="font-bold text-foreground">Ask Lizan</span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Knows all 14 stories
              </span>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex gap-3.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-black text-xs font-bold mt-1">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-foreground text-background font-medium rounded-br-sm"
                      : "border border-border/80 bg-card text-foreground rounded-tl-sm space-y-4"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {/* Story Suggestion Card (Matches ask-lumina.jpg) */}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {m.suggestions.map((story) => (
                        <Link
                          key={story.id}
                          href={`/article/${story.slug}`}
                          className="group flex items-center justify-between gap-3 p-3 rounded-xl border border-border/80 bg-background/60 hover:border-primary/50 hover:bg-muted/50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            {story.cover && (
                              <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-900">
                                <Image
                                  src={story.cover}
                                  alt={story.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {story.title}
                              </div>
                              <div className="text-[11px] text-muted-foreground font-mono">
                                {story.category} · {story.readingTime || 5} min · {story.authorName || "Lizan Sarkar"}
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      ))}

                      {/* Copy action */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(m.content, index)}
                          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-emerald-500 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-xs text-muted-foreground">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </div>
                <span>Lizan is reviewing the publication archive...</span>
              </div>
            )}
          </div>

          {/* Suggestion Pills */}
          <div className="flex flex-wrap gap-2 pb-4">
            {sampleSuggestions.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => handleSend(pill)}
                className="rounded-full border border-border/80 bg-card px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-muted/50 transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a story or topic..."
                disabled={loading}
                className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-40 shadow-sm transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono px-2">
              <span>Answers come straight from the Lizan Blog Star archive.</span>
              <span>Shift + Enter for a new line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
