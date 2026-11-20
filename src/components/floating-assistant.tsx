"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingAssistant() {
  const pathname = usePathname();

  // Hide on the dedicated /chat or /ask full page
  if (pathname === "/chat" || pathname === "/ask") return null;

  return (
    <div className="fixed right-3 bottom-3 z-40 flex flex-col items-end sm:right-6 sm:bottom-6">
      <Link
        href="/chat"
        aria-label="Ask Lizan"
        className="group relative isolate flex items-center rounded-full bg-neutral-950 p-1.5 text-white shadow-[0_20px_44px_-16px_rgba(20,12,6,0.7)] ring-1 ring-white/10 transition duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_26px_60px_-18px_rgba(192,107,61,0.65)] focus-visible:ring-3 focus-visible:ring-primary/50 focus-visible:outline-none dark:ring-white/20"
      >
        {/* Glow halo */}
        <span
          aria-hidden="true"
          className="absolute -inset-1 -z-10 rounded-full bg-[conic-gradient(from_0deg,#f2a877,#c06b3d,#542e4a,#f2a877)] opacity-0 blur-lg transition-opacity duration-700 group-hover:opacity-70 motion-safe:animate-[spin_6s_linear_infinite]"
        />

        {/* Expandable label on hover */}
        <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-out-expo group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
          <span className="overflow-hidden">
            <span className="block translate-x-3 pr-3 pl-4 text-left whitespace-nowrap opacity-0 transition duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-75 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
              <span className="block text-sm leading-tight font-semibold">Ask Lizan</span>
              <span className="block text-[11px] text-white/60">Your reading assistant</span>
            </span>
          </span>
        </span>

        {/* Circular spherical icon button */}
        <span className="relative grid size-12 place-items-center rounded-full bg-[radial-gradient(circle_at_32%_26%,#ffd9bb_0%,#ec9a66_42%,#b4592e_100%)] text-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-8px_14px_rgba(96,34,10,0.35)]">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-2 ring-[#f2a877]/70 group-hover:hidden motion-safe:animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-[26px] transition duration-500 ease-out-expo group-hover:scale-110 opacity-100"
            aria-hidden="true"
          >
            <path
              d="M12 3.6c-4.75 0-8.6 3.2-8.6 7.25 0 2.2 1.14 4.17 2.95 5.5l-.55 3.15c-.06.36.31.63.63.46l3.25-1.7c.75.18 1.52.27 2.32.27 4.75 0 8.6-3.2 8.6-7.68S16.75 3.6 12 3.6z"
              fill="currentColor"
            />
            <circle cx="8.5" cy="11" r="1.2" fill="#fff" />
            <circle cx="12" cy="11" r="1.2" fill="#fff" />
            <circle cx="15.5" cy="11" r="1.2" fill="#fff" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
