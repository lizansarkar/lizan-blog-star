import bcrypt from "bcryptjs";
import { PrismaClient, type ArticleStatus, type Prisma } from "@prisma/client";
import { docFromParagraphs, type QuizQuestion } from "../src/lib/logic";
import { boringPipeline, boringPipelineKeyPoints, seedPipelineConversation } from "./stories/boring-pipelines";

const prisma = new PrismaClient();

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

const stories: {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  cover: string;
  status: ArticleStatus;
  paragraphs: string[];
  keyPoints?: string[];
  videoUrl?: string;
  audioUrl?: string;
  daysAgo: number;
  scheduledInDays?: number;
  quiz?: { title: string; questions: QuizQuestion[] };
}[] = [
  {
    title: "The quiet return of local-first software",
    excerpt: "After a decade of renting every workflow, teams are keeping the source of truth on the machine again.",
    category: "Engineering",
    tags: ["local-first", "sync", "product"],
    cover: photo("photo-1779444480529-7df3c5645991"),
    status: "PUBLISHED",
    daysAgo: 1,
    videoUrl: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
    paragraphs: [
      "## The file left the building",
      "For a while, the default architecture was a browser, an account, and a server that owned the file. It was easy to sell and easy to meter. It was also a strange way to write a paragraph.",
      "The rented file taught people to wait. A spinner meant the sentence was somewhere else. Local-first software flips that default. The document lives on the device. The network is for sharing, not for opening what you made yesterday.",
      "## When two sentences meet",
      "The hard part was never the slogan. It is conflict. Two people edit the same sentence, the machines meet again, and something has to decide what the sentence is.",
      "The products that feel calm show the conflict. They do not pretend a server timestamp is a moral authority. A person can see both versions and keep the one that is true.",
      "## A smaller promise",
      "Lumina's own reading list is ordinary on purpose. The interesting shift is not a new framework. It is a smaller promise: your work should still be there when the tab is not.",
      "When the connection drops, the work does not. That is the whole product, said without a diagram.",
    ],
    quiz: {
      title: "Local-first, briefly",
      questions: [
        {
          prompt: "Where does a local-first document live by default?",
          choices: ["On a rented server", "On the device", "In a CDN cache", "In a chat transcript"],
          answer: 1,
        },
        {
          prompt: "What is the hard part of syncing two editors?",
          choices: ["Picking a typeface", "Resolving conflicting edits", "Buying a domain", "Compressing images"],
          answer: 1,
        },
        {
          prompt: "What should still work when the network drops?",
          choices: ["Opening yesterday's work", "Billing the customer", "Refreshing a status page", "Rotating API keys"],
          answer: 0,
        },
      ],
    },
  },
  {
    title: "Why inference costs rewrote product roadmaps",
    excerpt: "A feature that was free to demo became a line item, and the roadmap had to learn arithmetic.",
    category: "Product",
    tags: ["ai", "cost", "roadmaps"],
    cover: photo("photo-1587845323226-bad89242c735"),
    status: "PUBLISHED",
    daysAgo: 3,
    paragraphs: [
      "## The invoice arrived",
      "The first wave of AI features was a demo dressed as a product. A button called the model, the model answered, and everyone clapped. Then the invoice arrived.",
      "A feature that costs money every time it is used cannot be planned like a feature that costs nothing. The roadmap had to learn arithmetic.",
      "## The boring second year",
      "Teams that survived did a dull thing. They cached. They routed easy questions to a smaller model. They asked whether the feature needed a model at all, or whether a search box would have done.",
      "The demos that remained were the ones a person would miss if they disappeared. Everything else was a tour of the model.",
      "## Bets with a price",
      "A roadmap is a list of bets. Once each bet has a marginal cost, the list gets shorter and the writing gets better.",
      "Put the cost next to the sentence that promises the feature. If the sentence still sounds worth it, keep it. If it only sounded good when it was free, cut it.",
    ],
  },
  {
    title: "A calmer interface for dense information",
    excerpt: "Density is not the enemy. Noise is. The pages people finish leave room around the idea.",
    category: "Design",
    tags: ["typography", "editorial", "interface"],
    cover: photo("photo-1639413665566-2f75adf7b7ca"),
    status: "PUBLISHED",
    daysAgo: 5,
    paragraphs: [
      "## Stacking is not ranking",
      "News homepages taught a generation of designers that importance is a matter of stacking. More modules, more urgency, more edges touching. Readers learned to squint and leave.",
      "Density is not the enemy. Noise is. A page can hold a great deal if each piece knows when it is allowed to speak.",
      "## One story is large",
      "A calmer page is not an empty page. It is a page with a sequence. One story is allowed to be large. The others wait their turn.",
      "Type does the ranking that boxes used to do. A heading, a measure, a margin. The reader can tell what matters without a badge that says it does.",
      "## Start with the paragraph",
      "If you are building a publication, start with the measure of a paragraph and the size of a heading. The navigation can come later.",
      "People do not bookmark a menu. They come back for the piece that let them finish a thought.",
    ],
  },
  {
    title: "The case for boring deployment pipelines",
    excerpt: "The most expensive pipeline is the one only one person can explain on a Friday.",
    category: "Engineering",
    tags: ["devops", "shipping"],
    cover: photo("photo-1565900290201-6116cd97a6b8"),
    status: "PUBLISHED",
    daysAgo: 8,
    keyPoints: boringPipelineKeyPoints,
    paragraphs: boringPipeline,
    quiz: {
      title: "Check your understanding",
      questions: [
        {
          prompt: "What makes a deployment pipeline \"boring\" in the good sense?",
          choices: ["It uses the newest tools", "Anyone on the team can run it, read it, and undo it", "It deploys only once a month"],
          answer: 1,
        },
        {
          prompt: "Which order do the four stages run in?",
          choices: ["Release, build, watch, migrate", "Build, migrate, release, watch", "Migrate, watch, build, release"],
          answer: 1,
        },
        {
          prompt: "Where should production secrets live?",
          choices: ["In the platform's secret store", "In a shared gist", "In the repository, encrypted by hand"],
          answer: 0,
        },
      ],
    },
  },
  {
    title: "What small models changed about writing tools",
    excerpt: "The useful assistant got cheaper, which means it can sit closer to the sentence.",
    category: "AI",
    tags: ["writing", "models"],
    cover: photo("photo-1612873003118-f0160ec93f4c"),
    status: "PUBLISHED",
    daysAgo: 11,
    audioUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    paragraphs: [
      "## Useful in the margin",
      "Large models are impressive at a distance. Small models are useful in the margin, where a writer actually hesitates: a clumsy verb, a repeated noun, a sentence that does not know how it ends.",
      "The useful assistant got cheaper, which means it can sit closer to the sentence. Distance was the old tax. A model you had to visit was a model you used for performances, not for drafts.",
      "## Beside the cursor",
      "The change is placement. When the model is cheap enough to run beside the cursor, it stops being a destination and starts being a pencil.",
      "You do not go somewhere to think. You stay in the paragraph. The suggestion arrives where the hesitation was, and it leaves when you keep typing.",
      "## Quiet until asked",
      "The tools that respect that stay quiet until asked. A writing product should not compete with the sentence it is trying to help.",
      "A margin note can be refused. A modal cannot. The models that belong in a writing tool know the difference, and they wait.",
    ],
  },
  {
    title: "Design systems after the component gold rush",
    excerpt: "A library of buttons is not a system. A system is an agreement about what you will not redraw.",
    category: "Design",
    tags: ["design systems", "components"],
    cover: photo("photo-1483792879322-696964487a67"),
    status: "PUBLISHED",
    daysAgo: 15,
    paragraphs: [
      "## A catalog is not a taste",
      "Every company spent a year naming its grays. The result was a catalog. Catalogs are useful. They are not the same thing as a shared taste.",
      "A library of buttons is not a system. A system is an agreement about what you will not redraw, and about what you will let stay particular.",
      "## Smaller than the pitch",
      "The systems that stuck were smaller than the pitch. Color, type, space, and a handful of components that appear on every screen.",
      "Everything else was allowed to be specific. The gold rush wanted a component for every mood. The pages that still look like themselves refused most of them.",
      "## Retire one",
      "If your system document is longer than your product, you are maintaining a second product. The second product does not ship.",
      "Retire a component this week and see if anyone writes to you. Silence is a kind of approval. The system gets quieter, and the product gets easier to see.",
    ],
  },
  {
    title: "The notebook that survived the rewrite",
    excerpt: "The useful notes were the short ones, written in the margin of the work itself.",
    category: "Engineering",
    tags: ["notes", "writing"],
    cover: photo("photo-1462642109801-4ac2971a3a51"),
    status: "PUBLISHED",
    daysAgo: 2,
    paragraphs: [
      "## Beside the file",
      "A second system for notes becomes a second job. The notebook that lasts is the one that opens beside the file you are already editing.",
      "The rewrite always promised a cleaner place for thoughts. The thoughts that mattered were already in the margin of the work, written while the problem was still warm.",
      "## Short on purpose",
      "We kept the entries short on purpose. A paragraph you can finish is a paragraph you will trust later.",
      "A long note is a draft of a document nobody asked for. A short one is a reminder you can check without leaving the task.",
      "## What survived",
      "After the rewrite, the surviving notes were the ones with a date, a file, and one sentence. The taxonomy did not survive. The sentence did.",
      "If a note cannot be found from the work it describes, it is already lost. Put it where the next person will be standing.",
    ],
  },
  {
    title: "Shipping without a status meeting",
    excerpt: "The release notes were the meeting. Everything else was a rehearsal.",
    category: "Product",
    tags: ["shipping", "teams"],
    cover: photo("photo-1771147372634-976f022c0033"),
    status: "PUBLISHED",
    daysAgo: 4,
    paragraphs: [
      "## The release is the meeting",
      "A status meeting is a place where work goes to be described. The teams that ship write the description into the release and skip the room.",
      "If the note is hard to write, the change is not finished. The sentence that will not come is usually a decision that has not been made.",
      "## What the note has to hold",
      "A useful note names the change, who it is for, and how you would know it failed. It does not recap the week, and it does not ask the room for permission the work already earned.",
      "Write it where the change lives. A paragraph next to the release is easier to trust than a slide that will be filed and forgotten.",
      "## Skip the room",
      "People who need the change read the note. People who do not need it keep working. The calendar gets a hole, and the hole is the point.",
      "The rehearsal was the meeting. Once the note can stand alone, there is nothing left to perform.",
    ],
  },
  {
    title: "Type that knows when to stop",
    excerpt: "A headline can be large. It cannot be large and crowded.",
    category: "Design",
    tags: ["typography", "layout"],
    cover: photo("photo-1792978081649-c2291ec95b50"),
    status: "PUBLISHED",
    daysAgo: 6,
    paragraphs: [
      "## Large, then stop",
      "A headline can be large. It cannot be large and crowded. The page in front of you is a sequence. One story is allowed to be the biggest thing. The others wait.",
      "Type that does not know when to stop keeps raising its voice. The reader stops listening before the end of the line.",
      "## The quiet line",
      "Stop adding modules when the paragraph can no longer find a quiet line to sit on. A margin is not wasted space. It is how a sentence stays a sentence.",
      "Measure the column before you measure the hero. If the paragraph is hard to finish, the type is asking for less, not more.",
      "## One size of emphasis",
      "Use the large size once. The second large thing cancels the first. A publication can afford a shout. It cannot afford a room full of them.",
      "When the heading sits down, the body can stand up. That order is the whole layout.",
    ],
  },
  {
    title: "A quieter model beside the cursor",
    excerpt: "The useful assistant got small enough to sit in the margin.",
    category: "AI",
    tags: ["models", "writing"],
    cover: photo("photo-1489875347897-49f64b51c1f8"),
    status: "PUBLISHED",
    daysAgo: 9,
    paragraphs: [
      "## Close enough to hesitate with",
      "A large model is impressive at a distance. A small one is useful where a writer hesitates: a clumsy verb, a sentence that does not know its ending.",
      "The quieter model does not open a new room. It sits in the margin and waits for the cursor to stall.",
      "## A pencil, not a stage",
      "When the answer is cheap, you ask smaller questions. A synonym. A cut. A second try at the last clause. None of these deserved a loading screen.",
      "The tools that respect that stay quiet until asked. They do not decorate the draft with confidence.",
      "## Leave the sentence alone",
      "A writing tool should lose to the sentence. If the model is more interesting than the paragraph, it is in the wrong place.",
      "Put it beside the cursor, give it a short leash, and let the writer keep the last word.",
    ],
  },
  {
    title: "What the deploy log is for",
    excerpt: "If only one person can explain the pipeline, the pipeline is already late.",
    category: "Engineering",
    tags: ["devops", "shipping"],
    cover: photo("photo-1760307837850-13db8b0d94cb"),
    status: "PUBLISHED",
    daysAgo: 12,
    paragraphs: [
      "## A log you can read",
      "Build, migrate, release, watch. Each step should fail in a way a person can name. If only one person can explain the pipeline, the pipeline is already late.",
      "The deploy log is not a souvenir. It is the place you look when the release is wrong and the room is quiet.",
      "## Name the failure",
      "A red line that says 'error' is not a name. A red line that says which step stopped, and what it was trying to do, is a name.",
      "Keep the steps few enough that the log fits on a screen. A novel of timestamps is how a pipeline hides.",
      "## Dull on Friday",
      "Novelty belongs in the product. The path that ships it should be dull enough to trust on a Friday.",
      "When the log is boring and complete, people ship. That is what the log is for.",
    ],
  },
  {
    title: "Readers finish what you leave room for",
    excerpt: "Completion is a design outcome. It starts with the width of the column.",
    category: "Product",
    tags: ["reading", "editorial"],
    cover: photo("photo-1529016912215-a4c95c80d1dc"),
    status: "PUBLISHED",
    daysAgo: 16,
    paragraphs: [
      "## Finishing is the number",
      "Most reading products are measured on opens. Finishing is rarer, and it is the only number that means the piece worked.",
      "Completion is a design outcome. It starts with the width of the column and the decision not to interrupt it.",
      "## Room to end",
      "A reader finishes what you leave room for. A paragraph that has to climb over a module will be abandoned at the module.",
      "Save the related stories for the end, when the reader has earned them. Before that, the piece is the only offer.",
      "## The column",
      "If the line is too long, the eye loses the next one. If the line is broken by a card, the eye never asks for the next one.",
      "Give the story a single measure. Let the end arrive without a prompt. People notice when a piece lets them out cleanly.",
    ],
  },
  {
    title: "Notes on building a reading product people finish",
    excerpt: "Completion is a design outcome. It starts with the width of the column.",
    category: "Product",
    tags: ["reading", "editorial"],
    cover: photo("photo-1759314710754-bb3e11fbaa7b"),
    status: "SCHEDULED",
    daysAgo: 0,
    scheduledInDays: 4,
    paragraphs: [
      "## Measured on the end",
      "Most reading products are measured on opens. Finishing is rarer, and it is the only number that means the piece worked.",
      "This piece is scheduled. It should stay off the homepage until its time. The argument does not change while it waits.",
      "## Width before modules",
      "A column that is too wide becomes a chore. A column that is interrupted by a module becomes a chore with a logo.",
      "Save the related stories for the end, when the reader has earned them. The middle of a piece is a bad place for a catalog.",
      "## Let them leave",
      "A reading product people finish has an exit that feels like the last sentence, not like a trap.",
      "When the column is calm and the end is allowed to arrive, readers come back. They are not coming back for the modules.",
    ],
  },
  {
    title: "A draft about audio as a publishing format",
    excerpt: "Voice is a good companion to a piece. It is a poor replacement for one that was written to be read.",
    category: "AI",
    tags: ["audio", "publishing"],
    cover: photo("photo-1619490287893-862fd1808407"),
    status: "DRAFT",
    daysAgo: 0,
    paragraphs: [
      "## Still a draft",
      "This draft is here so the writer dashboard has something unfinished. It is not on the public site.",
      "A draft can be long enough to edit and still be unfinished. Length is not the same thing as ready.",
      "## Voice beside the piece",
      "Voice is a good companion to a piece. It is a poor replacement for one that was written to be read.",
      "Audio belongs under the piece, labeled, optional, and short. A roar from a museum of examples will do for the seed.",
      "## Leave it off the issue",
      "Until someone files it, the draft stays in the desk. The homepage does not need a rumor of a story.",
      "When it is ready, it can earn a heading, a date, and a place in the issue. Not before.",
    ],
  },
];

const keyPoints = [
  "Local-first apps keep the document on the device and use the network for sharing.",
  "Conflicts are the hard part. Calm products show both versions instead of hiding one.",
  "The pitch is smaller and more honest: your file opens even when the server does not.",
];

async function main() {
  await prisma.notification.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.articleReaction.deleteMany();
  await prisma.commentLike.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.subscriber.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.readingHistory.deleteMany();
  await prisma.articleTag.deleteMany();
  await prisma.article.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSetting.deleteMany();

  // Every account shares one password, so each desk is one sign-in away.
  const passwordHash = await bcrypt.hash("lumina123", 10);
  const person = (data: Omit<Prisma.UserCreateInput, "passwordHash">) => prisma.user.create({ data: { ...data, passwordHash } });
  const [admin, writer, mira, theo, reader, priya, leo, banned] = await Promise.all([
    person({ name: "Ada Quinn", slug: "ada-quinn", email: "admin@lumina.dev", role: "ADMIN", bio: "Edits Lumina and keeps the doors locked.", location: "Lisbon" }),
    person({ name: "Jules Berger", slug: "jules-berger", email: "writer@lumina.dev", role: "WRITER", bio: "Writes about software that respects the person using it.", location: "Berlin", website: "https://example.com/jules" }),
    person({ name: "Mira Okafor", slug: "mira-okafor", email: "mira@lumina.dev", role: "WRITER", bio: "Covers product decisions and the costs behind them.", location: "Lagos" }),
    person({ name: "Theo Lindqvist", slug: "theo-lindqvist", email: "theo@lumina.dev", role: "WRITER", bio: "Designer. Writes about type, space, and calm interfaces.", location: "Stockholm" }),
    person({ name: "Sam Ibarra", slug: "sam-ibarra", email: "reader@lumina.dev", role: "USER", bio: "Reads on the train." }),
    person({ name: "Priya Nair", slug: "priya-nair", email: "priya@lumina.dev", role: "USER", bio: "Frontend engineer. Saves everything for Sunday." }),
    person({ name: "Leo Martins", slug: "leo-martins", email: "leo@lumina.dev", role: "USER", bio: "Learning to ship by reading people who do." }),
    person({ name: "Rex Vance", slug: "rex-vance", email: "banned@lumina.dev", role: "USER", banned: true, bio: "Banned for spam. Shows how moderation looks." }),
  ]);
  // Who wrote each story, in the order of the list above.
  const bylines = [writer, mira, theo, writer, admin, theo, mira, writer, theo, mira, admin, writer, writer, writer];

  const categoryNames = [...new Set(stories.map((story) => story.category))];
  const categories = new Map<string, string>();
  for (const name of categoryNames) {
    const slug = name.toLowerCase();
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description:
          name === "Engineering"
            ? "How software is actually built."
            : name === "Design"
              ? "Type, space, and the pages people stay with."
              : name === "Product"
                ? "Decisions, costs, and the shape of a feature."
                : "Models, tools, and the work they change.",
      },
    });
    categories.set(name, category.id);
  }

  let firstArticleId = "";
  let firstQuizId = "";
  const articleIds = new Map<string, string>();

  for (const [index, story] of stories.entries()) {
    const slug = story.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const tagRows = [];
    for (const name of story.tags) {
      const tagSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      tagRows.push(
        await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: { name, slug: tagSlug },
        }),
      );
    }
    const when = new Date(Date.now() - story.daysAgo * 86_400_000);
    const scheduledAt = story.scheduledInDays
      ? new Date(Date.now() + story.scheduledInDays * 86_400_000)
      : null;
    const article = await prisma.article.create({
      data: {
        title: story.title,
        slug,
        excerpt: story.excerpt,
        content: docFromParagraphs(story.paragraphs) as Prisma.InputJsonValue,
        coverImage: story.cover,
        status: story.status,
        publishedAt: story.status === "DRAFT" ? null : story.status === "SCHEDULED" ? scheduledAt : when,
        scheduledAt,
        viewCount: story.status === "PUBLISHED" ? 48 + ((index * 37) % 140) : 0,
        videoUrl: story.videoUrl,
        audioUrl: story.audioUrl,
        keyPoints: index === 0 ? keyPoints : (story.keyPoints ?? []),
        authorId: (bylines[index] ?? writer).id,
        categoryId: categories.get(story.category)!,
        tags: { create: tagRows.map((tag) => ({ tagId: tag.id })) },
      },
    });
    if (index === 0) firstArticleId = article.id;
    articleIds.set(slug, article.id);
    if (story.quiz) {
      const quiz = await prisma.quiz.create({
        data: { articleId: article.id, title: story.quiz.title, questions: story.quiz.questions },
      });
      firstQuizId ||= quiz.id;
    }
  }

  await prisma.bookmark.create({ data: { userId: reader.id, articleId: firstArticleId } });
  await prisma.comment.createMany({
    data: [
      { articleId: firstArticleId, userId: reader.id, body: "The point about showing conflicts instead of hiding them is the part I keep coming back to." },
      { articleId: firstArticleId, userId: admin.id, body: "Same. A merge you can see is a merge you can trust." },
    ],
  });
  await seedPipelineConversation(prisma, articleIds.get("the-case-for-boring-deployment-pipelines")!, { admin, writer, reader });
  await prisma.follow.createMany({
    data: [
      { userId: reader.id, kind: "CATEGORY", targetId: categories.get("Engineering")! },
      { userId: reader.id, kind: "AUTHOR", targetId: writer.id },
    ],
  });
  await prisma.subscriber.create({ data: { email: reader.email, userId: reader.id, source: "seed" } });
  await prisma.readingHistory.create({ data: { userId: reader.id, articleId: firstArticleId } });
  await prisma.quizAttempt.create({
    data: { userId: reader.id, quizId: firstQuizId, score: 2, total: 3 },
  });

  // More readers, so every desk has real activity to show.
  const story = (slug: string) => articleIds.get(slug)!;
  const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000);
  await prisma.bookmark.createMany({
    data: [
      { userId: reader.id, articleId: story("a-calmer-interface-for-dense-information") },
      { userId: priya.id, articleId: story("a-calmer-interface-for-dense-information") },
      { userId: priya.id, articleId: story("type-that-knows-when-to-stop") },
      { userId: leo.id, articleId: story("the-case-for-boring-deployment-pipelines") },
    ],
  });
  await prisma.readingHistory.createMany({
    data: [
      { userId: reader.id, articleId: story("the-case-for-boring-deployment-pipelines"), readAt: daysAgo(1) },
      { userId: reader.id, articleId: story("why-inference-costs-rewrote-product-roadmaps"), readAt: daysAgo(2) },
      { userId: priya.id, articleId: story("a-calmer-interface-for-dense-information"), readAt: daysAgo(1) },
      { userId: priya.id, articleId: story("design-systems-after-the-component-gold-rush"), readAt: daysAgo(3) },
      { userId: leo.id, articleId: story("what-small-models-changed-about-writing-tools"), readAt: daysAgo(2) },
      { userId: leo.id, articleId: firstArticleId, readAt: daysAgo(4) },
    ],
  });
  const pipelineQuiz = await prisma.quiz.findUnique({ where: { articleId: story("the-case-for-boring-deployment-pipelines") } });
  await prisma.quizAttempt.createMany({
    data: [
      { userId: leo.id, quizId: firstQuizId, score: 3, total: 3 },
      ...(pipelineQuiz ? [{ userId: reader.id, quizId: pipelineQuiz.id, score: 3, total: Array.isArray(pipelineQuiz.questions) ? pipelineQuiz.questions.length : 3 }] : []),
    ],
  });
  await prisma.follow.createMany({
    data: [
      { userId: reader.id, kind: "AUTHOR", targetId: theo.id },
      { userId: priya.id, kind: "AUTHOR", targetId: theo.id },
      { userId: priya.id, kind: "CATEGORY", targetId: categories.get("Design")! },
      { userId: leo.id, kind: "AUTHOR", targetId: mira.id },
      { userId: leo.id, kind: "CATEGORY", targetId: categories.get("AI")! },
    ],
  });
  await prisma.comment.createMany({
    data: [
      { articleId: story("a-calmer-interface-for-dense-information"), userId: priya.id, body: "Removing the borders and keeping the spacing is exactly what our dashboard needed.", createdAt: daysAgo(1) },
      { articleId: story("why-inference-costs-rewrote-product-roadmaps"), userId: leo.id, body: "Pricing a feature by its model calls changed how our team scopes everything.", createdAt: daysAgo(2) },
      { articleId: firstArticleId, userId: banned.id, body: "Buy followers cheap, link in my profile!!!", hidden: true, createdAt: daysAgo(1) },
    ],
  });
  await prisma.notification.createMany({
    data: [
      { userId: reader.id, title: "Jules Berger published a new story", body: "The quiet return of local-first software", href: `/article/the-quiet-return-of-local-first-software`, createdAt: daysAgo(1) },
      { userId: reader.id, title: "New in Engineering", body: "The notebook that survived the rewrite", href: `/article/the-notebook-that-survived-the-rewrite`, createdAt: daysAgo(2), readAt: daysAgo(1) },
      { userId: priya.id, title: "Theo Lindqvist published a new story", body: "Type that knows when to stop", href: `/article/type-that-knows-when-to-stop`, createdAt: daysAgo(6) },
      { userId: leo.id, title: "Mira Okafor published a new story", body: "A quieter model beside the cursor", href: `/article/a-quieter-model-beside-the-cursor`, createdAt: daysAgo(9) },
    ],
  });
  await prisma.subscriber.createMany({
    data: [
      { email: priya.email, userId: priya.id, source: "settings" },
      { email: "hello@example.com", source: "footer", createdAt: daysAgo(3) },
      { email: "team@example.org", source: "newsletter", createdAt: daysAgo(6) },
      { email: "old.reader@example.net", source: "footer", createdAt: daysAgo(20), unsubscribedAt: daysAgo(5) },
    ],
  });
  await prisma.siteSetting.create({
    data: {
      id: 1,
      siteName: "Lumina",
      tagline: "A calmer place for technology.",
      description:
        "Lumina is a modern publication for people who build software, shape products, and care how the work reads.",
    },
  });

  console.log("Seeded Lumina: 14 stories, 4 sections, 8 accounts");
  console.table([
    { role: "ADMIN", email: "admin@lumina.dev", name: "Ada Quinn" },
    { role: "WRITER", email: "writer@lumina.dev", name: "Jules Berger" },
    { role: "WRITER", email: "mira@lumina.dev", name: "Mira Okafor" },
    { role: "WRITER", email: "theo@lumina.dev", name: "Theo Lindqvist" },
    { role: "USER", email: "reader@lumina.dev", name: "Sam Ibarra" },
    { role: "USER", email: "priya@lumina.dev", name: "Priya Nair" },
    { role: "USER", email: "leo@lumina.dev", name: "Leo Martins" },
    { role: "USER (banned)", email: "banned@lumina.dev", name: "Rex Vance" },
  ]);
  console.log("Password for every account: lumina123");
}

const isSeedEntry = process.argv[1]?.includes("seed");
if (isSeedEntry) {
  main()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export { stories };
