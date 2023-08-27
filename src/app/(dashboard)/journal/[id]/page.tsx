import { Editor } from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();

  if (user?.id) {
    const entry = await prisma.journalEntry.findUnique({
      where: {
        userId_id: {
          userId: user?.id,
          id,
        },
      },
      include: {
        analysis: {
          select: {
            id: true,
            mood: true,
            subject: true,
            summary: true,
            negative: true,
            color: true,
          },
        },
      },
    });

    return entry;
  }
};

const JournalDetailPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);

  if (!entry) {
    return null;
  }

  return (
    <div className="grid h-full overflow-x-hidden">
      <Editor entry={entry} />
    </div>
  );
};

export default JournalDetailPage;
