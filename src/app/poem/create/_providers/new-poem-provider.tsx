"use client";

import { Poem } from "@/types";
import { safeParseJson } from "@/util/json";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type NewPoem = Poem | undefined | null;
type NewPoemContextType = {
  isNewPoemInitialized: boolean;
  newPoem: NewPoem;
  setNewPoem: Dispatch<SetStateAction<NewPoem>>;
};
export const NewPoemContext = createContext<NewPoemContextType>(
  {} as NewPoemContextType,
);

const NewPoemProvider = ({ children }: PropsWithChildren) => {
  const isMounted = useRef(false);
  const [newPoem, setNewPoem] = useState<NewPoem>();

  useEffect(() => {
    const newPoemStr = localStorage.getItem("new-poem");
    if (newPoemStr) {
      setNewPoem(safeParseJson(newPoemStr));
    } else {
      setNewPoem(null);
    }

    return () => {
      isMounted.current = true;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (newPoem === undefined || newPoem === null)
        localStorage.removeItem("new-poem");
      localStorage.setItem("new-poem", JSON.stringify(newPoem));
    } else {
      isMounted.current = true;
    }
  }, [newPoem]);

  return (
    <NewPoemContext.Provider
      value={{ newPoem, setNewPoem, isNewPoemInitialized: isMounted.current }}
    >
      {children}
    </NewPoemContext.Provider>
  );
};
export default NewPoemProvider;
