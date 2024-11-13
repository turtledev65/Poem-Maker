"use client";

import Link from "next/link";
import ThemeToggle from "./theme-button";
import { FaPenFancy } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <nav className="sticky top-0 z-40 flex w-full items-center justify-between border-b-2 border-solid border-b-gray-400 bg-gray-50 p-4 text-lg dark:border-b-gray-600 dark:bg-neutral-900 dark:text-white md:justify-evenly">
      <div className="flex items-center gap-2">
        <Image
          src="/images/icon.png"
          width={32}
          height={32}
          alt="Favicon"
          className="mb-4"
        />
        <Link href="/">Poem Maker</Link>
      </div>
      <button
        onClick={() => setActive(prev => !prev)}
        className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 md:hidden"
      >
        <IoMenuOutline className="text-3xl" />
      </button>
      <div
        className={`absolute left-0 right-0 top-full flex flex-col overflow-hidden rounded-b-lg bg-gray-50 transition-all dark:bg-neutral-900 md:hidden ${active ? "max-h-screen shadow-md" : "max-h-0 shadow-none"}`}
      >
        <Link
          href="/explore"
          className="flex flex-row items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-zinc-800"
        >
          <MdOutlineExplore className="text-xl" />
          Explore
        </Link>
        <Link
          href="/poem/create/edit"
          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-zinc-800"
        >
          <FaPenFancy />
          Create
        </Link>
        <ThemeToggle className="rounded-none" />
      </div>
      <div className="hidden gap-2 md:flex">
        <Link
          href="/explore"
          className="flex flex-row items-center gap-2 rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-zinc-800"
        >
          <MdOutlineExplore className="text-xl" />
          Explore
        </Link>
        <Link
          href="/poem/create/edit"
          className="flex items-center gap-2 rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-zinc-800"
        >
          <FaPenFancy />
          Create
        </Link>
      </div>
      <ThemeToggle className="hidden md:inline" />
    </nav>
  );
};
export default Navbar;
