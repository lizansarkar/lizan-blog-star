"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-9 h-9 sm:w-10 sm:h-10 ${className}`} />;
  }

  // Use resolvedTheme so "system" mode accurately knows if current display is dark or light
  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    if (typeof window === "undefined") {
      setTheme(nextTheme);
      return;
    }

    const doc = window.document;
    const hasViewTransition = Boolean((doc as any).startViewTransition);

    // 1. Native View Transitions API with CSS right-to-left curtain wipe
    if (hasViewTransition) {
      (doc as any).startViewTransition(() => {
        setTheme(nextTheme);
      });
      return;
    }

    // 2. Elegant Curtain Fallback for browsers without View Transitions
    const curtain = doc.createElement("div");
    curtain.className = "theme-curtain-overlay";
    curtain.style.backgroundColor = nextTheme === "dark" ? "#0c0c0e" : "#f7f7f8";
    doc.body.appendChild(curtain);

    setTimeout(() => {
      setTheme(nextTheme);
    }, 350);

    setTimeout(() => {
      curtain.remove();
    }, 800);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer ${className}`}
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
