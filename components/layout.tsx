import { Nav } from "@/layouts/nav";
import { Header } from "@/layouts/header";
import { MusicPlayerBar } from "./MusicPlayerBar";
import { ReactElement, useEffect, useState } from "react";
import { AlertBox } from "./Alert";
import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext } from "react";

interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props) {
  const { bgColor } = useContext(BgColorContext);

  return (
    <div className="flex">
      <Nav />
      <section
        className={`w-full lg:w-screen-70`}
        style={{
          background: `linear-gradient(to bottom, #1B1B1B, ${bgColor})`,
        }}
      >
        <Header />
        <main className="overflow-auto max-h-[82.8vh] scrollbar">
          {children}
        </main>
      </section>
      <MusicPlayerBar />
      <AlertBox />
    </div>
  );
}
