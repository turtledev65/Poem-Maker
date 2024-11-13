"use client";

import { useContext } from "react";
import { ThemeContext } from "../_providers/theme-provider";
import { FaSun, FaMoon } from "react-icons/fa";

type Props = {
  className?: string;
};
const ThemeToggle = ({ className }: Props) => {
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setMode(prev => (prev === "light" ? "dark" : "light"))}
      className={`flex items-center gap-2 rounded-full p-3 text-2xl hover:bg-slate-100 dark:hover:bg-zinc-800 ${className}`}
    >
      {mode === "light" ? <FaMoon /> : <FaSun />}
      <p className="text-lg md:hidden">{mode}</p>
    </button>
  );
};
export default ThemeToggle;
