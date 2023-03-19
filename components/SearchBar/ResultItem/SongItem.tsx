import Link from "next/link";
import Image from "next/image";

export const SongItem = ({ song }: any) => {
  return (
    <Link href={`/song/${song.id}`}>
      <section className="search-result-item gap-4">
        <div>
          <Image
            className="search-result-image border-1"
            src={song.al.picUrl}
            alt="album"
            width={40}
            height={40}
          ></Image>
        </div>
        <div>
          <h5>{song.name}</h5>
          <h6 className="search-result-subtitle">
            {song.ar.map((artist: any, index: number) => {
              return <span key={index}>{artist.name}&nbsp;&nbsp;</span>;
            })}
          </h6>
        </div>
      </section>
    </Link>
  );
};
