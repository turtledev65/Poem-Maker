"use client";

import AppearanceProvider, {
  AppearanceContext,
} from "./_providers/appearance-provider";
import Sidebar from "./_components/sidebar";
import { useContext } from "react";
import BaseBackground from "../../_components/background";
import BasePoem from "../../_components/poem";

const BackgroundPage = () => {
  return (
    <main>
      <AppearanceProvider>
        <Background />
        <div className="flex">
          <Poem />
        </div>
        <Sidebar />
      </AppearanceProvider>
    </main>
  );
};
export default BackgroundPage;

const Background = () => {
  const { appearance } = useContext(AppearanceContext);
  return <BaseBackground appearance={appearance.background} />;
};

const Poem = () => {
  const { appearance } = useContext(AppearanceContext);

  return (
    <BasePoem
      title="Title"
      text="here is some text"
      appearance={appearance.foreground}
    />
  );
};
