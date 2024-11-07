"use client";

import { useContext } from "react";
import { AppearanceContext } from "../../_providers/appearance-provider";
import ValueList from "../value-list";

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
export default LinearGradientSettings;
