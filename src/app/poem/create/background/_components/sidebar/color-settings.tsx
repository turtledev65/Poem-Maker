"use context";

import { useContext } from "react";
import ColorPicker from "../color-picker";
import { AppearanceContext } from "../../_providers/appearance-provider";

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
export default ColorSettings;
