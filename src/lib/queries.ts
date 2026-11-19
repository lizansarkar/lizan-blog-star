export interface SiteSettingData {
  id: number;
  siteName: string;
  tagline: string;
  description: string;
}

export async function getSettings(): Promise<SiteSettingData> {
  // If database is available, fetch from database; otherwise return default publication settings
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
    siteName: "Lizan Blog Star",
    tagline: "A calmer publication for technology, engineering, and digital craft.",
    description:
      "Lizan Blog Star is an editorial publication for people who build software, shape digital products, and care deeply about how engineering work reads.",
  };
}
