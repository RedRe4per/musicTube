import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { SearchResult } from "./SearchResult";

interface Props {
  page: string;
}

export const SearchBar = ({ page }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);

  useEffect(() => {
    const debouncedSearch = debounce((term) => {
      setDebouncedSearchTerm(term);
    }, 400);
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchRequest = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/cloudsearch?keywords=${debouncedSearchTerm}`
        );
        const data = await response.json();
        setSearchResult(data);
      };
      searchRequest();
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSearchTerm("");
      setSearchResult(null);
    }, 200);
  };

  return (
    <section className="relative ">
      <section className="flex gap-1">
        <select
          name=""
          id=""
          className={`bg-secondary custom-select pl-5 cursor-pointer text-gray-200 text-h4-normal w-[130px] h-[50px] rounded-tl-[10px] rounded-bl-[10px] ${
            page === "/likedSongs" ? "invert" : ""
          }`}
        >
          <option selected>Songs</option>
          <option>Album</option>
          <option>Playlist</option>
          <option>Artist</option>
        </select>
        <input
          className={`flex bg-secondary text-white-50 text-h4-normal w-[350px] xl:w-[450px] 2xl:w-[550px] h-[50px] pl-[54px] rounded-tr-[10px] rounded-br-[10px] placeholder:text-h4-normal placeholder:text-gray-200 ${
            page === "/likedSongs" ? "invert" : ""
          }`}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Search"
          autoFocus
        />

        <svg
          className={`absolute pointer-events-none top-[9px] ml-[92px] w-8 h-8 ${
            page === "/likedSongs" ? "invert" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 14l-4-4h8z" fill="#C4C4C4" />
        </svg>
        <img
          src="/icons/search.svg"
          alt="search"
          className={`absolute top-[14px] ml-[150px] ${
            page === "/likedSongs" ? "invert" : ""
          }`}
        />
        <SearchResult searchResult={searchResult} />
      </section>
    </section>
  );
};
