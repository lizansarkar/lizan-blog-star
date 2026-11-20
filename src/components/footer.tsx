"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUp, MailCheck, Sparkles, Undo2, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="overflow-hidden pt-10 pb-6">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:max-w-7xl">
        {/* 1. Newsletter Box (Wavy contoured light blue box) */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-[color-mix(in_oklab,var(--orbit)_28%,var(--card))] px-5 py-8 sm:px-8 sm:py-10">
          {/* Subtle contour lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full text-primary/20"
            viewBox="0 0 800 520"
            preserveAspectRatio="none"
            aria-hidden={true}
          >
            <path d="M0 70C140 20 220 140 360 80S560 10 800 90" fill="none" stroke="currentColor" strokeWidth="1.25" />
            <path d="M0 130C150 80 240 190 380 140S580 70 800 150" fill="none" stroke="currentColor" strokeWidth="1.25" />
            <path d="M0 190C160 140 250 250 400 200S600 130 800 210" fill="none" stroke="currentColor" strokeWidth="1.25" />
            <path d="M0 250C170 200 260 310 420 260S620 190 800 270" fill="none" stroke="currentColor" strokeWidth="1.25" />
            <path d="M0 310C180 260 270 370 440 320S640 250 800 330" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </svg>

          {/* Form & text */}
          <div className="relative mx-auto mt-2 max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              The best of Lizan, <span className="text-primary">once a week</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A calmer place for technology.
            </p>

            {subscribed ? (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Check className="size-4" />
                <span>You are subscribed to the weekly issue.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mx-auto mt-6 max-w-md">
                <label
                  htmlFor="footer-email"
                  className="block text-left text-xs font-medium text-muted-foreground mb-1 ml-4"
                >
                  Email
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 flex-1 rounded-full border border-border bg-card px-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-110 disabled:opacity-50"
                  >
                    {loading ? "..." : "Subscribe"}
                  </button>
                </div>
              </form>
            )}

            <p className="mt-3 text-xs text-muted-foreground">
              Want saves, reading history, and quiz scores?{" "}
              <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
                Create a free account
              </Link>
            </p>
          </div>

          {/* 3 Benefit cards */}
          <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
                  <MailCheck className="size-4" aria-hidden={true} />
                </span>
                Once a week
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                One email with the stories worth finishing. No daily noise.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="size-4" aria-hidden={true} />
                </span>
                Picked by editors
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The best of engineering, design, product, and AI.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
                  <Undo2 className="size-4" aria-hidden={true} />
                </span>
                Leave anytime
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every email has a one-click unsubscribe link.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Navigation Card */}
        <div className="mt-4 rounded-3xl border border-border bg-card px-6 py-8 shadow-[0_16px_40px_-28px_rgba(12,12,14,0.45)] sm:px-10 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
            {/* Brand Logo & Tagline */}
            <div>
              <Link href="/" aria-label="Lizan" className="inline-flex items-center gap-2.5 text-foreground">
                <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden={true}>
                  <rect width="32" height="32" rx="9" className="fill-current" />
                  <path d="M8.4 7h5.4v12.2h8.8v5.4H8.4V7z" className="fill-background" />
                  <circle cx="25.6" cy="22.1" r="2.15" className="fill-primary" />
                </svg>
                <span className="font-sans text-[1.15rem] leading-none font-bold tracking-[-0.04em]">
                  Lizan<span className="text-primary">.</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Lizan is a modern publication for people who build software, shape products, and care how the work reads.
              </p>
            </div>

            {/* 4 Link Columns */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Read</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-muted-foreground transition hover:text-foreground">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles" className="text-muted-foreground transition hover:text-foreground">
                      Articles
                    </Link>
                  </li>
                  <li>
                    <Link href="/authors" className="text-muted-foreground transition hover:text-foreground">
                      Writers
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-muted-foreground transition hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/search" className="text-muted-foreground transition hover:text-foreground">
                      Search
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">Sections</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/category/ai" className="text-muted-foreground transition hover:text-foreground">
                      AI
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/design" className="text-muted-foreground transition hover:text-foreground">
                      Design
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/engineering" className="text-muted-foreground transition hover:text-foreground">
                      Engineering
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/product" className="text-muted-foreground transition hover:text-foreground">
                      Product
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">Account</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/login" className="text-muted-foreground transition hover:text-foreground">
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="text-muted-foreground transition hover:text-foreground">
                      Create account
                    </Link>
                  </li>
                  <li>
                    <Link href="/desk/reader" className="text-muted-foreground transition hover:text-foreground">
                      Your desk
                    </Link>
                  </li>
                  <li>
                    <a href="#footer-email" className="text-muted-foreground transition hover:text-foreground">
                      Newsletter
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">Help</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/chat" className="text-muted-foreground transition hover:text-foreground">
                      Ask Lizan
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground transition hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-muted-foreground transition hover:text-foreground">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-muted-foreground transition hover:text-foreground">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/feed.xml" className="text-muted-foreground transition hover:text-foreground">
                      RSS
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom copyright & Back to top */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Lizan. All rights reserved.</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
            >
              Back to top
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>

        {/* 3. Watermark */}
        <p
          aria-hidden={true}
          className="pointer-events-none mt-2 text-center text-[clamp(4.5rem,16vw,11rem)] leading-none font-bold tracking-tight text-foreground/5 select-none"
        >
          Lizan
        </p>
      </div>
    </footer>
  );
}
