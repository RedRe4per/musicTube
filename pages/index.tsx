import { AlbumList } from "@/components/Album/AlbumList";
import { PlaylistList } from "@/components/Playlist/PlaylistList";
import { IAlbumSong } from "@/interfaces/albumSong";
import { IAlbumList } from "@/interfaces/album";
import { IPlaylistList } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";
import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";

type AreaCode = "-1" | "0" | "7" | "8" | "16" | "96";

interface Banner {
  artistCover: string;
    artistId: number;
    artistName: string;
    artistSongs: IAlbumSong[];
}

interface ArtistResults {
  status: "fulfilled" | "rejected";
  value: Banner;
}

interface Props {
  albumAreaEA: IAlbumList;
  albumAreaJP: IAlbumList;
  albumAreaKR: IAlbumList;
  albumAreaZH: IAlbumList;
  topPlaylistList: IPlaylistList;
  hotPlaylistList: IPlaylistList;
  banners: Banner[];
}

export default function Home({
  albumAreaEA,
  albumAreaJP,
  albumAreaKR,
  albumAreaZH,
  topPlaylistList,
  hotPlaylistList,
  banners,
}: Props) {
  const { setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  console.log(banners, "banner")

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

  const areas: AreaCode[] = ["96", "8", "16", "7", "0", "-1"];
  async function getArtist (areaCode: AreaCode) {  
    const randomInteger = Math.floor(Math.random() * 100000) + 1;
    const artistRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_ADDRESS
      }/artist/list?area=${areaCode}&limit=1&timestamp=${
        Date.now() - randomInteger
      }`
    );
    const artistArray = await artistRes.json();
    const artist = artistArray.artists[0]

    const artistSongRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_ADDRESS
      }/artists?id=${artist.id}&limit=6&order=time&timestamp=${
        Date.now() - randomInteger
      }`
    );
    const artistDetails = await artistSongRes.json();
    const artistSongs = artistDetails.hotSongs.slice(0, 6) as IAlbumSong[];

    const banner: Banner = {
       artistId: artist.id,
       artistName: artist.name,
       artistCover: artist.picUrl,
       artistSongs: artistSongs,
    }
    return banner
  }

  async function fetchArtistsInfo(areas: AreaCode[]) {
    try {
      const promises = areas.map((area: AreaCode) =>
        getArtist(area)
      );
      const results = await Promise.allSettled(promises);
      const filteredResults = results.filter(result => result.status === "fulfilled") as ArtistResults[];
      const resultAlbums = filteredResults.map((results: ArtistResults)=>{return results.value})
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
      console.error("Error in fetchAllNewAlbums:", error);
    });

  return {
    props: {
      albumAreaEA,
      albumAreaJP,
      albumAreaKR,
      albumAreaZH,
      topPlaylistList,
      hotPlaylistList,
      banners,
    },
    revalidate: 21600,
  };
}
