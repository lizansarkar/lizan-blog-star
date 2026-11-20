"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, Send, Check } from "lucide-react";

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

  return (
    <footer className="w-full border-t border-border/60 bg-card/40 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Star className="h-3.5 w-3.5 fill-current" />
              </span>
              <span className="font-sans text-lg font-bold tracking-tight">
                Lizan Blog Star
              </span>
            </Link>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              A calm publication for people who build software, shape products,
              and care deeply about how engineering reads. Founded by Lizan
              Sarkar.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Subscribe to our weekly dispatch
              </p>
              {subscribed ? (
                <div className="inline-flex items-center gap-2 text-xs text-primary font-medium bg-primary/10 px-3 py-2 rounded-lg">
                  <Check className="h-4 w-4" />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex max-w-sm gap-2"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="reader@example.com"
                    className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-medium text-background hover:opacity-90 transition-opacity"
                  >
                    <span>Join</span>
                    <Send className="h-3 w-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Desks */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Operational Desks
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/desk/reader"
                  className="hover:text-foreground transition-colors"
                >
                  Reader Desk (Saves & History)
                </Link>
              </li>
              <li>
                <Link
                  href="/desk/writer"
                  className="hover:text-foreground transition-colors"
                >
                  Writer Desk (Drafts & Editor)
                </Link>
              </li>
              <li>
                <Link
                  href="/desk/admin"
                  className="hover:text-foreground transition-colors"
                >
                  Admin Desk (Analytics & Roles)
                </Link>
              </li>
              <li>
                <Link
                  href="/ask"
                  className="hover:text-foreground transition-colors"
                >
                  Ask Lizan (AI Assistant)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Publication
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About Lizan
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/lizansarkar/lizan-blog-star"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>
            © {new Date().getFullYear()} Lizan Blog Star. All rights reserved.
          </p>
          <p>Crafted by Lizan Sarkar.</p>
        </div>
      </div>
    </footer>
  );
}
