import Link from "next/link";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import { getSettings } from "@/lib/queries";
import { pageMetadata } from "@/lib/seo";
import { FadeIn, StaggerContainer, StaggerItem, CardHover } from "@/components/motion-wrapper";

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
      <FadeIn yOffset={20} duration={0.8}>
        {/* Title */}
        <h1 className="font-sans text-4xl sm:text-[48px] font-bold tracking-tight text-neutral-950 dark:text-white">
          About
        </h1>

        {/* Standfirst / Tagline */}
        <p className="mt-3.5 sm:mt-4 text-lg sm:text-[20px] font-medium text-neutral-800 dark:text-neutral-200">
          {settings.tagline || "A calmer place for technology."}
        </p>

        {/* Publication Description */}
        <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
          {settings.description ||
            "Lizan is a modern publication for people who build software, shape products, and care how the work reads."}
        </p>
      </FadeIn>

      {/* Two White Rounded Cards */}
      <StaggerContainer staggerDelay={0.12} className="mt-8 sm:mt-10 flex flex-col gap-4">
        <StaggerItem>
          <CardHover yDelta={-5}>
            <section className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-lg">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-950 dark:text-white">
                The issue
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                Stories on engineering, design, product, and the tools people finish. Each piece can carry audio, video, and a short quiz.
              </p>
            </section>
          </CardHover>
        </StaggerItem>

        <StaggerItem>
          <CardHover yDelta={-5}>
            <section className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-lg">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-950 dark:text-white">
                The desk
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                Sign in to save stories, keep a reading history, and see quiz scores. Writers file drafts. An editor publishes them.
              </p>
            </section>
          </CardHover>
        </StaggerItem>
      </StaggerContainer>

      {/* Action Buttons Row */}
      <FadeIn delay={0.25} yOffset={15} duration={0.8}>
        <div className="mt-8 sm:mt-10 flex items-center gap-3">
          <Link
            href="/articles"
            className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full bg-neutral-950 dark:bg-white px-6 sm:px-7 text-xs sm:text-sm font-semibold text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-300 shadow-sm hover:scale-[1.02]"
          >
            Read the articles
          </Link>
          <Link
            href="/register"
            className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 sm:px-7 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.02]"
          >
            Join
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
