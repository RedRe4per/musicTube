import { MusicDetail } from "@/interfaces/music";
import { useState, useRef, useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";
import { SkipButton } from "./SkipButton";
import { SequenceButton } from "./SequenceButton";
import { PlayerSwitchButton } from "./PlayerSwitchButton";
import { ProgressBar } from "./ProgressBar";
import { VolumeBar } from "./VolumeBar";

export const MusicPlayerBar = () => {
  const { playerList } = useContext(PlayerContext);
  const musicPlayer = useRef<HTMLAudioElement>(null);
  const [isMusicPlay, setIsMusicPlay] = useState(false);
  const [isMusicLoop, setIsMusicLoop] = useState(false);
  const [isRandomPlay, setIsRandomPlay] = useState(false);
  const [currentMusic, setCurrentMusic] = useState<MusicDetail | null>(
    playerList[0]
  );

  const handlePlayAndPause = () => {
    setIsMusicPlay(!isMusicPlay);
    isMusicPlay ? musicPlayer.current?.play() : musicPlayer.current?.pause();
  };

  const handleSkipMusic = (forward: "last" | "next") => {
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
  };

  const handleRandomPlay = () => {
    setIsRandomPlay(!isRandomPlay);
  };

  return (
    <main className="absolute bottom-0 w-full h-[100px] bg-gray-800 flex items-center justify-between">
      <aside>music info</aside>
      <section className="w-[800px] flex flex-col items-center">
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
        <ProgressBar
          currentMusic={currentMusic}
          isMusicLoop={isMusicLoop}
          handleSkipMusic={handleSkipMusic}
          ref={musicPlayer}
        />
      </section>
      <VolumeBar playList={playerList} ref={musicPlayer} />
      {/* https://music-server-6orvdb931-redre4per.vercel.app/song/detail?ids=347230获取歌曲详情。有名字，图，歌手名 */}
    </main>
  );
};
