import { MusicDetail } from "@/interfaces/music";
import { createContext } from "react";

interface PlayerContextType {
  playerList: MusicDetail[];
  setPlayerList: (playerList: MusicDetail[]) => void;
  album: any;
  setAlbum: (album: any) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  playerList: [],
  setPlayerList: () => {},
  album: null,
  setAlbum: () => {},
});
