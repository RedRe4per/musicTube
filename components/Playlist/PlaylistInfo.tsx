import Image from "next/image";
import { switchTopPlaylistTag } from "@/utils/switchTopPlaylistTag";

interface Props {
  coverImgUrl: string;
  name: string;
  description: string;
  creator: {
    avatarUrl: string;
    userId: number;
    nickname: string;
    signature: string;
  };
  tags: string[];
  playCount: number;
  shareCount: number;
  subscribedCount: number;
}

export const PlaylistInfo = ({
  coverImgUrl,
  name,
  description,
  creator,
  tags,
  playCount,
  shareCount,
  subscribedCount,
}: Props) => {
  return (
    <section className="mt-6 pl-10 pb-5 flex">
      <div>
        <Image
          src={coverImgUrl}
          alt="bluePicUrl"
          className="rounded-2xl shadow-2xl shadow-gray-650"
          width={280}
          height={280}
        />
      </div>
      <section className="ml-10 mt-10 flex flex-col justify-around">
        <section className="flex gap-8 text-h3-normal text-gray-200">
          <span>
            <span className="text-green">{playCount}</span>&nbsp;Played
          </span>
          <span>
            <span className="text-green">{subscribedCount}</span>
            &nbsp;subscribed
          </span>
          <span>
            <span className="text-green">{shareCount}</span>&nbsp;shared
          </span>
        </section>
        <h3 className="text-h2-normal text-white-200">{name}</h3>
        <section className="flex justify-between items-center gap-6 text-tag-normal text-gray-200">
          {tags && (
            <h5>
              Tags:{" "}
              {tags.map((tag: string, index) => {
                return (
                  <span key={index}>
                    {switchTopPlaylistTag(tag)}&nbsp;&nbsp;
                  </span>
                );
              })}
            </h5>
          )}
          <span>Creator: {creator.nickname}</span>
        </section>
      </section>
    </section>
  );
};
