import { db } from "@/db";
import { replaceWithBr } from "@/util/text";
import Link from "next/link";

const ExplorePage = async () => {
  const poems = await db.query.poemTable.findMany({ limit: 20 });

  return (
    <main className="flex h-full flex-col justify-between gap-4 overflow-auto px-6 py-4 md:flex-row">
      <div className="sticky top-2 flex h-full justify-center rounded-lg bg-gray-100 px-4 py-6">
        <div className="flex flex-col items-center">
          <h1 className="mx-auto mb-6 inline-block w-min text-center text-6xl font-bold">
            Explore
            <p className="text-left text-lg text-gray-600">
              Discover and view poems
            </p>
          </h1>
          <input
            placeholder="Search"
            className="rounded-full border-2 border-gray-600 px-3 py-2 text-lg outline-none"
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 px-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {poems.map(poem => (
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
      className="flex w-full flex-col items-center justify-center gap-10 rounded border-2 border-transparent bg-gray-50 p-2 text-center transition-all hover:border-gray-400"
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
