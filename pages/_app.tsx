import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import Layout from "@/components/layout";
import { useState } from "react";
import { IMusicDetail } from "@/interfaces/music";
import { IAlbum } from "@/interfaces/album";
import { IAlertBox } from "@/interfaces/alertBox";
import { PlayerContext } from "@/contexts/PlayerContext";
import { AlertContext } from "@/contexts/AlertContext";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [playerList, setPlayerList] = useState<IMusicDetail[]>([]);
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [alertBox, setAlertBox] = useState<IAlertBox>({message:"", messageType: "alert-warning"})

  return (
    <main className={`${rubik.variable} font-sans`}>
      <AlertContext.Provider value={{ alertBox, setAlertBox }}>
        <PlayerContext.Provider
          value={{ playerList, setPlayerList, album, setAlbum }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PlayerContext.Provider>
      </AlertContext.Provider>
    </main>
  );
}
