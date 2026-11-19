"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, Users, FileText, MessageSquare, Mail, Settings, Eye, Bookmark, Award, Ban, Check, ArrowUpRight } from "lucide-react";

interface AccountUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "WRITER" | "USER";
  joined: string;
  banned: boolean;
}

export default function AdminDeskPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "users">("analytics");

  const [users, setUsers] = useState<AccountUser[]>([
    { id: "1", name: "Lizan Sarkar", email: "admin@lizan.dev", role: "ADMIN", joined: "Nov 12, 2026", banned: false },
    { id: "2", name: "Jules Berger", email: "writer@lumina.dev", role: "WRITER", joined: "Nov 13, 2026", banned: false },
    { id: "3", name: "Mira Okafor", email: "mira@lumina.dev", role: "WRITER", joined: "Nov 13, 2026", banned: false },
    { id: "4", name: "Theo Lindqvist", email: "theo@lumina.dev", role: "WRITER", joined: "Nov 13, 2026", banned: false },
    { id: "5", name: "Sam Ibarra", email: "reader@lumina.dev", role: "USER", joined: "Nov 13, 2026", banned: false },
    { id: "6", name: "Priya Nair", email: "priya@lumina.dev", role: "USER", joined: "Nov 13, 2026", banned: false },
    { id: "7", name: "Leo Martins", email: "leo@lumina.dev", role: "USER", joined: "Nov 13, 2026", banned: false },
    { id: "8", name: "Rex Vance", email: "banned@lumina.dev", role: "USER", joined: "Nov 13, 2026", banned: true },
  ]);

  const toggleBan = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, banned: !u.banned } : u))
    );
  };

  const cycleRole = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const nextRole = u.role === "USER" ? "WRITER" : u.role === "WRITER" ? "ADMIN" : "USER";
        return { ...u, role: nextRole };
      })
    );
  };

  // Top 5 popular stories matching admin.jpg
  const popularStories = [
    { rank: 1, title: "Readers finish what you leave room for", views: 175, pct: 95 },
    { rank: 2, title: "Shipping without a status meeting", views: 167, pct: 90 },
    { rank: 3, title: "The case for boring deployment pipelines", views: 164, pct: 88 },
    { rank: 4, title: "What the deploy log is for", views: 138, pct: 74 },
    { rank: 5, title: "The notebook that survived the rewrite", views: 130, pct: 70 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12 space-y-8">
      {/* Top Admin Subnav (Matches admin.jpg) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background font-bold text-xs">
            L
          </div>
          <span className="font-bold text-base text-foreground">Lizan.</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-mono uppercase text-muted-foreground">
            Admin
          </span>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-border bg-card p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-semibold transition-colors ${
              activeTab === "analytics"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Analytics</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-semibold transition-colors ${
              activeTab === "users"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Users</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground px-2">
            <span className="opacity-40">·</span>
            <span className="opacity-60 flex items-center gap-1"><FileText className="h-3 w-3" /> Content</span>
            <span className="opacity-40">·</span>
            <span className="opacity-60 flex items-center gap-1"><MessageSquare className="h-3 w-3" /> Comments</span>
            <span className="opacity-40">·</span>
            <span className="opacity-60 flex items-center gap-1"><Mail className="h-3 w-3" /> Newsletter</span>
            <span className="opacity-40">·</span>
            <span className="opacity-60 flex items-center gap-1"><Settings className="h-3 w-3" /> Settings</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Link href="/desk/reader" className="hover:text-foreground">Reader desk</Link>
          <span>·</span>
          <Link href="/desk/writer" className="hover:text-foreground">Writer desk</Link>
          <span>·</span>
          <Link href="/" className="inline-flex items-center gap-1 text-primary hover:underline font-semibold">
            <span>View site</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {activeTab === "analytics" ? (
        /* Analytics View (Matches admin.jpg top panel) */
        <div className="space-y-8">
          <div>
            <h1 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
              Analytics
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              A small picture of the publication.
            </p>
          </div>

          {/* 5 KPI Metric Cards (Matches admin.jpg) */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-2xl border border-border/80 bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Accounts</span>
                <Users className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-foreground">8</div>
              <div className="mt-1 text-[10px] text-muted-foreground font-mono">
                4 readers · 3 writers · 1 admins
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Stories</span>
                <FileText className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-foreground">14</div>
              <div className="mt-1 text-[10px] text-muted-foreground font-mono">
                12 live · 1 scheduled · 1 drafts
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Recorded views</span>
                <Eye className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-foreground">1,345</div>
              <div className="mt-1 text-[10px] text-muted-foreground font-mono">
                Counted once per open
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Saves</span>
                <Bookmark className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-foreground">5</div>
              <div className="mt-1 text-[10px] text-muted-foreground font-mono">
                Stories kept by readers
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Quiz attempts</span>
                <Award className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-foreground">3</div>
              <div className="mt-1 text-[10px] text-muted-foreground font-mono">
                Scored by signed-in readers
              </div>
            </div>
          </div>

          {/* Popular Right Now Chart Card (Matches admin.jpg) */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-sans text-lg font-bold text-foreground">Popular right now</h2>
              <p className="text-xs text-muted-foreground">The five most-read live stories.</p>
            </div>

            <div className="space-y-4">
              {popularStories.map((story) => (
                <div key={story.rank} className="flex items-center gap-4 text-xs">
                  <span className="w-4 font-mono font-bold text-muted-foreground text-center">
                    {story.rank}
                  </span>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between font-medium">
                      <span className="text-foreground">{story.title}</span>
                      <span className="font-mono text-muted-foreground">{story.views}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-600 dark:bg-amber-500"
                        style={{ width: `${story.pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Users View (Matches admin.jpg bottom panel) */
        <div className="space-y-6">
          <div>
            <h1 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
              Users
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Change a role or close an account. Banned people cannot sign in.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/40 uppercase tracking-wider text-muted-foreground font-semibold border-b border-border/60">
                  <tr>
                    <th className="py-3 px-5">Person</th>
                    <th className="py-3 px-5">Role</th>
                    <th className="py-3 px-5">Joined</th>
                    <th className="py-3 px-5 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 px-5 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white font-bold text-xs">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {user.id === "1" && (
                              <span className="text-[10px] text-muted-foreground font-mono">You</span>
                            )}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-mono">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <button
                          type="button"
                          onClick={() => cycleRole(user.id)}
                          className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted transition-colors"
                        >
                          {user.role === "ADMIN" ? "Admin" : user.role === "WRITER" ? "Writer" : "Reader"} ▾
                        </button>
                      </td>
                      <td className="py-3.5 px-5 font-mono text-muted-foreground">
                        {user.joined}
                      </td>
                      <td className="py-3.5 px-5 text-right space-x-2">
                        {user.banned && (
                          <span className="inline-flex rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-500 uppercase mr-2">
                            Banned
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleBan(user.id)}
                          className={`inline-flex h-7 items-center rounded-lg border px-2.5 text-[11px] font-medium transition-colors ${
                            user.banned
                              ? "border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10"
                              : "border-border text-rose-500 hover:bg-rose-500/10"
                          }`}
                        >
                          {user.banned ? "Unban" : "Ban"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
