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
      } absolute w-[650px] h-[500px] bg-gray-800 border-2 border-solid border-gray-400 shadow-xl shadow-gray-400 rounded-2xl brightness-150 top-16 left-1/2 transform -translate-x-1/2 z-10`}
    >
      <div>121231231231233</div>
    </section>
  );
});
