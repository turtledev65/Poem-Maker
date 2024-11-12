import { PropsWithChildren } from "react";
import Providers from "./_providers";
import { Metadata } from "next";

const CreateLayout = ({ children }: PropsWithChildren) => {
  return <Providers>{children}</Providers>;
};
export default CreateLayout;

export const metadata: Metadata = {
  title: "Create Poem",
};
