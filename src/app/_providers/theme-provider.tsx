"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type Mode = "light" | "dark";
type ThemeContextType = {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
};
export const ThemeContext = createContext({} as ThemeContextType);

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <div className={`${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
