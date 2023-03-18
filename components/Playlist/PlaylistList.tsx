import { PlaylistCard } from "../Card/PlaylistCard";
import { IPlaylist, IPlaylistList } from "@/interfaces/playlist";
import Link from "next/link";

interface Props {
  title: string;
  playlistList: IPlaylistList;
}

export const PlaylistList = ({ title, playlistList }: Props) => {
  return (
    <section className="ml-3 lg:ml-5 mt-6 overflow-hidden">
      <section className="flex items-center justify-between gap-4">
        <h2 className="ml-1 text-button-light lg:text-h3-normal text-white-200">
          {title}
        </h2>
        <Link className="lg:text-h4-normal mr-4" href={"/"}>
          More
        </Link>
      </section>
      <section className="mt-2 flex gap-4 w-[421vw] sm:w-[310vw] md:w-[270vw] lg:w-[197vw] xl:w-[170vw] 2xl:w-[148vw] custom3xl:w-[135vw]">
        {playlistList.playlists.map((playlist: IPlaylist) => {
          return (
            <PlaylistCard
              key={playlist.id}
              coverUrl={playlist.coverImgUrl}
              playlistName={playlist.name}
              playlistId={playlist.id}
              tags={playlist.tags}
            />
          );
        })}
      </section>
    </section>
  );
};
