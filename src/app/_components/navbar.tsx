import Link from "next/link";
import ThemeToggle from "./theme-button";
import { FaPenFancy } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 flex w-full items-center justify-evenly border-b-2 border-solid border-b-gray-400 bg-gray-50 p-4 text-lg transition-colors dark:border-b-gray-600 dark:bg-neutral-900 dark:text-white">
      <Link href="/">Poem Maker</Link>
      <div className="flex gap-6">
        <Link
          href="/explore"
          className="flex flex-row items-center gap-2 rounded-lg p-2 transition-all hover:bg-slate-100 dark:hover:bg-zinc-800"
        >
          <MdOutlineExplore className="text-xl" />
          Explore
        </Link>
        <Link
          href="/poem/create/edit"
          className="flex items-center gap-2 rounded-lg p-2 transition-all hover:bg-slate-100 dark:hover:bg-zinc-800"
        >
          <FaPenFancy />
          Create
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
};
export default Navbar;
