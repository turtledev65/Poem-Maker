"use client";

import { CSSProperties, useMemo } from "react";
import { Background as BackgroundType } from "@/types";

const Background = ({ appearance }: { appearance: BackgroundType }) => {
  const styles = useMemo<CSSProperties>(() => {
    switch (appearance.type) {
      case "color":
        return { background: appearance.value };
      case "linear-gradient":
        return {
          background: `linear-gradient(${appearance.angle}deg, ${getColors(appearance)})`,
        };
      case "radial-gradient":
        return {
          background: `radial-gradient(circle, ${getColors(appearance)})`,
        };
      default:
        return {};
    }
  }, [appearance]);

  return (
    <div className="poem-background absolute inset-0 -z-10" style={styles} />
  );
};
export default Background;

function getColors(settings: BackgroundType) {
  if (settings.type === "color") return null;

  return settings.values.reduce((acc, curr, idx) => {
    let out = acc + `${curr.value} ${curr.percentage}%`;
    if (idx < settings.values.length - 1) {
      out += ",";
    }
    return out;
  }, "");
}
