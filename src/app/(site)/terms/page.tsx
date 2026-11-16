import { LegalPage, type LegalSection } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description: "The rules for reading, commenting, and writing on Lumina.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "accounts",
    title: "Your account",
    body: <p>Keep your password to yourself and give us an email you can read. You are responsible for what happens under your account. Tell us quickly if you think someone else is using it.</p>,
  },
  {
    id: "comments",
    title: "Comments and conduct",
    body: (
      <>
        <p>Disagree with the idea, not the person. We remove comments that harass, spam, share someone&apos;s private details, or break the law.</p>
        <p>Editors can hide comments and close accounts that keep breaking these rules.</p>
      </>
    ),
  },
  {
    id: "writers",
    title: "Writers",
    body: (
      <ul>
        <li>You keep the rights to what you write. You give Lumina permission to publish, edit for length and clarity, and promote it.</li>
        <li>Only upload images, audio, and video you have the right to use, and credit sources.</li>
        <li>AI drafting tools are helpers. You are responsible for checking every summary and quiz answer before it is published.</li>
      </ul>
    ),
  },
  {
    id: "content",
    title: "Using our stories",
    body: <p>Quote and link freely with credit. Do not republish whole stories without permission. The RSS feed is for personal reading apps.</p>,
  },
  {
    id: "ask-lumina",
    title: "Ask Lumina",
    body: <p>Ask Lumina answers from the stories on this site and can be wrong. Treat its answers as a starting point and follow the links it gives.</p>,
  },
  {
    id: "changes",
    title: "Changes",
    body: <p>We may update these terms as Lumina grows. When the change matters, we will note it here with a new date and, for account holders, by email.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Policies"
      title="Terms"
      updated="November 13, 2026"
      intro={<p>These are the house rules for reading, commenting, and writing on Lumina. By using the site you agree to them.</p>}
      sections={sections}
    />
  );
}
