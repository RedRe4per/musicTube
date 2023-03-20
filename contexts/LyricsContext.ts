import { createContext } from "react";

interface LyricsContextType {
  lyricsTimestamp: number;
  setLyricsTimestamp: (lyricsTimestamp: number) => void;
}

export const LyricsContext = createContext<LyricsContextType>({
  lyricsTimestamp: 0,
  setLyricsTimestamp: () => {},
});
