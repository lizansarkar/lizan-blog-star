"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              L
            </span>
            <span className="font-sans text-xl font-bold tracking-tight text-foreground">
              Lizan<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/articles" className="hover:text-foreground transition-colors">
              Articles
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/ask" className="hover:text-foreground transition-colors flex items-center gap-1.5 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Lizan</span>
            </Link>
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <div className="h-4 w-px bg-border/60" />

          {/* Operational Desks quick link */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Link href="/desk/reader" className="hover:text-foreground transition-colors">
              Reader
            </Link>
            <span>·</span>
            <Link href="/desk/writer" className="hover:text-foreground transition-colors">
              Writer
            </Link>
            <span>·</span>
            <Link href="/desk/admin" className="hover:text-foreground transition-colors">
              Admin
            </Link>
          </div>

          <div className="h-4 w-px bg-border/60" />

          <Link
            href="/login"
            className="text-xs font-semibold text-foreground hover:text-primary transition-colors"
          >
            Sign in
          </Link>

          <Link
            href="/register"
            className="group inline-flex h-8 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-xs font-semibold text-background hover:opacity-90 shadow-sm transition-opacity"
          >
            <span>Join</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-background/20 group-hover:translate-x-0.5 transition-transform">
              <ArrowUpRight className="h-3 w-3 text-background" />
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
        <div className="border-b border-border bg-background px-4 py-5 md:hidden">
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
              href="/ask"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-primary"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask Lizan (AI Assistant)</span>
            </Link>
            <Link
              href="/desk/reader"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Reader Desk
            </Link>
            <Link
              href="/desk/writer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Writer Desk
            </Link>
            <Link
              href="/desk/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Admin Desk
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              About
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
