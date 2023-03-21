import { TrackCard } from "../Card/TrackCard";
import { IAlbumSong } from "@/interfaces/albumSong";
import { CardTrack } from "@/interfaces/playlist";

interface Props {
  hotSongs: IAlbumSong[];
}

export const ArtistTracks = ({ hotSongs }: Props) => {
  const artistTracks = hotSongs.map((hotSong: IAlbumSong) => {
    return {
      name: hotSong.name,
      id: hotSong.id,
      album: {
        id: hotSong.al.id,
        picUrl: hotSong.al.picUrl,
      },
      artists: hotSong.ar,
    };
  });

  return (
    <section className="mt-12 mx-8 mb-14">
      <p className="text-h3-bold text-gray-200 brightness-110 ml-2">
        Artist Tracks
      </p>
      <section className="flex gap-2 lg:gap-4 flex-wrap mt-4">
        {hotSongs &&
          artistTracks.reverse().slice(0, 16).map((track: CardTrack) => {
            return <TrackCard key={track.id} track={track} />;
          })}
      </section>
    </section>
  );
};
