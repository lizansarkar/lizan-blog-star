import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-semibold tracking-widest text-[#c25e37] uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
        Story not found
      </h1>
      <p className="mt-3 max-w-md text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
        The page you are looking for does not exist in the Lizan archive or has been moved to another section.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 dark:bg-white px-6 text-sm font-semibold text-white dark:text-neutral-950 shadow-sm hover:opacity-90 transition-all"
      >
        <ArrowLeft className="size-4" />
        Return home
      </Link>
    </div>
  );
}
