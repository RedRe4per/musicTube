import Link from "next/link";
import Image from "next/image";
import { IAlbumSong } from "@/interfaces/albumSong";
import { useLoading } from "@/hooks/useLoading";

interface Props {
  song: IAlbumSong;
}

export const SongItem = ({ song }: Props) => {
  const { handleLoading } = useLoading();

  return (
    <Link onClick={handleLoading} href={`/track/${song.id}`}>
      <section className="search-result-item gap-4">
        <div className="min-w-[50px] min-h-[50px]">
          <Image
            className="search-result-image border-1"
            src={song.al.picUrl ? song.al.picUrl : "/images/no-image.jpg"}
            alt="album"
            width={40}
            height={40}
            unoptimized
          />
        </div>
        <div>
          <h5>{song.name}</h5>
          <h6 className="search-result-subtitle">
            {song.ar.map((artist, index: number) => {
              return <span key={index}>{artist.name}&nbsp;&nbsp;</span>;
            })}
          </h6>
        </div>
      </section>
    </Link>
  );
};
