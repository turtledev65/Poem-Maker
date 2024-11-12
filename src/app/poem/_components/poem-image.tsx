type Props = {
  url: string;
};

const PoemImage = ({ url }: Props) => {
  return <img src={url} className="poem-image object-cover w-full max-w-xl relative z-20"/>;
};
export default PoemImage;
