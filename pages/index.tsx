import { AlbumList } from "@/components/Album/AlbumList";
import { PlaylistList } from "@/components/Playlist/PlaylistList";
import { Carousel } from "@/components/Carousel";
import { IBanner } from "@/interfaces/carousel";
import { IAlbumList } from "@/interfaces/album";
import { IPlaylistList } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";
import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { playlistsGroupTranslator } from "@/utils/playlistsGroupTrans";
import { fetchArtistsInfo } from "@/utils/getHomePageData";
import { AreaCode } from "@/interfaces/artist";

interface Props {
  albumAreaEA: IAlbumList;
  albumAreaJP: IAlbumList;
  albumAreaKR: IAlbumList;
  topPlaylistList: IPlaylistList;
  hotPlaylistList: IPlaylistList;
  banners: IBanner[];
}

export default function Home({
  albumAreaEA,
  albumAreaJP,
  albumAreaKR,
  topPlaylistList,
  hotPlaylistList,
  banners,
}: Props) {
  const { setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section>
      <main className="overflow-hidden">
        <Carousel banners={banners} />
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
  const topPlaylistListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/top/playlist/highquality?limit=13`
  );
  const rawTopLists = await topPlaylistListResponse.json();
  const topPlaylistList = await playlistsGroupTranslator(rawTopLists);

  const hotPlaylistListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/top/playlist?limit=13`
  );
  const rawHotLists = await hotPlaylistListResponse.json();
  const hotPlaylistList = await playlistsGroupTranslator(rawHotLists);

  const areas: AreaCode[] = ["8", "96", "16", "7", "0"];

  const banners = await fetchArtistsInfo(areas)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error in fetch banners:", error);
    });

  return {
    props: {
      albumAreaEA,
      albumAreaJP,
      albumAreaKR,
      topPlaylistList,
      hotPlaylistList,
      banners,
    },
    revalidate: 21600,
  };
}
