import { GetServerSidePropsContext } from "next";
import { IPrivilege } from "@/interfaces/playlist";
import { ITrack } from "@/interfaces/music";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext, useEffect, useRef } from "react";
import { TrackInfo } from "@/components/Track/TrackInfo";
import { TrackPlay } from "@/components/Track/TrackPlay";
import { TrackLyrics } from "@/components/Track/TrackLyrics";
import { SimilarTrack } from "@/components/Track/SimilarTrack";
import { mixColor } from "@/utils/mixColor";
import { Footer } from "@/layouts/footer";

interface Props {
  code: number;
  privileges: IPrivilege[];
  songs: ITrack[];
}

export default function Track(trackInfo: Props) {
  const { name, id, al, ar, mv, pop, publishTime, dt } = trackInfo.songs[0];
  const { handleBackgroundColor } = useBackgroundColor(al.picUrl);
  const { bgColor, setIsLoading } = useContext(BgColorContext);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView();
    setIsLoading(false);
    if (typeof window !== "undefined") {
      handleBackgroundColor();
    }
  }, [id]);

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
      <div ref={containerRef}></div>
      <TrackInfo
        al={al}
        name={name}
        ar={ar}
        pop={pop}
        publishTime={publishTime}
      />
      <TrackPlay trackId={id} album={al} duration={dt} />
      <TrackLyrics trackId={id} />
      <SimilarTrack trackId={id} />
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const trackResponse = await fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER_ADDRESS
    }/song/detail?ids=${id}&timestamp=${Date.now()}`
  );
  const trackInfo = await trackResponse.json();
  return { props: trackInfo };
}
