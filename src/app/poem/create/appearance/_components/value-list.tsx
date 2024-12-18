"use client";

import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppearanceContext } from "../_providers/appearance-provider";
import ColorPicker from "./color-picker";
import { Background, BackgroundColorValue } from "@/types";
import { randomColor } from "@/util/color";

const ValueList = () => {
  const { background, setBackground } = useContext(AppearanceContext);

  const [autoPercentage, setAutoPercentage] = useState(true);
  useEffect(() => {
    setBackground(prev => {
      if (prev.type === "color") return {} as Background;

      const values = [...prev.values];
      if (autoPercentage) {
        calculatePercentage(values);
      }

      return { ...prev, values };
    });
  }, [setBackground, autoPercentage]);

  if (background.type === "color") return null;

  return (
    <div className="my-2 flex flex-col">
      <p>Values</p>
      <div className="flex items-center gap-2 text-sm"></div>
      <div className="mt-2 flex flex-col">
        <label className="flex select-none items-center justify-between gap-2 text-sm">
          Auto Percentage
          <input
            type="checkbox"
            checked={autoPercentage}
            onChange={() => setAutoPercentage(prev => !prev)}
          />
        </label>
        {background.values.map((_, idx) => (
          <ColorOption idx={idx} key={idx} autoPercentage={autoPercentage} />
        ))}
        <AddButton autoPercentage={autoPercentage} />
      </div>
    </div>
  );
};
export default ValueList;

const AddButton = ({ autoPercentage }: { autoPercentage: boolean }) => {
  const { setBackground } = useContext(AppearanceContext);

  const handleAddItem = useCallback(() => {
    setBackground(prev => {
      if (prev.type === "color") return {} as Background;

      const newItem = { value: randomColor(), percentage: 0 };
      const values = [...prev.values, newItem];
      if (autoPercentage) {
        calculatePercentage(values);
      }

      return { ...prev, values };
    });
  }, [setBackground, autoPercentage]);

  return (
    <button
      onClick={handleAddItem}
      type="button"
      className="mx-auto mt-4 h-10 w-10 rounded-full bg-gray-200 text-2xl font-bold text-gray-400 hover:opacity-80 dark:bg-neutral-700"
    >
      +
    </button>
  );
};

type RemoveButtonProps = {
  idx: number;
  autoPercentage: boolean;
};
const RemoveButton = ({ idx, autoPercentage }: RemoveButtonProps) => {
  const { setBackground } = useContext(AppearanceContext);

  const handleRemoveItem = useCallback(() => {
    setBackground(prev => {
      if (prev.type === "color") return {} as Background;
      const values = [...prev.values];
      values.splice(idx, 1);

      if (autoPercentage) {
        calculatePercentage(values);
      }

      return { ...prev, values };
    });
  }, [setBackground, idx, autoPercentage]);

  return (
    <button
      onClick={handleRemoveItem}
      type="button"
      className="text-2xl text-red-400"
    >
      x
    </button>
  );
};

type ColorOptionProps = { idx: number; autoPercentage: boolean };
const ColorOption = ({ idx, autoPercentage }: ColorOptionProps) => {
  const { background, setBackground } = useContext(AppearanceContext);

  const handleChangeColor = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBackground(prev => {
        if (prev.type === "color") return {} as Background;

        const values = [...prev.values];
        values[idx].value = e.target.value;
        return { ...prev, values };
      });
    },
    [setBackground, idx],
  );

  const handleChangePercentage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBackground(prev => {
        if (prev.type === "color") return {} as Background;

        const values = [...prev.values];
        values[idx].percentage = Number(e.target.value);
        return { ...prev, values };
      });
    },
    [setBackground, idx],
  );

  return (
    <div className="my-1 flex justify-between">
      {background.type !== "color" && (
        <>
          <ColorPicker
            value={background.values[idx].value}
            name={`values-color-${idx}`}
            onChange={handleChangeColor}
          />
          <div>
            <input
              type="number"
              step={0.01}
              min={0}
              max={100}
              value={background.values[idx].percentage}
              name={`values-percentage-${idx}`}
              readOnly={autoPercentage}
              onChange={handleChangePercentage}
              onKeyDown={e => e.key === "Enter" && e.preventDefault()}
              className={`rounded-lg bg-gray-200 p-1 px-2 py-1 outline-none dark:bg-neutral-700 ${autoPercentage ? "cursor-not-allowed text-gray-500 dark:text-gray-400" : "text-black dark:text-gray-50"}`}
            />
            <span className="ml-1 mr-4">%</span>
            <RemoveButton idx={idx} autoPercentage={autoPercentage} />
          </div>
        </>
      )}
    </div>
  );
};

function calculatePercentage(values: BackgroundColorValue[]) {
  const factor = 100 / values.length;
  for (let i = 0; i < values.length; i++) {
    values[i].percentage = factor * (i + 1);
    values[i].percentage = Number(values[i].percentage.toFixed(2));
  }
}
