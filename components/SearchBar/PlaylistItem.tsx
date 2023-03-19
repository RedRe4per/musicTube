import Link from "next/link";
import Image from "next/image";

export const PlaylistItem = ({ playlist }: any) => {
  return (
    <Link href={`/playlist/${playlist.id}`}>
      <section className="hover:bg-gray-600 hover:text-green p-2 rounded-lg text-h4-light flex items-center">
        <div className="flex-1">
          <Image
            className="rounded-sm shadow-sm shadow-white-50 border-solid border-white-50 border-1"
            src={playlist.coverImgUrl}
            alt="album"
            width={40}
            height={40}
          ></Image>
        </div>
        <div className="flex-8">
          <h5>{playlist.name}</h5>
          <div className="text-tag-light text-gray-300 brightness-75 flex justify-between items-center">
            <h5>Creator:&nbsp;{playlist.creator.nickname}</h5>
            <h5>Played:&nbsp;{playlist.playCount}</h5>
          </div>
        </div>
      </section>
    </Link>
  );
};
