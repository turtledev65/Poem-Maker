import { Foreground } from "@/types";
import { replaceWithBr } from "@/util/text";

type Props = { title: string; text: string; foregroundAppearance: Foreground };
const Poem = ({ title, text, foregroundAppearance }: Props) => {
  return (
    <div className="poem-container flex flex-col gap-2">
      <h1
        className="poem-title mb-2 text-3xl font-bold"
        style={{ color: foregroundAppearance.title }}
      >
        {title}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: replaceWithBr(text),
        }}
        style={{ color: foregroundAppearance.poem }}
        className="poem-content"
      />
    </div>
  );
};
export default Poem;
