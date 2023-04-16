import { AlbumList } from "@/components/Album/AlbumList";
import { PlaylistList } from "@/components/Playlist/PlaylistList";
import { Carousel } from "@/components/Carousel";
import { IAlbumSong } from "@/interfaces/albumSong";
import { IBanner } from "@/interfaces/carousel";
import { IAlbumList } from "@/interfaces/album";
import { IPlaylistList } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";
import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { convertToHttps } from "@/utils/convertToHttps";

type AreaCode = "-1" | "0" | "7" | "8" | "16" | "96";

interface ArtistResults {
  status: "fulfilled" | "rejected";
  value: IBanner;
}

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
  const topPlaylistList = await topPlaylistListResponse.json();
  const hotPlaylistListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/top/playlist?limit=13`
  );
  const hotPlaylistList = await hotPlaylistListResponse.json();

  const areas: AreaCode[] = ["8", "96", "16", "7", "0"];
  async function getArtist(areaCode: AreaCode) {
    const randomInteger = Math.floor(Math.random() * 100000) + 1;
    const artistRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_ADDRESS
      }/artist/list?area=${areaCode}&limit=1&timestamp=${
        Date.now() - randomInteger
      }`
    );
    const artistArray = await artistRes.json();
    const artist = artistArray.artists[0];

    const artistSongRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/artists?id=${
        artist.id
      }&limit=6&order=time&timestamp=${Date.now() - randomInteger}`
    );
    const artistDetails = await artistSongRes.json();
    const artistSongsDetails = artistDetails.hotSongs.slice(
      0,
      6
    ) as IAlbumSong[];
    const artistSongs = artistSongsDetails.map((song) => {
      return {
        name: song.name,
        id: song.id,
        image: song.al.picUrl,
      };
    });

    const colorRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_CLIENT_ADDRESS
      }/api/colorExtract?imageUrl=${convertToHttps(artist.picUrl)}`
    );
    const color = await colorRes.json();

    const banner: IBanner = {
      artistId: artist.id,
      artistName: artist.name,
      artistCover: artist.picUrl,
      artistAreaCode: areaCode,
      artistAlias: artist.alias,
      bgColor: color.dominantColor,
      artistSongs: artistSongs,
    };
    return banner;
  }

  async function fetchArtistsInfo(areas: AreaCode[]) {
    try {
      const promises = areas.map((area: AreaCode) => getArtist(area));
      const results = await Promise.allSettled(promises);
      const filteredResults = results.filter(
        (result) => result.status === "fulfilled"
      ) as ArtistResults[];
      const resultAlbums = filteredResults.map((results: ArtistResults) => {
        return results.value;
      });
      return resultAlbums;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

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
