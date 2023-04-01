import Link from "next/link";
import Image from "next/image";
import { mixColor } from "@/utils/mixColor";
import { switchTopPlaylistTag } from "@/utils/switchTopPlaylistTag";
import { IPlaylistTag } from "@/interfaces/playlist";
import { useLoading } from "@/hooks/useLoading";

interface Props {
  playlistTag: IPlaylistTag;
}

export const TagCard = ({ playlistTag }: Props) => {
  const { playlist, color, imageUrl } = playlistTag;
  const { handleLoading } = useLoading();

  return (
    <Link
      onClick={handleLoading}
      href={`/genre/${switchTopPlaylistTag(playlist)}`}
    >
      <section
        className="w-[200px] h-[200px] relative overflow-hidden rounded-xl p-1 hover:brightness-125"
        style={{
          background: mixColor("#1B1B1B", color.dominantColor),
        }}
      >
        <h3 className="mt-4 ml-3 text-h3-normal text-white-200 ">
          {switchTopPlaylistTag(playlist)}
        </h3>
        <div className="absolute -bottom-2 -right-2 w-[120px] h-[120px]">
          <Image
            src={imageUrl ? imageUrl : "/images/no-image.jpg"}
            alt={playlist}
            className="object-cover transform rounded-sm shadow-md rotate-12 shadow-gray-600 w-[120px] h-[120px]"
            width={120}
            height={120}
          />
        </div>
      </section>
    </Link>
  );
};
