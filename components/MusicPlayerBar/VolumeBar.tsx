import React, { useState, useRef, useEffect } from "react";
import { getDraggingRatio } from "@/utils/radioCalc";
import {
  useGlobalListener,
  removeGlobalListener,
} from "@/hooks/useGlobalListener";
import Link from "next/link";
import { useRouter } from "next/router";

export const VolumeBar = React.forwardRef((_, musicPlayer: any) => {
  const volumeRef = useRef<HTMLDivElement>(null);
  const [showThumb, setShowThumb] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [volumeBarRatio, setVolumeBarRatio] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    musicPlayer.current.muted = isMuted;
  }, [isMuted]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const volumeBarRect = volumeRef.current?.getBoundingClientRect();
    if (!volumeBarRect) return;
    musicPlayer.current.volume = getDraggingRatio(e, volumeBarRect) / 100;
    setVolumeBarRatio(musicPlayer.current.volume * 100);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    removeGlobalListener(handleMouseMove, handleMouseUp);
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | MouseEvent
  ) => {
    e.preventDefault();
    const volumeBarRect = volumeRef.current?.getBoundingClientRect();
    if (!volumeBarRect) return;
    musicPlayer.current.volume = getDraggingRatio(e, volumeBarRect) / 100;
    setVolumeBarRatio(musicPlayer.current.volume * 100);
    setIsDragging(true);
    setIsMuted(false);
  };

  useGlobalListener(isDragging, handleMouseMove, handleMouseUp);

  const handleQueuePageSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (router.asPath === "/queue") {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <aside className="w-[27%] hidden lg:flex justify-end">
      <section className="flex items-center justify-around md:w-[180px] xl:w-[250px]">
        <Link
          href="/queue"
          onClick={handleQueuePageSwitch}
          aria-label="queue page switch"
        >
          <div className="w-[42px]">
            <svg
              className={`play-bar-btn ${
                router.asPath === "/queue" ? "fill-green" : "fill-gray-200"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M2 18h10v2H2v-2zm0-7h14v2H2v-2zm0-7h20v2H2V4zm17 11.17V9h5v2h-3v7a3 3 0 1 1-2-2.83zM18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
          </div>
        </Link>
        <section className="flex items-center justify-between gap-2 w-[60%]">
          <div onClick={() => setIsMuted(!isMuted)}>
            <img
              src={
                volumeBarRatio <= 0.1 || isMuted
                  ? "/icons/volume-mute-fill.svg"
                  : volumeBarRatio < 50
                  ? "/icons/volume-down-fill.svg"
                  : "/icons/volume-up-fill.svg"
              }
              alt="volume"
            />
          </div>
          <div
            className="w-[70%] h-[21px] mr-5 flex items-center"
            onMouseOver={() => setShowThumb(true)}
            onMouseOut={() => setShowThumb(false)}
            onMouseDown={handleMouseDown}
          >
            <div
              className="relative w-full bg-gray-600 rounded-full h-[5px]"
              ref={volumeRef}
            >
              <div
                className={`bg-gray-200 ${
                  showThumb ? "bg-green" : ""
                } rounded-full h-[5px] ${isMuted ? "hidden" : ""}`}
                style={{
                  width: `${volumeBarRatio > 0.1 ? volumeBarRatio : 0}%`,
                }}
              ></div>
              <div
                className={`absolute top-[1px] ${
                  showThumb ? "" : "hidden"
                } transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full cursor-pointer ${
                  isMuted ? "hidden" : ""
                }`}
                style={{ left: `${volumeBarRatio}%` }}
              ></div>
            </div>
          </div>
        </section>
      </section>
    </aside>
  );
});
