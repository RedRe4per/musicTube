import { AlbumList } from "@/components/Album/AlbumList";
import { PlaylistList } from "@/components/Playlist/PlaylistList";
import { IAlbumList } from "@/interfaces/album";
import { IPlaylistList } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";
import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";

interface Props {
  albumAreaEA: IAlbumList;
  albumAreaJP: IAlbumList;
  albumAreaKR: IAlbumList;
  albumAreaZH: IAlbumList;
  topPlaylistList: IPlaylistList;
  hotPlaylistList: IPlaylistList;
}

export default function Home({
  albumAreaEA,
  albumAreaJP,
  albumAreaKR,
  albumAreaZH,
  topPlaylistList,
  hotPlaylistList,
}: Props) {
  const { setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section>
      <main className="overflow-hidden">
        <PlaylistList title={"Top Playlists"} playlistList={topPlaylistList} />
        <PlaylistList title={"Hot Playlists"} playlistList={hotPlaylistList} />
        <AlbumList
          title={"European & American Recommended Album"}
          albumList={albumAreaEA}
        />
        <AlbumList
          title={"Japanese Recommended Album"}
          albumList={albumAreaJP}
        />
        <AlbumList title={"Korean Recommended Album"} albumList={albumAreaKR} />
        <AlbumList
          title={"Chinese Recommended Album"}
          albumList={albumAreaZH}
        />
      </main>
      <Footer />
    </section>
  );
}

export async function getStaticProps() {
  const EAResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album/list/style?area=E_A&limit=13`
  );
  const albumAreaEA = await EAResponse.json();
  const JPResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album/list/style?area=JP&limit=13`
  );
  const albumAreaJP = await JPResponse.json();
  const KRResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album/list/style?area=KR&limit=13`
  );
  const albumAreaKR = await KRResponse.json();
  const ZHResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album/list/style?area=Z_H&limit=13`
  );
  const albumAreaZH = await ZHResponse.json();
  const topPlaylistListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/top/playlist/highquality?limit=13`
  );
  const topPlaylistList = await topPlaylistListResponse.json();
  const hotPlaylistListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/top/playlist?limit=13`
  );
  const hotPlaylistList = await hotPlaylistListResponse.json();

  return {
    props: {
      albumAreaEA,
      albumAreaJP,
      albumAreaKR,
      albumAreaZH,
      topPlaylistList,
      hotPlaylistList,
    },
    revalidate: 8640,
  };
}
