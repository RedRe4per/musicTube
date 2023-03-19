import Link from "next/link";
import Image from "next/image";

export const ArtistItem = ({ artist }: any) => {
  return (
    <Link href={`/artist/${artist.id}`}>
      <section className="hover:bg-gray-600 hover:text-green p-2 rounded-lg text-h4-light flex items-center gap-4">
        <div className="w-[40px] h-[40px] relative rounded-sm shadow-sm shadow-white-50 border-solid border-white-50 border-1 overflow-hidden">
          <Image
            src={artist.picUrl}
            alt="album"
            fill
          ></Image>
        </div>
        <div>
          <h5>{artist.name}</h5>
          <h6 className="text-tag-light text-gray-300 brightness-75">
            {artist.alias.map((alia: string, index: number) => {
              return <span key={index}>{alia}&nbsp;&nbsp;</span>;
            })}
          </h6>
        </div>
      </section>
    </Link>
  );
};
