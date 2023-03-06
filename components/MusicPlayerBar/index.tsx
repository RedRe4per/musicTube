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
      <section className="w-[850px] flex flex-col items-center">
        <audio
          ref={musicPlayers}
          src={currentMusic?.url}
          loop={isMusicLoop}
          onEnded={handleMusicEnded}
        />
        <div className="flex gap-[50px] items-center fill-gray-200">
          <button onClick={handleRandomPlay} className="w-[40px] h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`play-bar-btn  ${isRandomPlay ? "fill-green" : ""}`}
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M18 17.883V16l5 3-5 3v-2.09a9 9 0 0 1-6.997-5.365L11 14.54l-.003.006A9 9 0 0 1 2.725 20H2v-2h.725a7 7 0 0 0 6.434-4.243L9.912 12l-.753-1.757A7 7 0 0 0 2.725 6H2V4h.725a9 9 0 0 1 8.272 5.455L11 9.46l.003-.006A9 9 0 0 1 18 4.09V2l5 3-5 3V6.117a7 7 0 0 0-5.159 4.126L12.088 12l.753 1.757A7 7 0 0 0 18 17.883z" />
            </svg>
          </button>
          <button onClick={handleLastMusic} className="w-[40px] h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="play-bar-btn"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M8 11.333l10.223-6.815a.5.5 0 0 1 .777.416v14.132a.5.5 0 0 1-.777.416L8 12.667V19a1 1 0 0 1-2 0V5a1 1 0 1 1 2 0v6.333zm9 4.93V7.737L10.606 12 17 16.263z" />
            </svg>
          </button>
          <button onClick={handlePlayAndPause} className="w-[58px] h-[58px]">
            <img
              src={
                isMusicPlay
                  ? "/icons/play-circle-fill.svg"
                  : "/icons/pause-circle-fill.svg"
              }
              alt="play"
              className="hover:w-[54px] hover:h-[54px] m-auto"
            />
          </button>
          <button onClick={handleNextMusic} className="w-[40px] h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="play-bar-btn"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M16 12.667L5.777 19.482A.5.5 0 0 1 5 19.066V4.934a.5.5 0 0 1 .777-.416L16 11.333V5a1 1 0 0 1 2 0v14a1 1 0 0 1-2 0v-6.333zm-9-4.93v8.526L13.394 12 7 7.737z" />
            </svg>
          </button>
          <button onClick={handleLoop} className="w-[40px] h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`play-bar-btn ${isMusicLoop ? "fill-green" : ""}`}
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M8 20v1.932a.5.5 0 0 1-.82.385l-4.12-3.433A.5.5 0 0 1 3.382 18H18a2 2 0 0 0 2-2V8h2v8a4 4 0 0 1-4 4H8zm8-17.932a.5.5 0 0 1 .82-.385l4.12 3.433a.5.5 0 0 1-.321.884H6a2 2 0 0 0-2 2v8H2V8a4 4 0 0 1 4-4h10V2.068zM11 8h2v8h-2v-6H9V9l2-1z" />
            </svg>
          </button>
        </div>
      </section>
      <aside>sound</aside>
      {/* https://music-server-6orvdb931-redre4per.vercel.app/song/detail?ids=347230获取歌曲详情。有名字，图，歌手名 */}
    </main>
  );
};
