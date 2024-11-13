import { PropsWithChildren } from "react";
import { Metadata } from "next";

const ExploreLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};
export default ExploreLayout;

export const metadata: Metadata = {
  title: "Explore",
};
