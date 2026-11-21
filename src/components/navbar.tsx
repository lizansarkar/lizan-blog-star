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
    <header className="sticky top-3 sm:top-5 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all">
      <div className="mx-auto flex h-[62px] sm:h-[68px] w-full max-w-7xl items-center justify-between rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/90 px-5 sm:px-7 shadow-sm backdrop-blur-md">
        {/* Brand identity: Black rounded icon with white L & orange dot + Brand name */}
        <Link href="/" className="flex items-center gap-2.5 pl-0.5 group">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-[10px] bg-neutral-950 text-white font-bold text-[15px] sm:text-[16px] tracking-tight shadow-xs transition-transform duration-300 group-hover:scale-105">
            <span>L</span>
            <span className="text-[#c25e37] text-[18px] leading-none mb-0.5 font-bold">.</span>
          </div>
          <span className="font-sans text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Lizan<span className="text-[#c25e37]">.</span>
          </span>
        </Link>

        {/* Center Navigation Links: Home, Articles, About, Search (Active item in terracotta) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[14px] sm:text-[15px] font-medium">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 relative py-1 ${
                  isActive
                    ? "text-[#c25e37] font-semibold"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c25e37] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar: Theme Icon, Desks, Sign in (bordered pill), Join ↗ (black pill with white arrow circle) */}
        <div className="hidden md:flex items-center gap-2.5 sm:gap-3">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Desks subtle trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDesksOpen(!desksOpen)}
              onBlur={() => setTimeout(() => setDesksOpen(false), 200)}
              className="text-[13px] sm:text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-2.5 py-1.5 transition-colors flex items-center gap-1 cursor-pointer rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <span>Desks</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
            {desksOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150 text-xs sm:text-[13px] z-50">
                <Link
                  href="/desk/reader"
                  className="block px-3.5 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium transition-colors"
                >
                  Reader Desk
                </Link>
                <Link
                  href="/desk/writer"
                  className="block px-3.5 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium transition-colors"
                >
                  Writer Desk
                </Link>
                <Link
                  href="/desk/admin"
                  className="block px-3.5 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium transition-colors"
                >
                  Admin Desk
                </Link>
                <Link
                  href="/ask"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-[#c25e37] font-semibold transition-colors"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Ask Lizan AI</span>
                </Link>
              </div>
            )}
          </div>

          {/* Sign in: Pill with subtle border matching reference */}
          <Link
            href="/login"
            className="rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-transparent px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 shadow-2xs cursor-pointer"
          >
            Sign in
          </Link>

          {/* Join ↗: Black pill with white circle containing black arrow matching reference */}
          <Link
            href="/register"
            className="group inline-flex h-10 sm:h-11 items-center gap-2.5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 pl-5 sm:pl-6 pr-2 sm:pr-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <span>Join</span>
            <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white group-hover:translate-x-0.5 transition-transform duration-300">
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 p-6 shadow-xl backdrop-blur-md md:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3.5 text-base font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-[#c25e37] py-1"
            >
              Home
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-[#c25e37] py-1"
            >
              Articles
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#c25e37] font-semibold py-1"
            >
              About
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-[#c25e37] py-1"
            >
              Search
            </Link>
            <Link
              href="/ask"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-primary py-1 font-semibold"
            >
              <Sparkles className="h-4.5 w-4.5" />
              <span>Ask Lizan (AI Assistant)</span>
            </Link>
            <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-1" />
            <Link
              href="/desk/reader"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-500 hover:text-neutral-900 text-sm py-1"
            >
              Reader Desk
            </Link>
            <Link
              href="/desk/writer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-500 hover:text-neutral-900 text-sm py-1"
            >
              Writer Desk
            </Link>
            <Link
              href="/desk/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-500 hover:text-neutral-900 text-sm py-1"
            >
              Admin Desk
            </Link>
            <div className="pt-3 flex gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-neutral-800 dark:text-neutral-200"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-sm font-semibold shadow-xs"
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
