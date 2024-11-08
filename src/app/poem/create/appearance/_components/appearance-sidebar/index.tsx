"use cient";

import Link from "next/link";
import { editPoemAppearance } from "../../../actions";
import BackgroundSettings from "./background-settings";
import ForegroundSettings from "./foreground-settings";

const AppearanceSidebar = () => {
  return (
    <form
      action={editPoemAppearance}
      className="absolute bottom-0 right-0 top-0 flex w-80 flex-col overflow-auto justify-between rounded-l-xl border-l-2 bg-white p-2"
    >
      <ForegroundSettings />
      <BackgroundSettings />

      <div className="flex gap-2">
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
  );
};
export default AppearanceSidebar;
