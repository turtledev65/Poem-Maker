"use client";

import Poem from "../../_components/poem";
import Background from "../../_components/background";
import Link from "next/link";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { NewPoemContext } from "../_providers/new-poem-provider";
import { useRouter } from "next/navigation";
import { savePoem } from "../actions";
import { useUploadThing } from "@/util/uploadthing";
import PoemImage from "../../_components/poem-image";

const PreviewPage = () => {
  const { isNewPoemInitialized, newPoem } = useContext(NewPoemContext);
  const [imageUrl, setImageUrl] = useState<undefined | string>();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: res => {
      setImageUrl(res[0].url);
    },
  });

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
      if (isUploading) return;

      if (newPoem.image) {
        const file = await convertBlobUrlToFile(newPoem.image);
        startUpload([file]);
      } else {
        const res = await savePoem({ ...newPoem, image: imageUrl });
        localStorage.removeItem("new-poem");
        router.replace(`/poem/${res.id}`);
      }
    },
    [newPoem, isUploading, startUpload, imageUrl, router],
  );

  useEffect(() => {
    if (!imageUrl) return;
    if (!newPoem) return;

    savePoem({ ...newPoem, image: imageUrl }).then(res => {
      localStorage.removeItem("new-poem");
      router.replace(`/poem/${res.id}`);
    });
  }, [imageUrl, newPoem, router]);

  if (!newPoem) return;
  return (
    <main className="main-container flex h-full flex-1 flex-row justify-between px-6 py-4">
      {newPoem.appearance.customCSS.enabled && (
        <style>{newPoem.appearance.customCSS.css}</style>
      )}
      <Background appearance={newPoem.appearance.background} />
      <Poem
        title={newPoem.title}
        text={newPoem.text}
        foregroundAppearance={newPoem.appearance.foreground}
      />
      {newPoem.image && <PoemImage url={newPoem.image} />}
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

async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  const urlParts = blobUrl.split("/");
  const fileName = urlParts[urlParts.length - 1];

  const file = new File([blob], fileName, { type: blob.type });
  return file;
}
