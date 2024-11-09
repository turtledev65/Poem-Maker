import { db } from "@/db";
import Poem from "../_components/poem";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { poemTable } from "@/db/schema";

type Props = {
  params: {
    id: number;
  };
};
const PoemView = async ({ params }: Props) => {
  const { id } = await params;
  const poem = await db.query.poemTable.findFirst({
    where: eq(poemTable.id, id),
  });
  if (!poem) notFound();

  return (
    <main className="p-2">
      <Poem
        title={poem.title}
        text={poem.text}
        foregroundAppearance={poem.appearance.foreground}
      />
    </main>
  );
};
export default PoemView;
