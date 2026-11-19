# Lizan Blog Star 🌟

A calm, high-performance, full-stack publishing platform built with Next.js 16, React 19, Tailwind CSS v4, Prisma 6, PostgreSQL, and Google Gemini AI.

Crafted with care by **Lizan Sarkar** ([@lizansarkar](https://github.com/lizansarkar)).

---

## 🚀 Live Demo & Desks

Run locally at `http://localhost:3000`:
- **Reading Site**: `/` (issue-based homepage with Three.js WebGL shader, featured carousel, trending ticker, recommended reads)
- **Story Reader**: `/article/the-quiet-return-of-local-first-software` (At-a-glance points, drop cap, server-scored quizzes, interactive threaded discussions)
- **Ask Lizan (AI Assistant)**: `/ask` (Powered by **Google Gemini 1.5 Flash** with Three.js aurora and mesh particle shader)
- **Reader Desk**: `/desk/reader` (Bookmarks, reading trail, quiz certificates)
- **Writer Desk**: `/desk/writer` & Editor `/desk/writer/new` (Tiptap rich text, AI dek drafting, image upload, status controls)
- **Admin Desk**: `/desk/admin` (5 KPI stat cards, popular right now progress bars, user role cycling, instant ban toggle)
- **Typo-Tolerant Search**: `/search` or keyboard shortcut `Cmd+K` / `Ctrl+K`

---

## 🛠️ Complete 24-Step Roadmap Status

| # | Step | Status | Implementation Details |
|---|------|--------|------------------------|
| **01** | **An empty folder** | ✅ Complete | Next.js 15.5+, TypeScript strict mode, pnpm package management |
| **02** | **The design system** | ✅ Complete | Inter sans font, Tailwind CSS v4 custom color tokens, dark/light theme |
| **03** | **The database** | ✅ Complete | Prisma schema with all 17 models (`User`, `Article`, `Quiz`, `Comment`, etc.) |
| **04** | **The core logic** | ✅ Complete | Reading time calculator, slugify, headings extractor, quiz types in `src/lib/logic.ts` |
| **05** | **Seed data & every role** | ✅ Complete | 8 accounts across ADMIN, WRITER, USER roles + 14 complete seed dispatches |
| **06** | **Reading data with cache** | ✅ Complete | Cached queries with graceful database offline fallback in `src/lib/queries.ts` |
| **07** | **Accounts and roles** | ✅ Complete | Quick-fill authentication for Admin, Writer, and Reader in `src/app/(site)/login` |
| **08** | **The site shell** | ✅ Complete | Responsive navbar with `L. Lizan.`, theme switcher, and newsletter footer |
| **09** | **The home page** | ✅ Complete | Featured hero carousel, trending ticker, editor picks, Three.js WebGL banner |
| **10** | **The story page** | ✅ Complete | At-a-glance numbered points, drop cap, sticky reaction dock, sticky outline |
| **11** | **Saving, following, quizzes** | ✅ Complete | Server-scored quiz endpoint (`/api/quiz/score`), bookmarks, threaded comments |
| **12** | **Browsing** | ✅ Complete | Taxonomy routes: `/section/[slug]`, `/tag/[slug]`, `/writer/[slug]` |
| **13** | **Search that forgives typos** | ✅ Complete | Levenshtein fuzzy search engine in `src/lib/search.ts` + `Cmd+K` search modal |
| **14** | **The reader desk** | ✅ Complete | Personal library with saved dispatches, reading history trail, and notifications |
| **15** | **The writer desk** | ✅ Complete | Publications studio with Published, Scheduled, and Draft story states |
| **16** | **Uploads and media** | ✅ Complete | Image upload endpoint `/api/upload` with cover image handling |
| **17** | **The story editor** | ✅ Complete | Tiptap rich-text editor, AI dek generator, tag manager, cover previews |
| **18** | **Ask Lizan (AI Assistant)** | ✅ Complete | Google Gemini 1.5 Flash integration with Three.js background and chat history |
| **19** | **Email & the newsletter** | ✅ Complete | Newsletter subscription endpoint `/api/newsletter` with database persistence |
| **20** | **The admin desk** | ✅ Complete | 5 KPI metrics, popular stories ranking, role switching, user ban controls |
| **21** | **SEO and feeds** | ✅ Complete | RSS 2.0 feed (`/feed.xml`), dynamic `sitemap.xml`, and `robots.txt` |
| **22** | **Testing it** | ✅ Complete | Strict TypeScript checks passed (0 errors), Next.js production build passed (25/25 routes) |
| **23** | **Every key** | ✅ Complete | `.env.example` and `.env` configured with Neon Postgres, Gemini, Auth |
| **24** | **Going live** | ✅ Complete | Production build validated, pushed to GitHub repository `lizansarkar/lizan-blog-star` |

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Database (Optional for local testing)
The platform runs automatically with the built-in publication catalog even without a local database. To connect to PostgreSQL (e.g. [Neon](https://neon.tech)):
```bash
pnpm exec prisma db push
pnpm db:seed
```

### 4. Run Development Server
```bash
pnpm dev
```
Open `http://localhost:3000` in your browser.

### 5. Production Build Test
```bash
pnpm check   # TypeScript verification (0 errors)
pnpm build   # Next.js 16 production build
pnpm start   # Run production server
```

---

## 🎨 Tech Stack & Libraries

- **Framework**: Next.js 15.5+ (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4, Inter sans font, Radix UI primitives
- **Graphics**: Three.js (`0.187.0`) for interactive WebGL noise shaders
- **AI Engine**: Google Gemini API (`@google/generative-ai`)
- **Database ORM**: Prisma 6.19+ with PostgreSQL
- **Rich Text**: Tiptap 2.27
- **Fuzzy Search**: Custom Damerau-Levenshtein distance algorithm
- **Icons**: Lucide React

---

## 📜 License & Credits

Built by Lizan Sarkar. Free to use and customize for personal and commercial publications.
