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

  await analyze("create me a vue component that renders a counting number");

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
