import React from "react";
import { IAlbumSong } from "@/interfaces/albumSong";
import { SongInfo } from "./SongInfo";

interface Props {
  albumSongs: IAlbumSong[];
}

export const AlbumPlayList = React.memo(({ albumSongs }: Props) => {
  console.log(albumSongs, "album songs");
  return (
    <section className="mx-10 my-10 text-white-50 text-h4-normal ">
      <section className="border-gray-400 border-b">
        <section className="flex mb-4 mx-10">
          <div className="flex-1 flex">
            <h6 className="w-10">#</h6>
            <h6>Title</h6>
          </div>
          <div className="flex-1 flex justify-between">
            <h6>Album</h6>
            <h6>Full time</h6>
          </div>
        </section>
      </section>
      <section className="mt-6">
        {albumSongs.map((song, index) => {
          return <SongInfo key={index} song={song} index={index} />;
        })}
      </section>
    </section>
  );
});
