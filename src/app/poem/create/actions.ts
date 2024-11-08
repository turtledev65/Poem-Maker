"use server";

import {
  Appearance,
  Background,
  BackgroundColorValue,
  Foreground,
  Poem,
} from "@/types";
import { safeParseJson } from "@/util/json";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function editPoemData(formData: FormData) {
  const data = {
    title: formData.get("title"),
    text: formData.get("text"),
    image: formData.get("image"),
  };

  if (data.title && data.text) {
    const newPoem = { title: data.title, text: data.text };

    const cookieStore = await cookies();
    cookieStore.set("new-poem", JSON.stringify(newPoem));

    redirect("/poem/create/appearance");
  }
}

export async function editPoemAppearance(formData: FormData) {
  const cookieStore = await cookies();
  const newPoemStr = cookieStore.get("new-poem")?.value;
  if (!newPoemStr) return;

  const newPoem = safeParseJson<Poem>(newPoemStr);
  if (!newPoem) return;

  const type = formData.get("background-type");
  if (!type) return;

  const appearance = {} as Appearance;

  const foreground = {
    title: formData.get("title-color"),
    poem: formData.get("poem-color"),
  } as Foreground;
  if (!foreground.title || !foreground.poem) return;
  appearance.foreground = foreground;

  const background = { type } as Background;
  switch (background.type) {
    case "color":
      const value = formData.get("value");
      if (!value) return;
      background.value = value as string;
      break;
    case "linear-gradient":
      const angle = formData.get("angle");
      if (!angle) return;
      background.angle = Number(angle);
    case "radial-gradient":
      const values: Array<BackgroundColorValue> = [];
      for (const key of formData.keys()) {
        if (key.startsWith("values-color")) {
          const idx = parseInt(key[key.length - 1]);
          if (!values[idx]) {
            values[idx] = {} as BackgroundColorValue;
          }

          const value = formData.get(key) as string;
          values[idx].value = value;
        } else if (key.startsWith("values-percentage")) {
          const idx = parseInt(key[key.length - 1]);
          if (!values[idx]) {
            values[idx] = {} as BackgroundColorValue;
          }

          const percentage = Number(formData.get(key));
          values[idx].percentage = percentage;
        }
      }

      background.values = values;
      break;
  }
  appearance.background = background;

  const customCSSEnabled = formData.get("custom-css-enabled") === "on";
  if (customCSSEnabled) {
    const css = formData.get("custom-css")?.toString().trim();
    if (css) {
      appearance.customCSS = { enabled: customCSSEnabled, css };
    }
  }

  newPoem.appearance = appearance;
  cookieStore.set("new-poem", JSON.stringify(newPoem));

  redirect("/poem/create/preview");
}
