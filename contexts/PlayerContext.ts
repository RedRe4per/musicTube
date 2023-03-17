import { IMusicDetail } from "@/interfaces/music";
import { IAlbum } from "@/interfaces/album";
import { createContext } from "react";

interface PlayerContextType {
  playerList: IMusicDetail[];
  setPlayerList: (playerList: IMusicDetail[]) => void;
  musicListId: number | null;
  setMusicListId: (musicListId: number | null) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  playerList: [],
  setPlayerList: () => {},
  musicListId: null,
  setMusicListId: () => {},
});
