import { useState, useContext, useEffect } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";
import { SkipButton } from "./SkipButton";
import { SequenceButton } from "./SequenceButton";
import { PlayerSwitchButton } from "./PlayerSwitchButton";
import { ProgressBar } from "./ProgressBar";
import { MusicInfo } from "./MusicInfo";
import { VolumeBar } from "./VolumeBar";
import { LyricsContext } from "@/contexts/LyricsContext";
import { getSkipIndex } from "@/utils/getSkipIndex";
import { useListRandomizer } from "@/hooks/useListRandomizer";

export const MusicPlayerBar = () => {
  const { playerList, setPlayerList } = useContext(PlayerContext);
  const {
    isMusicPlay,
    setIsMusicPlay,
    currentMusic,
    setCurrentMusic,
    isRandomPlay,
    setIsRandomPlay,
  } = useContext(PlayAndPauseContext);
  const { musicPlayer } = useContext(LyricsContext);
  const { handleListRandomizer, handleListSequence } = useListRandomizer();
  const [isMusicLoop, setIsMusicLoop] = useState(false);

  const handleCanPlayThrough = () => {
    musicPlayer.current?.play();
  };

  useEffect(() => {
    if (
      playerList.length > 0 &&
      musicPlayer &&
      playerList[0].id !== currentMusic?.id
    ) {
      musicPlayer.current?.pause();
      setCurrentMusic(playerList[0]);
      setIsMusicPlay(false);
      musicPlayer.current?.addEventListener(
        "canplaythrough",
        handleCanPlayThrough
      );
    }
  }, [playerList]);

  useEffect(() => {
    isMusicPlay ? musicPlayer.current?.pause() : musicPlayer.current?.play();
  }, [isMusicPlay]);

  const handlePlayAndPause = () => {
    if (currentMusic) setIsMusicPlay(!isMusicPlay);
  };

  const handleSkipMusic = (forward: "last" | "next") => {
    if (!currentMusic) return;
    const skipIndex = getSkipIndex(currentMusic, forward, playerList);

    setCurrentMusic(playerList[skipIndex]);
    setIsMusicPlay(false);
    setTimeout(() => {
      musicPlayer.current?.play();
    }, 500);
  };

  const handleRandomPlay = () => {
    if (!isRandomPlay) {
      handleListRandomizer();
    } else {
      handleListSequence();
    }
    setIsRandomPlay(!isRandomPlay);
  };

  return (
    <main className="absolute bottom-0 w-full h-[100px] bg-gray-800 flex items-center justify-between shadow-inner shadow-gray-400">
      <MusicInfo music={currentMusic} />
      <section className="w-[70%] mr-6 lg:mr-0 lg:w-[46%] flex flex-col items-center">
        <section className="flex gap-4 lg:gap-[40px] items-center fill-gray-200">
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
        </section>
        <ProgressBar
          currentMusic={currentMusic}
          isMusicLoop={isMusicLoop}
          playerList={playerList}
          setPlayerList={setPlayerList}
          setIsMusicPlay={setIsMusicPlay}
          handleSkipMusic={handleSkipMusic}
          ref={musicPlayer}
        />
      </section>
      <VolumeBar ref={musicPlayer} />
    </main>
  );
};
