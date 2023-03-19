import React from "react";
import { SongItem } from "./SongItem";
import { AlbumItem } from "./AlbumItem";
import { PlaylistItem } from "./PlaylistItem";
import { ArtistItem } from "./ArtistItem";

interface ComponentMap {
  [key: string]: React.FC;
}

const COMPONENTS_MAP: ComponentMap = {
  song: SongItem,
  album: AlbumItem,
  playlist: PlaylistItem,
  artist: ArtistItem,
};

const keysToCheck = ['songs', 'albums', 'playlists', 'artists'];

interface Props {
  searchResult: any;
}

export const SearchResult = React.memo(({ searchResult }: Props) => {
  return (
    <section
      className={`${
        searchResult ? "" : "hidden"
      } absolute min-w-[600px] max-w-[700px] max-h-[70vh] overflow-x-hidden overflow-y-scroll scrollbar bg-gray-800 border-2 border-solid border-gray-400 shadow-lg shadow-gray-400 rounded-lg brightness-150 top-16 left-1/2 transform -translate-x-1/2 z-10`}
    >
      <section className="px-5 py-3 flex flex-col">
        {(!searchResult?.result || !Object.keys(searchResult.result).some(key => keysToCheck.includes(key)))
           && (
          <h5 className="italic text-h4-light text-gray-200">
            No results found
          </h5>
        )}

        {Object.keys(COMPONENTS_MAP).map((type) => {
          if (
            searchResult?.result &&
            searchResult?.result[type + "s"] &&
            searchResult?.result[type + "s"].length > 0
          ) {
            const Component = COMPONENTS_MAP[type];
            return searchResult.result[type + "s"].map(
              (item: any, index: number) => (
                <Component key={index} {...{ [type]: item }} />
              )
            );
          }
        })}
      </section>
    </section>
  );
});
