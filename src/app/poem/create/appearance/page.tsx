"use client";

import AppearanceProvider, {
  AppearanceContext,
} from "./_providers/appearance-provider";
import AppearanceSidebar from "./_components/appearance-sidebar";
import { FormEvent, useCallback, useContext, useEffect, useRef } from "react";
import BaseBackground from "../../_components/background";
import BasePoem from "../../_components/poem";
import { useRouter } from "next/navigation";
import { NewPoemContext } from "../_providers/new-poem-provider";
import {
  Appearance,
  Foreground,
  Background as BackgroundType,
  BackgroundColorValue,
} from "@/types";
import { removeCustomCss } from "@/util/custom-css";
import PoemImage from "../../_components/poem-image";

const AppearancePage = () => {
  const { isNewPoemInitialized, newPoem, setNewPoem } =
    useContext(NewPoemContext);

  const redirectRef = useRef(false);
  const router = useRouter();
  useEffect(() => {
    if (isNewPoemInitialized && !newPoem) {
      router.replace("/poem/create/edit");
    }
  }, [isNewPoemInitialized, newPoem, router]);

  const handleSubmitPoem = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const appearance = getAppearanceFromFormData(formData);
      if (!appearance) {
        return;
      }

      setNewPoem(prev => {
        if (!prev) return null;
        redirectRef.current = true;
        return { ...prev, appearance };
      });
    },
    [setNewPoem],
  );

  useEffect(() => {
    if (redirectRef.current) {
      removeCustomCss();
      router.replace("/poem/create/preview");
    }
  }, [redirectRef.current, router]);

  return (
    <main className="main-container relative flex-1 px-6 py-4">
      <AppearanceProvider defaultValue={newPoem?.appearance}>
        <Background />
        <Poem />
        {newPoem?.image && <PoemImage url={newPoem.image} />}
        <AppearanceSidebar onSubmit={handleSubmitPoem} />
      </AppearanceProvider>
    </main>
  );
};
export default AppearancePage;

const Background = () => {
  const { appearance } = useContext(AppearanceContext);
  return <BaseBackground appearance={appearance.background} />;
};

const Poem = () => {
  const { appearance } = useContext(AppearanceContext);
  const { newPoem } = useContext(NewPoemContext);

  return (
    <BasePoem
      title={newPoem?.title ?? "Loading title..."}
      text={newPoem?.text ?? "Loading text..."}
      foregroundAppearance={appearance.foreground}
    />
  );
};

function getAppearanceFromFormData(formData: FormData) {
  const type = formData.get("background-type");
  if (!type) return;

  const appearance = {} as Appearance;

  const foreground = {
    title: formData.get("title-color"),
    poem: formData.get("poem-color"),
  } as Foreground;
  if (!foreground.title || !foreground.poem) return;
  appearance.foreground = foreground;

  const background = { type } as BackgroundType;
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
  }
  appearance.background = background;

  const customCSSEnabled = formData.get("custom-css-enabled") === "on";
  if (customCSSEnabled) {
    const css = formData.get("custom-css")?.toString().trim();
    if (css) {
      appearance.customCSS = { enabled: customCSSEnabled, css };
    }
  } else {
    appearance.customCSS = { enabled: false, css: "" };
  }

  return appearance;
}
