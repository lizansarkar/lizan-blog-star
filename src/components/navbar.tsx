"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desksDropdown, setDesksDropdown] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "About", href: "/about" },
    { label: "Search", href: "/search" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity (matches reference image: black square icon with white L + brand name) */}
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-foreground text-background font-bold text-xs tracking-tight shadow-xs group-hover:scale-105 transition-transform">
              L
            </span>
            <span className="font-sans text-[15px] font-bold tracking-tight text-foreground">
              Lizan
            </span>
          </Link>
        </div>

        {/* Center Navigation Links (matches reference: Home, Articles, About, Search + Ask Lizan) */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/ask"
            className={`transition-colors flex items-center gap-1.5 ${
              pathname.startsWith("/ask")
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Ask Lizan</span>
          </Link>
        </nav>

        {/* Right Action Bar (matches reference: Theme Toggle, Sign in, Join ↗) */}
        <div className="hidden md:flex items-center gap-5">
          {/* Theme Toggle Sun/Moon icon */}
          <ThemeToggle />

          {/* Desks subtle dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDesksDropdown(!desksDropdown)}
              onBlur={() => setTimeout(() => setDesksDropdown(false), 200)}
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Desks</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>
            {desksDropdown && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-card p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150 text-xs z-50">
                <Link
                  href="/desk/reader"
                  className="block px-3 py-2 rounded-lg hover:bg-muted text-foreground font-medium transition-colors"
                >
                  Reader Desk
                </Link>
                <Link
                  href="/desk/writer"
                  className="block px-3 py-2 rounded-lg hover:bg-muted text-foreground font-medium transition-colors"
                >
                  Writer Desk
                </Link>
                <Link
                  href="/desk/admin"
                  className="block px-3 py-2 rounded-lg hover:bg-muted text-foreground font-medium transition-colors"
                >
                  Admin Desk
                </Link>
              </div>
            )}
          </div>

          {/* Sign in */}
          <Link
            href="/login"
            className="text-[13px] font-medium text-foreground hover:text-primary transition-colors"
          >
            Sign in
          </Link>

          {/* Join ↗ (black pill with tiny circle arrow up-right) */}
          <Link
            href="/register"
            className="group inline-flex h-8 items-center gap-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3.5 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <span>Join</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 dark:bg-black/20 group-hover:translate-x-0.5 transition-transform">
              <ArrowUpRight className="h-2.5 w-2.5" />
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background px-4 py-5 md:hidden space-y-4">
          <nav className="flex flex-col gap-3.5 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Articles
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Search
            </Link>
            <Link
              href="/ask"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-primary"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask Lizan (AI Assistant)</span>
            </Link>
            <div className="h-px bg-border/60 my-1" />
            <Link
              href="/desk/reader"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Reader Desk
            </Link>
            <Link
              href="/desk/writer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Writer Desk
            </Link>
            <Link
              href="/desk/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Admin Desk
            </Link>
            <div className="pt-3 border-t border-border flex gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-full bg-muted text-foreground text-xs font-semibold"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-full bg-foreground text-background text-xs font-semibold"
              >
                Join
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
