import Image from "next/image";
import React from "react";
import { IArtist } from "@/interfaces/artist";

export const ArtistInfo = React.memo(
  ({ name, picUrl, musicSize, albumSize }: Partial<IArtist>) => {
    return (
      <section className="mt-6 pl-10 pb-5 flex gap-8">
        <div className="relative w-[280px] h-[280px]">
          <Image
            src={picUrl!}
            alt="picUrl"
            className="rounded-full shadow-2xl shadow-gray-650 object-cover"
            width={280}
            height={280}
          />
        </div>
        <section className="ml-10 mt-10 flex flex-col justify-around">
          <h3 className="text-h2-normal text-white-200">{name}</h3>
          <section className="flex justify-between items-center gap-6 text-h3-normal text-gray-200">
            <div>
              <span>music:&nbsp;</span>
              <span className="hover:text-green">{musicSize}</span>
            </div>
            <div>
              <span>Album:&nbsp;</span>
              <span className="hover:text-green">{albumSize}</span>
            </div>
          </section>
        </section>
      </section>
    );
  }
);
