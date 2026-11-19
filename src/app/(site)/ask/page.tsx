"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Send, Bot, User, ArrowRight, CornerDownLeft, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: Array<{
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
  }>;
}

export default function AskLizanPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am **Ask Lizan**, your AI reader assistant powered by Google Gemini. Ask me anything about our software engineering essays, design patterns, or publication archive.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "What is local-first software and why does it matter?",
    "Why are boring deployment pipelines better?",
    "How did inference costs change product roadmaps?",
    "What makes a good design system after the component rush?",
  ];

  const handleSend = async (questionText: string) => {
    if (!questionText.trim() || loading) return;

    const userMessage: Message = { role: "user", content: questionText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.answer,
            suggestions: data.suggestions,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't process your request right now. Please try again.",
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Ask Lizan · Powered by Gemini</span>
        </div>
        <h1 className="mt-3 font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Your Publication Assistant
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-xl mx-auto">
          Explore the full depth of Lizan Blog Star. Ask questions, compare ideas, and get direct links to essays.
        </p>
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && (
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center mb-3">
            Suggested Queries
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(q)}
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-card text-left text-xs font-medium text-foreground hover:border-primary/40 hover:bg-muted/50 transition-colors"
              >
                <span>{q}</span>
                <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="mt-8 space-y-4">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-foreground text-background font-medium"
                  : "border border-border bg-card text-foreground"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>

              {/* Story suggestions */}
              {m.suggestions && m.suggestions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-border/60 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Relevant Dispatches
                  </p>
                  <div className="grid gap-2">
                    {m.suggestions.map((story) => (
                      <Link
                        key={story.id}
                        href={`/article/${story.slug}`}
                        className="group flex items-center justify-between p-2.5 rounded-lg border border-border/80 bg-background/50 hover:bg-muted transition-colors"
                      >
                        <div>
                          <div className="text-xs font-semibold text-primary">{story.title}</div>
                          <div className="text-[11px] text-muted-foreground line-clamp-1">{story.excerpt}</div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {m.role === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground text-xs font-bold">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-sm text-muted-foreground">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
            <span>Lizan is thinking...</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="mt-8 flex gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about any story or technology..."
          disabled={loading}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-foreground px-4 text-xs font-semibold text-background hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          <span>Send</span>
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
