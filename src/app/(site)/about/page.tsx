import Link from "next/link";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import { getSettings } from "@/lib/queries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: "What Lizan is, who it is for, and how the desk works.",
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
    <div className="mx-auto w-full max-w-[620px] px-4 pt-12 pb-24 sm:px-6 sm:pt-16 sm:pb-32">
      {/* Title */}
      <h1 className="font-sans text-4xl sm:text-[44px] font-bold tracking-tight text-neutral-950 dark:text-white">
        About
      </h1>

      {/* Standfirst / Tagline */}
      <p className="mt-3.5 sm:mt-4 text-lg sm:text-[19px] font-medium text-neutral-800 dark:text-neutral-200">
        {settings.tagline || "A calmer place for technology."}
      </p>

      {/* Publication Description */}
      <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
        {settings.description ||
          "Lizan is a modern publication for people who build software, shape products, and care how the work reads."}
      </p>

      {/* Two White Rounded Cards */}
      <div className="mt-8 sm:mt-10 flex flex-col gap-3.5">
        <section className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <h2 className="text-[15px] sm:text-base font-semibold text-neutral-950 dark:text-white">
            The issue
          </h2>
          <p className="mt-1.5 text-[13px] sm:text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            Stories on engineering, design, product, and the tools people finish. Each piece can carry audio, video, and a short quiz.
          </p>
        </section>

        <section className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <h2 className="text-[15px] sm:text-base font-semibold text-neutral-950 dark:text-white">
            The desk
          </h2>
          <p className="mt-1.5 text-[13px] sm:text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            Sign in to save stories, keep a reading history, and see quiz scores. Writers file drafts. An editor publishes them.
          </p>
        </section>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-6 sm:mt-8 flex items-center gap-2.5">
        <Link
          href="/articles"
          className="inline-flex h-9 sm:h-10 items-center justify-center rounded-full bg-neutral-950 dark:bg-white px-5 text-xs sm:text-[13px] font-semibold text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-xs"
        >
          Read the articles
        </Link>
        <Link
          href="/register"
          className="inline-flex h-9 sm:h-10 items-center justify-center rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5 text-xs sm:text-[13px] font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          Join
        </Link>
      </div>
    </div>
  );
}
