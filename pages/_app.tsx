import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import Layout from "@/components/layout";
import React, { useRef, useState } from "react";
import { IMusicDetail } from "@/interfaces/music";
import { IAlertBox } from "@/interfaces/alertBox";
import { IAlbumSong } from "@/interfaces/albumSong";
import { PlayerContext } from "@/contexts/PlayerContext";
import { AlertContext } from "@/contexts/AlertContext";
import { BgColorContext } from "@/contexts/BgColorContext";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";
import { LyricsContext } from "@/contexts/LyricsContext";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const musicPlayer = useRef<HTMLAudioElement>(null);
  const [playerList, setPlayerList] = useState<IMusicDetail[]>([]);
  const [queueInfo, setQueueInfo] = useState<IAlbumSong[]>([]);
  const [bgColor, setBgColor] = useState("gray-650");
  const [isLoading, setIsLoading] = useState(false);
  const [musicListId, setMusicListId] = useState<number | null>(null);
  const [isMusicPlay, setIsMusicPlay] = useState(true);
  const [currentMusic, setCurrentMusic] = useState<IMusicDetail | null>(null);
  const [lyricsTimestamp, setLyricsTimestamp] = useState(0);
  const [alertBox, setAlertBox] = useState<IAlertBox>({
    message: "",
    messageType: "alert-warning",
  });

  return (
    <main className={`${rubik.variable} font-sans`}>
      <BgColorContext.Provider
        value={{ bgColor, setBgColor, isLoading, setIsLoading }}
      >
        <AlertContext.Provider value={{ alertBox, setAlertBox }}>
          <LyricsContext.Provider
            value={{ lyricsTimestamp, setLyricsTimestamp, musicPlayer }}
          >
            <PlayAndPauseContext.Provider
              value={{
                isMusicPlay,
                setIsMusicPlay,
                currentMusic,
                setCurrentMusic,
              }}
            >
              <PlayerContext.Provider
                value={{
                  playerList,
                  setPlayerList,
                  musicListId,
                  setMusicListId,
                  queueInfo,
                  setQueueInfo,
                }}
              >
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </PlayerContext.Provider>
            </PlayAndPauseContext.Provider>
          </LyricsContext.Provider>
        </AlertContext.Provider>
      </BgColorContext.Provider>
    </main>
  );
}
