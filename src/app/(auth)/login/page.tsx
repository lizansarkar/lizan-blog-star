"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Shield, PenTool, BookOpen } from "lucide-react";
import { AuthShowcase } from "@/components/auth-showcase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@lizan.dev");
  const [password, setPassword] = useState("lumina123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const fillAccount = (accEmail: string, rolePath: string) => {
    setEmail(accEmail);
    setPassword("lumina123");
    setLoading(true);
    setTimeout(() => {
      router.push(rolePath);
    }, 250);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email.includes("admin")) {
        router.push("/desk/admin");
      } else if (email.includes("writer")) {
        router.push("/desk/writer");
      } else {
        router.push("/desk/reader");
      }
    }, 400);
  };

  const handleSocialAuth = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      router.push("/desk/reader");
    }, 300);
  };

  return (
    <div className="w-full max-w-4xl sm:max-w-[940px] rounded-[32px] border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
      {/* Left Column: Form */}
      <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[620px]">
        {/* Top: Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Lizan</span>
          </Link>
        </div>

        {/* Center: Card Form */}
        <div className="mx-auto w-full max-w-[340px] sm:max-w-[350px] my-auto py-4">
          {/* Logo Squircle */}
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[12px] bg-neutral-950 text-white font-bold text-lg tracking-tight shadow-sm">
            <span>L</span>
            <span className="text-[#c25e37] text-[18px] leading-none mb-0.5 font-bold">.</span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 font-sans text-2xl font-bold tracking-tight text-neutral-950 dark:text-white text-center">
            Sign in to your account
          </h1>
          <p className="mt-1.5 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 text-center leading-relaxed">
            Sign in to your reading desk, saved stories, and quiz history.
          </p>

          {/* Social Auth */}
          <div className="mt-5 space-y-2">
            <button
              type="button"
              onClick={() => handleSocialAuth("Google")}
              className="flex h-10 sm:h-11 w-full items-center justify-center gap-3 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialAuth("GitHub")}
              className="flex h-10 sm:h-11 w-full items-center justify-center gap-3 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              <svg className="h-4 w-4 shrink-0 fill-current text-neutral-900 dark:text-white" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-3.5 flex items-center justify-center">
            <div className="w-full border-t border-neutral-200/80 dark:border-neutral-800" />
            <span className="bg-white dark:bg-neutral-900 px-3 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
              OR
            </span>
            <div className="w-full border-t border-neutral-200/80 dark:border-neutral-800" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label htmlFor="login-email" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                placeholder="you@lizan.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 sm:h-10.5 w-full rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-neutral-950 dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="login-password" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <Link
                  href="/terms"
                  className="text-[11px] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 sm:h-10.5 w-full rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 pr-10 pl-3.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-neutral-950 dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-10 sm:h-11 w-full rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs sm:text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Discreet Demo Account Quick-Fill */}
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 text-center mb-1.5">
              1-Click Demo Accounts:
            </p>
            <div className="flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => fillAccount("admin@lizan.dev", "/desk/admin")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition"
              >
                <Shield className="h-3 w-3 text-purple-500" />
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => fillAccount("writer@lumina.dev", "/desk/writer")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition"
              >
                <PenTool className="h-3 w-3 text-blue-500" />
                <span>Writer</span>
              </button>
              <button
                type="button"
                onClick={() => fillAccount("reader@lumina.dev", "/desk/reader")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition"
              >
                <BookOpen className="h-3 w-3 text-emerald-500" />
                <span>Reader</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom: Switch to Register */}
        <div className="pt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
          New to Lizan?{" "}
          <Link href="/register" className="font-semibold text-[#c25e37] hover:underline">
            Create account
          </Link>
        </div>
      </div>

      {/* Right Column: Visual Constellation Showcase */}
      <AuthShowcase />
    </div>
  );
}
