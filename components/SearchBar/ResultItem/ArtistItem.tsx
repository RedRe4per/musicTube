import Link from "next/link";
import Image from "next/image";
import { IArtist } from "@/interfaces/artist";
import { useLoading } from "@/hooks/useLoading";

interface Props {
  artist: IArtist;
}

export const ArtistItem = ({ artist }: Props) => {
  const { handleLoading } = useLoading();

  return (
    <Link onClick={handleLoading} href={`/artist/${artist.id}`}>
      <section className="search-result-item gap-4">
        <div className="min-w-[50px] min-h-[50px] relative search-result-image border-1 overflow-hidden">
          <Image
            src={artist.picUrl ? artist.picUrl : "/images/no-image.jpg"}
            alt="album"
            width={40}
            height={40}
            unoptimized
          />
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
