import { IMusicDetail } from "@/interfaces/music";
import { IAlbumSong } from "@/interfaces/albumSong";
import { createContext } from "react";

interface PlayerContextType {
  playerList: IMusicDetail[];
  setPlayerList: (playerList: IMusicDetail[]) => void;
  musicListId: number | null;
  setMusicListId: (musicListId: number | null) => void;
  queueInfo: IAlbumSong[];
  setQueueInfo: (param: IAlbumSong[]) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  playerList: [],
  setPlayerList: () => {},
  musicListId: null,
  setMusicListId: () => {},
  queueInfo: [],
  setQueueInfo: () => {},
});
