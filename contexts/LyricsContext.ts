import { createContext } from "react";

interface LyricsContextType {
  lyricsTimestamp: number;
  setLyricsTimestamp: (lyricsTimestamp: number) => void;
  musicPlayer: any;
}

export const LyricsContext = createContext<LyricsContextType>({
  lyricsTimestamp: 0,
  setLyricsTimestamp: () => {},
  musicPlayer: null,
});
