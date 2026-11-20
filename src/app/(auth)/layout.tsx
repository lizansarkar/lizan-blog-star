export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#f4f4f2] dark:bg-neutral-950 flex items-center justify-center p-3 sm:p-6 lg:p-8">
      {children}
    </div>
  );
}
