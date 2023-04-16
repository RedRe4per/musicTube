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
      <section className="h-[90px] flex items-center justify-around mt-2 -mb-4">
        <PageSwitch page={page} />
        <section className="hidden lg:block">
          <SearchBar page={page} />
        </section>
        <UserInfo />
      </section>
      <section
        className={`${
          page === "/likedSongs" ? "" : "hidden"
        } h-[130px] pt-5 text-white-200 flex items-center justify-around`}
      >
        <div className="flex gap-6 text-h2-normal items-center justify-center w-[30%]">
          <img src="/icons/liked.svg" alt="liked" />
          <h5>Liked Songs</h5>
        </div>
        <div className="w-[30%]"></div>
        <div className="text-h2-light w-[40%] m-auto flex justify-center">
          <h5>1158 songs</h5>
        </div>
      </section>
    </main>
  );
};
