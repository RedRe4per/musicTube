import { Nav } from "@/layouts/nav";
import { Header } from "@/layouts/header";
import { MusicPlayerBar } from "./MusicPlayerBar";
import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex">
      <Nav />
      <section className="w-screen-70 bg-background-500">
        <Header />
        <main>{children}</main>
      </section>
      <MusicPlayerBar />
    </div>
  );
}
