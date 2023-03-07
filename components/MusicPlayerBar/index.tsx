import { MusicDetail } from "@/interfaces/music";
import { useState, useRef, useContext, useCallback, useMemo } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";
import { formatTime } from "@/utils/formatTime";
import { SkipButton } from "./SkipButton";
import { SequenceButton } from "./SequenceButton";
import { PlayerSwitchButton } from "./PlayerSwitchButton";

export const MusicPlayerBar = () => {
  const { playerList } = useContext(PlayerContext);
  const musicPlayer = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlay, setIsMusicPlay] = useState<boolean>(true);
  const [isMusicLoop, setIsMusicLoop] = useState<boolean>(false);
  const [isRandomPlay, setIsRandomPlay] = useState<boolean>(true);
  const [currentPlayRadio, setCurrentPlayRadio] = useState(0);
  const [currentMusicTime, setCurrentMusicTime] = useState<any>(0);
  const [currentDurationTime, setCurrentDurationTime] = useState<any>(0);
  const [currentMusic, setCurrentMusic] = useState<MusicDetail | null>(
    playerList[0]
  );

  console.log(playerList, "MusicPlayerBar");
  console.log(musicPlayer.current?.volume);

  const handlePlayAndPause = useCallback(() => {
    setIsMusicPlay(!isMusicPlay);
    isMusicPlay ? musicPlayer.current?.play() : musicPlayer.current?.pause();
  }, [isMusicPlay]);

  const handleSkipMusic = useCallback(
    (forward: "last" | "next") => {
      const currentMusicIndex = playerList.findIndex(
        (element) => element.url === currentMusic?.url
      );
      const playMusicIndex =
        forward === "last"
          ? currentMusicIndex > 0
            ? currentMusicIndex - 1
            : playerList.length - 1
          : currentMusicIndex < playerList.length - 1
          ? currentMusicIndex + 1
          : 0;
      setCurrentMusic(playerList[playMusicIndex]);

      setTimeout(() => {
        musicPlayer.current?.play();
      }, 500);
    },
    [playerList, currentMusic]
  );

  const handleRandomPlay = useCallback(() => {
    console.log(musicPlayer.current?.currentTime, "current time");
    console.log(musicPlayer.current?.duration, "duration");

    console.log(
      Math.round(
        musicPlayer.current?.currentTime && musicPlayer.current?.duration
          ? (100 * musicPlayer.current?.currentTime) /
              musicPlayer.current?.duration
          : 0
      )
    );
    setIsRandomPlay(!isRandomPlay);
  }, [isRandomPlay]);

  const handleTime = useCallback(() => {
    const intervalId = setInterval(() => {
      setCurrentMusicTime(musicPlayer.current?.currentTime);
      setCurrentDurationTime(musicPlayer.current?.duration);
      setCurrentPlayRadio(
        Math.round(
          musicPlayer.current?.currentTime && musicPlayer.current?.duration
            ? (100 * musicPlayer.current?.currentTime) /
                musicPlayer.current?.duration
            : 0
        )
      );
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [musicPlayer]);

  const handleProgress = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPlayRadio(+e.target.value);
      musicPlayer.current!.currentTime =
        musicPlayer.current!.duration * (+e.target.value / 100);
    },
    []
  );

  return (
    <main className="absolute bottom-0 w-full h-[100px] bg-gray-800 flex items-center justify-between">
      <aside>music info</aside>
      <section className="w-[850px] flex flex-col items-center">
        <audio
          ref={musicPlayer}
          src={currentMusic?.url}
          loop={isMusicLoop}
          onEnded={() => handleSkipMusic("next")}
          onTimeUpdate={handleTime}
        />
        <div className="flex gap-[40px] items-center fill-gray-200">
          <SequenceButton
            handleSequence={handleRandomPlay}
            active={isRandomPlay}
            sequence="random"
          />
          <SkipButton
            handleSkip={() => handleSkipMusic("last")}
            forward="last"
          />
          <PlayerSwitchButton
            handlePlayAndPause={handlePlayAndPause}
            isMusicPlay={isMusicPlay}
          />
          <SkipButton
            handleSkip={() => handleSkipMusic("next")}
            forward="next"
          />
          <SequenceButton
            handleSequence={() => setIsMusicLoop(!isMusicLoop)}
            active={isMusicLoop}
            sequence="loop"
          />
        </div>
        <div className="w-[850px] h-[10px] flex justify-around items-center my-2">
          <div className="w-[20px]">
            <span>{formatTime(currentMusicTime)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={currentPlayRadio}
            onChange={handleProgress}
            className="appearance-none cursor-pointer rounded-lg accent-gray-200 w-[70%] h-[5px]"
          />
          <div className="w-[20px]">
            <span>{formatTime(currentDurationTime)}</span>
          </div>
        </div>
      </section>
      <aside>sound</aside>
      {/* https://music-server-6orvdb931-redre4per.vercel.app/song/detail?ids=347230获取歌曲详情。有名字，图，歌手名 */}
    </main>
  );
};
