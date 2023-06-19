import Head from "next/head";
import { Nav } from "@/layouts/nav";
import { Header } from "@/layouts/header";
import { MusicPlayerBar } from "./MusicPlayerBar";
import { ReactElement } from "react";
import { AlertBox } from "./Alert";
import { Loading } from "./Loading";
import { useContext } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";

interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props) {
  const { isLoading } = useContext(BgColorContext);
  return (
    <div className="flex">
      <Nav />
      <section className="w-full xl:w-screen-70 bg-gray-650 relative">
        <Header />
        <Head>
          <title>TunesSpire</title>
          <meta
            name="description"
            content="An online music streaming player. Built by Async Working"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section
          className={`overflow-auto max-h-[82.8vh] lg:scrollbar ${
            isLoading ? "blur-xl brightness-50" : ""
          }`}
        >
          {children}
        </section>
        <div className={isLoading ? "" : "hidden"}>
          <Loading />
        </div>
      </section>
      <MusicPlayerBar />
      <AlertBox />
    </div>
  );
}
