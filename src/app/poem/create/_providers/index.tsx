import { PropsWithChildren } from "react";
import NewPoemProvider from "./new-poem-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return <NewPoemProvider>{children}</NewPoemProvider>
};
export default Providers;
