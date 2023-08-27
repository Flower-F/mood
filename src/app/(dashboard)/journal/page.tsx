import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { EntryCard } from "@/components/EntryCard";
import { NewEntryCard } from "@/components/NewEntryCard";
import Link from "next/link";
import { analyze } from "@/utils/ai";

export const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      createdAt: true,
      id: true,
    },
  });

  await analyze(`I'm going to give you a journal entry, I want you to analyze for a few things.
  I need the mood, a summary, what the subject is, and a color representing the mood. You need to
  respond back with formatted JSON like so: {"mood": "", "subject": "", "color": "", "negative": "" }.

  entry:
  Today was a really great day. I finally was able to grab that pair of shoes I have been dying to get.
  `);

  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className="h-full bg-zinc-400/10 p-10">
      <h2 className="mb-8 text-3xl">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => {
          return (
            <Link href={`/journal/${entry.id}`} key={entry.id}>
              <EntryCard entry={entry} key={entry.id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default JournalPage;
