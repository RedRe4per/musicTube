import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { switchTopPlaylistTag } from "@/utils/switchTopPlaylistTag";
import { useHandlePlay } from "@/hooks/useHandlePlay";
import { useLoading } from "@/hooks/useLoading";

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
  const { handlePlay } = useHandlePlay(playlistId, 0, "playlist");
  const { handleLoading }=useLoading();

  return (
    <section className="max-w-[1/8] h-[200px] lg:h-[335px] relative overflow-hidden rounded-xl p-1 hover:bg-gray-600 hover:shadow-md hover:shadow-white-50 hover:-translate-y-2">
      <Link onClick={handleLoading} href={`/playlist/${playlistId}`}>
        <div className="relative">
          <Image
            src={coverUrl ? coverUrl : "/images/no-image.jpg"}
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
              onClick={handlePlay}
            />
          </div>
        </div>
        <section className="absolute max-w-[100%] overflow-hidden">
          <h5 className="text-tag-normal lg:text-button-normal text-white-200 mt-[15px] ">
            {playlistName}
          </h5>
          <div className="text-tag-normal text-green brightness-90 mt-[7px] hidden lg:block">
            {tags.map((tag, index) => {
              return (
                <span key={index} className="inline-block">
                  {switchTopPlaylistTag(tag)}&nbsp;&nbsp;
                </span>
              );
            })}
          </div>
        </section>
      </Link>
    </section>
  );
};
