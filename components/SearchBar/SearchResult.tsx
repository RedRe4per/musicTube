import React from "react";
import { ResultItem } from "./ResultItem";

interface Props {
  searchResult: any;
}

export const SearchResult = React.memo(({ searchResult }: Props) => {
  console.log(searchResult);
  return (
    <section
      className={`${
        searchResult ? "" : "hidden"
      } absolute w-[650px] max-h-[70vh] overflow-x-hidden overflow-y-scroll scrollbar bg-gray-800 border-2 border-solid border-gray-400 shadow-xl shadow-gray-400 rounded-lg brightness-150 top-16 left-1/2 transform -translate-x-1/2 z-10`}
    >
      <section className="px-5 py-3 flex flex-col">
        {!searchResult?.result && (
          <h5 className="italic text-h4-light text-gray-200">
            No results found
          </h5>
        )}
        {searchResult?.result &&
          searchResult?.result.songs.map((song: any, index: number) => {
            return <ResultItem song={song} key={index} />;
          })}
      </section>
    </section>
  );
});
