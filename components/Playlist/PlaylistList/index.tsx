import { PlaylistCard } from "../../Card/PlaylistCard";
import { IPlaylist, IPlaylistList } from "@/interfaces/playlist";

interface Props {
  title: string;
  playlistList: IPlaylistList;
}

export const PlaylistList = ({ title, playlistList }: Props) => {
  return (
    <section className="ml-5 mt-6">
      {/*overflow-y-hidden*/}
      <h2 className="ml-1 text-h3-normal text-white-200">{title}</h2>
      <section className="mt-2 flex gap-4 w-[350vw] sm:w-[310vw] md:w-[270vw] lg:w-[220vw] xl:w-[170vw] 2xl:w-[130vw] custom:w-[100vw]">
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
