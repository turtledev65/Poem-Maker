"use client";

import { useContext } from "react";
import { ThemeContext } from "../_providers/theme-provider";

const ThemeToggle = () => {
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <>
      <button
        onClick={() => setMode(prev => (prev === "light" ? "dark" : "light"))}
      >
        {mode}
      </button>
    </>
  );
};
export default ThemeToggle;
