import { createContext } from "react";
import { IMusicDetail } from "@/interfaces/music";

interface PlayAndPauseContextType {
  isMusicPlay: boolean;
  setIsMusicPlay: (isMusicPlay: boolean) => void;
  currentMusic: IMusicDetail | null;
  setCurrentMusic: (currentMusic: IMusicDetail) => void;
}

export const PlayAndPauseContext = createContext<PlayAndPauseContextType>({
  isMusicPlay: true,
  setIsMusicPlay: () => {},
  currentMusic: null,
  setCurrentMusic: () => {},
});
