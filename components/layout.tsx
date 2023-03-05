import { Nav } from "@/layouts/nav";
import { Header } from "@/layouts/header";
import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props) {
  return (
    <body className="flex">
      <Nav />
      <section className="w-screen-70 bg-background-500">
        <Header />
        <main>{children}</main>
      </section>
    </body>
  );
}
