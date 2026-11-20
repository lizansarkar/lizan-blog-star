import { getPublishedArticles, ArticlePreview, seedArticles } from "@/lib/articles";

export interface SiteSettingData {
  id: number;
  siteName: string;
  tagline: string;
  description: string;
}

export async function getSettings(): Promise<SiteSettingData> {
  try {
    const { prisma } = await import("@/lib/prisma");
    const settings = await prisma.siteSetting.findFirst();
    if (settings) {
      return settings;
    }
  } catch {
    // Fall back to default settings
  }

  return {
    id: 1,
    siteName: "Lizan",
    tagline: "A calmer place for technology.",
    description:
      "Lizan is a modern publication for people who build software, shape products, and care how the work reads.",
  };
}

export { getPublishedArticles, seedArticles };
export type { ArticlePreview };
