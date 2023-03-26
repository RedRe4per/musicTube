import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useHandlePlay } from "@/hooks/useHandlePlay";
import { useLoading } from "@/hooks/useLoading";

interface Props {
  albumUrl: string | null;
  albumName: string;
  artists: string[];
  albumId: number;
}

export const AlbumCard = ({ albumUrl, albumName, artists, albumId }: Props) => {
  const [showPlay, setShowPlay] = useState(false);
  const { handlePlay } = useHandlePlay(albumId);
  const { handleLoading } = useLoading();

  return (
    <section className="bg-gray-650 max-w-[1/8] h-[200px] lg:h-[335px] relative overflow-hidden rounded-xl p-1 hover:bg-gray-600 hover:shadow-md hover:shadow-white-50 hover:-translate-y-2">
      <Link onClick={handleLoading} href={`/album/${albumId}`}>
        <div className="relative">
          <Image
            src={albumUrl ? albumUrl : "/images/no-image.jpg"}
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
              className={`${
                showPlay ? "" : "hidden"
              } hover:w-[75px] animate-bounce cursor-pointer`}
              width={70}
              height={70}
              onClick={handlePlay}
            />
          </div>
        </div>
        <section className="absolute max-w-[100%] overflow-hidden">
          <h3 className="text-tag-normal lg:text-button-normal text-white-200 mt-[15px] ">
            {albumName}
          </h3>
          <h4 className="text-tag-normal text-gray-300 mt-[7px] hidden lg:block">
            {artists.map((artist, index) => {
              return <span key={index}>{artist}&nbsp;&nbsp;</span>;
            })}
          </h4>
        </section>
      </Link>
    </section>
  );
};
