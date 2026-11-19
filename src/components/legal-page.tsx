import React from "react";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

export interface LegalPageProps {
  eyebrow?: string;
  title: string;
  updated?: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
}

export function LegalPage({
  eyebrow = "Legal",
  title,
  updated = "November 2026",
  intro,
  sections,
}: LegalPageProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="border-b border-border pb-6">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="font-sans text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
          {title}
        </h1>
        {updated && (
          <p className="mt-2 text-xs text-muted-foreground font-mono">
            Last updated: {updated}
          </p>
        )}
        {intro && (
          <div className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {intro}
          </div>
        )}
      </div>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>
            <div className="prose prose-neutral dark:prose-invert mt-3 max-w-none text-base leading-relaxed text-muted-foreground">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
