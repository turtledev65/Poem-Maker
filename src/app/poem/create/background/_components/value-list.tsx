"use client";

import { ChangeEvent, useCallback, useContext } from "react";
import { AppearanceContext } from "../_providers/appearance-provider";
import ColorPicker from "./color-picker";
import { Background } from "@/types";

const ValueList = () => {
  const { background } = useContext(AppearanceContext);
  if (background.type === "color") return null;

  return (
    <div className="flex flex-col">
      <p>Values</p>
      <div className="flex flex-col">
        {background.values.map((_, idx) => (
          <ColorOption idx={idx} key={idx} />
        ))}
        <AddButton />
      </div>
    </div>
  );
};
export default ValueList;

const AddButton = () => {
  const { setBackground } = useContext(AppearanceContext);

  const handleAddItem = useCallback(() => {
    setBackground(prev => {
      if (prev.type === "color") return {} as Background;

      const newItem = { value: "#ffffff", percentage: 0 };
      const values = [...prev.values, newItem];

      return { ...prev, values };
    });
  }, [setBackground]);

  return (
    <button
      onClick={handleAddItem}
      type="button"
      className="mx-auto mt-4 h-10 w-10 rounded-full bg-gray-200 text-2xl font-bold text-gray-400 hover:opacity-80"
    >
      +
    </button>
  );
};

type RemoveButtonProps = {
  idx: number;
};
const RemoveButton = ({ idx }: RemoveButtonProps) => {
  const { setBackground } = useContext(AppearanceContext);

  const handleRemoveItem = useCallback(() => {
    setBackground(prev => {
      if (prev.type === "color") return {} as Background;
      const values = [...prev.values];
      values.splice(idx, 1);
      return { ...prev, values };
    });
  }, [setBackground, idx]);

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

type ColorOptionProps = { idx: number };
const ColorOption = ({ idx }: ColorOptionProps) => {
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
              min={0}
              max={100}
              value={background.values[idx].percentage}
              onChange={handleChangePercentage}
              name={`values-percentage-${idx}`}
              className="rounded-lg bg-gray-200 p-1 px-2 py-1"
            />
            <span className="ml-1 mr-4">%</span>
            <RemoveButton idx={idx} />
          </div>
        </>
      )}
    </div>
  );
};
