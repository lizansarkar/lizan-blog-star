"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desksOpen, setDesksOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "About", href: "/about" },
    { label: "Search", href: "/search" },
  ];

  return (
    <header className="sticky top-3 sm:top-5 z-50 w-full px-3 sm:px-6 transition-all">
      <div className="mx-auto flex h-[52px] max-w-7xl items-center justify-between rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/90 px-3 sm:px-4 shadow-sm backdrop-blur-md">
        {/* Brand identity: Black rounded icon with white L & orange dot + Brand name */}
        <Link href="/" className="flex items-center gap-2 pl-1 group">
          <span className="font-sans text-[15px] font-bold tracking-tight text-neutral-900 dark:text-white">
            Lizan<span className="text-[#c25e37]">.</span>
          </span>
        </Link>

        {/* Center Navigation Links: Home, Articles, About, Search (Active item in terracotta) */}
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
                    ? "text-[#c25e37] font-semibold"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar: Theme Icon, Sign in (bordered pill), Join ↗ (black pill with white arrow circle) */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Desks subtle trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDesksOpen(!desksOpen)}
              onBlur={() => setTimeout(() => setDesksOpen(false), 200)}
              className="text-[12px] font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-2 py-1 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Desks</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>
            {desksOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150 text-xs z-50">
                <Link
                  href="/desk/reader"
                  className="block px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium transition-colors"
                >
                  Reader Desk
                </Link>
                <Link
                  href="/desk/writer"
                  className="block px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium transition-colors"
                >
                  Writer Desk
                </Link>
                <Link
                  href="/desk/admin"
                  className="block px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium transition-colors"
                >
                  Admin Desk
                </Link>
                <Link
                  href="/ask"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-[#c25e37] font-semibold transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Ask Lizan AI</span>
                </Link>
              </div>
            )}
          </div>

          {/* Sign in: Pill with subtle border matching screenshot */}
          <Link
            href="/login"
            className="rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-transparent px-4 py-1 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Sign in
          </Link>

          {/* Join ↗: Black pill with white circle containing black arrow matching screenshot */}
          <Link
            href="/register"
            className="group inline-flex h-8 items-center gap-2 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 pl-3.5 pr-1.5 text-xs font-semibold hover:opacity-90 shadow-xs transition-all"
          >
            <span>Join</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white group-hover:translate-x-0.5 transition-transform">
              <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-5xl rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 p-5 shadow-xl backdrop-blur-md md:hidden animate-in fade-in duration-150">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-[#c25e37]"
            >
              Home
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-[#c25e37]"
            >
              Articles
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-[#c25e37]"
            >
              About
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#c25e37] font-semibold"
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
            <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-1" />
            <Link
              href="/desk/reader"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-500 hover:text-neutral-900 text-xs"
            >
              Reader Desk
            </Link>
            <Link
              href="/desk/writer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-500 hover:text-neutral-900 text-xs"
            >
              Writer Desk
            </Link>
            <Link
              href="/desk/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-500 hover:text-neutral-900 text-xs"
            >
              Admin Desk
            </Link>
            <div className="pt-2 flex gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-800"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-full bg-neutral-950 text-white text-xs font-semibold"
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
