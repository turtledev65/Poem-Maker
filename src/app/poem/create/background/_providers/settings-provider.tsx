"use client";

import { Background } from "@/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type SettingsContextType = {
  settings: Background;
  setSettings: Dispatch<SetStateAction<Background>>;
};
export const SettingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType,
);

const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useState<Background>({
    type: "color",
    fontColor: "#000000",
    value: "#ffffff",
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
export default SettingsProvider;
