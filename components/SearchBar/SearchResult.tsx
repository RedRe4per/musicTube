import React from "react";

interface Props {
  searchResult: any;
}

export const SearchResult = React.memo(({ searchResult }: Props) => {
  console.log(searchResult);
  return (
    <section
      className={`${
        searchResult ? "" : "hidden"
      } absolute w-[650px] bg-gray-800 border-2 border-solid border-gray-400 shadow-xl shadow-gray-400 rounded-2xl brightness-150 top-16 left-1/2 transform -translate-x-1/2 z-10`}
    >
      <section className="p-5">
        {!searchResult?.songs && <h5 className="italic text-h4-light text-gray-200">No results found</h5>}

      </section>
    </section>
  );
});
