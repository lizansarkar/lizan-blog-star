import { cn } from "@/lib/utils";

export function ArchiveField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary/15 via-accent/20 to-transparent blur-3xl rounded-full opacity-60" />
      <div className="absolute top-12 right-1/4 w-[400px] h-[250px] bg-gradient-to-bl from-primary/10 to-transparent blur-2xl rounded-full opacity-40" />
    </div>
  );
}
