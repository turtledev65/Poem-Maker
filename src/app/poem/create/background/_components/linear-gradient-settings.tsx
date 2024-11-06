"use client";

import { useContext } from "react";
import { SettingsContext } from "../_providers/settings-provider";
import ValueList from "./value-list";

const LinearGradientSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  if (settings.type !== "linear-gradient") return null;

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <p>Angle</p>
        <input
          type="number"
          min={0}
          max={360}
          value={settings.angle}
          onChange={e =>
            setSettings(prev => ({
              ...prev,
              angle: Number(e.target.value),
            }))
          }
          name="angle"
          className="rounded-lg bg-gray-200 px-2 py-1"
        />
      </div>
      <ValueList />
    </>
  );
};
export default LinearGradientSettings;
