export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl animate-pulse px-4 py-10 sm:px-6 lg:py-14">
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="mt-4 h-10 w-2/3 rounded bg-muted" />
      <div className="mt-4 h-6 w-full rounded bg-muted" />
      <div className="mt-2 h-6 w-4/5 rounded bg-muted" />
      <div className="mt-10 grid gap-4">
        <div className="h-32 rounded-2xl bg-muted" />
        <div className="h-32 rounded-2xl bg-muted" />
      </div>
    </div>
  );
}
