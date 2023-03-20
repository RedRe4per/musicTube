import { GetServerSidePropsContext } from "next";
import { IPrivilege } from "@/interfaces/playlist";
import { ITrack } from "@/interfaces/music";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext, useEffect } from "react";
import { TrackInfo } from "@/components/Track/TrackInfo";
import { PlaylistPlay } from "@/components/Playlist/PlaylistPlay";
import { SongList } from "@/components/Playlist/SongList";
import { mixColor } from "@/utils/mixColor";
import { Footer } from "@/layouts/footer";

interface Props {
  code: number;
  privileges: IPrivilege[];
  songs: ITrack[];
}

export default function Track(trackInfo: Props) {
  console.log(trackInfo.songs[0]);
  const { name, id, al, ar, mv, mark, publishTime, dt } = trackInfo.songs[0];
  const { handleBackgroundColor } = useBackgroundColor(al.picUrl);
  const { bgColor, setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
      <TrackInfo
        al={al}
        name={name}
        ar={ar}
        mark={mark}
        publishTime={publishTime}
      />
      {/*
      <PlaylistPlay playlistId={id} trackCount={trackCount} />
      <SongList playlistSongs={tracks} playlistId={id} />
      <Footer /> */}
      <div>lyric /lyric?id=33894312</div>
      <div>similar songs /simi/song?id=347230</div>
      <div>artists single songs /artists?id=6452</div>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const trackResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/detail?ids=${id}`
  );
  const trackInfo = await trackResponse.json();
  return { props: trackInfo };
}
