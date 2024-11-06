"use cient";

import { useContext } from "react";
import { AppearanceContext } from "../_providers/appearance-provider";
import ColorSettings from "./color-settings";
import LinearGradientSettings from "./linear-gradient-settings";
import RadialGradientSettings from "./radial-gradient-settings";
import Link from "next/link";
import { editPoemAppearance } from "../../actions";
import { Background, BackgroundType } from "@/types";
import ColorPicker from "./color-picker";

const Sidebar = () => {
  return (
    <form
      action={editPoemAppearance}
      className="absolute bottom-0 right-0 top-0 flex w-80 flex-col justify-between rounded-l-xl border-l-2 bg-white p-2"
    >
      <div>
        <h1 className="mb-4 text-3xl font-bold">Background</h1>
        <div className="flex flex-col gap-3">
          <TypeSetting />
          <FontColorSetting />
          <SettingsFields />
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          href="/poem/create/edit"
          className="w-full rounded-lg bg-red-500 p-2 text-center text-xl text-white hover:opacity-80"
        >
          Back
        </Link>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 p-2 text-xl text-white hover:opacity-80"
        >
          Next
        </button>
      </div>
    </form>
  );
};
export default Sidebar;

const TypeSetting = () => {
  const { appearance, setAppearance } = useContext(AppearanceContext);

  return (
    <div className="flex flex-row items-center justify-between gap-6">
      <p>Type</p>
      <select
        value={appearance.type}
        onChange={e =>
          setAppearance(() =>
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

const FontColorSetting = () => {
  const { appearance, setAppearance } = useContext(AppearanceContext);

  return (
    <div className="flex flex-row items-center justify-between gap-6">
      <p>Font Color</p>
      <ColorPicker
        value={appearance.fontColor}
        name="font-color"
        onChange={e =>
          setAppearance(prev => ({ ...prev, fontColor: e.target.value }))
        }
      />
    </div>
  );
};

const SettingsFields = () => {
  const { appearance } = useContext(AppearanceContext);

  if (appearance.type === "color") {
    return <ColorSettings />;
  } else if (appearance.type === "linear-gradient") {
    return <LinearGradientSettings />;
  } else {
    return <RadialGradientSettings />;
  }
};

function getDefaultSettings(type: BackgroundType) {
  switch (type) {
    case "color":
      return { type, fontColor: "#000000", value: "#ffffff" } as Background;
    case "linear-gradient":
      return {
        type,
        fontColor: "#000000",
        values: [],
        angle: 90,
      } as Background;
    case "radial-gradient":
      return {
        type,
        fontColor: "#000000",
        values: [],
      } as Background;
    default:
      return {} as Background;
  }
}
