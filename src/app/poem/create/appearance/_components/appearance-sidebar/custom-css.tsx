"use client";

import { SidebarSection } from "@/app/_components/sidebar";
import { useState } from "react";

const CustomCssSettings = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <SidebarSection title="Custom Css">
      <label className="flex select-none items-center justify-between">
        Enabled
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(prev => !prev)}
          className="scale-125 outline-none"
        />
      </label>
      <textarea
        rows={10}
        disabled={!enabled}
        className={`mt-4 w-full resize-none rounded border-2 border-solid px-2 py-1 outline-none ${enabled ? "border-gray-400 text-black" : "border-gray-200 text-gray-400"}`}
      />
    </SidebarSection>
  );
};
export default CustomCssSettings;
