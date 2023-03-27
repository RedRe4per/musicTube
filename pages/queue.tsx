import { useContext, useEffect } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";
import { IAlbumSong } from "@/interfaces/albumSong";

export default function Queue() {
  const { playerList, musicListId, queueInfo } = useContext(PlayerContext);
  const { isMusicPlay, currentMusic } = useContext(PlayAndPauseContext);

  useEffect(() => {
    const getMusicList = async () => {};
  });

  console.log(queueInfo);

  return (
    <main>
      <h4>Queue</h4>
      <section>list</section>
    </main>
  );
}
