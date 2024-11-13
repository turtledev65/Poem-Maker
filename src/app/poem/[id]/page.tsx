import { db } from "@/db";
import Poem from "../_components/poem";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { poemTable } from "@/db/schema";
import Background from "../_components/background";
import PoemImage from "../_components/poem-image";
import MainContainer from "../_components/main-container";

type Props = {
  params: Promise<{
    id: number;
  }>;
};
const PoemView = async ({ params }: Props) => {
  const { id } = await params;
  const poem = await db.query.poemTable.findFirst({
    where: eq(poemTable.id, id),
  });
  if (!poem) notFound();

  return (
    <MainContainer>
      {poem.appearance.customCSS.enabled && (
        <style>{poem.appearance.customCSS.css}</style>
      )}
      <Background appearance={poem.appearance.background} />
      <Poem
        title={poem.title}
        text={poem.text}
        foregroundAppearance={poem.appearance.foreground}
      />
      {poem.image && <PoemImage url={poem.image} />}
    </MainContainer>
  );
};
export default PoemView;
