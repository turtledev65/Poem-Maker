function replaceWithBr(str: string) {
  return str.replace(/\n/g, "<br />");
}

type Props = { title: string; text: string };

const Poem = ({ title, text }: Props) => {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="p-2 text-3xl font-bold">{title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: replaceWithBr(text),
        }}
      />
    </div>
  );
};
export default Poem;
