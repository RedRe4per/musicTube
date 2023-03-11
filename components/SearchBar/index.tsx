interface Props {
  page: string;
}

export const SearchBar = ({ page }: Props) => {
  return (
    <section>
      <input
        className={`flex bg-secondary w-[300px] xl:w-[450px] 2xl:w-[600px] h-[50px] pl-[54px] pt-1.5 rounded-[10px] placeholder:text-h4-light placeholder:text-gray-200 ${
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
    </section>
  );
};
