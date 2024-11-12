"use client";

import { useContext } from "react";
import { ThemeContext } from "../_providers/theme-provider";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <>
      <button
        onClick={() => setMode(prev => (prev === "light" ? "dark" : "light"))}
        className="colors rounded-full p-3 text-2xl transition-colors hover:bg-slate-100 dark:hover:bg-zinc-800"
      >
        {mode === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </>
  );
};
export default ThemeToggle;
