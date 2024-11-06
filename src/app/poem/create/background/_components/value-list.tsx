"use client";

import { ChangeEvent, useCallback, useContext } from "react";
import { SettingsContext } from "../_providers/settings-provider";
import ColorPicker from "./color-picker";
import { Background } from "@/types";

const ValueList = () => {
  const { settings } = useContext(SettingsContext);
  if (settings.type === "color") return null;

  return (
    <div className="flex flex-col">
      <p>Values</p>
      <div className="flex flex-col">
        {settings.values.map((_, idx) => (
          <ColorOption idx={idx} key={idx} />
        ))}
        <AddButton />
      </div>
    </div>
  );
};
export default ValueList;

const AddButton = () => {
  const { setSettings } = useContext(SettingsContext);

  const handleAddItem = useCallback(() => {
    setSettings(prev => {
      if (prev.type === "color") return {} as Background;

      const newItem = { value: "#ffffff", percentage: 0 };
      const values = [...prev.values, newItem];

      return { ...prev, values };
    });
  }, [setSettings]);

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
  const { setSettings } = useContext(SettingsContext);

  const handleRemoveItem = useCallback(() => {
    setSettings(prev => {
      if (prev.type === "color") return {} as Background;
      const values = [...prev.values];
      values.splice(idx, 1);
      return { ...prev, values };
    });
  }, [setSettings, idx]);

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
  const { settings, setSettings } = useContext(SettingsContext);

  const handleChangeColor = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSettings(prev => {
        if (prev.type === "color") return {} as Background;

        const values = [...prev.values];
        values[idx].value = e.target.value;
        return { ...prev, values };
      });
    },
    [setSettings, idx],
  );

  const handleChangePercentage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSettings(prev => {
        if (prev.type === "color") return {} as Background;

        const values = [...prev.values];
        values[idx].percentage = Number(e.target.value);
        return { ...prev, values };
      });
    },
    [setSettings, idx],
  );

  return (
    <div className="my-1 flex justify-between">
      {settings.type !== "color" && (
        <>
          <ColorPicker
            value={settings.values[idx].value}
            name={`values-color-${idx}`}
            onChange={handleChangeColor}
          />
          <div>
            <input
              type="number"
              min={0}
              max={100}
              value={settings.values[idx].percentage}
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
