import { CSSProperties } from "react";
import { Background as BackgroundType } from "@/types";

const Background = ({ appearance }: { appearance: BackgroundType }) => {
  const styles = getStyles(appearance);
  return (
    <div className="poem-background absolute inset-0 z-10" style={styles} />
  );
};
export default Background;

function getStyles(appearance: BackgroundType): CSSProperties {
  switch (appearance.type) {
    case "color":
      return { background: appearance.value };
    case "linear-gradient":
      if (appearance.values.length === 0) {
        return { background: "#ffffff" };
      } else if (appearance.values.length == 1) {
        return { background: appearance.values[0].value };
      }

      return {
        background: `linear-gradient(${appearance.angle}deg, ${getColors(appearance)})`,
      };
    case "radial-gradient":
      if (appearance.values.length === 0) {
        return { background: "#ffffff" };
      } else if (appearance.values.length == 1) {
        return { background: appearance.values[0].value };
      }

      return {
        background: `radial-gradient(circle, ${getColors(appearance)})`,
      };
    default:
      return {};
  }
}

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
