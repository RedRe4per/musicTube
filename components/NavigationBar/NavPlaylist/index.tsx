import { PlaylistItem } from "./PlaylistItem";

const listItemArray: string[] = [];

export const NavPlaylist = () => {
  return (
    <section className="mt-[40px] ml-[20px] text-white-200">
      <h2 className="text-tag-normal uppercase ml-[20px] text-green">
        Playlists
      </h2>
      <ul className="mt-[20px] flex flex-col gap-[5px]">
        <li className="flex items-center w-[250px] h-[46px] rounded-[10px] bg-gray-600">
          <img src="/icons/plus.svg" alt="plus" className="ml-[20px]" />
          <span className="uppercase ml-[17px] text-button-normal">
            new playlist
          </span>
        </li>
        {listItemArray.map((listItem, index) => {
          return <PlaylistItem key={index} text={listItem} />;
        })}
      </ul>
    </section>
  );
};
