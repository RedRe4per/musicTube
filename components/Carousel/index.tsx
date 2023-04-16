import { IBanner } from "@/interfaces/carousel";
import { CarouselSlide } from "./Slide";
import { useEffect, useState } from "react";

interface Props {
  banners: IBanner[];
}

export const Carousel = ({ banners }: Props) => {
  const [activeBanner, setActiveBanner] = useState(0);
  const [isSwitchBanner, setIsSwitchBanner] = useState(true);
  let threadId: number | NodeJS.Timeout = 0;

  useEffect(() => {
    if (!isSwitchBanner) {
      clearInterval(threadId);
    } else {
      threadId = setInterval(() => {
        setActiveBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
      }, 3000);
    }
    return () => {
      clearInterval(threadId);
    };
  }, [isSwitchBanner]);

  return (
    <section
      className="mt-6"
      onMouseEnter={() => setIsSwitchBanner(false)}
      onMouseLeave={() => setIsSwitchBanner(true)}
    >
      {banners.map((banner: IBanner, index: number) => {
        return (
          <CarouselSlide
            banner={banner}
            bannerIndex={index}
            quantity={banners.length}
            activeBanner={activeBanner}
            setActiveBanner={setActiveBanner}
            key={index}
          />
        );
      })}
    </section>
  );
};
