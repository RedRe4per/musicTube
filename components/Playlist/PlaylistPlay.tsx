import Image from "next/image";
import { useHandlePlay } from "@/hooks/useHandlePlay";
import { useContext } from "react";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";
import { PlayerContext } from "@/contexts/PlayerContext";

interface Props {
  albumId: number;
  trackCount: number;
}

export const PlaylistPlay = ({ albumId, trackCount }: Props) => {
  const { handlePlay } = useHandlePlay(albumId);
  const { isMusicPlay, setIsMusicPlay } = useContext(PlayAndPauseContext);
  const { album } = useContext(PlayerContext);

  const handlePlayClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (album?.id !== albumId) {
      handlePlay(e);
    } else {
      setIsMusicPlay(!isMusicPlay);
    }
  };

  const handlePauseClick = () => {
    setIsMusicPlay(!isMusicPlay);
  };

  return (
    <section className="mt-6 ml-10 flex gap-10">
      <button className="hover:animate-pulse">
        <Image
          onClick={(e) => handlePlayClick(e)}
          className={album?.id !== albumId || isMusicPlay ? "" : "hidden"}
          src="/icons/play-circle-fill.svg"
          alt="play"
          width={100}
          height={100}
        />
        <Image
          onClick={handlePauseClick}
          className={album?.id === albumId && !isMusicPlay ? "" : "hidden"}
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
  );
};
