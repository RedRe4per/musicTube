import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import Layout from "@/components/layout";
import { useState } from "react";
import { IMusicDetail } from "@/interfaces/music";
import { IAlertBox } from "@/interfaces/alertBox";
import { PlayerContext } from "@/contexts/PlayerContext";
import { AlertContext } from "@/contexts/AlertContext";
import { BgColorContext } from "@/contexts/BgColorContext";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [playerList, setPlayerList] = useState<IMusicDetail[]>([]);
  const [bgColor, setBgColor] = useState("gray-650");
  const [isLoading, setIsLoading] = useState(false);
  const [musicListId, setMusicListId] = useState<number | null>(null);
  const [isMusicPlay, setIsMusicPlay] = useState(true);
  const [currentMusic, setCurrentMusic] = useState<IMusicDetail | null>(null);
  const [alertBox, setAlertBox] = useState<IAlertBox>({
    message: "",
    messageType: "alert-warning",
  });

  return (
    <main className={`${rubik.variable} font-sans`}>
      <BgColorContext.Provider value={{ bgColor, setBgColor, isLoading, setIsLoading }}>
        <AlertContext.Provider value={{ alertBox, setAlertBox }}>
          <PlayAndPauseContext.Provider
            value={{
              isMusicPlay,
              setIsMusicPlay,
              currentMusic,
              setCurrentMusic,
            }}
          >
            <PlayerContext.Provider
              value={{ playerList, setPlayerList, musicListId, setMusicListId }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PlayerContext.Provider>
          </PlayAndPauseContext.Provider>
        </AlertContext.Provider>
      </BgColorContext.Provider>
    </main>
  );
}
