"use context";

import { useContext } from "react";
import ColorPicker from "./color-picker";
import { SettingsContext } from "../_providers/settings-provider";

const ColorSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  if (settings.type !== "color") return null;

  return (
    <div className="flex flex-row items-center justify-between">
      <p>Value</p>
      <ColorPicker
        value={settings.value}
        name="value"
        onChange={e =>
          setSettings(prev => ({ ...prev, value: e.target.value }))
        }
      />
    </div>
  );
};
export default ColorSettings;
