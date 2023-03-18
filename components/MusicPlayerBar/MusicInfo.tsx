import { IMusicDetail } from "@/interfaces/music";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  music: IMusicDetail | null;
}

interface Artist {
  id: number;
  name: string;
}

export const MusicInfo = ({ music }: Props) => {
  const [musicName, setMusicName] = useState<string | null>(null);
  const [musicImgUrl, setMusicImgUrl] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const getMusicInfo = async () => {
      if (!music) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/detail?ids=${music.id}`
      );
      const data = await response.json();
      const musicInfo = data.songs[0];
      if (!data.songs[0]) return;
      setMusicName(musicInfo.name);
      setMusicImgUrl(musicInfo.al.picUrl);
      setArtists(musicInfo.ar);
    };

    getMusicInfo();
  }, [music]);

  return (
    <aside className="w-[27%] flex gap-4 hidden lg:block">
      <div className="mt-[2px] w-[95px] flex items-center justify-center rounded-sm overflow-hidden">
        <Image
          src={musicImgUrl ? musicImgUrl : "/icons/disc-line.svg"}
          alt="music photo"
          width={musicImgUrl ? 95 : 50}
          height={musicImgUrl ? 95 : 50}
        />
      </div>
      <section className="flex flex-col justify-around">
        <h5 className="text-button-normal lg:text-h3-normal text-white-200">
          {musicName}
        </h5>
        <div className="text-tag-normal text-gray-400">
          {artists.map((artist, index) => {
            return <span key={index}>{artist.name}&nbsp;&nbsp;</span>;
          })}
        </div>
      </section>
    </aside>
  );
};
