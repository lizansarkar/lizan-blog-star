import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingAssistant } from "@/components/floating-assistant";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingAssistant />
    </div>
  );
}
