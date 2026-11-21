"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-9 h-9 sm:w-10 sm:h-10 ${className}`} />;
  }

  // Use resolvedTheme so "system" mode accurately knows if current display is dark or light
  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    if (isTransitioning) return;
    const nextTheme = isDark ? "light" : "dark";

    if (typeof window === "undefined") {
      setTheme(nextTheme);
      return;
    }

    const doc = window.document;
    const hasViewTransition = Boolean((doc as any).startViewTransition);

    setIsTransitioning(true);

    // 1. Native View Transitions API with CSS right-to-left curtain wipe
    if (hasViewTransition) {
      try {
        const transition = (doc as any).startViewTransition(() => {
          setTheme(nextTheme);
        });

        if (transition && typeof transition.finished?.then === "function") {
          transition.finished
            .catch(() => {})
            .finally(() => {
              setIsTransitioning(false);
            });
        } else {
          setTimeout(() => {
            setIsTransitioning(false);
          }, 1350);
        }
        return;
      } catch {
        // Fall back to DOM curtain if startViewTransition throws
      }
    }

    // 2. Elegant Curtain Fallback for browsers without View Transitions
    const curtain = doc.createElement("div");
    curtain.className = "theme-curtain-overlay";
    curtain.style.backgroundColor =
      nextTheme === "dark" ? "#0c0c0e" : "#f7f7f8";
    doc.body.appendChild(curtain);

    // Smooth theatrical curtain pace: swap at midpoint when screen is covered
    setTimeout(() => {
      setTheme(nextTheme);
    }, 675);

    setTimeout(() => {
      curtain.remove();
      setIsTransitioning(false);
    }, 1350);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait ${className}`}
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-500 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-500 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
