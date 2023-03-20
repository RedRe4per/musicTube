import { useState, useEffect } from "react";
import { ISimilarTrack } from "@/interfaces/music";

interface Props {
  trackId: number;
}

export const SimilarSongs = ({ trackId }: Props) => {
  const [similarSongs, setSimilarSongs] = useState<ISimilarTrack[] | null>(
    null
  );

  useEffect(() => {
    const getSimilarSongs = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/simi/song?id=${trackId}`
      );
      const similarSongsData = await res.json();
      console.log(similarSongsData.songs);
    };

    getSimilarSongs();
  }, [trackId]);
  return (
    <section>
      <div>test</div>
    </section>
  );
};
