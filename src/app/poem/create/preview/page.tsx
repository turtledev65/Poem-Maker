import Poem from "../../_components/poem";
import Background from "../../_components/background";
import { savePoem } from "../actions";
import server_getNewPoem from "../_util/server-get-new-poem";
import Link from "next/link";

const PreviewPage = async () => {
  const poem = await server_getNewPoem();
  if (!poem) return;

  return (
    <main className="flex h-full flex-row gap-4 px-6 py-4">
      <Background appearance={poem.appearance.background} />
      <Poem
        title={poem.title}
        text={poem.text}
        foregroundAppearance={poem.appearance.foreground}
      />
      <form
        action={savePoem}
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
