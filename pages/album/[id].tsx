import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext } from "react";
import { IAlbumDetails } from "@/interfaces/album";
import { IMusicDetail } from "@/interfaces/music";
import { AlbumInfo } from "@/components/AlbumInfo";
import { AlbumPlay } from "@/components/AlbumPlay";

interface Props {
  album: IAlbumDetails;
  code: number;
  resourceState: boolean;
  songs: IMusicDetail;
}

export default function Album(albumInfo: Props) {
  console.log(albumInfo.songs);
  const { type, name, picUrl, description, subType, artists, id } =
    albumInfo.album;
  const { handleBackgroundColor } = useBackgroundColor(picUrl);
  const { bgColor } = useContext(BgColorContext);
  if (typeof window !== "undefined") {
    handleBackgroundColor();
  }

  return (
    <main
      className="h-[200vh]"
      style={{ background: `linear-gradient(to bottom, #1B1B1B, ${bgColor})` }}
    >
      <AlbumInfo
        picUrl={picUrl}
        type={type}
        subType={subType}
        name={name}
        artists={artists}
      />
      <AlbumPlay albumId={id} />
      <section>music list</section>
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
