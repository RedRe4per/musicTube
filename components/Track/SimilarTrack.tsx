import React, { useState, useEffect } from "react";
import { TrackCard } from "../Card/TrackCard";
import { CardTrack } from "@/interfaces/playlist";

interface Props {
  trackId: number;
}

export const SimilarTrack = React.memo(({ trackId }: Props) => {
  const [similarSongs, setSimilarSongs] = useState<CardTrack[] | null>(null);

  useEffect(() => {
    const getSimilarSongs = async () => {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_ADDRESS
        }/simi/song?id=${trackId}&timestamp=${Date.now()}`
      );
      const similarSongsData = await res.json();
      setSimilarSongs(similarSongsData.songs);
    };
    getSimilarSongs();
  }, [trackId]);

  return (
    <section className="mt-12 mx-8 mb-14">
      <p className="text-h3-bold text-gray-200 brightness-110 ml-2">
        Similar Tracks
      </p>
      <section className="flex gap-2 lg:gap-4 flex-wrap mt-4">
        {similarSongs &&
          similarSongs.map((track) => {
            return <TrackCard key={track.id} track={track} />;
          })}
      </section>
    </section>
  );
});
