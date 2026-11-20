import { getPublishedArticles, type ArticlePreview } from "@/lib/articles";
import { ArticlesBrowser, type BrowserStory } from "@/components/articles-browser";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Browse our stories · Lizan",
  description: "Pieces from the desk on engineering, design, product, and the tools people finish.",
  path: "/articles",
});

interface ArticlesPageProps {
  searchParams?: Promise<{
    category?: string;
    tag?: string;
    q?: string;
  }>;
}

// Ordered stories matching https://lumina.noksha.dev/articles and reference screenshot
const defaultStoriesOrder: BrowserStory[] = [
  {
    id: "art-1",
    title: "Notes on building a reading product people finish",
    slug: "notes-on-building-a-reading-product-people-finish",
    excerpt: "Completion is a design outcome. It starts with the width of the column.",
    category: "Product",
    coverImage: "https://images.unsplash.com/photo-1759314710754-bb3e11fbaa7b?auto=format&fit=crop&w=2400&q=80",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    publishedAt: "2026-11-15T06:54:18.633Z",
    readingTime: 9,
    tags: ["reading", "editorial"],
    viewCount: 4,
    featured: true,
  },
  {
    id: "art-2",
    title: "The quiet return of local-first software",
    slug: "the-quiet-return-of-local-first-software",
    excerpt: "After a decade of renting every workflow, teams are keeping the source of truth on the machine again.",
    category: "Engineering",
    coverImage: "https://images.unsplash.com/photo-1779444480529-7df3c5645991?auto=format&fit=crop&w=2400&q=80",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    publishedAt: "2026-11-10T06:53:27.143Z",
    readingTime: 5,
    tags: ["local-first", "sync", "product"],
    viewCount: 105,
  },
  {
    id: "art-3",
    title: "The notebook that survived the rewrite",
    slug: "the-notebook-that-survived-the-rewrite",
    excerpt: "The useful notes were the short ones, written in the margin of the work itself.",
    category: "Engineering",
    coverImage: "https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?auto=format&fit=crop&w=2400&q=80",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    publishedAt: "2026-11-09T06:53:55.146Z",
    readingTime: 5,
    tags: ["systems", "writing"],
    viewCount: 130,
  },
  {
    id: "art-4",
    title: "Why inference costs rewrote product roadmaps",
    slug: "why-inference-costs-rewrote-product-roadmaps",
    excerpt: "A feature that was free to demo became a line item, and the roadmap had to learn arithmetic.",
    category: "Product",
    coverImage: "https://images.unsplash.com/photo-1587845323226-bad89242c735?auto=format&fit=crop&w=2400&q=80",
    authorName: "Ada Quinn",
    authorSlug: "ada-quinn",
    publishedAt: "2026-11-08T06:53:33.463Z",
    readingTime: 6,
    tags: ["ai", "cost", "roadmaps"],
    viewCount: 92,
  },
  {
    id: "art-5",
    title: "Shipping without a status meeting",
    slug: "shipping-without-a-status-meeting",
    excerpt: "The release notes were the meeting. Everything else was a rehearsal.",
    category: "Product",
    coverImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=2400&q=80",
    authorName: "Ada Quinn",
    authorSlug: "ada-quinn",
    publishedAt: "2026-11-07T06:53:58.921Z",
    readingTime: 7,
    tags: ["shipping", "teams"],
    viewCount: 185,
  },
  {
    id: "art-6",
    title: "A calmer interface for dense information",
    slug: "a-calmer-interface-for-dense-information",
    excerpt: "Density is not crowding. Notice is. The pages people finish leave room around the idea.",
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1771147372634-976f022c0033?auto=format&fit=crop&w=2400&q=80",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    publishedAt: "2026-11-06T06:53:39.141Z",
    readingTime: 6,
    tags: ["density", "devices"],
    viewCount: 140,
  },
  {
    id: "art-7",
    title: "Type that knows when to stop",
    slug: "type-that-knows-when-to-stop",
    excerpt: "A headline can be large, it cannot be large and crowded.",
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1792978081649-c2291ec95b50?auto=format&fit=crop&w=2400&q=80",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    publishedAt: "2026-11-05T06:53:49.144Z",
    readingTime: 5,
    tags: ["typography", "editorial"],
    viewCount: 110,
  },
  {
    id: "art-8",
    title: "The case for boring deployment pipelines",
    slug: "the-case-for-boring-deployment-pipelines",
    excerpt: "The most expensive pipeline is the one only one person can explain on a Friday.",
    category: "Engineering",
    coverImage: "https://images.unsplash.com/photo-1565900290201-6116cd97a6b8?auto=format&fit=crop&w=2400&q=80",
    authorName: "Ada Quinn",
    authorSlug: "ada-quinn",
    publishedAt: "2026-11-04T06:53:23.461Z",
    readingTime: 8,
    tags: ["pipelines", "devops"],
    viewCount: 240,
  },
  {
    id: "art-9",
    title: "A quieter model beside the cursor",
    slug: "a-quieter-model-beside-the-cursor",
    excerpt: "The useful assistant got small enough to sit in the margin.",
    category: "AI",
    coverImage: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?auto=format&fit=crop&w=2400&q=80",
    authorName: "Ada Quinn",
    authorSlug: "ada-quinn",
    publishedAt: "2026-11-03T06:53:44.467Z",
    readingTime: 5,
    tags: ["ai", "models", "writing"],
    viewCount: 160,
  },
  {
    id: "art-10",
    title: "What small models changed about writing tools",
    slug: "what-small-models-changed-about-writing-tools",
    excerpt: "The useful assistant got cheaper, which means it can sit closer to the sentence.",
    category: "AI",
    coverImage: "https://images.unsplash.com/photo-1612873003118-f0160ec93f4c?auto=format&fit=crop&w=2400&q=80",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    publishedAt: "2026-10-31T06:53:14.137Z",
    readingTime: 6,
    tags: ["models", "tools"],
    viewCount: 175,
  },
  {
    id: "art-11",
    title: "What the deploy log is for",
    slug: "what-the-deploy-log-is-for",
    excerpt: "If only one person can explain the pipeline, the pipeline is already late.",
    category: "Engineering",
    coverImage: "https://images.unsplash.com/photo-1760307837850-13db8b0d94cb?auto=format&fit=crop&w=2400&q=80",
    authorName: "Jules Berger",
    authorSlug: "jules-berger",
    publishedAt: "2026-10-30T06:53:02.133Z",
    readingTime: 5,
    tags: ["pipelines", "systems"],
    viewCount: 195,
  },
  {
    id: "art-12",
    title: "Design systems after the component gold rush",
    slug: "design-systems-after-the-component-gold-rush",
    excerpt: "A library of buttons is not a system. A system is an agreement about what you will not redraw.",
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?auto=format&fit=crop&w=2400&q=80",
    authorName: "Ada Quinn",
    authorSlug: "ada-quinn",
    publishedAt: "2026-10-27T06:53:11.458Z",
    readingTime: 7,
    tags: ["design", "systems"],
    viewCount: 155,
  },
  {
    id: "art-13",
    title: "Readers finish what you leave room for",
    slug: "readers-finish-what-you-leave-room-for",
    excerpt: "Completion is a design outcome. It starts with the width of the column.",
    category: "Product",
    coverImage: "https://images.unsplash.com/photo-1529016912215-a4c95c80d1dc?auto=format&fit=crop&w=2400&q=80",
    authorName: "Ada Quinn",
    authorSlug: "ada-quinn",
    publishedAt: "2026-10-24T06:53:05.454Z",
    readingTime: 5,
    tags: ["editorial", "reading"],
    viewCount: 135,
  },
];

export default async function ArticlesIndexPage({ searchParams }: ArticlesPageProps) {
  const resolved = searchParams ? await searchParams : {};
  const initialCategory = resolved.category || "all";
  const initialTag = resolved.tag || "all";
  const initialQuery = resolved.q || "";

  // Try fetching published articles from database
  let stories = defaultStoriesOrder;
  try {
    const dbArticles = await getPublishedArticles();
    if (dbArticles && dbArticles.length >= 10) {
      stories = dbArticles.map((a, i) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        category: a.category,
        coverImage: a.coverImage || defaultStoriesOrder[i % defaultStoriesOrder.length].coverImage,
        authorName: a.authorName,
        authorSlug: a.authorName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        publishedAt: a.publishedAt,
        readingTime: a.readingTime || 5,
        tags: a.tags || [],
        viewCount: 100 + i * 15,
      }));
    }
  } catch {
    // Fallback to default exact live stories
  }

  return (
    <ArticlesBrowser
      stories={stories}
      initialCategory={initialCategory}
      initialTag={initialTag}
      initialQuery={initialQuery}
    />
  );
}
