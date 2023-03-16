import { GetServerSidePropsContext } from "next";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext } from "react";
import { IAlbumDetails } from "@/interfaces/album";
import { IAlbumSong } from "@/interfaces/albumSong";
import { AlbumInfo } from "@/components/AlbumInfo";
import { AlbumPlay } from "@/components/AlbumPlay";
import { AlbumPlayList } from "@/components/AlbumPlayList";
import { mixColor } from "@/utils/mixColor";
import { Footer } from "@/layouts/footer";

interface Props {
  album: IAlbumDetails;
  code: number;
  resourceState: boolean;
  songs: IAlbumSong[];
}

export default function Album(albumInfo: Props) {
  const { type, name, picUrl, description, subType, artists, id } =
    albumInfo.album;
  const { handleBackgroundColor } = useBackgroundColor(picUrl);
  const { bgColor } = useContext(BgColorContext);
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
      <AlbumInfo
        picUrl={picUrl}
        type={type}
        subType={subType}
        name={name}
        artists={artists}
      />
      <AlbumPlay albumId={id} />
      <AlbumPlayList albumSongs={albumInfo.songs} />
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${id}`
  );
  const albumInfo = await response.json();
  return { props: albumInfo };
}
