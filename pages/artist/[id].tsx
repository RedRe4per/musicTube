import { GetServerSidePropsContext } from "next";
import { IArtist } from "@/interfaces/artist";
import { IAlbumSong } from "@/interfaces/albumSong";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext, useEffect } from "react";
import { ArtistInfo } from "@/components/Artist/ArtistInfo";
import { PlaylistPlay } from "@/components/Playlist/PlaylistPlay";
import { SongList } from "@/components/Playlist/SongList";
import { mixColor } from "@/utils/mixColor";
import { Footer } from "@/layouts/footer";

interface Props {
  code: number;
  artist: IArtist;
  hotSongs: IAlbumSong;
  more: boolean;
}

export default function Track(artistInfo: Props) {
  const {
    id,
    name,
    picUrl,
    musicSize,
    albumSize,
  } = artistInfo.artist;
  console.log(artistInfo, "artistInfo")
  const { handleBackgroundColor } = useBackgroundColor(picUrl);
  const { bgColor, setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, [id]);

  if (typeof window !== "undefined") {
    handleBackgroundColor();
  }

  return (
    <main
      className="transition-transform duration-1000 shadow-inner shadow-gray-650"
      style={{
        background: `linear-gradient(to bottom, #1B1B1B, ${mixColor(
          "#1B1B1B",
          bgColor
        )})`,
      }}
    >
      <ArtistInfo
        name={name}
        picUrl={picUrl}
        musicSize={musicSize}
        albumSize={albumSize}
      />
      {/* <PlaylistPlay playlistId={id} trackCount={trackCount} />
      <SongList playlistSongs={tracks} playlistId={id} />
        */}
      <div>歌手热门 50 首歌曲 /artist/top/song?id=6452</div>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/artists?id=${id}`
  );
  const artistInfo = await response.json();
  return { props: artistInfo };
}
