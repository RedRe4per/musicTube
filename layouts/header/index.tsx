import { PageSwitch } from "@/components/PageSwitch";
import { SearchBar } from "@/components/SearchBar";
import { UserInfo } from "@/components/UserInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Header = () => {
  const router = useRouter();
  const [page, setPage] = useState("/");

  useEffect(() => {
    setPage(router.pathname);
  }, [router.pathname]);

  return (
    <main className={`${page === "/likedSongs" ? "bg-header" : ""}`}>
      <div className="h-[90px] flex items-center justify-around">
        <PageSwitch page={page} />
        <SearchBar page={page} />
        <UserInfo />
      </div>
      <div className={`${page === "/likedSongs" ? "" : "hidden"} h-[130px]`}>
        song numbers
      </div>
    </main>
  );
};
