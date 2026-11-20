"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function FloatingAssistant() {
  return (
    <aside aria-label="AI Assistant" className="fixed right-3 sm:right-5 top-[58%] -translate-y-1/2 z-40">
      <Link
        href="/ask"
        aria-label="Ask Lizan AI"
        title="Ask Lizan AI"
        className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#e28352] via-[#c25e37] to-[#7f2e12] text-white shadow-[0_6px_20px_-2px_rgba(194,94,55,0.5)] ring-2 ring-white/70 dark:ring-neutral-900 transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_24px_-2px_rgba(194,94,55,0.65)] active:scale-95 cursor-pointer"
      >
        <span className="relative flex items-center justify-center">
          <Sparkles className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-white drop-shadow-sm transition-transform duration-200 group-hover:rotate-12" />
        </span>
        {/* Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 sm:inline-block dark:bg-white dark:text-neutral-900">
          Ask Lizan AI
        </span>
      </Link>
    </aside>
  );
}

