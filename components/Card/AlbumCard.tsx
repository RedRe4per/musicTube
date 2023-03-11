import Image from "next/image";

interface Props {
  albumUrl: string;
  albumName: string;
  artists: string[];
}

export const AlbumCard = ({ albumUrl, albumName, artists }: Props) => {
  return (
    <div className="w-[200px] h-[330px]">
      <Image
        src={albumUrl}
        alt={albumName}
        className="w-[200] h-[200] object-contain rounded-xl"
        width={200}
        height={200}
      />
      <h5 className="text-button-normal text-white-200 mt-[15px]">
        {albumName}
      </h5>
      <h6 className="text-tag-normal text-gray-400 mt-[7px]">
        {artists.map((artist) => {
          return <span key={artist}>{artist}&nbsp;&nbsp;</span>;
        })}
      </h6>
    </div>
  );
};
