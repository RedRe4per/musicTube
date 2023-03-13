import { AlbumCard } from "@/components/Card/AlbumCard";
import { IAlbum, IAlbumList } from "@/interfaces/album";

interface Props {
  title: string;
  albumList: IAlbumList;
}

export const AlbumList = ({ title, albumList }: Props) => {
  return (
    <section className="ml-6 mt-6">
      {/*overflow-y-hidden*/}
      <h2 className="text-h3-normal text-white-200">{title}</h2>
      <section className="mt-3 flex gap-6 w-[350vw] sm:w-[310vw] md:w-[270vw] lg:w-[220vw] xl:w-[170vw] 2xl:w-[130vw] custom:w-[100vw]">
        {albumList.albumProducts.map((album: IAlbum) => {
          return (
            <AlbumCard
              key={album.albumId}
              albumUrl={album.coverUrl}
              albumName={album.albumName}
              artists={album.artistNames}
              albumId={album.albumId}
            />
          );
        })}
      </section>
    </section>
  );
};
