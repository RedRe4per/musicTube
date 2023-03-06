import { MusicDetail } from "@/interfaces/music";
import { createContext } from "react";

interface PlayerContextType {
  playerList: MusicDetail[];
  setPlayerList: (playerList: MusicDetail[]) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  playerList: [],
  setPlayerList: () => {},
});
