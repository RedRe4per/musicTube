import { AlbumList } from "@/components/Album/AlbumList";
import { PlaylistList } from "@/components/Playlist/PlaylistList";
import { Carousel } from "@/components/Carousel";
import { IBanner } from "@/interfaces/carousel";
import { IAlbumList, AlbumArea } from "@/interfaces/album";
import { IPlaylistList } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";
import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { fetchArtistsInfo, fetchAlbumListInfo, getPlaylistList } from "@/utils/getHomePageData";
import { AreaCode } from "@/interfaces/artist";

interface Props {
  allAreaAlbumLists: IAlbumList[];
  hotPlaylistList: IPlaylistList;
  topPlaylistList: IPlaylistList;
  banners: IBanner[];
}

export default function Home({
  allAreaAlbumLists,
  hotPlaylistList,
  topPlaylistList,
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
        <PlaylistList title={"Hot Playlists"} playlistList={hotPlaylistList} />
        <PlaylistList title={"Top Playlists"} playlistList={topPlaylistList} />
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

  const hotPlaylistList = await getPlaylistList("");
  const topPlaylistList = await getPlaylistList("/highquality");

  return {
    props: {
      allAreaAlbumLists,
      hotPlaylistList,
      topPlaylistList,
      banners,
    },
    revalidate: 21600,
  };
}
