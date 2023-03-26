import React, { useState, useContext } from "react";
import Image from "next/image";
import { Track } from "@/interfaces/playlist";
import { formatTime } from "@/utils/formatTime";
import { useHandlePlay } from "@/hooks/useHandlePlay";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";
import { PlayerContext } from "@/contexts/PlayerContext";
import { useLoading } from "@/hooks/useLoading";
import Link from "next/link";

interface Props {
  song: Track;
  index: number;
  trackId: number;
  currentPage: number;
}

export const TrackInfo = React.memo(
  ({ song, index, trackId, currentPage }: Props) => {
    const { name, al, dt, ar, id } = song;
    const [indexDisplay, setIndexDisplay] = useState<"index" | "play">("index");
    const { handlePlay } = useHandlePlay(
      trackId,
      index,
      "playlist",
      currentPage
    );
    const { isMusicPlay, setIsMusicPlay, currentMusic } =
      useContext(PlayAndPauseContext);
    const { musicListId } = useContext(PlayerContext);
    const { handleLoading } = useLoading();

    const handleHover = (mode: "index" | "play") => {
      setIndexDisplay(mode);
    };

    const handlePlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (musicListId !== trackId || id !== currentMusic?.id) {
        handlePlay(e);
      } else {
        setIsMusicPlay(!isMusicPlay);
      }
    };

    const handlePauseClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsMusicPlay(!isMusicPlay);
    };

    return (
      <section
        onMouseEnter={() => handleHover("play")}
        onMouseLeave={() => handleHover("index")}
        onDoubleClick={handlePlayClick}
        className="flex py-3 pl-3 pr-10 items-center hover:bg-gray-400 rounded-lg"
      >
        <div className="flex-1 flex items-center">
          <section className="w-16 min-w-[64px] flex justify-center items-center">
            <h6
              className={`text-gray-200 ${
                indexDisplay === "play" ||
                (!isMusicPlay && id === currentMusic?.id)
                  ? "hidden"
                  : ""
              }`}
            >
              {(currentPage - 1) * 20 + (index + 1)}
            </h6>
            <div
              className={
                indexDisplay === "index" &&
                !isMusicPlay &&
                id === currentMusic?.id
                  ? ""
                  : "hidden"
              }
            >
              <svg
                className="animate-spin brightness-150"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M13 9.17A3 3 0 1 0 15 12V2.458c4.057 1.274 7 5.064 7 9.542 0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2c.337 0 .671.017 1 .05v7.12z"
                  fill="#1DB954"
                />
              </svg>
            </div>
            <div
              onClick={handlePlayClick}
              className={
                indexDisplay === "index" ||
                (!isMusicPlay && id === currentMusic?.id)
                  ? "hidden"
                  : ""
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M7.752 5.439l10.508 6.13a.5.5 0 0 1 0 .863l-10.508 6.13A.5.5 0 0 1 7 18.128V5.871a.5.5 0 0 1 .752-.432z"
                  fill="#ffffff"
                />
              </svg>
            </div>
            <div
              onClick={(e) => handlePauseClick(e)}
              className={
                indexDisplay === "play" &&
                !isMusicPlay &&
                id === currentMusic?.id
                  ? ""
                  : "hidden"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M15 7a1 1 0 0 1 2 0v10a1 1 0 1 1-2 0V7zM7 7a1 1 0 1 1 2 0v10a1 1 0 1 1-2 0V7z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </section>
          <section className="flex gap-4">
            <div className="min-w-[50px] min-h-[50px] flex items-center">
              <Image
                className="rounded-sm w-[50px] h-[50px] object-cover"
                src={al.picUrl ? al.picUrl : "/images/no-image.jpg"}
                alt="cover"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-2 overflow-hidden">
              <Link
                className="hover:underline"
                onClick={handleLoading}
                href={`/track/${id}`}
                aria-label="Link to track in certain id"
              >
                <div
                  className={
                    id === currentMusic?.id
                      ? "text-green brightness-150"
                      : "text-white-200"
                  }
                >
                  {name}
                </div>
              </Link>
              <div className="text-gray-200 text-tag-light">
                {ar.map((artist, index) => {
                  return (
                    <Link
                      onClick={handleLoading}
                      href={`/artist/${artist.id}`}
                      key={index}
                    >
                      <span className="hover:underline">{artist.name}</span>
                      &nbsp;&nbsp;
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
        <div className="flex-1 flex justify-between text-gray-200">
          <Link onClick={handleLoading} href={`/album/${al.id}`}>
            <h6 className="hover:text-gray-100 hover:underline brightness-125 text-h4-light mx-6">
              {al.name}
            </h6>
          </Link>
          <h6 className="w-20">{formatTime(dt / 1000)}</h6>
        </div>
      </section>
    );
  }
);
