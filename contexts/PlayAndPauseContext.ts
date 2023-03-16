import { createContext } from "react";

interface PlayAndPauseContextType {
  isMusicPlay: boolean;
  setIsMusicPlay: (isMusicPlay: boolean) => void;
}

export const PlayAndPauseContext = createContext<PlayAndPauseContextType>({
  isMusicPlay: true,
  setIsMusicPlay: () => {},
});
