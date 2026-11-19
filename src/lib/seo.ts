import type { Metadata } from "next";

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataOptions): Metadata {
  const siteName = "Lizan Blog Star";
  const fullTitle = `${title} | ${siteName}`;
  const ogImage = image || "/for-your-help/images/social-preview.png";

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
