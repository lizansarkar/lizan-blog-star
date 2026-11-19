import { NextResponse } from "next/server";
import { getPublishedArticles, ArticlePreview } from "@/lib/articles";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const articles: ArticlePreview[] = await getPublishedArticles();

  const itemsXml = articles
    .map((article: ArticlePreview) => {
      const pubDate = new Date(article.publishedAt || Date.now()).toUTCString();
      const articleUrl = `${baseUrl}/article/${article.slug}`;
      const authorName = article.authorName || "Lizan Sarkar";
      const category = article.category || "Engineering";

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.excerpt || ""}]]></description>
      <author><![CDATA[${authorName}]]></author>
      <category><![CDATA[${category}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lizan Blog Star</title>
    <link>${baseUrl}</link>
    <description>A calm publication for people who build software, shape products, and care deeply about how engineering reads.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
