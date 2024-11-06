"use client";

import SettingsProvider, {
  SettingsContext,
} from "./_providers/settings-provider";
import Sidebar from "./_components/sidebar";
import { useContext } from "react";
import BaseBackground from "../../_components/background";

const BackgroundPage = () => {
  return (
    <main>
      <SettingsProvider>
        <Background />
        <Sidebar />
      </SettingsProvider>
    </main>
  );
};
export default BackgroundPage;

const Background = () => {
  const { settings } = useContext(SettingsContext);
  return <BaseBackground settings={settings} />;
};
