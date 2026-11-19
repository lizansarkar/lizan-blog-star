"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Shield, PenTool, BookOpen, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@lizan.dev");
  const [password, setPassword] = useState("lumina123");
  const [loading, setLoading] = useState(false);

  const fillAccount = (accEmail: string, rolePath: string) => {
    setEmail(accEmail);
    setPassword("lumina123");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Determine route based on email
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

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        {/* Brand */}
        <div className="text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Star className="h-5 w-5 fill-current" />
          </div>
          <h1 className="mt-4 font-sans text-2xl font-bold tracking-tight text-foreground">
            Sign In to Lizan Blog Star
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Choose your role or enter credentials to enter your desk.
          </p>
        </div>

        {/* 1-Click Demo Accounts */}
        <div className="mt-6 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Fill Demo Accounts:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillAccount("admin@lizan.dev", "/desk/admin")}
              className="flex flex-col items-center p-2 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-xs font-medium transition-colors"
            >
              <Shield className="h-3.5 w-3.5 text-purple-500 mb-1" />
              <span>Admin</span>
            </button>
            <button
              type="button"
              onClick={() => fillAccount("writer@lumina.dev", "/desk/writer")}
              className="flex flex-col items-center p-2 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-xs font-medium transition-colors"
            >
              <PenTool className="h-3.5 w-3.5 text-blue-500 mb-1" />
              <span>Writer</span>
            </button>
            <button
              type="button"
              onClick={() => fillAccount("reader@lumina.dev", "/desk/reader")}
              className="flex flex-col items-center p-2 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-xs font-medium transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-emerald-500 mb-1" />
              <span>Reader</span>
            </button>
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity"
          >
            <span>{loading ? "Entering Desk..." : "Enter Desk"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Join the publication
          </Link>
        </div>
      </div>
    </div>
  );
}
