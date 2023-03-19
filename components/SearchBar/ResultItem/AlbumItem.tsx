import Link from "next/link";
import Image from "next/image";

export const AlbumItem = ({ album }: any) => {
  return (
    <Link href={`/album/${album.id}`}>
      <section className="search-result-item gap-4">
        <div>
          <Image
            className="search-result-image border-1"
            src={album.picUrl}
            alt="album"
            width={40}
            height={40}
          ></Image>
        </div>
        <div>
          <h5>{album.name}</h5>
          <h6 className="search-result-subtitle">
            {album.artists.map((artist: any, index: number) => {
              return <span key={index}>{artist.name}&nbsp;&nbsp;</span>;
            })}
          </h6>
        </div>
      </section>
    </Link>
  );
};
