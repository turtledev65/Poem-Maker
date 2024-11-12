import Image from "next/image";

type Props = {
  url: string;
};

const PoemImage = ({ url }: Props) => {
  return (
    <Image
      src={url}
      alt="An image for the poem"
      width={1000}
      height={1000}
      priority
      className="poem-image relative z-20 w-full max-w-xl object-cover"
    />
  );
};
export default PoemImage;
