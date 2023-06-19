import { GetServerSidePropsContext } from "next";
import { useContext, useEffect, useRef } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { PlaylistCard } from "@/components/Card/PlaylistCard";
import { AlbumCard } from "@/components/Card/AlbumCard";
import { decodeSlash } from "@/utils/encodeSlash";
import { IPlaylist, IPlaylistList } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";
import { IAlbum, IAlbumList } from "@/interfaces/album";

interface Props {
  lists: IPlaylistList | IAlbumList;
}

export default function List({ lists }: Props) {
  const { setIsLoading } = useContext(BgColorContext);
  const listTitle =
    "albumProducts" in lists
      ? "More Albums"
      : "playlists" in lists
      ? "More Playlists"
      : "";
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView();
    setIsLoading(false);
  }, []);

  return (
    <main className="mx-10 my-6 bg-gray-650">
      <h2 className="text-h2-normal text-gray-200" ref={containerRef}>
        {listTitle}
      </h2>
      {"playlists" in lists && (
        <section className="flex flex-wrap gap-6 mt-8 mb-16">
          {lists.playlists.map((playlist: IPlaylist, index: number) => {
            return (
              <PlaylistCard
                coverUrl={playlist.coverImgUrl}
                playlistName={playlist.name}
                playlistId={playlist.id}
                tags={playlist.tags}
                key={index}
              />
            );
          })}
        </section>
      )}
      {"albumProducts" in lists && (
        <section className="flex flex-wrap gap-6 mt-8 mb-16">
          {lists.albumProducts.map((album: IAlbum, index: number) => {
            return (
              <AlbumCard
                albumUrl={album.coverUrl}
                albumName={album.albumName}
                albumId={album.albumId}
                artists={album.artistNames}
                key={index}
              />
            );
          })}
        </section>
      )}
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const listRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${decodeSlash(
      id as string
    )}limit=50`
  );
  const lists = await listRes.json();

  return { props: { lists } };
}
