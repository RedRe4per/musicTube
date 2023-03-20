import { useEffect, useState } from "react";
import { parseLyrics } from "@/utils/parseLyrics";

interface Props {
    trackId: number;
}

interface FormattedLyrics {
   time: number;
   text: string; 
}

export const TrackLyrics = ({ trackId }: Props) => {
    const [lyrics, setLyrics] = useState<FormattedLyrics[] | null>(null);
    useEffect(()=>{
        const getLyrics = async () => {
            const lyricResponse = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/lyric?id=${trackId}`
              );
              const lyricData = await lyricResponse.json();
              const formattedLyrics = parseLyrics(lyricData.lrc.lyric) as FormattedLyrics[];
              setLyrics(formattedLyrics)   
        }
        getLyrics();
    }, [trackId])

    return (
        <section className="ml-10 mt-10 text-h4-light">
            {lyrics && lyrics.map((lyric) => {
              return <p className="mt-[10px]" key={lyric.time}>{lyric.text}</p>;
            })}
        </section>
    )
}