import { Nav } from "@/layouts/nav";
import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}
