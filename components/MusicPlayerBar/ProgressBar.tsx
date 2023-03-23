import React, { useRef, useState } from "react";
import { IMusicDetail } from "@/interfaces/music";
import { formatTime } from "@/utils/formatTime";
import { getRatio, getDraggingRatio } from "@/utils/radioCalc";
import { httpFormatter } from "@/utils/httpFormatter";
import {
  useGlobalListener,
  removeGlobalListener,
} from "@/hooks/useGlobalListener";

interface Props {
  currentMusic: IMusicDetail | null;
  isMusicLoop: boolean;
  setIsMusicPlay: (param: boolean) => void;
  handleSkipMusic: (param: "next" | "last") => void;
}

export const ProgressBar = React.forwardRef(
  (
    { currentMusic, isMusicLoop, setIsMusicPlay, handleSkipMusic }: Props,
    musicPlayer: any
  ) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const [currentPlayRadio, setCurrentPlayRadio] = useState(0);
    const [currentMusicTime, setCurrentMusicTime] = useState(0);
    const [currentDurationTime, setCurrentDurationTime] = useState(0);
    const [intervalId, setIntervalId] = useState<number | NodeJS.Timeout>(0);
    const [showThumb, setShowThumb] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [cachedRatio, setCachedRatio] = useState<number>(0);
    const CachedRatioRef = useRef<number>(cachedRatio);
    const [draggingMode, setDraggingMode] = useState(false);
    const [clickRatioCache, setClickRatioCache] = useState(0);
    const draggingModeRef = useRef<boolean>(draggingMode);

    const handlePlay = () => {
      clearInterval(intervalId);
      setIntervalId(
        setInterval(() => {
          setCurrentMusicTime(musicPlayer.current?.currentTime);
          setCurrentDurationTime(musicPlayer.current?.duration);
          setCurrentPlayRadio(getRatio(musicPlayer));
        }, 200)
      );
    };

    const handleEnd = () => {
      handleSkipMusic("next");
      clearInterval(intervalId);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setDraggingMode(() => {
        draggingModeRef.current = true;
        return true;
      });
      handleProgress(e);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (draggingModeRef.current) {
        musicPlayer.current!.currentTime = CachedRatioRef.current;
      } else {
        musicPlayer.current!.currentTime =
          (musicPlayer.current!.duration * clickRatioCache) / 100;
        setCurrentPlayRadio(clickRatioCache);
        setCurrentMusicTime(
          (musicPlayer.current!.duration * clickRatioCache) / 100
        );
      }
      setDraggingMode(() => {
        draggingModeRef.current = false;
        return false;
      });
      removeGlobalListener(handleMouseMove, handleMouseUp);
      setIsMusicPlay(false);
      handlePlay();
    };

    const handleMouseDown = (
      e: React.MouseEvent<HTMLDivElement> | MouseEvent
    ) => {
      const progressBarRect = progressRef.current?.getBoundingClientRect();
      if (!progressBarRect) return;
      const clickRatio = getDraggingRatio(e, progressBarRect);
      setClickRatioCache(clickRatio);

      e.preventDefault();
      setIsDragging(true);
      clearInterval(intervalId);
    };

    const handleProgress = (e: MouseEvent) => {
      const progressBarRect = progressRef.current?.getBoundingClientRect();
      const currentTime = musicPlayer.current!.currentTime;
      const duration = musicPlayer.current!.duration;
      if (!progressBarRect || !currentTime || !duration) return;

      const newRatio = getDraggingRatio(e, progressBarRect);
      setCurrentPlayRadio(newRatio);
      setCurrentMusicTime((duration * newRatio) / 100);
      setCachedRatio(() => {
        CachedRatioRef.current = (duration * newRatio) / 100;
        return (duration * newRatio) / 100;
      });
    };

    useGlobalListener(isDragging, handleMouseMove, handleMouseUp);

    return (
      <section>
        <audio
          ref={musicPlayer}
          src={currentMusic ? httpFormatter(currentMusic!.url) : undefined}
          loop={isMusicLoop}
          onPlay={handlePlay}
          onPause={() => {
            clearInterval(intervalId);
          }}
          onEnded={handleEnd}
        />
        <section className="w-[65vw] lg:w-[400px] xl:w-[600px] 2xl:w-[800px] h-[10px] flex justify-around items-center my-2 gap-1">
          <div className="lg:w-[10%] text-center">
            <span>{formatTime(currentMusicTime)}</span>
          </div>
          <div
            className="w-[76%] h-[21px] flex items-center"
            onMouseOver={() => setShowThumb(true)}
            onMouseOut={() => setShowThumb(false)}
            onMouseDown={handleMouseDown}
          >
            <div
              className="relative w-full bg-gray-600 rounded-full h-[5px]"
              ref={progressRef}
            >
              <div
                className={`bg-gray-200 ${
                  showThumb ? "bg-green" : ""
                } rounded-full h-[5px]`}
                style={{ width: `${currentPlayRadio}%` }}
              ></div>
              <div
                className={`absolute top-[1px] ${
                  showThumb ? "" : "hidden"
                } transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full cursor-pointer`}
                style={{ left: `${currentPlayRadio + 0.5}%` }}
              ></div>
            </div>
          </div>
          <div className="lg:w-[10%] text-center">
            <span>{formatTime(currentDurationTime)}</span>
          </div>
        </section>
      </section>
    );
  }
);
