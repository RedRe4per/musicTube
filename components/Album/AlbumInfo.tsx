import Image from "next/image";
import { IArtist } from "@/interfaces/artist";

interface Props {
  picUrl: string;
  type: string;
  subType: string;
  name: string;
  artists: IArtist[];
}

export const AlbumInfo = ({ picUrl, type, subType, name, artists }: Props) => {
  return (
    <section className="mt-6 pl-10 pb-5 flex">
      <div className="min-w-[280px] min-h-[280px]">
        <Image
          src={picUrl}
          alt="bluePicUrl"
          className="w-[280px] h-[280px] rounded-2xl shadow-2xl shadow-gray-650 object-cover"
          width={280}
          height={280}
          unoptimized
        />
      </div>
      <section className="ml-10 mt-10 flex flex-col justify-around">
        <section className="flex gap-4 text-tag-light text-green">
          <span>{type}</span>
          <span>{subType}</span>
        </section>
        <h3 className="text-h2-normal text-white-200">{name}</h3>
        <section>
          <h5 className="text-tag-normal text-gray-200">
            Artists:{" "}
            {artists.map((artist: IArtist) => {
              return <span key={artist.id}>{artist.name}&nbsp;&nbsp;</span>;
            })}
          </h5>
        </section>
      </section>
    </section>
  );
};
