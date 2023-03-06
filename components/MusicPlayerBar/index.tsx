import { MusicDetail } from "@/interfaces/music";
import { useState, useRef } from "react";
import { useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";

export const MusicPlayerBar = () => {
  const { playerList } = useContext(PlayerContext);
  console.log(playerList, "MusicPlayerBar");
  const [currentMusic, setCurrentMusic] = useState<MusicDetail | null>(
    playerList[0]
  );
  const [isMusicPlay, setIsMusicPlay] = useState<boolean>(true);
  const [isMusicLoop, setIsMusicLoop] = useState<boolean>(false);
  const [isRandomPlay, setIsRandomPlay] = useState<boolean>(true);
  const musicPlayers = useRef<HTMLAudioElement | null>(null);

  console.log(musicPlayers.current?.volume);

  const handlePlayAndPause = () => {
    setIsMusicPlay(!isMusicPlay);
    if (isMusicPlay) {
      musicPlayers.current?.play();
    } else {
      musicPlayers.current?.pause();
    }
  };

  const handleLastMusic = () => {
    const currentMusicIndex = playerList.findIndex(
      (element) => element.url === currentMusic?.url
    );
    const lastMusicIndex =
      currentMusicIndex > 0 ? currentMusicIndex - 1 : playerList.length - 1;
    setCurrentMusic(playerList[lastMusicIndex]);

    setTimeout(() => {
      musicPlayers.current?.play();
    }, 1000);
  };

  const handleNextMusic = () => {
    const currentMusicIndex = playerList.findIndex(
      (element) => element.url === currentMusic?.url
    );
    const nextMusicIndex =
      currentMusicIndex < playerList.length - 1 ? currentMusicIndex + 1 : 0;
    setCurrentMusic(playerList[nextMusicIndex]);

    setTimeout(() => {
      musicPlayers.current?.play();
    }, 1000);
  };

  const handleRandomMusic = () => {
    const currentMusicIndex = playerList.findIndex(
      (element) => element.url === currentMusic?.url
    );
    if (playerList.length > 1) {
      let randomMusicIndex = -1;
      while (
        randomMusicIndex === currentMusicIndex ||
        randomMusicIndex === -1
      ) {
        randomMusicIndex = Math.floor(Math.random() * playerList.length);
      }
      setCurrentMusic(playerList[randomMusicIndex]);
    } else {
      setCurrentMusic(playerList[0]);
    }

    setTimeout(() => {
      musicPlayers.current?.play();
    }, 1000);
  };

  const handleLoop = () => {
    setIsMusicLoop(!isMusicLoop);
  };

  const handleRandomPlay = () => {
    setIsRandomPlay(!isRandomPlay);
  };

  const handleMusicEnded = () => {
    if (isRandomPlay) {
      handleRandomMusic();
    } else {
      handleNextMusic();
    }
  };

  return (
    <main className="absolute bottom-0 w-full h-[100px] bg-gray-800 flex items-center justify-between">
      <aside>music info</aside>
      <section>
        <p className="text-yellow-400 text-h3-light">I am music player</p>
        <audio
          ref={musicPlayers}
          src={currentMusic?.url}
          loop={isMusicLoop}
          onEnded={handleMusicEnded}
        />
        <div className="flex gap-5">
          <button onClick={handlePlayAndPause}>
            {isMusicPlay ? "Play" : "Pause"}
          </button>
          <button onClick={handleLastMusic}>Last</button>
          <button onClick={handleNextMusic}>Next</button>
          <button
            onClick={handleLoop}
            className={isMusicLoop ? "bg-green" : "bg-gray-400"}
          >
            Loop
          </button>
          <button
            onClick={handleRandomPlay}
            className={isRandomPlay ? "bg-green" : "bg-gray-400"}
          >
            Random
          </button>
        </div>
      </section>
      <aside>sound</aside>
      {/* https://music-server-6orvdb931-redre4per.vercel.app/song/detail?ids=347230获取歌曲详情。有名字，图，歌手名 */}
    </main>
  );
};
