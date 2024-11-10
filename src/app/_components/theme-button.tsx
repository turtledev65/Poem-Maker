"use client";

import { useState } from "react";

const ThemeToggle = () => {
  const [checked, setChecked] = useState(false);

  return (
    <label className="cursor-pointer select-none">
      <p>{checked ? "Dark" : "Light"}</p>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(prev => !prev)}
        className="hidden"
      />
    </label>
  );
};
export default ThemeToggle;
