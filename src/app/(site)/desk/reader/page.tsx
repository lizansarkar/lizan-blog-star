import Link from "next/link";
import { BookOpen, Bookmark, History, Award, Bell, ArrowRight } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";

export default async function ReaderDeskPage() {
  const articles = await getPublishedArticles();
  const savedStories = articles.slice(0, 3);
  const readingHistory = articles.slice(1, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <BookOpen className="h-4 w-4" />
          <span>Reader Desk</span>
        </div>
        <h1 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Your Reading Room
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access your bookmarked essays, reading trail, quiz certificates, and publication notifications.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <Bookmark className="h-4 w-4 text-primary" />
            <span>Saved Stories</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">{savedStories.length}</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <History className="h-4 w-4 text-primary" />
            <span>Articles Read</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">12</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <Award className="h-4 w-4 text-primary" />
            <span>Quizzes Passed</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">5</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <Bell className="h-4 w-4 text-primary" />
            <span>Notifications</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">2</div>
        </div>
      </div>

      {/* Desk Sections */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bookmarks */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <span>Saved Dispatches</span>
            </h2>
            <span className="text-xs text-muted-foreground font-mono">{savedStories.length} items</span>
          </div>
          <div className="mt-4 divide-y divide-border/50">
            {savedStories.map((story) => (
              <div key={story.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">
                    {story.category}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    <Link href={`/article/${story.slug}`}>{story.title}</Link>
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{story.excerpt}</p>
                </div>
                <Link
                  href={`/article/${story.slug}`}
                  className="shrink-0 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Reading History */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              <span>Recent Reading Trail</span>
            </h2>
            <span className="text-xs text-muted-foreground font-mono">Last 7 days</span>
          </div>
          <div className="mt-4 divide-y divide-border/50">
            {readingHistory.map((story) => (
              <div key={story.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    <Link href={`/article/${story.slug}`}>{story.title}</Link>
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                    <span>{story.authorName}</span>
                    <span>•</span>
                    <span>{story.readingTime} min read</span>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground font-mono">Read</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
