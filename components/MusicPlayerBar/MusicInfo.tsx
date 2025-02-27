import { IMusicDetail } from "@/interfaces/music";
import { useEffect, useState } from "react";
import { useLoading } from "@/hooks/useLoading";
import Image from "next/image";
import Link from "next/link";

interface Props {
  music: IMusicDetail | null;
}

interface Artist {
  id: number;
  name: string;
}

export const MusicInfo = ({ music }: Props) => {
  const [musicName, setMusicName] = useState<string | null>(null);
  const [musicId, setMusicId] = useState(0);
  const [musicImgUrl, setMusicImgUrl] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const { handleLoading } = useLoading();

  useEffect(() => {
    const getMusicInfo = async () => {
      if (!music) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/detail?ids=${
          music.id
        }&timestamp=${Date.now()}`
      );
      const data = await response.json();
      const musicInfo = data.songs[0];
      if (!data.songs[0]) return;
      setMusicName(musicInfo.name);
      setMusicId(musicInfo.id);
      setMusicImgUrl(musicInfo.al.picUrl);
      setArtists(musicInfo.ar);
    };

    getMusicInfo();
  }, [music]);

  return (
    <aside className="w-[27%] gap-4 flex">
      <div className="min-w-[95px] min-h-[95px] mt-[2px] flex items-center justify-center rounded-sm overflow-hidden">
        <Image
          className={`object-cover ${
            musicImgUrl ? "w-[95px] h-[95px]" : "w-[50px] h-[50px]"
          }`}
          src={musicImgUrl ? musicImgUrl : "/icons/disc-line.svg"}
          alt="music photo"
          width={musicImgUrl ? 95 : 50}
          height={musicImgUrl ? 95 : 50}
        />
      </div>
      <section className="hidden lg:flex flex-col justify-around">
        <Link
          onClick={handleLoading}
          href={`/track/${musicId}`}
          aria-label="Link to playing track"
        >
          <h5 className="text-button-normal lg:text-h3-normal text-white-200 max-h-[56px] overflow-hidden">
            {musicName}
          </h5>
        </Link>
        <div className="text-tag-normal text-gray-300 max-h-[42.5px] overflow-hidden">
          {artists.map((artist, index) => {
            return (
              <Link
                onClick={handleLoading}
                key={index}
                href={`/artist/${artist.id}`}
              >
                <span className="hover:underline hover:text-green">
                  {artist.name}
                </span>
                &nbsp;&nbsp;
              </Link>
            );
          })}
        </div>
      </section>
    </aside>
  );
};
