/**
 * Typo-tolerant search engine with Levenshtein fuzzy distance matching.
 */

export interface SearchableItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  author?: string;
  readingTime?: number;
}

/**
 * Calculates the Levenshtein distance between two strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const matrix: number[][] = [];
  for (let i = 0; i <= bn; ++i) matrix[i] = [i];
  for (let i = 0; i <= an; ++i) matrix[0][i] = i;

  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[bn][an];
}

/**
 * Checks if a word approximately matches another word within tolerance.
 */
function fuzzyWordMatch(word: string, target: string): { matched: boolean; score: number } {
  const w = word.toLowerCase();
  const t = target.toLowerCase();

  // Exact match
  if (w === t) return { matched: true, score: 100 };

  // Substring or prefix match
  if (t.includes(w)) {
    const ratio = w.length / t.length;
    return { matched: true, score: 70 + Math.floor(ratio * 25) };
  }

  // Allow 1 typo for words of length 4-6, 2 typos for 7+
  const maxDistance = w.length <= 4 ? 1 : w.length <= 7 ? 2 : 3;
  const dist = levenshteinDistance(w, t);

  if (dist <= maxDistance) {
    const score = Math.max(20, 60 - dist * 15);
    return { matched: true, score };
  }

  return { matched: false, score: 0 };
}

export interface SearchResult<T extends SearchableItem> {
  item: T;
  score: number;
}

/**
 * Searches items with typo tolerance, ranking results by relevance.
 */
export function fuzzySearch<T extends SearchableItem>(
  query: string,
  items: T[],
  limit = 10
): SearchResult<T>[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const queryTokens = trimmed.split(/\s+/).filter(Boolean);
  const results: SearchResult<T>[] = [];

  for (const item of items) {
    let totalScore = 0;
    const titleWords = item.title.toLowerCase().split(/\s+/);
    const excerptWords = (item.excerpt || "").toLowerCase().split(/\s+/);
    const tagWords = (item.tags || []).map((t) => t.toLowerCase());
    const categoryWords = (item.category || "").toLowerCase().split(/\s+/);
    const authorWords = (item.author || "").toLowerCase().split(/\s+/);

    let allTokensMatched = true;

    for (const qToken of queryTokens) {
      let maxTokenScore = 0;

      // 1. Check title (3x weight)
      for (const tWord of titleWords) {
        const { matched, score } = fuzzyWordMatch(qToken, tWord);
        if (matched) {
          maxTokenScore = Math.max(maxTokenScore, score * 3);
        }
      }

      // 2. Check tags (2x weight)
      for (const tWord of tagWords) {
        const { matched, score } = fuzzyWordMatch(qToken, tWord);
        if (matched) {
          maxTokenScore = Math.max(maxTokenScore, score * 2);
        }
      }

      // 3. Check category (2x weight)
      for (const cWord of categoryWords) {
        const { matched, score } = fuzzyWordMatch(qToken, cWord);
        if (matched) {
          maxTokenScore = Math.max(maxTokenScore, score * 2);
        }
      }

      // 4. Check author
      for (const aWord of authorWords) {
        const { matched, score } = fuzzyWordMatch(qToken, aWord);
        if (matched) {
          maxTokenScore = Math.max(maxTokenScore, score * 1.5);
        }
      }

      // 5. Check excerpt
      for (const eWord of excerptWords) {
        const { matched, score } = fuzzyWordMatch(qToken, eWord);
        if (matched) {
          maxTokenScore = Math.max(maxTokenScore, score);
        }
      }

      if (maxTokenScore === 0) {
        allTokensMatched = false;
        break;
      }

      totalScore += maxTokenScore;
    }

    if (allTokensMatched && totalScore > 0) {
      results.push({ item, score: totalScore });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
