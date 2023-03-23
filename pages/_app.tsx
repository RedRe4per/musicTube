import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import { IMusicDetail } from "@/interfaces/music";
import { IAlertBox } from "@/interfaces/alertBox";
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
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [playerList, setPlayerList] = useState<IMusicDetail[]>([]);
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

  useEffect(() => {
    const handleRouteChange = () => {
      if (hasError) {
        setHasError(false);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, hasError]);

  useEffect(() => {
    const handleRouteError = (err: any) => {
      if (err.message === "Loading initial props cancelled") {
        console.log("SSR request was cancelled due to client-side navigation.");
        setHasError(true);
      } else {
        // 对于其他类型的错误，你可以将它们发送到日志系统或执行其他错误处理操作
        console.error("Unhandled error:", err);
      }
    };

    router.events.on("routeChangeError", handleRouteError);
    return () => {
      router.events.off("routeChangeError", handleRouteError);
    };
  }, [router.events]);

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
