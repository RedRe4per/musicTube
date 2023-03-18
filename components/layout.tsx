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
  const {isLoading} = useContext(BgColorContext);

  return (
    <div className="flex">
      <Nav />
      <section className="w-full lg:w-screen-70 bg-gray-650 relative">
        <Header />
        <main className={`overflow-auto max-h-[82.8vh] scrollbar ${isLoading ? "blur-xl brightness-50": ""}`}>
          {children}
        </main>
        <div className={isLoading ? "" : "hidden"}>
          <Loading />
        </div>
      </section>
      <MusicPlayerBar />
      <AlertBox />
    </div>
  );
}
