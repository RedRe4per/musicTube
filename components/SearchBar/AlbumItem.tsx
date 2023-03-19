import Link from "next/link";
import Image from "next/image";

export const AlbumItem = ({ album }: any) => {
  return (
    <Link href={`/album/${album.id}`}>
      <section className="hover:bg-gray-600 hover:text-green p-2 rounded-lg text-h4-light flex items-center gap-4">
        <div>
          <Image
            className="rounded-sm shadow-sm shadow-white-50 border-solid border-white-50 border-1"
            src={album.picUrl}
            alt="album"
            width={40}
            height={40}
          ></Image>
        </div>
        <div>
          <h5>{album.name}</h5>
          <h6 className="text-tag-light text-gray-300 brightness-75">
            {album.artists.map((artist: any, index: number) => {
              return <span key={index}>{artist.name}&nbsp;&nbsp;</span>;
            })}
          </h6>
        </div>
      </section>
    </Link>
  );
};
