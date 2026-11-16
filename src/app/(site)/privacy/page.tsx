import { LegalPage, type LegalSection } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "What Lumina stores about readers and writers, why, and how to remove it.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    id: "what-we-keep",
    title: "What we keep",
    body: (
      <ul>
        <li>Your account: name, email, a hashed password, and your role. If you sign in with Google or GitHub, we keep the account link they send back, not your password there.</li>
        <li>Profile details you choose to add, like a bio, location, website, phone, or date of birth.</li>
        <li>Your reading desk: bookmarks, reading history, quiz scores, the writers and sections you follow, and your notifications.</li>
        <li>Comments you post, shown with your name.</li>
        <li>Conversations with Ask Lumina. Guests are tied to a browser cookie instead of an account.</li>
        <li>Your newsletter subscription, if you join.</li>
        <li>Messages you send through the contact form.</li>
      </ul>
    ),
  },
  {
    id: "why",
    title: "Why we keep it",
    body: (
      <>
        <p>To run the parts of Lumina you use: signing in, saving stories, recommending what to read next, scoring quizzes, sending the weekly email, and answering messages.</p>
        <p>We do not sell personal data and we do not show third-party ads.</p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: <p>We set a session cookie when you sign in, and a guest cookie so Ask Lumina can keep your conversation. Your theme and remembered email live in your own browser storage. There are no advertising or cross-site tracking cookies.</p>,
  },
  {
    id: "services",
    title: "Services we rely on",
    body: (
      <ul>
        <li>A hosted Postgres database for everything listed above.</li>
        <li>Cloudinary for images, audio, and video that writers upload.</li>
        <li>Anthropic to answer Ask Lumina questions and to help writers draft summaries and quizzes.</li>
        <li>Resend to deliver password resets, newsletters, and contact replies.</li>
        <li>Google and GitHub, only if you choose to sign in with them.</li>
        <li>Cloudflare Turnstile, when enabled, to keep bots off sign-up and contact forms.</li>
      </ul>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    body: (
      <ul>
        <li>Edit your profile anytime from your desk settings.</li>
        <li>Remove bookmarks, unfollow writers or sections, and delete your own comments.</li>
        <li>Unsubscribe from the newsletter with the link in any issue.</li>
        <li>Ask us to export or delete your account through the contact page. We handle it within 30 days.</li>
      </ul>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: <p>Account data stays while your account is open. Password reset links expire after one hour. When an account is deleted, its desk data and conversations go with it. Published stories by a writer may stay up under the publication&apos;s name.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Policies"
      title="Privacy"
      updated="November 13, 2026"
      intro={<p>The short version: we keep what we need to run your reading desk, we never sell it, and you can ask us to delete it.</p>}
      sections={sections}
    />
  );
}
