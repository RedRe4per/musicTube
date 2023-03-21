import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { LyricsContext } from "@/contexts/LyricsContext";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";
import { parseLyrics } from "@/utils/parseLyrics";

interface Props {
  trackId: number;
}

interface FormattedLyrics {
  startTime: number;
  endTime: number;
  text: string;
}

export const TrackLyrics = ({ trackId }: Props) => {
  const router = useRouter();
  const pathId = +router.asPath.split("/")[2];
  const { musicPlayer } = useContext(LyricsContext);
  const [lyricsTimestamp, setLyricsTimestamp] = useState(0);
  const { isMusicPlay, currentMusic } = useContext(PlayAndPauseContext);
  const [lyrics, setLyrics] = useState<FormattedLyrics[] | null>(null);
  let intervalId: number | NodeJS.Timeout = 0;

  useEffect(() => {
    if (!isMusicPlay && currentMusic?.id === trackId) {
      intervalId = setInterval(() => {
          setLyricsTimestamp(musicPlayer?.current.currentTime);
        }, 200)
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isMusicPlay, currentMusic?.id, pathId]);

  useEffect(() => {
    const getLyrics = async () => {
      const lyricResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/lyric?id=${trackId}`
      );
      const lyricData = await lyricResponse.json();
      const formattedLyrics = parseLyrics(
        lyricData.lrc.lyric
      ) as FormattedLyrics[];
      setLyrics(formattedLyrics);
    };
    getLyrics();
  }, [trackId]);

  return (
    <section className="ml-10 mt-10 text-h4-light">
      {lyrics &&
        lyrics.map((lyric, index) => {
          return (
            <p
              className={`mt-[10px] ${currentMusic?.id === trackId &&
                  lyricsTimestamp * 1000 > lyric.startTime &&
                  lyricsTimestamp * 1000 < lyric.endTime
                  ? "text-green brightness-150 text-h4-normal"
                  : ""
                }`}
              key={index}
            >
              {lyric.text}
            </p>
          );
        })}
    </section>
  );
};
