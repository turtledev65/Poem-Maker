"use client";

import AppearanceProvider, {
  AppearanceContext,
} from "./_providers/appearance-provider";
import AppearanceSidebar from "./_components/appearance-sidebar";
import { useContext, useMemo } from "react";
import BaseBackground from "../../_components/background";
import BasePoem from "../../_components/poem";
import { useRouter } from "next/navigation";

const AppearancePage = () => {
  return (
    <main>
      <AppearanceProvider>
        <Background />
        <div className="flex p-2">
          <Poem />
        </div>
        <AppearanceSidebar />
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

  const poem = useMemo(
    () => ({ title: "Test Title", text: "Teasd;lfkjsdk" }),
    [],
  );
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
