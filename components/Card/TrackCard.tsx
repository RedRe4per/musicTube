import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { switchTopPlaylistTag } from "@/utils/switchTopPlaylistTag";
import { useHandlePlay } from "@/hooks/useHandlePlay";
import { useContext } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { ISimilarTrack } from "@/interfaces/music";

interface Props {
  track: ISimilarTrack;
}

export const TrackCard = ({ track }: Props) => {
  const { name, id, album, artists } = track;
  const [showPlay, setShowPlay] = useState(false);
  //   const { handlePlay } = useHandlePlay(playlistId, 0, "playlist");
  const { setIsLoading } = useContext(BgColorContext);
  console.log(track);

  return (
    <section className="w-[110px] lg:w-auto h-[200px] lg:h-[335px] relative overflow-hidden rounded-xl p-2 lg:p-4 bg-gray-650 hover:bg-gray-600 transition-colors duration-500">
      <Link onClick={() => setIsLoading(true)} href={`/track/${id}`}>
        <div className="relative">
          <Image
            src={album.picUrl}
            alt="cover"
            className="object-contain rounded-xl"
            width={190}
            height={190}
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
              } hover:w-[75px] animate-ping cursor-pointer`}
              width={70}
              height={70}
              // onClick={handlePlay}
            />
          </div>
        </div>
        <section className="absolute max-w-[100%] overflow-hidden">
          <h5 className="text-tag-normal lg:text-button-normal text-white-200 mt-[15px] ">
            {name}
          </h5>
          <div className="text-tag-normal brightness-90 mt-[7px] hidden lg:block">
            {artists.map((artist, index) => {
              return (
                <span key={index} className="inline-block">
                  {artist.name}&nbsp;&nbsp;
                </span>
              );
            })}
          </div>
        </section>
      </Link>
    </section>
  );
};
