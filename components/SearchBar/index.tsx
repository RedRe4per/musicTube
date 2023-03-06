interface Props {
  page: string;
}

export const SearchBar = ({ page }: Props) => {
  return (
    <div>
      <input
        className={`flex bg-secondary w-[600px] h-[50px] pl-[54px] pt-1.5 rounded-[10px] placeholder:text-h3-light placeholder:text-white-200 ${
          page === "/likedSongs" ? "invert" : ""
        }`}
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
    </div>
  );
};
