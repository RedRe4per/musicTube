import React from "react";
import { Track } from "@/interfaces/playlist";
import { TrackInfo } from "./TrackInfo";

interface Props {
  playlistSongs: Track[];
  playlistId: number;
  currentPage: number;
}

export const SongList = React.memo(
  ({ playlistSongs, playlistId, currentPage }: Props) => {
    return (
      <section className="mx-10 mt-10 mb-28 text-white-50 text-h4-normal ">
        <section className="border-gray-400 border-b">
          <section className="flex mb-4 ml-3 mr-10">
            <div className="flex-1 flex">
              <h6 className="w-16 flex justify-center items-center">
                <span>#</span>
              </h6>
              <h6>Title</h6>
            </div>
            <div className="flex-1 flex justify-between">
              <h6 className="mx-6">Album</h6>
              <h6>Full time</h6>
            </div>
          </section>
        </section>
        <section className="mt-6">
          {playlistSongs.map((song, index) => {
            return (
              <TrackInfo
                key={index}
                song={song}
                index={index}
                trackId={playlistId}
                currentPage={currentPage}
              />
            );
          })}
        </section>
      </section>
    );
  }
);
