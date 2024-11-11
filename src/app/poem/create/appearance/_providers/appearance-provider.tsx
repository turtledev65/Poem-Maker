"use client";

import { Appearance, Background, Foreground } from "@/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type AppearanceContextType = {
  appearance: Appearance;
  setAppearance: Dispatch<SetStateAction<Appearance>>;
  background: Background;
  setBackground: Dispatch<SetStateAction<Background>>;
  foreground: Foreground;
  setForeground: Dispatch<SetStateAction<Foreground>>;
};
export const AppearanceContext = createContext<AppearanceContextType>(
  {} as AppearanceContextType,
);

type Props = { defaultValue?: Appearance } & PropsWithChildren;
const AppearanceProvider = ({ defaultValue, children }: Props) => {
  const [appearance, setAppearance] = useState<Appearance>({
    foreground: {
      poem: "#000000",
      title: "#000000",
    },
    background: {
      type: "color",
      value: "#ffffff",
    },
    customCSS: {
      enabled: false,
      css: "",
    },
  });

  useEffect(() => {
    if (!defaultValue) return;
    setAppearance(defaultValue);
  }, [defaultValue]);

  const background = useMemo(
    () => appearance.background,
    [appearance.background],
  );
  const setBackground = useCallback(
    (newValue: Background | ((prev: Background) => Background)) => {
      setAppearance(prev => {
        let background: Background;
        if (typeof newValue === "function") {
          background = newValue(prev.background);
        } else {
          background = newValue;
        }

        return { ...prev, background };
      });
    },
    [setAppearance],
  );

  const foreground = useMemo(
    () => appearance.foreground,
    [appearance.foreground],
  );
  const setForeground = useCallback(
    (newValue: Foreground | ((prev: Foreground) => Foreground)) => {
      setAppearance(prev => {
        let foreground: Foreground;
        if (typeof newValue === "function") {
          foreground = newValue(prev.foreground);
        } else {
          foreground = newValue;
        }

        return { ...prev, foreground };
      });
    },
    [setAppearance],
  );

  return (
    <AppearanceContext.Provider
      value={{
        appearance,
        setAppearance,
        background,
        setBackground,
        foreground,
        setForeground,
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
};
export default AppearanceProvider;
