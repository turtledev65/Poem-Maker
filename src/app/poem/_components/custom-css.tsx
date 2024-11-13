type Props = {
  css: string;
};

const CustomCss = ({ css }: Props) => {
  return <style>{css}</style>;
};
export default CustomCss;
