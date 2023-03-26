import { GetServerSidePropsContext } from "next";
import { IPlaylist, IPrivilege } from "@/interfaces/playlist";
import { Track } from "@/interfaces/playlist";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext, useEffect, useState } from "react";
import { PlaylistInfo } from "@/components/Playlist/PlaylistInfo";
import { PlaylistPlay } from "@/components/Playlist/PlaylistPlay";
import { SongList } from "@/components/Playlist/SongList";
import { PlaylistPagination } from "@/components/Playlist/PlaylistPagination";
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
  const [currentTracks, setCurrentTracks] = useState<Track[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(false);
    setCurrentTracks(tracks);
  }, [id]);

  if (typeof window !== "undefined") {
    handleBackgroundColor();
  }

  const switchPage = async (targetPage: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/playlist/track/all?id=${id}&limit=20&offset=${targetPage*20}`
    );
    const newPageTracks = await res.json();
    setCurrentTracks(newPageTracks.songs);
    setCurrentPage(targetPage+1);
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
      <SongList playlistSongs={currentTracks} playlistId={id} currentPage={currentPage} />
      <PlaylistPagination itemQty={trackCount} currentPage={currentPage} switchPage={switchPage} />
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
