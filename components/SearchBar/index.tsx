import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

interface Props {
  page: string;
}

export const SearchBar = ({ page }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

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
        console.log(data, "result");
      };
      searchRequest();
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section>
      <input
        className={`flex bg-secondary text-white-50 text-h4-normal w-[300px] xl:w-[450px] 2xl:w-[600px] h-[50px] pl-[54px] pt-1.5 rounded-[10px] placeholder:text-h4-light placeholder:text-gray-200 ${
          page === "/likedSongs" ? "invert" : ""
        }`}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onBlur={()=>setSearchTerm("")}
        placeholder="Search"
        autoFocus
      />
      <img
        src="/icons/search.svg"
        alt="search"
        className={`absolute top-[34px] ml-5 ${
          page === "/likedSongs" ? "invert" : ""
        }`}
      />
    </section>
  );
};
