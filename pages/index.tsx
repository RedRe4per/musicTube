import { AlbumList } from "@/components/Album/AlbumList";
import { PlaylistList } from "@/components/Playlist/PlaylistList";
import { Carousel } from "@/components/Carousel";
import { IBanner } from "@/interfaces/carousel";
import { IAlbumList, AlbumArea } from "@/interfaces/album";
import { IPlaylistList } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";
import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { playlistsGroupTranslator } from "@/utils/playlistsGroupTrans";
import { fetchArtistsInfo, fetchAlbumListInfo } from "@/utils/getHomePageData";
import { AreaCode } from "@/interfaces/artist";

interface Props {
  allAreaAlbumLists: IAlbumList[];
  topPlaylistList: IPlaylistList;
  hotPlaylistList: IPlaylistList;
  banners: IBanner[];
}

export default function Home({
  allAreaAlbumLists,
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
        {allAreaAlbumLists.map((AlbumLists: IAlbumList, index: number) => {
          return (
            <AlbumList
              title={AlbumLists.title}
              albumList={AlbumLists}
              key={index}
            />
          );
        })}
      </main>
      <Footer />
    </section>
  );
}

export async function getStaticProps() {
  const areas: AreaCode[] = ["8", "96", "16", "7", "0"];
  const banners = await fetchArtistsInfo(areas);

  const albumAreas: AlbumArea[] = ["E_A", "JP", "KR"];
  const allAreaAlbumLists = await fetchAlbumListInfo(albumAreas);

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

  return {
    props: {
      allAreaAlbumLists,
      topPlaylistList,
      hotPlaylistList,
      banners,
    },
    revalidate: 21600,
  };
}
