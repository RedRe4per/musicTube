import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ITrack } from "@/interfaces/music";
import { formatDate } from "@/utils/formatTime";
import { useLoading } from "@/hooks/useLoading";

export const TrackInfo = React.memo(
  ({ al, name, ar, pop, publishTime }: Partial<ITrack>) => {
    const { handleLoading } = useLoading();

    return (
      <section className="mt-6 pl-10 pb-5 flex">
        <div className="relative w-[280px] h-[280px]">
          <Image
            src={al!.picUrl}
            alt="picUrl"
            className="rounded-2xl shadow-2xl shadow-gray-650 object-cover"
            width={280}
            height={280}
          />
        </div>
        <section className="ml-10 mt-10 flex flex-col justify-around">
          <section className="flex items-center gap-16 text-h3-normal text-gray-200">
            <span>
              Popularity:&nbsp;
              <span className="text-green">{pop}</span>
            </span>
            <span className="text-h4-normal">
              Published at&nbsp;
              <span>{formatDate(publishTime!)}</span>
            </span>
          </section>
          <h3 className="text-h2-normal text-white-200">{name}</h3>
          <section className="flex justify-between items-center gap-6 text-h3-normal text-gray-200">
            {ar && (
              <h5>
                Artist:{" "}
                {ar.map((artist, index) => {
                  return (
                    <Link
                      onClick={handleLoading}
                      href={`/artist/${artist.id}`}
                      key={index}
                    >
                      <span className="hover:text-green">
                        {artist.name}&nbsp;&nbsp;
                      </span>
                    </Link>
                  );
                })}
              </h5>
            )}
            <Link onClick={handleLoading} href={`/album/${al!.id}`}>
              <span>Album:&nbsp;</span>
              <span className="hover:text-green">{al!.name}</span>
            </Link>
          </section>
        </section>
      </section>
    );
  }
);
