import { Foreground } from "@/types";

function replaceWithBr(str: string) {
  return str.replace(/\n/g, "<br />");
}

type Props = { title: string; text: string; appearance: Foreground };
const Poem = ({ title, text, appearance }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1
        className="mb-2 text-3xl font-bold"
        style={{ color: appearance.title }}
      >
        {title}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: replaceWithBr(text),
        }}
        style={{ color: appearance.poem }}
      />
    </div>
  );
};
export default Poem;
