import Head from "next/head";
import { AlbumList } from "@/components/AlbumList";
import { PlaylistList } from "@/components/PlaylistList";
import { IAlbumList } from "@/interfaces/album";
import { IPlaylistList } from "@/interfaces/playlist";

interface Props {
  albumAreaEA: IAlbumList;
  albumAreaJP: IAlbumList;
  albumAreaKR: IAlbumList;
  albumAreaZH: IAlbumList;
  topPlaylistList: IPlaylistList;
}

export default function Home({
  albumAreaEA,
  albumAreaJP,
  albumAreaKR,
  albumAreaZH,
  topPlaylistList,
}: Props) {
  return (
    <section>
      <Head>
        <title>MusicTube</title>
        <meta name="description" content="Built by Derek" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-auto scrollbar">
        <PlaylistList title={"Top Playlists"} playlistList = {topPlaylistList}/>
        <AlbumList
          title={"European & American Recommended Album"}
          albumList={albumAreaEA}
        />
        <AlbumList title={"Japanese Recommended Album"} albumList={albumAreaJP} />
        <AlbumList title={"Korean Recommended Album"} albumList={albumAreaKR} />
        <AlbumList title={"Chinese Recommended Album"} albumList={albumAreaZH} />
      </main>
    </section>
  );
}

export async function getStaticProps() {
  const EAResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album/list/style?area=E_A`
  );
  const albumAreaEA = await EAResponse.json();
  const JPResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album/list/style?area=JP`
  );
  const albumAreaJP = await JPResponse.json();
  const KRResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album/list/style?area=KR`
  );
  const albumAreaKR = await KRResponse.json();
  const ZHResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album/list/style?area=Z_H`
  );
  const albumAreaZH = await ZHResponse.json();
  const topPlaylistListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/top/playlist/highquality?limit=10`
  );
  const topPlaylistList = await topPlaylistListResponse.json();

  return {
    props: { albumAreaEA, albumAreaJP, albumAreaKR, albumAreaZH, topPlaylistList },
    revalidate: 86400,
  };
}
