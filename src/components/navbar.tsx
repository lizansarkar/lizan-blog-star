"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Menu, X, Star, BookOpen, PenTool, Shield, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
              <Star className="h-4 w-4 fill-current" />
            </span>
            <div className="flex flex-col">
              <span className="font-sans text-base font-bold tracking-tight">Lizan Blog Star</span>
              <span className="text-[10px] tracking-wide text-muted-foreground uppercase -mt-1 font-medium">Publication</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="hidden md:flex items-center gap-3">
          {/* Ask Lizan AI Button */}
          <Link
            href="/ask"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask Lizan</span>
          </Link>

          {/* Desks Dropdown / Shortcuts */}
          <div className="flex items-center gap-1 border-x border-border/50 px-2">
            <Link
              href="/desk/reader"
              title="Reader Desk"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
            </Link>
            <Link
              href="/desk/writer"
              title="Writer Desk"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <PenTool className="h-4 w-4" />
            </Link>
            <Link
              href="/desk/admin"
              title="Admin Desk"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <Shield className="h-4 w-4" />
            </Link>
          </div>

          <ThemeToggle />

          <Link
            href="/login"
            className="inline-flex h-8 items-center justify-center rounded-full bg-foreground px-4 text-xs font-medium text-background hover:opacity-90 transition-opacity"
          >
            Sign In
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
        <div className="border-b border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/ask"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-primary"
            >
              <Sparkles className="h-4 w-4" />
              Ask Lizan (AI Assistant)
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
            <div className="pt-2 border-t border-border flex gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-lg bg-foreground text-background text-xs font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-lg border border-border text-foreground text-xs font-semibold"
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
