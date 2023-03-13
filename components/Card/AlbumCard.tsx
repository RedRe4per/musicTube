import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useHandlePlay from "@/hooks/useHandlePlay";

interface Props {
  albumUrl: string;
  albumName: string;
  artists: string[];
  albumId: number;
}

export const AlbumCard = ({ albumUrl, albumName, artists, albumId }: Props) => {
  const [showPlay, setShowPlay] = useState(false);
  const { handlePlay } = useHandlePlay(albumId);

  return (
    <section className="max-w-[1/8] h-[250px] lg:h-[330px] relative overflow-hidden">
      <Link href={`/album/${albumId}`}>
        <div className="relative">
          <Image
            src={albumUrl}
            alt={albumName}
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
              className={`${showPlay ? "" : "hidden"
                } hover:w-[75px] animate-bounce cursor-pointer`}
              width={70}
              height={70}
              onClick={handlePlay}
            />
          </div>
        </div>
        <section className="absolute max-w-[100%] overflow-hidden">
          <h5 className="text-button-normal text-white-200 mt-[15px] ">
            {albumName}
          </h5>
          <h6 className="text-tag-normal text-gray-400 mt-[7px] ">
            {artists.map((artist, index) => {
              return <span key={index}>{artist}&nbsp;&nbsp;</span>;
            })}
          </h6>
        </section>
      </Link>
    </section>
  );
};
