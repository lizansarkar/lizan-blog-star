import type { PrismaClient } from "@prisma/client";

type People = Record<"admin" | "writer" | "reader", { id: string }>;

/** Comments, replies, likes and reactions for the pipelines story. Skips if it already has comments. */
export async function seedPipelineConversation(prisma: PrismaClient, articleId: string, people: People) {
  if (await prisma.comment.count({ where: { articleId } })) return;
  const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000);
  const threads = [
    {
      by: people.reader,
      at: 2_880,
      body: "The 2 a.m. test is going straight into our team doc. We had a deploy last month where nobody could tell from the log whether the migration had run.",
      likes: [people.writer, people.admin],
      replies: [
        { by: people.writer, at: 2_700, body: "That exact moment is why I wrote this. Splitting migrate into its own named step was the single biggest fix for us.", likes: [people.reader] },
        { by: people.admin, at: 2_400, body: "Same here. Once the log said \"migrate: done\" on its own line, the panicked Slack threads stopped.", likes: [] },
      ],
    },
    {
      by: people.admin,
      at: 1_440,
      body: "Small pushback: \"boring\" can turn into \"never improved\". We still review the pipeline every quarter, we just hold changes to the same bar as product code.",
      likes: [people.reader],
      replies: [{ by: people.writer, at: 1_300, body: "Agreed. Boring is the outcome, not a reason to stop maintaining it.", likes: [people.admin] }],
    },
    {
      by: people.reader,
      at: 90,
      body: "The \"what to measure\" table is useful. \"People who deployed this month\" is a sharp one — ours would be two.",
      likes: [],
      replies: [],
    },
  ];
  for (const thread of threads) {
    const parent = await prisma.comment.create({
      data: { articleId, userId: thread.by.id, body: thread.body, createdAt: minutesAgo(thread.at) },
    });
    await prisma.commentLike.createMany({ data: thread.likes.map((user) => ({ userId: user.id, commentId: parent.id })) });
    for (const reply of thread.replies) {
      const child = await prisma.comment.create({
        data: { articleId, userId: reply.by.id, parentId: parent.id, body: reply.body, createdAt: minutesAgo(reply.at) },
      });
      await prisma.commentLike.createMany({ data: reply.likes.map((user) => ({ userId: user.id, commentId: child.id })) });
    }
  }
  await prisma.articleReaction.createMany({
    data: [
      { userId: people.reader.id, articleId, kind: "LIKE" },
      { userId: people.admin.id, articleId, kind: "LIKE" },
    ],
    skipDuplicates: true,
  });
}

export const boringPipelineKeyPoints = [
  "A boring pipeline is one anyone on the team can run, read, and undo, not just the person who built it.",
  "Four named stages are enough for most teams: build, migrate, release, watch.",
  "Every step should fail loudly, with a message a tired person can act on.",
  "Secrets live in the platform, deploys are small and frequent, and rollback is one command.",
  "Keep novelty in the product. The path that ships it should be dull enough to trust.",
];

export const boringPipeline = [
  "A clever deploy is a story you tell once. A boring deploy is a button you press on a day when something is already on fire.",
  "The most expensive pipeline is not the slowest one or the one with the biggest cloud bill. It is the one only **one person** can explain on a Friday afternoon. If the explanation needs a whiteboard, the pipeline is already late.",
  "This piece makes the case for restraint: what boring means in practice, the four stages most teams need, how to tell whether your own pipeline is drifting toward clever, and a checklist you can work through this week.",

  "## What \"boring\" actually means",
  "Boring does not mean old, slow, or manual. It means **predictable**. A boring pipeline does the same thing every time, in the same order, and tells you plainly when it stops.",
  "You can usually recognise one by a few properties:",
  "- **Readable in one sitting.** A new teammate can open the config and follow it top to bottom without a guide.\n- **Runnable by anyone.** Shipping does not depend on one laptop, one login, or one person being awake.\n- **Loud when it fails.** Each step fails with a message that names the problem, not a stack trace to decode.\n- **Easy to undo.** Rolling back is one command, practised often, not a plan written in a wiki nobody opens.",
  "> If your deploy needs a hero, you have built a ritual, not a pipeline.",

  "## The four stages that cover most teams",
  "Most web products need far less machinery than they carry. Four named stages are enough, and naming them matters: when something breaks, the team can say where in a single word.",
  "| Stage | What it does | It fails when | First thing to check |\n| --- | --- | --- | --- |\n| Build | Installs dependencies, compiles, runs tests | A test or type check fails | The failing test name in the log |\n| Migrate | Applies database changes before new code runs | A migration conflicts or times out | The migration file and lock status |\n| Release | Swaps traffic to the new version | Health checks do not pass | The health endpoint and recent config |\n| Watch | Compares errors and latency to the last release | Error rate rises after the swap | The release diff and rollback button |",
  "### Build",
  "Build should be deterministic: the same commit produces the same artifact. Pin your dependencies, cache them, and fail on the first broken test rather than collecting a wall of red at the end.",
  "### Migrate",
  "Run schema changes as their own step, before the new code takes traffic. Prefer changes that are **additive** — add a column, backfill, then remove the old one in a later release — so the previous version keeps working if you need to roll back.",
  "### Release",
  "Release is a traffic switch, not a rebuild. The artifact you tested is the artifact you ship. If the new version does not answer its health check, the switch never happens.",
  "### Watch",
  "The deploy is not done when the progress bar is. For the first few minutes, compare error rate and response time with the previous release. If either moves the wrong way, roll back first and investigate second.",

  "## Clever versus boring, side by side",
  "Most pipelines do not start clever. They drift there one shortcut at a time. This table is a quick way to check which direction yours is heading.",
  "| Question | Clever pipeline | Boring pipeline |\n| --- | --- | --- |\n| Who can deploy? | The person who wrote it | Anyone with merge rights |\n| How are secrets stored? | Pasted into scripts and old gists | In the platform's secret store |\n| How big is a deploy? | Weekly bundles of many changes | Small, frequent, one change at a time |\n| How do you roll back? | Rebuild an old commit and hope | One command to the previous artifact |\n| What does the log say? | Everything, unfiltered | What happened, step by step |\n| What happens on failure? | A silent partial deploy | The step stops and names the cause |",

  "## A pipeline you can read in one sitting",
  "Here is the whole shape, written as plain configuration. The tool does not matter much; the point is that each stage is named, ordered, and short enough to read aloud.",
  "```yaml\nstages: [build, migrate, release, watch]\n\nbuild:\n  run: pnpm install --frozen-lockfile && pnpm test && pnpm build\n\nmigrate:\n  run: pnpm prisma migrate deploy\n\nrelease:\n  run: platform deploy --artifact ./build --health /api/health\n\nwatch:\n  run: platform watch --minutes 10 --rollback-on error-rate>2%\n```",
  "If a new teammate can explain this file back to you after reading it once, you are most of the way there.",

  "## Secrets, logs, and the 2 a.m. test",
  "A simple way to judge a pipeline is to imagine running it at 2 a.m., tired, with something already broken. Would you know what to press, and would you trust what it told you?",
  "- **Secrets stay in the platform**, not in a gist from 2022. Rotate them without editing code.\n- **Logs say what happened**, in order, with the failing step at the bottom where your eyes land.\n- **Alerts point at a stage**, so the first message already narrows the search.\n- **Access is boring too:** the same roles for everyone, reviewed when people join or leave.",
  "The log should read like a receipt, not a mystery novel. If someone has to play detective to learn whether the deploy finished, the pipeline has failed even when the code shipped.",

  "## Make your pipeline more boring this week",
  "You do not need a rewrite. Work through these one at a time, smallest first:",
  "1. Write the four stages down by name, even if today they are a single script.\n2. Move every secret into your platform's secret store and delete the copies.\n3. Make rollback a single command, then practise it on a quiet afternoon.\n4. Split one large weekly deploy into several small daily ones.\n5. Add a health check the release step must pass before traffic moves.\n6. Ask the newest person on the team to ship something, and fix whatever confused them.",

  "## What to measure",
  "Restraint is easier to keep when you can see it working. A handful of numbers is enough:",
  "| Measure | Why it matters | A healthy sign |\n| --- | --- | --- |\n| Time from merge to production | Short paths get used; long ones get skipped | Minutes, not days |\n| Deploys per week | Small, frequent changes are easier to reason about | Steady, not bunched before a deadline |\n| Failed deploys | Shows whether checks catch problems early | Rare, and caught at build or release |\n| Time to roll back | The real measure of how safe a deploy is | One command, under five minutes |\n| People who deployed this month | Tests whether shipping depends on one person | Most of the team |",

  "## Dull on purpose",
  "Novelty belongs in the product, where customers can feel it. The path that ships the product should be dull enough to trust and plain enough to hand to someone on their first week.",
  "When the boring path works, people use it — and a path people actually use is the only one that keeps you safe. That is the whole case for restraint.",
];
