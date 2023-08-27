"use client";

import { useAutoSave } from "@/hooks/useAutoSave";
import { updateEntry } from "@/utils/api";
import { useState } from "react";

export const Editor = ({ entry }: { entry: { content: string; id: string } }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  useAutoSave({
    data: value,
    onSave: async (_value) => {
      try {
        setIsLoading(true);
        await updateEntry(entry.id, _value);
      } catch (e) {
        console.log("updateEntry error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    interval: 1500,
  });

  return (
    <div className="h-full w-full">
      {isLoading && <div>loading...</div>}
      <textarea
        value={value}
        className="h-full w-full p-8 text-xl outline-none"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
