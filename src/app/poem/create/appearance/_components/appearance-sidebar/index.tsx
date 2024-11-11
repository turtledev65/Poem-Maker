"use cient";

import Link from "next/link";
import BackgroundSettings from "./background-settings";
import ForegroundSettings from "./foreground-settings";
import Sidebar from "@/app/_components/sidebar";
import CustomCssSettings from "./custom-css";
import { FormEvent } from "react";

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
const AppearanceSidebar = ({ onSubmit }: Props) => {
  return (
    <Sidebar>
      <form onSubmit={onSubmit} className="relative">
        <ForegroundSettings />
        <BackgroundSettings />
        <CustomCssSettings />

        <div className="flex w-full gap-2">
          <Link
            href="/poem/create/edit"
            className="w-full rounded-lg bg-red-500 p-2 text-center text-xl text-white hover:opacity-80"
          >
            Back
          </Link>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 p-2 text-xl text-white hover:opacity-80"
          >
            Next
          </button>
        </div>
      </form>
    </Sidebar>
  );
};
export default AppearanceSidebar;
