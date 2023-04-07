import { IBanner } from "@/interfaces/carousel";
import { CarouselSlide } from "./Slide";
import { useState } from "react";

interface Props {
  banners: IBanner[];
}

export const Carousel = ({ banners }: Props) => {
  const [activeBanner, setActiveBanner] = useState(0);

  return (
    <section className="mt-6">
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
