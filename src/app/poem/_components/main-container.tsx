import { PropsWithChildren } from "react";

const MainContainer = ({ children }: PropsWithChildren) => {
  return (
    <main className="main-container relative flex flex-1 flex-col justify-between px-6 py-4 md:flex-row">
      {children}
    </main>
  );
};
export default MainContainer;
