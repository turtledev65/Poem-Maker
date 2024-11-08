"use client";

import { useContext } from "react";
import { AppearanceContext } from "../../_providers/appearance-provider";
import { Background, BackgroundType } from "@/types";
import ValueList from "../value-list";
import ColorPicker from "../color-picker";
import { SidebarSection } from "@/app/_components/sidebar";

const BackgroundSettings = () => {
  return (
    <SidebarSection title="Background">
      <div className="flex flex-col gap-3">
        <TypeSetting />
        <SettingsFields />
      </div>
    </SidebarSection>
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

const ColorSettings = () => {
  const { background, setBackground } = useContext(AppearanceContext);
  if (background.type !== "color") return null;

  return (
    <div className="flex flex-row items-center justify-between">
      <p>Value</p>
      <ColorPicker
        value={background.value}
        name="value"
        onChange={e =>
          setBackground(prev => ({ ...prev, value: e.target.value }))
        }
      />
    </div>
  );
};

const LinearGradientSettings = () => {
  const { background, setBackground } = useContext(AppearanceContext);
  if (background.type !== "linear-gradient") return null;

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <p>Angle</p>
        <input
          type="number"
          min={0}
          max={360}
          value={background.angle}
          onChange={e =>
            setBackground(prev => ({
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

const RadialGradientSettings = () => {
  return <ValueList />;
};
