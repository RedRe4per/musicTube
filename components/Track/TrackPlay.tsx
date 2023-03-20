import Image from "next/image";
import { useHandlePlay } from "@/hooks/useHandlePlay";
import { useContext, useEffect, useState } from "react";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";
import { formatTime } from "@/utils/formatTime";
import { IAlbumSong } from "@/interfaces/albumSong";

interface Props {
  trackId: number;
  album: {
    id: number;
  };
  duration: number;
}

export const TrackPlay = ({ trackId, album, duration }: Props) => {
  const [songIndex, setSongIndex] = useState(0);
  const [playDisabled, setPlayDisabled] = useState(true);
  const { handlePlay } = useHandlePlay(album.id, songIndex);
  const { isMusicPlay, setIsMusicPlay, currentMusic } =
    useContext(PlayAndPauseContext);

  useEffect(() => {
    const getTrackIndex = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${album.id}`
      );
      const albumData = await response.json();
      const index = albumData.songs.findIndex(
        (song: IAlbumSong) => song.id === trackId
      );
      setSongIndex(index);
      setPlayDisabled(false);
    };
    getTrackIndex();
  }, []);

  const handlePlayClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (playDisabled) return;
    if (currentMusic?.id !== trackId) {
      handlePlay(e);
    } else {
      setIsMusicPlay(!isMusicPlay);
    }
  };

  const handlePauseClick = () => {
    setIsMusicPlay(!isMusicPlay);
  };

  return (
    <section className="mt-6 ml-10 flex gap-20 items-center">
      <section className="flex gap-10">
        <button className="hover:animate-pulse">
          <Image
            onClick={(e) => handlePlayClick(e)}
            className={
              currentMusic?.id !== trackId || isMusicPlay ? "" : "hidden"
            }
            src="/icons/play-circle-fill.svg"
            alt="play"
            width={100}
            height={100}
          />
          <Image
            onClick={handlePauseClick}
            className={
              currentMusic?.id === trackId && !isMusicPlay ? "" : "hidden"
            }
            src="/icons/pause-circle-fill.svg"
            alt="play"
            width={100}
            height={100}
          />
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="52"
            height="52"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path
              d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
              fill="#1DB954"
            />
          </svg>
        </button>
      </section>
      <section className="flex items-center gap-2 mr-10">
        <svg
          className="w-[48px] h-[48px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
            fill="#F1F1F1"
          />
        </svg>
        <span className="mt-1 text-h3-normal text-gray-200">
          {formatTime(duration / 1000)}
        </span>
      </section>
    </section>
  );
};
