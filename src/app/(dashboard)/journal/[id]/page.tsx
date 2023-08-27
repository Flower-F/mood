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
    });

    return entry;
  }
};

const JournalDetailPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);
  const analysisData = [
    {
      name: "Summary",
      value: "",
    },
    {
      name: "Subject",
      value: "",
    },
    {
      name: "Mood",
      value: "",
    },
    {
      name: "Negative",
      value: "False",
    },
  ];

  if (!entry) {
    return null;
  }

  return (
    <div className="grid h-full grid-cols-3 overflow-x-hidden">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <ul>
          {analysisData.map((item) => {
            return (
              <li className="flex items-center justify-between border-b border-b-black/10 px-2 py-4" key={item.name}>
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default JournalDetailPage;
