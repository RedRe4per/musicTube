import { GetServerSidePropsContext } from "next";
import { IPlaylist, IPrivilege } from "@/interfaces/playlist";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext } from "react";
import { IAlbumDetails } from "@/interfaces/album";
import { IAlbumSong } from "@/interfaces/albumSong";
import { AlbumInfo } from "@/components/Album/AlbumInfo";
import { AlbumPlay } from "@/components/Album/AlbumPlay";
import { AlbumPlayList } from "@/components/Album/AlbumPlayList";
import { mixColor } from "@/utils/mixColor";
import { Footer } from "@/layouts/footer";

interface Props {
  code: number;
  fromUserCount: number;
  playlist: IPlaylist;
  privileges: IPrivilege[];
}

export default function Album(playlistInfo: Props) {
  console.log(playlistInfo, "info");
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
    trackIds,
  } = playlistInfo.playlist;
  const { handleBackgroundColor } = useBackgroundColor(coverImgUrl);
  const { bgColor } = useContext(BgColorContext);
  if (typeof window !== "undefined") {
    handleBackgroundColor();
  }

  //   return (
  //     <main
  //       className="transition-transform duration-1000 shadow-inner shadow-gray-650"
  //       style={{
  //         background: `linear-gradient(to bottom, #1B1B1B, ${mixColor(
  //           "#1B1B1B",
  //           bgColor
  //         )})`,
  //       }}
  //     >
  //       <AlbumInfo
  //         picUrl={picUrl}
  //         type={type}
  //         subType={subType}
  //         name={name}
  //         artists={artists}
  //       />
  //       <AlbumPlay albumId={id} />
  //       <AlbumPlayList albumSongs={albumInfo.songs} albumId={id} />
  //       <Footer />
  //     </main>
  //   );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/playlist/detail?id=${id}`
  );
  const playlistInfo = await response.json();
  return { props: playlistInfo };
}
