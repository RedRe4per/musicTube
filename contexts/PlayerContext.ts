import { IMusicDetail } from "@/interfaces/music";
import { createContext } from "react";

interface PlayerContextType {
  playerList: IMusicDetail[];
  setPlayerList: (playerList: IMusicDetail[]) => void;
  album: any;
  setAlbum: (album: any) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  playerList: [],
  setPlayerList: () => {},
  album: null,
  setAlbum: () => {},
});
