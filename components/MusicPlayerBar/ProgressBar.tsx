import React, { useState } from "react";
import { formatTime } from "@/utils/formatTime";
import { MusicDetail } from "@/interfaces/music";

interface Props {
  currentMusic: MusicDetail | null;
  isMusicLoop: boolean;
  handleSkipMusic: (param: "next" | "last") => void;
}

export const ProgressBar = React.forwardRef(
  ({ currentMusic, isMusicLoop, handleSkipMusic }: Props, musicPlayer: any) => {
    //React.ForwardedRef<HTMLAudioElement>
    const [currentPlayRadio, setCurrentPlayRadio] = useState(0);
    const [currentMusicTime, setCurrentMusicTime] = useState<number>(0);
    const [currentDurationTime, setCurrentDurationTime] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number | NodeJS.Timeout>(0);

    const handlePlay = () => {
      setIntervalId(
        setInterval(() => {
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
        }, 1000)
      );
    };

    const handleEnd = () => {
      handleSkipMusic("next");
      clearInterval(intervalId);
    };

    const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPlayRadio(+e.target.value);
      musicPlayer.current!.currentTime =
        musicPlayer.current!.duration * (+e.target.value / 100);
    };

    return (
      <section>
        <audio
          ref={musicPlayer}
          src={currentMusic?.url}
          loop={isMusicLoop}
          onPlay={handlePlay}
          onPause={() => {
            clearInterval(intervalId);
          }}
          onEnded={handleEnd}
        />
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
    );
  }
);
