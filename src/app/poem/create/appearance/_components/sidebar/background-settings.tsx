"use client";

import { useContext } from "react";
import { AppearanceContext } from "../../_providers/appearance-provider";
import ColorSettings from "./color-settings";
import LinearGradientSettings from "./linear-gradient-settings";
import RadialGradientSettings from "./radial-gradient-settings";
import { Background, BackgroundType } from "@/types";

const BackgroundSettings = () => {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Background</h1>
      <div className="flex flex-col gap-3">
        <TypeSetting />
        <SettingsFields />
      </div>
    </div>
  );
};
export default BackgroundSettings;

const SettingsFields = () => {
  const { background } = useContext(AppearanceContext);

  if (background.type === "color") {
    return <ColorSettings />;
  } else if (background.type === "linear-gradient") {
    return <LinearGradientSettings />;
  } else {
    return <RadialGradientSettings />;
  }
};

const TypeSetting = () => {
  const { background, setBackground } = useContext(AppearanceContext);

  return (
    <div className="flex flex-row items-center justify-between gap-6">
      <p>Type</p>
      <select
        value={background.type}
        onChange={e =>
          setBackground(() =>
            getDefaultSettings(e.target.value as BackgroundType),
          )
        }
        name="background-type"
        className="rounded-lg bg-gray-200 px-1 py-2"
      >
        <option value="color">Color</option>
        <option value="linear-gradient">Linear Gradient</option>
        <option value="radial-gradient">Radial Gradient</option>
        <option value="image">Image</option>
      </select>
    </div>
  );
};

function getDefaultSettings(type: BackgroundType) {
  switch (type) {
    case "color":
      return { type, value: "#ffffff" } as Background;
    case "linear-gradient":
      return {
        type,
        values: [],
        angle: 90,
      } as Background;
    case "radial-gradient":
      return {
        type,
        values: [],
      } as Background;
    default:
      return {} as Background;
  }
}
