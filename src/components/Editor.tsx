"use client";

import { useAutoSave } from "@/hooks/useAutoSave";
import { updateEntry } from "@/utils/api";
import { useState } from "react";

export const Editor = ({
  entry,
}: {
  entry: {
    analysis: {
      id: string;
      mood: string;
      subject: string;
      summary: string;
      color: string;
      negative: boolean;
    } | null;
  } & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string;
  };
}) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  useAutoSave({
    data: value,
    onSave: async (_value) => {
      try {
        setIsLoading(true);
        const data = await updateEntry(entry.id, _value);
        setAnalysis(data.analysis);
      } catch (e) {
        console.log("updateEntry error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    interval: 1500,
  });

  const analysisData = [
    {
      name: "Summary",
      value: analysis?.summary ?? "",
    },
    {
      name: "Subject",
      value: analysis?.subject ?? "",
    },
    {
      name: "Mood",
      value: analysis?.mood ?? "",
    },
    {
      name: "Negative",
      value: analysis?.negative ? "True" : "False",
    },
  ];

  return (
    <div className="grid h-full w-full grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>loading...</div>}
        <textarea
          value={value}
          className="h-full w-full p-8 text-xl outline-none"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: analysis?.color ?? "#ffffff" }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <ul>
          {analysisData.map((item) => {
            return (
              <li
                className="flex items-center justify-between gap-8 border-b border-b-black/10 px-2 py-4"
                key={item.name}
              >
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
