"use client";

import { CSSProperties, useMemo } from "react";
import { Background as BackgroundType } from "@/types";

const Background = ({settings}: {settings: BackgroundType}) => {
  const styles = useMemo<CSSProperties>(() => {
    switch (settings.type) {
      case "color":
        return { background: settings.value };
      case "linear-gradient":
        return {
          background: `linear-gradient(${settings.angle}deg, ${getColors(settings)})`,
        };
      case "radial-gradient":
        return {
          background: `radial-gradient(circle, ${getColors(settings)})`,
        };
      default:
        return {};
    }
  }, [settings]);

  return <div className="absolute inset-0 -z-10" style={styles} />;
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
