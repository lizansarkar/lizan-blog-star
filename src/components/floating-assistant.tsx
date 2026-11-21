"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  X,
  Send,
  Maximize2,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: Array<{
    title: string;
    slug: string;
  }>;
}

const QUICK_PROMPTS = [
  "Where should I start?",
  "What is local-first software?",
  "Explain boring deployment pipelines",
  "Best stories on design systems",
];

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am Lizan AI, your publication assistant. I have read all the stories in our archive. Ask me anything about engineering, product, or design systems!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: "user", content: q },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      setMessages([
        ...newMessages,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.answer || "I found some relevant notes in our archive.",
          suggestions: data.suggestions?.map(
            (s: { title: string; slug: string }) => ({
              title: s.title,
              slug: s.slug,
            }),
          ),
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            "I ran into an issue connecting to the archive. You can explore our stories directly from the Articles page.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Conversation reset. What topic would you like to explore across the Lizan archive?",
      },
    ]);
  };

  return (
    <div className="fixed right-5 sm:right-7 bottom-5 sm:bottom-7 z-50 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[82vh] rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800/80 px-4 py-3 bg-neutral-50/70 dark:bg-neutral-950/50">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#e28352] to-[#c25e37] text-white shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white leading-tight">
                    Ask Lizan AI
                  </h3>
                  <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400">
                    Publication Assistant · Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="rounded-lg p-1.5 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <Link
                  href="/ask"
                  title="Open full page"
                  aria-label="Open full page"
                  className="rounded-lg p-1.5 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition cursor-pointer"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  aria-label="Close assistant"
                  className="rounded-lg p-1.5 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-[13px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#e28352] to-[#c25e37] text-white text-[10px] mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#c25e37] text-white rounded-br-xs font-normal"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-bl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Story Suggestions if returned */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 space-y-1.5">
                        <p className="text-[10.5px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Suggested reads:
                        </p>
                        {msg.suggestions.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/article/${s.slug}`}
                            className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#c25e37] dark:text-[#f2a877] hover:underline"
                          >
                            <ExternalLink className="h-3 w-3 shrink-0" />
                            <span className="line-clamp-1">{s.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white text-[10px] mt-0.5 dark:bg-neutral-700">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-center text-neutral-400">
                  <div className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#e28352] to-[#c25e37] text-white">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5">
                    <span className="size-1.5 animate-bounce rounded-full bg-neutral-400" />
                    <span
                      className="size-1.5 animate-bounce rounded-full bg-neutral-400"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="size-1.5 animate-bounce rounded-full bg-neutral-400"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}

              {/* Quick Prompts Chips on first message */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 mb-2">
                    Suggested prompts:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSend(prompt)}
                        className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-700 dark:text-neutral-300 hover:border-[#c25e37] hover:text-[#c25e37] transition cursor-pointer text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-neutral-200/80 dark:border-neutral-800/80 p-2.5 bg-neutral-50/50 dark:bg-neutral-950/30 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about stories, architectures, design..."
                disabled={isLoading}
                className="flex-1 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none focus:border-[#c25e37] focus:ring-1 focus:ring-[#c25e37] transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c25e37] text-white hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button in Bottom Right Corner */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label={isOpen ? "Close Lizan Assistant" : "Ask Lizan AI Assistant"}
        title={isOpen ? "Close Lizan Assistant" : "Ask Lizan AI"}
        className="group relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#e28352] via-[#c25e37] to-[#7f2e12] text-white shadow-[0_10px_30px_-4px_rgba(194,94,55,0.6)] ring-2 ring-white/90 dark:ring-neutral-900 transition-all cursor-pointer"
      >
        {/* Pulsing breathing aura */}
        <span
          className="absolute -inset-1 rounded-full bg-[#c25e37]/40 blur-md animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        <span className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="h-6 w-6 text-white transition-transform duration-200 rotate-90" />
          ) : (
            <Sparkles className="h-6 w-6 text-white drop-shadow-sm transition-transform duration-300 group-hover:rotate-12" />
          )}
        </span>

        {/* Hover Tooltip when closed */}
        {!isOpen && (
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-neutral-950 px-3 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 sm:inline-block dark:bg-white dark:text-neutral-950">
            Ask Lizan AI
          </span>
        )}
      </motion.button>
    </div>
  );
}
