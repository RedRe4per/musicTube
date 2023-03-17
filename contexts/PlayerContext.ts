import { IMusicDetail } from "@/interfaces/music";
import { IAlbum } from "@/interfaces/album";
import { createContext } from "react";

interface PlayerContextType {
  playerList: IMusicDetail[];
  setPlayerList: (playerList: IMusicDetail[]) => void;
  musicList: IAlbum | null;
  setMusicList: (album: IAlbum | null) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  playerList: [],
  setPlayerList: () => {},
  musicList: null,
  setMusicList: () => {},
});
