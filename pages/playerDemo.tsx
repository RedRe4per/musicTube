import { MusicDetail } from "@/interfaces/music";
import { useState, useRef } from "react";

interface Props {
  musicData: {
    code: number;
    data: MusicDetail[];
  };
}

export default function AudioPlayerDemo(props: Props) {
  const musicArray: MusicDetail[] = props.musicData.data;
  const [currentMusic, setCurrentMusic] = useState<MusicDetail>(musicArray[0]);
  const [isMusicPlay, setIsMusicPlay] = useState<boolean>(true);
  const [isMusicLoop, setIsMusicLoop] = useState<boolean>(false);
  const [isRandomPlay, setIsRandomPlay] = useState<boolean>(true);
  const musicPlayers = useRef<HTMLAudioElement | null>(null);

  console.log(musicPlayers.current?.volume);

  const handlePlayAndPause = () => {
    setIsMusicPlay(!isMusicPlay);
    if (isMusicPlay) {
      musicPlayers.current?.play();
    } else {
      musicPlayers.current?.pause();
    }
  };

  const handleLastMusic = () => {
    const currentMusicIndex = musicArray.findIndex(
      (element) => element.url === currentMusic.url
    );
    const lastMusicIndex =
      currentMusicIndex > 0 ? currentMusicIndex - 1 : musicArray.length - 1;
    setCurrentMusic(musicArray[lastMusicIndex]);

    setTimeout(() => {
      musicPlayers.current?.play();
    }, 1000);
  };

  const handleNextMusic = () => {
    const currentMusicIndex = musicArray.findIndex(
      (element) => element.url === currentMusic.url
    );
    const nextMusicIndex =
      currentMusicIndex < musicArray.length - 1 ? currentMusicIndex + 1 : 0;
    setCurrentMusic(musicArray[nextMusicIndex]);

    setTimeout(() => {
      musicPlayers.current?.play();
    }, 1000);
  };

  const handleRandomMusic = () => {
    const currentMusicIndex = musicArray.findIndex(
      (element) => element.url === currentMusic.url
    );
    if (musicArray.length > 1) {
      let randomMusicIndex = -1;
      while (
        randomMusicIndex === currentMusicIndex ||
        randomMusicIndex === -1
      ) {
        randomMusicIndex = Math.floor(Math.random() * musicArray.length);
      }
      setCurrentMusic(musicArray[randomMusicIndex]);
    } else {
      setCurrentMusic(musicArray[0]);
    }

    setTimeout(() => {
      musicPlayers.current?.play();
    }, 1000);
  };

  const handleLoop = () => {
    setIsMusicLoop(!isMusicLoop);
  };

  const handleRandomPlay = () => {
    setIsRandomPlay(!isRandomPlay);
  };

  const handleMusicEnded = () => {
    if (isRandomPlay) {
      handleRandomMusic();
    } else {
      handleNextMusic();
    }
  };

  return (
    <main>
      <p className="text-blue-400 text-h3-bold">I am music player</p>
      <audio
        ref={musicPlayers}
        src={currentMusic.url}
        loop={isMusicLoop}
        onEnded={handleMusicEnded}
      />
      <div className="flex gap-5">
        <button onClick={handlePlayAndPause}>
          {isMusicPlay ? "Play" : "Pause"}
        </button>
        <button onClick={handleLastMusic}>Last</button>
        <button onClick={handleNextMusic}>Next</button>
        <button
          onClick={handleLoop}
          className={isMusicLoop ? "bg-green" : "bg-gray-400"}
        >
          Loop
        </button>
        <button
          onClick={handleRandomPlay}
          className={isRandomPlay ? "bg-green" : "bg-gray-400"}
        >
          Random
        </button>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=405998841,33894312,298317,1888354230,210049&level=lossless`
  );
  const musicData = await res.json();
  return {
    props: { musicData },
  };
}
