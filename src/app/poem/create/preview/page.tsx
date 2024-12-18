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
import MainContainer from "../../_components/main-container";
import CustomCss from "../../_components/custom-css";

const PreviewPage = () => {
  const { isNewPoemInitialized, newPoem } = useContext(NewPoemContext);
  const [imageUrl, setImageUrl] = useState<undefined | string>();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: res => {
      setImageUrl(res[0].url);
    },
  });

  const [isLoading, setIsLoading] = useState(false);

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

      setIsLoading(true);
      if (newPoem.image) {
        const file = await convertBlobUrlToFile(newPoem.image);
        startUpload([file]);
      } else {
        try {
          const res = await savePoem({ ...newPoem, image: imageUrl });
          localStorage.removeItem("new-poem");
          router.replace(`/poem/${res.id}`);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [newPoem, isUploading, setIsLoading, startUpload, imageUrl, router],
  );

  useEffect(() => {
    if (!imageUrl) return;
    if (!newPoem) return;

    savePoem({ ...newPoem, image: imageUrl })
      .then(res => {
        localStorage.removeItem("new-poem");
        router.replace(`/poem/${res.id}`);
      })
      .catch(err => console.error(err));
  }, [imageUrl, newPoem, router]);

  if (!newPoem) return;
  return (
    <MainContainer>
      {newPoem.appearance.customCSS.enabled && (
        <CustomCss css={newPoem.appearance.customCSS.css} />
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
          className={`rounded-lg bg-blue-500 px-6 py-2 text-2xl text-white transition-all ${isLoading ? "cursor-not-allowed" : "hover:opacity-80"}`}
        >
          {isLoading ? "Saving..." : "Done"}
        </button>
      </form>
    </MainContainer>
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
