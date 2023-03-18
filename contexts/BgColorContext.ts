import { createContext } from "react";

interface BgContextType {
  bgColor: string;
  setBgColor: (bgColor: string) => void;
  isLoading: boolean;
  setIsLoading: (param: boolean) => void;
}

export const BgColorContext = createContext<BgContextType>({
  bgColor: "gray-650",
  setBgColor: () => {},
  isLoading: false,
  setIsLoading: () => {},
});
