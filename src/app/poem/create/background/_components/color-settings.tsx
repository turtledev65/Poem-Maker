"use context";

import { useContext } from "react";
import ColorPicker from "./color-picker";
import { AppearanceContext } from "../_providers/appearance-provider";

const ColorSettings = () => {
  const { appearance, setAppearance } = useContext(AppearanceContext);
  if (appearance.type !== "color") return null;

  return (
    <div className="flex flex-row items-center justify-between">
      <p>Value</p>
      <ColorPicker
        value={appearance.value}
        name="value"
        onChange={e =>
          setAppearance(prev => ({ ...prev, value: e.target.value }))
        }
      />
    </div>
  );
};
export default ColorSettings;
