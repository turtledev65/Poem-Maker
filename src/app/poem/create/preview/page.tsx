import { Poem as PoemType } from "@/types";
import { safeParseJson } from "@/util/json";
import { cookies } from "next/headers";
import Poem from "../../_components/poem";
import Background from "../../_components/background";
import { savePoem } from "../actions";

const PreviewPage = async () => {
  const poem = await getPoem();
  if (!poem) return;

  return (
    <main className="flex h-full flex-row gap-4 p-2">
      <Background appearance={poem.appearance.background} />
      <Poem
        title={poem.title}
        text={poem.text}
        appearance={poem.appearance.foreground}
      />
      <form action={savePoem}>
        <button
          type="submit"
          className="absolute bottom-2 right-2 rounded-lg border-2 border-solid border-blue-500 px-4 py-1 text-2xl text-blue-500 transition-all hover:bg-blue-500 hover:text-white"
        >
          Done
        </button>
      </form>
    </main>
  );
};
export default PreviewPage;

async function getPoem() {
  const cookieStore = await cookies();
  const poem = cookieStore.get("new-poem")?.value;
  if (!poem) return null;

  return safeParseJson<PoemType>(poem);
}
