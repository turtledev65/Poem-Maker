"use client";

import Poem from "../../_components/poem";
import Background from "../../_components/background";
import Link from "next/link";
import { FormEvent, useCallback, useContext, useEffect } from "react";
import { NewPoemContext } from "../_providers/new-poem-provider";
import { useRouter } from "next/navigation";
import { savePoem } from "../actions";

const PreviewPage = () => {
  const { isNewPoemInitialized, newPoem } = useContext(NewPoemContext);

  const router = useRouter();
  useEffect(() => {
    if (isNewPoemInitialized && !newPoem) {
      router.replace("/poem/create/edit");
    }
  }, [isNewPoemInitialized, newPoem, router]);

  const handleSavePoem = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!newPoem) return;

      const res = await savePoem(newPoem);
      router.replace(`/poem/${res.id}`);
    },
    [newPoem, router],
  );

  if (!newPoem) return;
  return (
    <main className="flex h-full flex-row gap-4 px-6 py-4">
      <Background appearance={newPoem.appearance.background} />
      <Poem
        title={newPoem.title}
        text={newPoem.text}
        foregroundAppearance={newPoem.appearance.foreground}
      />
      <form
        onSubmit={handleSavePoem}
        className="absolute bottom-2 right-2 z-20 flex gap-2"
      >
        <Link
          href="/poem/create/appearance"
          className="rounded-lg bg-red-500 px-6 py-2 text-2xl text-white transition-all hover:opacity-80"
        >
          Back
        </Link>
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-6 py-2 text-2xl text-white transition-all hover:opacity-80"
        >
          Done
        </button>
      </form>
    </main>
  );
};
export default PreviewPage;
