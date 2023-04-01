import Link from "next/link";
import Image from "next/image";
import { mixColor } from "@/utils/mixColor";
import { IPlaylistTag } from "@/interfaces/playlist";

interface Props {
  playlistTag: IPlaylistTag;
}

export const TagCard = ({ playlistTag }: Props) => {
  const { playlist, color, imageUrl } = playlistTag;
  
  return (
    <Link href={`/genre/${playlist}`}>
      <section
        className="w-[200px] h-[200px] relative overflow-hidden rounded-xl p-1"
        style={{
          background: mixColor("#1B1B1B", color.dominantColor),
        }}
      >
        <h3 className="mt-4 ml-3 text-h3-normal text-white-200 ">{playlist}</h3>
        <div className="absolute -bottom-2 -right-2">
          <Image
            src={imageUrl ? imageUrl : "/images/no-image.jpg"}
            alt={playlist}
            className="object-contain transform rounded-sm shadow-md rotate-12 shadow-gray-600"
            width={120}
            height={120}
          />
        </div>
      </section>
    </Link>
  );
};
