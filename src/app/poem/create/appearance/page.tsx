"use client";

import AppearanceProvider, {
  AppearanceContext,
} from "./_providers/appearance-provider";
import Sidebar from "./_components/sidebar";
import { useContext, useMemo } from "react";
import BaseBackground from "../../_components/background";
import BasePoem from "../../_components/poem";
import Cookie from "js-cookie";
import { safeParseJson } from "@/util/json";
import { Poem as PoemType } from "@/types";
import { useRouter } from "next/navigation";
import isClient from "@/util/is-client";

const AppearancePage = () => {
  return (
    <main>
      <AppearanceProvider>
        <Background />
        <div className="flex p-2">
          <Poem />
        </div>
        <Sidebar />
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
  const router = useRouter();
  const { appearance } = useContext(AppearanceContext);

  const poem = useMemo(() => getPoem(), []);
  if (!poem) {
    router.push("/poem/create/edit");
    return;
  }

  return (
    <BasePoem
      title={poem.title}
      text={poem.text}
      appearance={appearance.foreground}
    />
  );
};

function getPoem() {
  "use client";
  if (!isClient()) return;

  const newPoem = Cookie.get("new-poem");
  if (!newPoem) return null;
  return safeParseJson<PoemType>(newPoem);
}
