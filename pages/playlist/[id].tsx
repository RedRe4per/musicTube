import { GetServerSidePropsContext } from "next";
import { IPlaylist, IPrivilege } from "@/interfaces/playlist";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext, useEffect } from "react";
import { PlaylistInfo } from "@/components/Playlist/PlaylistInfo";
import { PlaylistPlay } from "@/components/Playlist/PlaylistPlay";
import { SongList } from "@/components/Playlist/SongList";
import { mixColor } from "@/utils/mixColor";
import { Footer } from "@/layouts/footer";

interface Props {
  code: number;
  fromUserCount: number;
  playlist: IPlaylist;
  privileges: IPrivilege[];
}

export default function Playlist(playlistInfo: Props) {
  const {
    name,
    coverImgUrl,
    description,
    creator,
    id,
    tags,
    trackCount,
    playCount,
    shareCount,
    subscribedCount,
    tracks,
  } = playlistInfo.playlist;
  const { handleBackgroundColor } = useBackgroundColor(coverImgUrl);
  const { bgColor, setIsLoading } = useContext(BgColorContext);
  
  useEffect(()=>{
    setIsLoading(false);
  }, [])

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
      <PlaylistInfo
        coverImgUrl={coverImgUrl}
        name={name}
        description={description}
        creator={creator}
        tags={tags}
        playCount={playCount}
        shareCount={shareCount}
        subscribedCount={subscribedCount}
      />
      <PlaylistPlay playlistId={id} trackCount={trackCount} />
      <SongList playlistSongs={tracks} playlistId={id} />
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/playlist/detail?id=${id}`
  );
  const playlistInfo = await response.json();
  return { props: playlistInfo };
}
