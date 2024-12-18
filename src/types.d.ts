export type BackgroundColorValue = { value: string; percentage: number };
export type Background =
  | {
      type: "color";
      value: string;
    }
  | {
      type: "linear-gradient";
      values: BackgroundColorValue[];
      angle: number;
    }
  | {
      type: "radial-gradient";
      values: BackgroundColorValue[];
    };
export type BackgroundType = Extract<Background["type"], string>;

export type Foreground = {
  title: string;
  poem: string;
};

export type CustomCSS = {
  enabled: boolean;
  css: string;
};

export type Appearance = {
  foreground: Foreground;
  background: Background;
  customCSS: CustomCSS;
};

export type Poem = {
  title: string;
  text: string;
  image?: string;
  appearance: Appearance;
};
