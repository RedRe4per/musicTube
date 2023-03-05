import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return <main className={`${router.pathname === "/likedSongs" ? "bg-header" : ""}`}>
    <div className="h-[90px]">search bar</div>
    <div className={`${router.pathname === "/likedSongs" ? "" : "hidden"} h-[130px]`}>song numbers</div>
  </main>;
};
