import Link from "next/link";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import { getSettings } from "@/lib/queries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: "What Lumina is, who it is for, and how the desk works.",
  path: "/about",
});

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <About />
    </Suspense>
  );
}

async function About() {
  const settings = await getSettings();
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-sm font-medium text-primary">{settings.siteName}</p>
      <h1 className="mt-2 font-sans text-4xl font-bold tracking-tight sm:text-5xl">About</h1>
      <p className="mt-4 text-xl text-foreground">{settings.tagline}</p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{settings.description}</p>
      <div className="mt-10 grid gap-4">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">The issue</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Stories on engineering, design, product, and the tools people finish. Each piece can carry audio, video, and a short quiz.</p>
        </section>
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">The desk</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Sign in to save stories, keep a reading history, and see quiz scores. Writers file drafts. An editor publishes them.</p>
        </section>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/articles" className="inline-flex h-10 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background">
          Read the articles
        </Link>
        <Link href="/register" className="inline-flex h-10 items-center rounded-full border border-border bg-card px-4 text-sm font-medium">
          Join
        </Link>
      </div>
    </div>
  );
}
