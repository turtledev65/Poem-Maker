"use client";

import { PropsWithChildren, useState } from "react";

const Sidebar = ({ children }: PropsWithChildren) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="fixed bottom-0 right-0 top-0 z-10 flex w-80 items-center justify-end">
      <button
        onClick={() => setExpanded(prev => !prev)}
        className="-left-2 h-min rounded-l-md border-2 border-r-0 border-solid border-gray-700 bg-white p-2 outline-none"
      >
        {expanded ? ">" : "<"}
      </button>
      <div
        className={`h-full overflow-auto rounded-l-xl border-l-2 bg-white p-2 shadow-sm shadow-black ${expanded ? "w-full" : "w-0"}`}
      >
        {children}
      </div>
    </div>
  );
};
export default Sidebar;

type SidebarSectionProps = {
  title: string;
} & PropsWithChildren;
export const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  return (
    <div className="my-6">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      {children}
    </div>
  );
};
