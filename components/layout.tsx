import { Nav } from "@/layouts/nav";
import { Header } from "@/layouts/header";
import { MusicPlayerBar } from "./MusicPlayerBar";
import { ReactElement } from "react";
import { AlertBox } from "./Alert";

interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex">
      <Nav />
      <section className="w-full lg:w-screen-70 bg-background-500">
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
