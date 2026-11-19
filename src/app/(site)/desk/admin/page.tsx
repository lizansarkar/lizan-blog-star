"use client";

import { useState } from "react";
import { Shield, Users, BookOpen, Eye, Award, Check, Ban, Settings } from "lucide-react";

interface AccountUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "WRITER" | "USER";
  banned: boolean;
}

export default function AdminDeskPage() {
  const [users, setUsers] = useState<AccountUser[]>([
    { id: "1", name: "Lizan Sarkar", email: "admin@lizan.dev", role: "ADMIN", banned: false },
    { id: "2", name: "Jules Berger", email: "writer@lumina.dev", role: "WRITER", banned: false },
    { id: "3", name: "Mira Okafor", email: "mira@lumina.dev", role: "WRITER", banned: false },
    { id: "4", name: "Theo Lindqvist", email: "theo@lumina.dev", role: "WRITER", banned: false },
    { id: "5", name: "Sam Ibarra", email: "reader@lumina.dev", role: "USER", banned: false },
    { id: "6", name: "Priya Nair", email: "priya@lumina.dev", role: "USER", banned: false },
    { id: "7", name: "Leo Martins", email: "leo@lumina.dev", role: "USER", banned: false },
    { id: "8", name: "Rex Vance", email: "banned@lumina.dev", role: "USER", banned: true },
  ]);

  const toggleBan = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, banned: !u.banned } : u))
    );
  };

  const promoteRole = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const nextRole = u.role === "USER" ? "WRITER" : u.role === "WRITER" ? "ADMIN" : "USER";
        return { ...u, role: nextRole };
      })
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Shield className="h-4 w-4" />
          <span>Admin Desk</span>
        </div>
        <h1 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Publication Command
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Executive analytics, role management, instant ban enforcement, and publication settings.
        </p>
      </div>

      {/* Analytics Metric Cards */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <Users className="h-4 w-4 text-primary" />
            <span>Total Accounts</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">{users.length}</div>
          <span className="text-[11px] text-muted-foreground mt-1 block">8 demo profiles</span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <BookOpen className="h-4 w-4 text-emerald-500" />
            <span>Published Stories</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">14</div>
          <span className="text-[11px] text-muted-foreground mt-1 block">Across 4 categories</span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <Eye className="h-4 w-4 text-blue-500" />
            <span>Total Pageviews</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">1,280</div>
          <span className="text-[11px] text-emerald-500 mt-1 block">+18% this issue</span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <Award className="h-4 w-4 text-amber-500" />
            <span>Quiz Attempts</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">84</div>
          <span className="text-[11px] text-muted-foreground mt-1 block">88% average score</span>
        </div>
      </div>

      {/* User Management */}
      <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-5 border-b border-border/60 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground">Accounts & Role Control</h2>
            <p className="text-xs text-muted-foreground">Server-enforced permissions. Bans apply on the very next request.</p>
          </div>
          <span className="text-xs font-mono text-muted-foreground">{users.length} active records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="py-3 px-5">Name & Email</th>
                <th className="py-3 px-5">Role</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{user.email}</div>
                  </td>
                  <td className="py-3.5 px-5">
                    <button
                      type="button"
                      onClick={() => promoteRole(user.id)}
                      title="Click to cycle role"
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        user.role === "ADMIN"
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          : user.role === "WRITER"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.role}
                    </button>
                  </td>
                  <td className="py-3.5 px-5">
                    {user.banned ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500">
                        <Ban className="h-3.5 w-3.5" />
                        <span>Banned</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
                        <Check className="h-3.5 w-3.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => toggleBan(user.id)}
                      className={`inline-flex h-8 items-center rounded-lg border px-3 text-xs font-medium transition-colors ${
                        user.banned
                          ? "border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"
                          : "border-rose-500/30 text-rose-600 hover:bg-rose-500/10"
                      }`}
                    >
                      {user.banned ? "Unban" : "Ban Account"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
