import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPublishedArticles } from "@/lib/articles";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "A valid question is required." }, { status: 400 });
    }

    const articles = await getPublishedArticles();
    const apiKey = process.env.GEMINI_API_KEY;

    // Search catalog for relevant articles
    const queryLower = question.toLowerCase();
    const matchingArticles = articles.filter((a) =>
      a.title.toLowerCase().includes(queryLower) ||
      a.excerpt.toLowerCase().includes(queryLower) ||
      a.category.toLowerCase().includes(queryLower) ||
      a.tags.some((t) => t.toLowerCase().includes(queryLower))
    );

    // Context summary for Gemini
    const catalogContext = articles
      .slice(0, 10)
      .map(
        (a) =>
          `Title: "${a.title}" | Category: ${a.category} | Link: /article/${a.slug} | Excerpt: ${a.excerpt}`
      )
      .join("\n");

    if (apiKey && apiKey.trim() !== "") {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are "Ask Lizan", the intelligent publication assistant for Lizan Blog Star (founded by Lizan Sarkar).
Answer the user's question accurately and calmly using our publication archive. Recommend relevant articles when appropriate.

Here is a list of stories currently in the Lizan Blog Star archive:
${catalogContext}

User Question: ${question}

Instructions:
1. Provide a concise, clear, and thoughtful answer.
2. If any articles from our archive match the question, cite them by title and include their relative link (e.g., [Title](/article/slug)).
3. Keep the tone calm, editorial, and helpful.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return NextResponse.json({
          answer: responseText,
          suggestions: matchingArticles.slice(0, 3),
        });
      } catch (geminiError) {
        console.warn("Gemini API error, falling back to catalog search:", geminiError);
      }
    }

    // Intelligent catalog fallback when no API key or on error
    if (matchingArticles.length > 0) {
      const topMatch = matchingArticles[0];
      const answer = `Based on our publication archive, here are relevant dispatches regarding "${question}":\n\n- [${topMatch.title}](/article/${topMatch.slug}): ${topMatch.excerpt}\n\nYou can explore these and other related stories below.`;
      return NextResponse.json({
        answer,
        suggestions: matchingArticles.slice(0, 3),
      });
    }

    return NextResponse.json({
      answer: `Thank you for your question. While I couldn't find an exact keyword match in our archive for "${question}", you can browse our latest engineering and design pieces below. To enable full AI reasoning, add your free GEMINI_API_KEY to .env.`,
      suggestions: articles.slice(0, 3),
    });
  } catch (error) {
    console.error("Ask route error:", error);
    return NextResponse.json({ error: "Failed to generate answer." }, { status: 500 });
  }
}
