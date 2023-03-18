import React from "react";
import { useRouter } from "next/router";

interface Props {
  page: string;
}

export const PageSwitch = ({ page }: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoForward = () => {
    const { history } = window;
    if (history.length > 1) {
      history.forward();
    }
  };

  return (
    <section
      className={`hidden lg:flex bg-secondary h-[50px] rounded-[10px] ${
        page === "/likedSongs" ? "invert" : ""
      }`}
    >
      <button onClick={handleGoBack} className="w-[60px]">
        <img src="/icons/arrow-left.svg" alt="last-page" className="m-auto" />
      </button>
      <button onClick={handleGoForward} className="w-[60px]">
        <img
          src="/icons/arrow-right.svg"
          alt="next-page"
          className="m-auto"
        ></img>
      </button>
    </section>
  );
};
