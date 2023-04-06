import { IBanner } from "@/interfaces/carousel";
import { CarouselSlide } from "./Slide";

interface Props {
  banners: IBanner[];
}

export const Carousel = ({ banners }: Props) => {
  return (
    <section className="mt-6">
      {banners.map((banner: IBanner, index: number) => {
        return <CarouselSlide banner={banner} index={index} key={index} />;
      })}
    </section>
  );
};
