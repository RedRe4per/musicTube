import { useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";
import { shuffle } from "@/utils/shuffle";
import { IMusicDetail } from "@/interfaces/music";

export const useListRandomizer = () => {
  const { currentMusic } = useContext(PlayAndPauseContext);
  const { playerList, setPlayerList } = useContext(PlayerContext);

  const handleListRandomizer = () => {
    if (playerList.length < 2) return;
    const listWithoutCurrentMusic = playerList.filter(
      (musicItem: IMusicDetail) => {
        return musicItem.id !== currentMusic?.id;
      }
    );
    const shuffleList = shuffle(listWithoutCurrentMusic);
    const randomizedList = [currentMusic, ...shuffleList] as IMusicDetail[];
    setPlayerList(randomizedList);
  };

  return { handleListRandomizer };
};
