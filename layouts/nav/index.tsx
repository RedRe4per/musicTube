import { useState } from "react";

export const Nav = () => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const handlePage = (index: number) => {
    setActivePageIndex(index);
  };

  return (
    <main className="w-[330px] bg-gray-800">
      <section className="text-h3-light mt-[50px] flex flex-col gap-[7px]">
        <div
          className={`nav-title ${
            activePageIndex === 1
              ? "bg-green bg-opacity-15"
              : "hover:bg-gray-600"
          }`}
          onClick={() => handlePage(1)}
        >
          <h3 className="ml-[82px] pt-[14px]">Home</h3>
        </div>
        <div
          className={`nav-title ${
            activePageIndex === 2
              ? "bg-green bg-opacity-15"
              : "hover:bg-gray-600"
          }`}
          onClick={() => handlePage(2)}
        >
          <h3 className="ml-[82px] pt-[14px]">Browse</h3>
        </div>
        <div
          className={`nav-title ${
            activePageIndex === 3
              ? "bg-green bg-opacity-15"
              : "hover:bg-gray-600"
          }`}
          onClick={() => handlePage(3)}
        >
          <h3 className="ml-[82px] pt-[14px]">Liked songs</h3>
        </div>
      </section>
      <section className="mt-[37px] ml-[40px] text-gray-200">
        <span className="text-tag-normal uppercase">Your library</span>
        <ul className="text-h3-bold flex flex-col gap-[20px] mt-[17px]">
          <li>Made for you</li>
          <li>Recent player</li>
          <li>Albums</li>
          <li>Artists</li>
          <li>Local files</li>
          <li>Podcasts</li>
        </ul>
      </section>
    </main>
  );
};
