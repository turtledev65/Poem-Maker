"use client";

import { SidebarSection } from "@/app/_components/sidebar";
import addCustomCss from "@/util/custom-css";
import { useRef, useState } from "react";

const CustomCssSettings = () => {
  const [enabled, setEnabled] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <SidebarSection title="Custom Css">
      <label className="flex select-none items-center justify-between">
        Enabled
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(prev => !prev)}
          name="custom-css-enabled"
          className="scale-125 outline-none"
        />
      </label>
      <textarea
        rows={10}
        disabled={!enabled}
        name="custom-css"
        ref={textAreaRef}
        className={`relative mt-4 w-full resize-none rounded border-2 border-solid px-2 py-1 outline-none ${enabled ? "border-gray-400 text-black" : "border-gray-200 text-gray-400"}`}
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            const text = textAreaRef.current?.value ?? "";
            addCustomCss(text);
          }}
          className="rounded-lg border-2 border-solid border-green-500 px-2 py-1 text-xl text-green-500 transition-all hover:bg-green-500 hover:text-white"
        >
          Done
        </button>
      </div>
    </SidebarSection>
  );
};
export default CustomCssSettings;
