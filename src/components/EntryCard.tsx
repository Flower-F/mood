export const EntryCard = ({
  entry,
}: {
  entry: {
    analysis: {
      mood: string;
      summary: string;
    } | null;
    createdAt: Date;
  };
}) => {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className="h-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      {entry.analysis ? (
        <>
          <div className="px-4 py-5 sm:p-6">{entry.analysis.summary}</div>
          <div className="px-4 py-4 sm:px-6">{entry.analysis.mood}</div>
        </>
      ) : null}
    </div>
  );
};
