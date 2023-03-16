import React, { useState } from "react";
import { IAlbumSong } from "@/interfaces/albumSong";
import { formatTime } from "@/utils/formatTime";

interface Props {
  song: IAlbumSong;
  index: number;
}

export const SongInfo = React.memo(({ song, index }: Props) => {
  const { name, al, dt, ar } = song;
  const [indexDisplay, setIndexDisplay] = useState<"index" | "play">("index");

  const handleHover = (mode: "index" | "play") => {
    setIndexDisplay(mode);
  };

  return (
    <section
      onMouseEnter={() => handleHover("play")}
      onMouseLeave={() => handleHover("index")}
      className="flex py-3 pl-3 pr-10 items-center hover:bg-gray-400 rounded-lg"
    >
      <div className="flex-1 flex items-center">
        <section className="w-16 flex justify-center items-center">
          <h6
            className="text-gray-200"
            style={{ display: indexDisplay === "play" ? "none" : "" }}
          >
            {index}
          </h6>
          <svg
            style={{ display: indexDisplay === "index" ? "none" : "" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M7.752 5.439l10.508 6.13a.5.5 0 0 1 0 .863l-10.508 6.13A.5.5 0 0 1 7 18.128V5.871a.5.5 0 0 1 .752-.432z"
              fill="#ffffff"
            />
          </svg>
        </section>
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
