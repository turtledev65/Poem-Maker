export type BackgroundColorValue = { value: string; percentage: number };
export type Background =
  | {
      type: "color";
      fontColor: string;
      value: string;
    }
  | {
      type: "linear-gradient";
      fontColor: string;
      values: BackgroundColorValue[];
      angle: number;
    }
  | {
      type: "radial-gradient";
      fontColor: string;
      values: BackgroundColorValue[];
    };
export type BackgroundType = Extract<Background["type"], string>;

export type Poem = {
  title: string;
  text: string;
  background: Background;
};
