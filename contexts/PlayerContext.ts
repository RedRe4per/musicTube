import { IMusicDetail } from "@/interfaces/music";
import { Track } from "@/interfaces/playlist";
import { createContext } from "react";

interface PlayerContextType {
  playerList: IMusicDetail[];
  setPlayerList: (playerList: IMusicDetail[]) => void;
  cachedPlayerList: IMusicDetail[];
  setCachedPlayerList: (playerList: IMusicDetail[]) => void;
  musicListId: number | null;
  setMusicListId: (musicListId: number | null) => void;
  queueInfo: Track[];
  setQueueInfo: (queueInfo: Track[]) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  playerList: [],
  setPlayerList: () => {},
  cachedPlayerList: [],
  setCachedPlayerList: () => {},
  musicListId: null,
  setMusicListId: () => {},
  queueInfo: [],
  setQueueInfo: () => {},
});
