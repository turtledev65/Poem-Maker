"use server";

import { Background, BackgroundColorValue, Poem } from "@/types";
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

    redirect("/poem/create/background");
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

  const fontColor = formData.get("font-color");
  if (!fontColor) return;

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

  newPoem.appearance.background = background;
  cookieStore.set("new-poem", JSON.stringify(newPoem));

  redirect("/poem/create/preview");
}
