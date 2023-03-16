import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext } from "react";
import { useHandlePlay } from "@/hooks/useHandlePlay";
import { IAlbumDetails } from "@/interfaces/album";
import { IMusicDetail } from "@/interfaces/music";

interface Props {
  album: IAlbumDetails;
  code: number;
  resourceState: boolean;
  songs: IMusicDetail;
}

export default function Album(albumInfo: Props) {
  const { type, name, picUrl, description, subType, artists, id } =
    albumInfo.album;
  const { handleBackgroundColor } = useBackgroundColor(picUrl);
  const { handlePlay } = useHandlePlay(id);
  const { bgColor } = useContext(BgColorContext);
  if (typeof window !== "undefined") {
    handleBackgroundColor();
  }

  return (
    <main
      className="h-[200vh]"
      style={{ background: `linear-gradient(to bottom, #1B1B1B, ${bgColor})` }}
    >
      <section className="mt-6 pl-10 pb-5 flex">
        <div>
          <Image
            src={picUrl}
            alt="bluePicUrl"
            className="rounded-2xl shadow-2xl shadow-gray-650"
            width={280}
            height={280}
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
              {artists.map((artist: any) => {
                return <span key={artist.id}>{artist.name}&nbsp;&nbsp;</span>;
              })}
            </h5>
          </section>
        </section>
      </section>
      <section className="mt-6 ml-10 flex gap-10">
        <button onClick={handlePlay} className="hover:animate-pulse">
          <Image
            src="/icons/play-circle-fill.svg"
            alt="play"
            width={100}
            height={100}
          />
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="52"
            height="52"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path
              d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
              fill="#1DB954"
            />
          </svg>
        </button>
      </section>
      <section>music list</section>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${id}`
  );
  const albumInfo = await response.json();
  return { props: albumInfo };
}
