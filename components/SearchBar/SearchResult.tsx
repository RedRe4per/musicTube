import React from "react";
import { SongItem } from "./SongItem";
import { AlbumItem } from "./AlbumItem";
import { PlaylistItem } from "./PlaylistItem";

interface Props {
  searchResult: any;
}

export const SearchResult = React.memo(({ searchResult }: Props) => {
  console.log(searchResult);
  return (
    <section
      className={`${
        searchResult ? "" : "hidden"
      } absolute min-w-[600px] max-w-[700px] max-h-[70vh] overflow-x-hidden overflow-y-scroll scrollbar bg-gray-800 border-2 border-solid border-gray-400 shadow-lg shadow-gray-400 rounded-lg brightness-150 top-16 left-1/2 transform -translate-x-1/2 z-10`}
    >
      <section className="px-5 py-3 flex flex-col">
        {(!searchResult?.result ||
          !searchResult?.result.songs ||
          !searchResult?.result.albums ||
          !searchResult?.result.playlists ||
          !searchResult?.result.artists) && (
          <h5 className="italic text-h4-light text-gray-200">
            No results found
          </h5>
        )}
        {searchResult?.result &&
          searchResult?.result.songs &&
          searchResult?.result.songs.map((song: any, index: number) => {
            return <SongItem song={song} key={index} />;
          })}
        {searchResult?.result &&
          searchResult?.result.albums &&
          searchResult?.result.albums.map((album: any, index: number) => {
            return <AlbumItem album={album} key={index} />;
          })}
        {searchResult?.result &&
          searchResult?.result.playlists &&
          searchResult?.result.playlists.map((playlist: any, index: number) => {
            return <PlaylistItem playlist={playlist} key={index} />;
          })}
      </section>
    </section>
  );
});
