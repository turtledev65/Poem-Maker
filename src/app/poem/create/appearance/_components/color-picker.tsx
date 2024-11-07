"use client";

import { ChangeEvent, useId } from "react";

type Props = {
  value: string;
  name?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ColorPicker = ({ value, name, disabled, onChange }: Props) => {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        id={id}
        hidden
        value={value}
        name={name}
        disabled={disabled}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="min-h-7 min-w-7 cursor-pointer rounded-full border-2 border-solid border-gray-400"
        style={{ backgroundColor: value }}
      />
    </div>
  );
};
export default ColorPicker;
