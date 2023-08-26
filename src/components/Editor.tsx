"use client";

import { useState } from "react";

export const Editor = ({ entry }: { entry: { content: string } }) => {
  const [value, setValue] = useState(entry.content);

  return (
    <div className="h-full w-full">
      <textarea
        value={value}
        className="h-full w-full p-8 text-xl outline-none"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
