import Link from "next/link";
import { format } from "date-fns";
import { PenTool, Plus, FileText, Calendar, CheckCircle, Eye, Edit3 } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";

export default async function WriterDeskPage() {
  const articles = await getPublishedArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <PenTool className="h-4 w-4" />
            <span>Writer Desk</span>
          </div>
          <h1 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Author Studio
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Draft, schedule, and refine your essays. Manage your publications and track reader reach.
          </p>
        </div>

        <div>
          <Link
            href="/desk/writer/new"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground hover:opacity-90 shadow-sm transition-opacity"
          >
            <Plus className="h-4 w-4" />
            <span>New Dispatch</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span>Published Stories</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">{articles.length}</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <Calendar className="h-4 w-4 text-amber-500" />
            <span>Scheduled</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">2</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <FileText className="h-4 w-4 text-blue-500" />
            <span>Drafts in Progress</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">3</div>
        </div>
      </div>

      {/* Stories Table */}
      <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-5 border-b border-border/60">
          <h2 className="text-base font-bold text-foreground">Your Publications</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="py-3 px-5">Title</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {articles.slice(0, 8).map((article, index) => (
                <tr key={article.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-semibold text-foreground line-clamp-1">{article.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{article.excerpt}</div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                      {article.category}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Published
                    </span>
                  </td>
                  <td className="py-4 px-5 text-xs text-muted-foreground font-mono">
                    {format(article.publishedAt, "MMM d, yyyy")}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <Link
                      href={`/article/${article.slug}`}
                      className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View</span>
                    </Link>
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
