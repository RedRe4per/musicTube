import { IBanner } from "@/interfaces/carousel";
import { mixColor } from "@/utils/mixColor";
import { getAreaName } from "@/utils/getAreaName";
import { convertToHttps } from "@/utils/convertToHttps";
import Image from "next/image";
import Link from "next/link";

interface Props {
  banner: IBanner;
  bannerIndex: number;
  quantity: number;
  activeBanner: number;
  setActiveBanner: any;
}

export const CarouselSlide = ({
  banner,
  bannerIndex,
  quantity,
  activeBanner,
  setActiveBanner,
}: Props) => {
  const bgColor = mixColor(mixColor("#1B1B1B", banner.bgColor), "#1B1B1B");

  const switchBanner = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bannerIndex: number
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveBanner(bannerIndex);
  };

  return (
    <Link
      href={`/artist/${banner.artistId}`}
      aria-label="Link to banner artist"
    >
      <section
        className={`w-full relative ${
          bannerIndex === activeBanner
            ? "flex justify-center items-center transition-opacity duration-1000 ease-in-out opacity-100"
            : "h-0 opacity-0"
        }`}
        style={{
          background: `linear-gradient(to right, #1B1B1B 0%, ${bgColor} 50%, #1B1B1B 100%)`,
        }}
      >
        <div className="w-full h-[320px] border-l-2 border-r-2 border-gray-650 overflow-hidden flex items-center justify-center">
          {bannerIndex === activeBanner && (
            <div
              className="w-full h-full relative blur-3xl"
              style={{ backgroundImage: `url(${banner.artistCover})` }}
            >
              <div className="absolute inset-0 bg-opacity-50 bg-[#1B1B1B] blur-3xl"></div>
            </div>
          )}
        </div>
        <section className="absolute py-8 px-8 2xl:px-16 w-full h-[320px] flex items-center justify-around">
          {bannerIndex === activeBanner && (
            <Image
              className="w-[256px] h-[256px] object-cover aspect-square rounded-md shadow-2xl shadow-gray-650"
              src={convertToHttps(banner.artistCover) as string}
              alt="Artist cover"
              width={320}
              height={320}
            />
          )}

          {bannerIndex === activeBanner && (
            <section className="h-full flex flex-col items-center justify-around max-w-[280px] flex-wrap">
              <h3 className="text-h3-normal text-green text-center">
                {getAreaName(banner.artistAreaCode)} Singer
              </h3>
              {banner.artistAlias && banner.artistAlias.length > 0 && (
                <h2 className="text-h2-normal text-white-50 italic text-center uppercase">
                  {banner.artistAlias[0]}
                </h2>
              )}
              <h2 className="text-h2-normal text-white-50 text-center uppercase">
                {banner.artistName}
              </h2>
            </section>
          )}
          <section className="flex items-center justify-center">
            {bannerIndex === activeBanner &&
              banner.artistSongs.map((song, index) => {
                return (
                  <Image
                    className={`${
                      index % 2 === 0
                        ? "mb-10 mask-parallelogram-3"
                        : "mt-10 mask-parallelogram-4"
                    } ${
                      index > 3 ? "hidden 2xl:block" : ""
                    } mask mx-[2px] w-[120px] h-[180px] border-x-2 border-gray-650 object-cover`}
                    src={convertToHttps(song.image) as string}
                    alt="song image"
                    width={240}
                    height={380}
                    key={index}
                  />
                );
              })}
          </section>
          <section className="absolute bottom-5 flex items-center justify-center mt-8">
            <section className="flex gap-12">
              {Array.from({ length: quantity }, (_, index) => (
                <button
                  key={index}
                  onClick={(e) => switchBanner(e, index)}
                  aria-label="switch to selected banner"
                >
                  <div
                    className={`${
                      index === bannerIndex ? "bg-green" : "bg-gray-300"
                    } w-2 h-2 rounded-full hover:bg-green`}
                  ></div>
                </button>
              ))}
            </section>
          </section>
        </section>
        <button
          onClick={(e) =>
            switchBanner(e, bannerIndex === 0 ? quantity - 1 : bannerIndex - 1)
          }
          className="absolute left-6"
          aria-label="last banner"
        >
          <img src="/icons/arrow-left.svg" alt="last-page" />
        </button>
        <button
          onClick={(e) =>
            switchBanner(e, bannerIndex === quantity - 1 ? 0 : bannerIndex + 1)
          }
          className="absolute right-6"
          aria-label="next banner"
        >
          <img src="/icons/arrow-right.svg" alt="last-page" />
        </button>
      </section>
    </Link>
  );
};
