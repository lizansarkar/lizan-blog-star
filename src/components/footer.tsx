"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border/60 bg-card/30 pt-16 pb-12 transition-colors relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main 5-column grid matching reference image */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 pb-16 border-b border-border/50">
          {/* Brand Col (2 cols wide on desktop) */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-foreground text-background font-bold text-xs tracking-tight shadow-xs">
                L
              </span>
              <span className="font-sans text-base font-bold tracking-tight text-foreground">
                Lizan
              </span>
            </Link>
            <p className="max-w-xs text-xs text-muted-foreground leading-relaxed">
              Lizan is a modern publication for people who build software, shape products, and care how the work reads.
            </p>
          </div>

          {/* Col 1: Read */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground tracking-wider">Read</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-foreground transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-foreground transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Sections */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground tracking-wider">Sections</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/section/ai" className="hover:text-foreground transition-colors">
                  AI
                </Link>
              </li>
              <li>
                <Link href="/section/design" className="hover:text-foreground transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/section/engineering" className="hover:text-foreground transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link href="/section/product" className="hover:text-foreground transition-colors">
                  Product
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Account */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground tracking-wider">Account</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/login" className="hover:text-foreground transition-colors">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-foreground transition-colors">
                  Create account
                </Link>
              </li>
              <li>
                <Link href="/desk/reader" className="hover:text-foreground transition-colors">
                  Your desk
                </Link>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-foreground transition-colors">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground tracking-wider">Help</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/ask" className="hover:text-foreground transition-colors">
                  Ask Lizan
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/feed.xml" className="hover:text-foreground transition-colors">
                  RSS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Lizan. All rights reserved.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>

        {/* Giant subtle watermark matching reference image bottom */}
        <div className="pt-12 pb-4 text-center select-none pointer-events-none opacity-[0.04] dark:opacity-[0.06] font-sans font-extrabold text-7xl sm:text-9xl md:text-[11rem] tracking-tight text-foreground">
          Lizan
        </div>
      </div>
    </footer>
  );
}
