import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useHandlePlay } from "@/hooks/useHandlePlay";

interface Props {
  coverUrl: string;
  playlistName: string;
  playlistId: number;
  tags: string[];
}

export const PlaylistCard = ({
  coverUrl,
  playlistName,
  playlistId,
  tags,
}: Props) => {
  const [showPlay, setShowPlay] = useState(false);
  // const { handlePlay } = useHandlePlay(albumId);

  const handlePlayPlaylist = () => {};

  return (
    <section className="max-w-[1/8] h-[250px] lg:h-[335px] relative overflow-hidden rounded-xl p-1 hover:bg-gray-600 hover:shadow-md hover:shadow-white-50 hover:-translate-y-2">
      <Link href={`/playlist/${playlistId}`}>
        <div className="relative">
          <Image
            src={coverUrl}
            alt={playlistName}
            className="object-contain rounded-xl"
            width={200}
            height={200}
          />
          <div
            onMouseEnter={() => setShowPlay(true)}
            onMouseLeave={() => setShowPlay(false)}
            className="absolute top-0 left-0 w-full h-full hover:bg-gray-300 opacity-50 rounded-xl flex items-center justify-center"
          >
            <Image
              src="/icons/play-in-image.svg"
              alt="play"
              className={`${
                showPlay ? "" : "hidden"
              } hover:w-[75px] animate-bounce cursor-pointer`}
              width={70}
              height={70}
              onClick={handlePlayPlaylist}
            />
          </div>
        </div>
        <section className="absolute max-w-[100%] overflow-hidden">
          <h5 className="text-button-normal text-white-200 mt-[15px] ">
            {playlistName}
          </h5>
          <h6 className="text-tag-normal text-gray-400 mt-[7px] ">
            {tags.map((tag, index) => {
              return <span key={index}>{tag}&nbsp;&nbsp;</span>;
            })}
          </h6>
        </section>
      </Link>
    </section>
  );
};
