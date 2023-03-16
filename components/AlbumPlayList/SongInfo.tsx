import React from "react";
import { IAlbumSong } from "@/interfaces/albumSong";
import { formatTime } from "@/utils/formatTime";

interface Props {
  song: IAlbumSong;
  index: number;
}

export const SongInfo = React.memo(({ song, index }: Props) => {
  const { name, al, dt, ar } = song;
  return (
    <section className="flex py-3 px-10 items-center hover:bg-gray-400 rounded-lg">
      <div className="flex-1 flex items-center">
        <h6 className="w-10 text-gray-200">{index}</h6>
        <div className="flex flex-col gap-2">
          <div>{name}</div>
          <div className="text-gray-200 text-tag-light">
            {ar.map((artist, index) => {
              return <span key={index}>{artist.name}&nbsp;&nbsp;</span>;
            })}
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-between text-gray-200">
        <h6 className="text-h4-light">{al.name}</h6>
        <h6>{formatTime(dt / 1000)}</h6>
      </div>
    </section>
  );
});
