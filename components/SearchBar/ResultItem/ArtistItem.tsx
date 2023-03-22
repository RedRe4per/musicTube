import Link from "next/link";
import Image from "next/image";
import { IArtist } from "@/interfaces/artist";

interface Props {
  artist: IArtist;
}

export const ArtistItem = ({ artist }: Props) => {
  return (
    <Link href={`/artist/${artist.id}`}>
      <section className="search-result-item gap-4">
        <div className="w-[40px] h-[40px] relative search-result-image border-1 overflow-hidden">
          <Image src={artist.picUrl? artist.picUrl: "/images/no-image.jpg"} alt="album" fill sizes="40px"></Image>
        </div>
        <div>
          <h5>{artist.name}</h5>
          <h6 className="search-result-subtitle">
            {artist.alias.map((alia: string, index: number) => {
              return <span key={index}>{alia}&nbsp;&nbsp;</span>;
            })}
          </h6>
        </div>
      </section>
    </Link>
  );
};
