import Image from "next/image";
import { PlaylistItem } from "./PlaylistItem";

const listItemArray = ["*", "Chill", "Lofi"];

export const NavPlaylist = () => {
    return (
        <section className="mt-[40px] ml-[20px] text-white-200 text-gray-200 text-mix-blend-hard-light">
            <h5 className="text-tag-normal uppercase ml-[20px]">Playlists</h5>
            <ul className="mt-[20px] flex flex-col gap-[5px]">
                <li className="flex items-center w-[250px] h-[46px] rounded-[10px] bg-gray-600">
                    <Image
                        src="/icons/plus.svg"
                        alt="plus"
                        className="ml-[20px]"
                        width={19}
                        height={19}
                    />
                    <span className="uppercase ml-[17px]">new playlist</span>
                </li>
                {listItemArray.map((listItem) => {
                    return <PlaylistItem key={listItem} text={listItem} />;
                })}
            </ul>
        </section>
    );
};
