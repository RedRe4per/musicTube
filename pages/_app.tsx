import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import Layout from "@/components/layout";
import { useState } from "react";
import { MusicDetail } from "@/interfaces/music";
import { PlayerContext } from "@/contexts/PlayerContext";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [playerList, setPlayerList] = useState<MusicDetail[]>([]);

  return (
    <main className={`${rubik.variable} font-sans`}>
      <PlayerContext.Provider value={{ playerList, setPlayerList }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PlayerContext.Provider>
    </main>
  );
}
