import Link from "next/link";
import Image from "next/image";
import { IPlaylist } from "@/interfaces/playlist";

interface Props {
  playlist: IPlaylist;
}

export const PlaylistItem = ({ playlist }: Props) => {
  return (
    <Link href={`/playlist/${playlist.id}`}>
      <section className="search-result-item">
        <div className="flex-1">
          <Image
            className="search-result-image border-1"
            src={playlist.coverImgUrl? playlist.coverImgUrl: "/images/no-image.jpg"}
            alt="album"
            width={40}
            height={40}
          ></Image>
        </div>
        <div className="flex-8">
          <h5>{playlist.name}</h5>
          <div className="search-result-subtitle flex justify-between items-center">
            <h5>Creator:&nbsp;{playlist.creator.nickname}</h5>
            <h5>Played:&nbsp;{playlist.playCount}</h5>
          </div>
        </div>
      </section>
    </Link>
  );
};
