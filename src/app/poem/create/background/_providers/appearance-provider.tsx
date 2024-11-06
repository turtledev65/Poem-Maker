"use client";

import { Background } from "@/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type AppearanceContextType = {
  appearance: Background;
  setAppearance: Dispatch<SetStateAction<Background>>;
};
export const AppearanceContext = createContext<AppearanceContextType>(
  {} as AppearanceContextType,
);

const AppearanceProvider = ({ children }: PropsWithChildren) => {
  const [appearance, setAppearance] = useState<Background>({
    type: "color",
    fontColor: "#000000",
    value: "#ffffff",
  });

  return (
    <AppearanceContext.Provider value={{ appearance, setAppearance }}>
      {children}
    </AppearanceContext.Provider>
  );
};
export default AppearanceProvider;
