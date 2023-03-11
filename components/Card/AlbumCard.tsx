import Image from "next/image";

interface Props {
  albumUrl: string;
  albumName: string;
  artists: string[];
}

export const AlbumCard = ({ albumUrl, albumName, artists }: Props) => {
  return (
    <section className="max-w-[1/8] h-[330px]">
      <div>
        <Image
          src={albumUrl}
          alt={albumName}
          className="object-contain rounded-xl"
          width={200}
          height={200}
          sizes="(min-width: 150px) 50vw"
        />
      </div>
      {/* <section className="max-w-[100%] overflow-hidden">
      <h5 className="text-button-normal text-white-200 mt-[15px] ">
        {albumName}
      </h5>
      <h6 className="text-tag-normal text-gray-400 mt-[7px] ">
        {artists.map((artist) => {
          return <span key={artist}>{artist}&nbsp;&nbsp;</span>;
        })}
      </h6>
      </section> */}
    </section>
  );
};
