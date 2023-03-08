import React, { useRef, useState } from "react";
import { formatTime } from "@/utils/formatTime";
import { MusicDetail } from "@/interfaces/music";

interface Props {
  currentMusic: MusicDetail | null;
  isMusicLoop: boolean;
  handleSkipMusic: (param: "next" | "last") => void;
}

export const ProgressBar = React.forwardRef(
  ({ currentMusic, isMusicLoop, handleSkipMusic }: Props, musicPlayer: any) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const [currentPlayRadio, setCurrentPlayRadio] = useState(0);
    const [currentMusicTime, setCurrentMusicTime] = useState<number>(0);
    const [currentDurationTime, setCurrentDurationTime] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number | NodeJS.Timeout>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [showThumb, setShowThumb] = useState(false);

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

    const handleProgress = (e: React.MouseEvent<HTMLDivElement>) => {
      const progressBarRect = progressRef.current?.getBoundingClientRect();
      if (!progressBarRect || !musicPlayer.current!.duration || !musicPlayer.current!.currentTime) return;
      const mouseX = e.clientX - progressBarRect.left;
      const progressWidth = progressBarRect.width;
      const newRatio = (mouseX / progressWidth) * 100;
      setCurrentPlayRadio(newRatio);
      musicPlayer.current!.currentTime =
        musicPlayer.current!.duration * (newRatio / 100);
      setCurrentMusicTime(musicPlayer.current!.duration * (newRatio / 100));
    };

    const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      handleProgress(e);
    }

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
        <div className="w-[800px] h-[10px] flex justify-around items-center my-2">
          <div className="w-[10%] text-center">
            <span>{formatTime(currentMusicTime)}</span>
          </div>
          <div
            className="w-full h-[21px] flex items-center"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleDrag}
            onClick={handleProgress}
            onMouseOver={() => setShowThumb(true)}
            onMouseOut={() => setShowThumb(false)}
          >
            <div
              className="relative w-full bg-gray-600 rounded-full h-[5px]"
              ref={progressRef}
            >
              <div
                className={`bg-gray-200 ${showThumb ? "bg-green" : ""} rounded-full h-[5px]`}
                style={{ width: `${currentPlayRadio}%` }}
              ></div>
              <div
                className={`absolute top-[1px] ${showThumb ? "" : "hidden"} transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full cursor-pointer`}
                style={{ left: `${currentPlayRadio + 0.5}%` }}
              ></div>
            </div>
          </div>
          <div className="w-[10%] text-center">
            <span>{formatTime(currentDurationTime)}</span>
          </div>
        </div>
      </section>
    );
  }
);
