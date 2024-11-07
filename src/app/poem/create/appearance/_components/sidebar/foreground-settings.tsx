"use client";

import { Foreground } from "@/types";
import { useContext, useMemo } from "react";
import { AppearanceContext } from "../../_providers/appearance-provider";
import ColorPicker from "../color-picker";

const ForegroundSettings = () => {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Foreground</h1>
      <div className="flex flex-col gap-3">
        <ColorField name="title-color" value="title" />
        <ColorField name="poem-color" value="poem" />
      </div>
    </div>
  );
};
export default ForegroundSettings;

type ColorFieldProps = {
  name: string;
  value: keyof Foreground;
};
const ColorField = ({ name, value }: ColorFieldProps) => {
  const { foreground, setForeground } = useContext(AppearanceContext);
  const paragraphText = useMemo(() => {
    let [firstWord, secondWord] = name.trim().split("-");
    firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    secondWord = secondWord.charAt(0).toUpperCase() + secondWord.slice(1);
    return `${firstWord} ${secondWord}`;
  }, []);

  return (
    <div className="flex flex-row items-center justify-between gap-6">
      <p>{paragraphText}</p>
      <ColorPicker
        name={name}
        value={foreground[value]}
        onChange={e =>
          setForeground(prev => ({ ...prev, [value]: e.target.value }))
        }
      />
    </div>
  );
};
