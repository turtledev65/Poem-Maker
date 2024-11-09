"use client";

import AppearanceProvider, {
  AppearanceContext,
} from "./_providers/appearance-provider";
import AppearanceSidebar from "./_components/appearance-sidebar";
import { Suspense, useContext, useEffect, useState } from "react";
import BaseBackground from "../../_components/background";
import BasePoem from "../../_components/poem";
import { useRouter } from "next/navigation";
import { Poem as PoemType } from "@/types";
import client_getNewPoem from "../_util/client-get-new-poem";

const AppearancePage = () => {
  const newPoem = useNewPoem();

  return (
    <Suspense>
      <main>
        <AppearanceProvider defaultValue={newPoem?.appearance}>
          <Background />
          <div className="flex p-2">
            <Poem />
          </div>
          <AppearanceSidebar />
        </AppearanceProvider>
      </main>
    </Suspense>
  );
};
export default AppearancePage;

const Background = () => {
  const { appearance } = useContext(AppearanceContext);
  return <BaseBackground appearance={appearance.background} />;
};

const Poem = () => {
  const { appearance } = useContext(AppearanceContext);
  const newPoem = useNewPoem();

  return (
    <BasePoem
      title={newPoem?.title ?? "Loading title..."}
      text={newPoem?.text ?? "Loading text..."}
      foregroundAppearance={appearance.foreground}
    />
  );
};

const useNewPoem = () => {
  const [newPoem, setNewPoem] = useState<PoemType | null | undefined>(null);
  const router = useRouter();

  useEffect(() => {
    const poem = client_getNewPoem();
    if (!poem) router.replace("/poem/create/edit");
    setNewPoem(poem);
  }, [setNewPoem]);

  return newPoem;
};
