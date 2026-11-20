import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Clock, BookOpen, Tag } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "All Dispatches",
  description:
    "Browse the complete archive of essays and dispatches across engineering, design, product, and AI.",
  path: "/articles",
});

export default async function ArticlesIndexPage() {
  const articles = await getPublishedArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Publication Archive
        </p>
        <h1 className="mt-2 font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          All Dispatches
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-2xl">
          Essays on local-first architecture, systems design, restrained
          interfaces, and software craftsmanship.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div>
              {/* Cover */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
                {article.coverImage ? (
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                    <BookOpen className="h-8 w-8" />
                  </div>
                )}
                <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-semibold text-foreground uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              {/* Title & Excerpt */}
              <h2 className="mt-4 font-sans text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                <Link href={`/article/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Meta */}
            <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {article.authorName}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTime} min read
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
