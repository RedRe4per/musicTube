import { Nav } from "@/layouts/nav";
import { Header } from "@/layouts/header";
import { MusicPlayerBar } from "./MusicPlayerBar";
import { ReactElement } from "react";
import { AlertBox } from "./Alert";
import { Loading } from "./Loading";

interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex">
      <Nav />
      <section className={`w-full lg:w-screen-70 bg-gray-650 relative`}>
        <Header />
        <main className="overflow-auto max-h-[82.8vh] scrollbar blur-xl brightness-50">
          {children}
        </main>
        <Loading />
      </section>
      <MusicPlayerBar />
      <AlertBox />
    </div>
  );
}
