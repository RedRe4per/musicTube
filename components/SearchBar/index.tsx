import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { SearchResult } from "./SearchResult";
import { ISearchResult } from "@/interfaces/searchResult";

interface Props {
  page: string;
}

type SearchType = "Song" | "Album" | "Artist" | "Playlist";
type SearchTypeId = "1" | "10" | "100" | "1000";

export const SearchBar = ({ page }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
  const [searchType, setSearchType] = useState<SearchType>("Song");
  const [searchTypeId, setSearchTypeId] = useState<SearchTypeId>("1");
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [mouseExited, setMouseExited] = useState(false);

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
          `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/cloudsearch?type=${searchTypeId}&keywords=${debouncedSearchTerm}`
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

  const handleOptionClick = (type: SearchType, typeId: SearchTypeId) => {
    setSearchType(type);
    setSearchTypeId(typeId);
  }

  const handleLeaveOption = () => {
    setMouseExited(true);
  }

  const handleClickOutside = () => {
    if (mouseExited) {
      setDisplayDropdown(false);
    }
  };

  const handleClickSelector = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDisplayDropdown(true);
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mouseExited]);

  return (
    <section className="relative ">
      <section className="flex gap-1">
        <div className={`h-[50px] pl-5 pt-3 dropdown-custom ${
            page === "/likedSongs" ? "invert" : ""
          }`}
          onClick={(e)=>handleClickSelector(e)}>{searchType}</div>
        <ul onClick={()=>setDisplayDropdown(false)} onMouseLeave={handleLeaveOption} className={`absolute h-[205px] flex flex-col rounded-br-[10px] rounded-tr-[4px] border-white-50 border-[3px] border-solid dropdown-custom top-[-1px] z-10 ${displayDropdown? "": "hidden"}`}
        >
          <li onClick={()=>handleOptionClick("Song", "1")} className="dropdown-option">Song</li>
          <li onClick={()=>handleOptionClick("Album", "10")} className="dropdown-option">Album</li>
          <li onClick={()=>handleOptionClick("Playlist", "1000")} className="dropdown-option">Playlist</li>
          <li onClick={()=>handleOptionClick("Artist", "100")} className="dropdown-option">Artist</li>
        </ul>
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
          className={`absolute pointer-events-none top-[9px] ml-[92px] w-8 h-8 z-20 ${
            page === "/likedSongs" ? "invert" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 14l-4-4h8z" fill="#C4C4C4" />
        </svg>
        <svg
          className={`absolute top-[10px] ml-[146px] w-[30px] h-[30px] ${
            page === "/likedSongs" ? "invert" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"
            fill="#C4C4C4"
          />
        </svg>
        <SearchResult searchResult={searchResult} />
      </section>
    </section>
  );
};
