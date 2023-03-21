import { TrackCard } from "../Card/TrackCard";
import { IAlbumSong } from "@/interfaces/albumSong";
import { ISimilarTrack } from "@/interfaces/music";

interface Props {
    hotSongs: IAlbumSong[];
}

interface Track {
    name: string;
    id: number;
    album: {
        id: number;
        picUrl: string;
    };
    artists: [{
        name: string;
        id: number;
    }]
}

export const ArtistTracks = ({ hotSongs }: Props) => {
    console.log(hotSongs)
    const artistTracks = hotSongs.map((hotSong: IAlbumSong)=>{
        return {
            name: hotSong.name,
            id: hotSong.id,
            album: {
                id: hotSong.al.id,
                picUrl: hotSong.al.picUrl,
            },
            artists: hotSong.ar,
        }
    })

  return (
    <section className="mt-12 mx-8 mb-14">
      <p className="text-h3-bold text-gray-200 brightness-110 ml-2">
        Artist Tracks
      </p>
      <section className="flex gap-2 lg:gap-4 flex-wrap mt-4">
        {hotSongs &&
          artistTracks.map((track: any) => {
            return <TrackCard key={track.id} track={track} />;
          })}
      </section>
    </section>
  );
};
