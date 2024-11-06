import Poem from "../_components/poem";

const PoemView = () => {
  const title = "";
  const poem = ``;

  return (
    <main>
      <h1 className="whitespace-pre-line text-3xl font-bold">{title}</h1>
      <Poem title={title} text={poem} />
    </main>
  );
};
export default PoemView;
