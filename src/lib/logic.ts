export interface QuizQuestion {
  prompt: string;
  choices: string[];
  answer: number;
}

export interface QuizSubmission {
  quizId: string;
  answers: number[];
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateReadingTime(textOrParagraphs: string | string[]): number {
  const text = Array.isArray(textOrParagraphs) ? textOrParagraphs.join(" ") : textOrParagraphs;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function docFromParagraphs(paragraphs: string[]) {
  const content = paragraphs.map((block) => {
    const trimmed = block.trim();

    // Headings
    if (trimmed.startsWith("### ")) {
      return {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: trimmed.replace(/^###\s+/, "") }],
      };
    }
    if (trimmed.startsWith("## ")) {
      return {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: trimmed.replace(/^##\s+/, "") }],
      };
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      return {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: trimmed.replace(/^>\s+/, "") }],
          },
        ],
      };
    }

    // Code block
    if (trimmed.startsWith("```")) {
      const match = trimmed.match(/^```(\w+)?\n([\s\S]*?)```$/);
      const language = match?.[1] || "text";
      const code = match?.[2] || trimmed.replace(/```/g, "");
      return {
        type: "codeBlock",
        attrs: { language },
        content: [{ type: "text", text: code.trim() }],
      };
    }

    // Regular paragraph
    return {
      type: "paragraph",
      content: [{ type: "text", text: trimmed }],
    };
  });

  return {
    type: "doc",
    content,
  };
}

export function extractHeadings(paragraphs: string[]): HeadingItem[] {
  const headings: HeadingItem[] = [];
  for (const block of paragraphs) {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace(/^##\s+/, "");
      headings.push({ id: slugify(text), text, level: 2 });
    } else if (trimmed.startsWith("### ")) {
      const text = trimmed.replace(/^###\s+/, "");
      headings.push({ id: slugify(text), text, level: 3 });
    }
  }
  return headings;
}
