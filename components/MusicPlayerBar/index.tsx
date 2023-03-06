import { MusicDetail } from "@/interfaces/music";
import { useState, useRef, useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";
import { formatTime } from "@/utils/formatTime";
import { SkipButton } from "./SkipButton";
import { SequenceButton } from "./SequenceButton";
import { PlayerSwitchButton } from "./PlayerSwitchButton";

export const MusicPlayerBar = () => {
  const { playerList } = useContext(PlayerContext);
  const musicPlayers = useRef<HTMLAudioElement | null>(null);
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
  console.log(musicPlayers.current?.volume);

  const handlePlayAndPause = () => {
    setIsMusicPlay(!isMusicPlay);
    isMusicPlay ? musicPlayers.current?.play() : musicPlayers.current?.pause();
  };

  const handleSkipMusic = (forward: "last" | "next") => {
    const currentMusicIndex = playerList.findIndex(
      (element) => element.url === currentMusic?.url
    );
    const playMusicIndex = forward === "last" ? (currentMusicIndex > 0 ? currentMusicIndex - 1 : playerList.length - 1) : (currentMusicIndex < playerList.length - 1 ? currentMusicIndex + 1 : 0);
    setCurrentMusic(playerList[playMusicIndex]);

    setTimeout(() => {
      musicPlayers.current?.play();
    }, 500);
  };

  const handleRandomPlay = () => {
    console.log(musicPlayers.current?.currentTime, "current time");
    console.log(musicPlayers.current?.duration, "duration");

    console.log(
      Math.round(
        musicPlayers.current?.currentTime && musicPlayers.current?.duration
          ? (100 * musicPlayers.current?.currentTime) /
          musicPlayers.current?.duration
          : 0
      )
    );
    setIsRandomPlay(!isRandomPlay);
  };

  const handleTime = () => {
    setCurrentMusicTime(musicPlayers.current?.currentTime);
    setCurrentDurationTime(musicPlayers.current?.duration);
    setCurrentPlayRadio(
      Math.round(
        musicPlayers.current?.currentTime && musicPlayers.current?.duration
          ? (100 * musicPlayers.current?.currentTime) /
          musicPlayers.current?.duration
          : 0
      )
    );
    console.log(currentPlayRadio, "radio");
  };

  return (
    <main className="absolute bottom-0 w-full h-[100px] bg-gray-800 flex items-center justify-between">
      <aside>music info</aside>
      <section className="w-[850px] flex flex-col items-center">
        <audio
          ref={musicPlayers}
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
          <SkipButton handleSkip={() => handleSkipMusic("last")} forward="last" />
          <PlayerSwitchButton
            handlePlayAndPause={handlePlayAndPause}
            isMusicPlay={isMusicPlay}
          />
          <SkipButton handleSkip={() => handleSkipMusic("next")} forward="next" />
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
          <div className="relative w-[70%] h-[5px] bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 bottom-0 left-0 right-0 bg-gray-200 rounded-full w-[${currentPlayRadio.toString()}%]`}
            ></div>
          </div>
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
