import { useEffect, useState, useContext } from "react";
import { LyricsContext } from "@/contexts/LyricsContext";
import { parseLyrics } from "@/utils/parseLyrics";

interface Props {
  trackId: number;
}

interface FormattedLyrics {
  time: number;
  text: string;
}

export const TrackLyrics = ({ trackId }: Props) => {
  const { lyricsTimestamp } = useContext(LyricsContext);
  const [lyrics, setLyrics] = useState<FormattedLyrics[] | null>(null);

  useEffect(() => {
    console.log(lyricsTimestamp);
  }, [lyricsTimestamp]);

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
      console.log(formattedLyrics);
    };
    getLyrics();
  }, [trackId]);

  return (
    <section className="ml-10 mt-10 text-h4-light">
      {lyrics &&
        lyrics.map((lyric, index) => {
          return (
            <p
              className={`mt-[10px] ${
                lyricsTimestamp * 1000 > lyric.time ? "text-green" : ""
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
