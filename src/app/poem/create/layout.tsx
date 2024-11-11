import { PropsWithChildren } from "react";
import Providers from "./_providers";

const CreateLayout = ({ children }: PropsWithChildren) => {
  return <Providers>{children}</Providers>;
};
export default CreateLayout;
