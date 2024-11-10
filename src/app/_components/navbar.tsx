import Link from "next/link";
import ThemeToggle from "./theme-button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 flex w-full justify-evenly border-b-2 border-solid border-b-gray-400 dark:border-b-gray-600 bg-gray-50 p-4 text-lg dark:bg-neutral-900 dark:text-white">
      <Link href="/">Poem Maker</Link>
      <div className="space-x-6">
        <Link
          href="/explore"
          className="rounded-lg p-2 transition-all hover:bg-slate-100 dark:hover:bg-zinc-800"
        >
          Explore
        </Link>
        <Link
          href="/poem/create/edit"
          className="rounded-lg p-2 transition-all hover:bg-slate-100 dark:hover:bg-zinc-800"
        >
          Create
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
};
export default Navbar;
