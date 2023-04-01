import Link from "next/link";
import Image from "next/image";

interface Props {
  playlistTag: {
    playlist: string;
    color: string;
    imageUrl: string;
  };
}

export const TagCard = ({ playlistTag }: Props) => {
  const { playlist, color, imageUrl } = playlistTag;
  return (
    <section className="w-[200px] h-[200px] relative bg-gray-400 overflow-hidden rounded-xl p-1">
      <Link href={`/genre/${playlist}`}>
        <h3 className="mt-4 ml-3 text-h3-normal text-white-200 ">{playlist}</h3>
        <div className="absolute -bottom-2 -right-2">
          <Image
            src={imageUrl ? imageUrl : "/images/no-image.jpg"}
            alt={playlist}
            className="object-contain transform rounded-sm rotate-12"
            width={120}
            height={120}
          />
        </div>
      </Link>
    </section>
  );
};
