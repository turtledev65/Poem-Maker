"use client";
import { poemTable } from "@/db/schema";
import { replaceWithBr } from "@/util/text";
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPoems } from "../poem/create/actions";
import { AiOutlineLoading } from "react-icons/ai";

const ExplorePage = () => {
  const [poems, setPoems] = useState<InferSelectModel<typeof poemTable>[]>();
  const [state, setState] = useState<"loading" | "error" | "finished">(
    "loading",
  );

  useEffect(() => {
    getAllPoems()
      .then(res => {
        setPoems(res);
        setState("finished");
      })
      .catch(_ => {
        setState("error");
      });
  }, [setPoems, setState]);

  return (
    <main className="flex h-full flex-1 flex-col gap-4 px-6 py-4 md:flex-row">
      <div className="rounded-lg bg-gray-100 px-4 py-6 dark:bg-neutral-900">
        <div className="sticky top-20 flex flex-col items-center">
          <h1 className="mx-auto mb-6 inline-block w-min text-center text-6xl font-bold dark:text-gray-50">
            Explore
            <p className="text-left text-lg text-gray-600 dark:text-gray-300">
              Discover and view poems
            </p>
          </h1>
          <input
            placeholder="Search"
            className="rounded-full border-2 border-gray-600 px-3 py-2 text-lg outline-none dark:border-neutral-500 dark:bg-neutral-700 dark:text-white"
          />
        </div>
      </div>
      {state != "finished" && (
        <div className="flex flex-1 items-center justify-center">
          {state === "loading" ? (
            <AiOutlineLoading className="animate-spin text-3xl dark:text-white" />
          ) : (
            <p className="text-lg text-red-500">An unexpected error occurred</p>
          )}
        </div>
      )}
      <div className="grid w-full grid-cols-1 gap-4 px-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {poems?.map(poem => (
          <PoemPreview
            title={poem.title}
            text={poem.text}
            id={poem.id}
            key={poem.id}
          />
        ))}
      </div>
    </main>
  );
};
export default ExplorePage;

type PoemPreviewProps = {
  title: string;
  text: string;
  id: number;
};
const PoemPreview = ({ title, text, id }: PoemPreviewProps) => {
  return (
    <Link
      href={`/poem/${id}`}
      className="flex w-full flex-col items-center justify-center gap-10 rounded border-2 border-transparent bg-gray-100 p-2 text-center transition-all hover:border-gray-400 dark:bg-neutral-900 dark:text-gray-50 hover:dark:border-neutral-500"
    >
      <p
        dangerouslySetInnerHTML={{
          __html: replaceWithBr(text),
        }}
        className="line-clamp-6 text-nowrap"
      />
      <h2 className="text-xl font-bold">{title}</h2>
    </Link>
  );
};
