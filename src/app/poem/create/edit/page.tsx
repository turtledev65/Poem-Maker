"use client";
import { FormEvent, useCallback, useContext, useEffect, useRef } from "react";
import { Poem } from "@/types";
import { useRouter } from "next/navigation";
import { NewPoemContext } from "../_providers/new-poem-provider";

const EditPoem = () => {
  const { newPoem, setNewPoem } = useContext(NewPoemContext);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  const redirectRef = useRef(false);

  const handleCreatePoem = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setNewPoem(prev => {
        const title = titleInputRef.current?.value?.trim();
        const text = textInputRef.current?.value?.trim();
        if (!title || !text) {
          return;
        }

        let out = {} as Poem;
        if (prev) out = { ...prev };
        out.title = title;
        out.text = text;

        redirectRef.current = true;

        return out;
      });
    },
    [setNewPoem, router],
  );

  useEffect(() => {
    if (redirectRef.current) {
      router.push("/poem/create/appearance");
    }
  }, [redirectRef.current]);

  return (
    <main className="relative flex flex-1 items-stretch p-2">
      <form
        onSubmit={handleCreatePoem}
        className="flex w-full flex-row gap-4 *:flex-1"
      >
        <div className="flex h-full flex-col gap-2">
          <input
            placeholder="Title"
            defaultValue={newPoem?.title}
            maxLength={60}
            required
            ref={titleInputRef}
            className="rounded-lg border-2 border-solid border-slate-700 bg-white p-2 text-3xl dark:bg-neutral-900 dark:text-white"
          />
          <textarea
            placeholder="Write your poem here"
            defaultValue={newPoem?.text}
            required
            ref={textInputRef}
            className="h-full resize-none rounded-lg border-2 border-solid border-slate-700 p-1 text-lg outline-none dark:bg-neutral-900 dark:text-white"
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <input id="image" type="file" name="image" className="hidden" />
          <label
            htmlFor="image"
            className="grid h-full w-full place-items-center rounded-lg border-2 border-dashed border-gray-600 font-bold text-gray-600"
          >
            No Image
          </label>
          <button
            type="submit"
            className="rounded-lg bg-blue-500 py-2 font-bold text-white hover:opacity-80"
          >
            Next
          </button>
        </div>
      </form>
    </main>
  );
};
export default EditPoem;
