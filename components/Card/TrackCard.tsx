import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useHandlePlay } from "@/hooks/useHandlePlay";
import { useContext } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { CardTrack } from "@/interfaces/playlist";
import { useTrackFinder } from "@/hooks/useTrackFinder";

interface Props {
  track: CardTrack;
}

export const TrackCard = ({ track }: Props) => {
  const { name, id, album, artists } = track;
  const [songIndex, setSongIndex] = useState(0);
  const [playDisabled, setPlayDisabled] = useState(true);
  const [showPlay, setShowPlay] = useState(false);
  const { handlePlay } = useHandlePlay(album.id, songIndex);
  const { setIsLoading } = useContext(BgColorContext);

  useTrackFinder(album.id, track.id, setSongIndex, setPlayDisabled);

  const handlePlayClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (playDisabled) return;
    handlePlay(e);
  };

  return (
    <section className="w-[110px] lg:w-auto h-[200px] lg:h-[335px] relative overflow-hidden rounded-xl p-2 lg:p-4 bg-gray-650 hover:bg-gray-600 transition-colors duration-500">
      <Link onClick={() => setIsLoading(true)} href={`/track/${id}`}>
        <div className="relative w-[94px] lg:w-[190px] h-[94px] lg:h-[190px]">
          <Image
            src={album.picUrl}
            alt="cover"
            className="object-cover rounded-xl"
            fill
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
              onClick={handlePlayClick}
            />
          </div>
        </div>
        <section className="absolute max-w-[100%] overflow-hidden">
          <h5 className="text-tag-normal lg:text-button-normal text-white-200 mt-[15px] ">
            {name}
          </h5>
          <div className="text-tag-normal brightness-90 mt-[7px] hidden lg:block">
            {artists.map((artist) => {
              return (
                <span key={artist.id} className="inline-block">
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
