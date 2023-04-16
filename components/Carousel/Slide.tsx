import { IBanner } from "@/interfaces/carousel";
import { mixColor } from "@/utils/mixColor";
import { getAreaName } from "@/utils/getAreaName";
import Image from "next/image";

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

  return (
    <section
      className={`w-full relative ${
        bannerIndex === 1
          ? "flex justify-center items-center"
          : "hidden"
      }`}
      style={{
        background: `linear-gradient(to right, #1B1B1B 0%, ${bgColor} 50%, #1B1B1B 100%)`,
      }}
    >
      <div className="w-full h-[320px] border-l-2 border-r-2 border-gray-650 overflow-hidden flex items-center justify-center">
        <div
          className="w-full h-full relative blur-3xl"
          style={{ backgroundImage: `url(${banner.artistCover})` }}
        >
          <div className="absolute inset-0 bg-opacity-50 bg-[#1B1B1B] blur-3xl"></div>
        </div>
      </div>
      <section className="absolute py-8 px-16 w-full h-[320px] flex items-center justify-around">
            <Image
              className="w-[256px] h-[256px] object-cover aspect-square rounded-md shadow-2xl shadow-gray-650"
              src={banner.artistCover}
              alt="Artist cover"
              width={320}
              height={320}
            />
            <section className="h-full flex flex-col items-center justify-around max-w-[280px] flex-wrap">
              <h3 className="text-h3-normal text-gray-100 text-center">{getAreaName(banner.artistAreaCode)} Singer</h3>
              {banner.artistAlias && banner.artistAlias.length>0 && <h2 className="text-h2-normal text-white-50 italic text-center uppercase">{banner.artistAlias[0]}</h2>}
              <h2 className="text-h2-normal text-white-50 text-center uppercase">{banner.artistName}</h2>
              {/* <button className="bg-green w-36 h-12 rounded-lg text-white-200 text-h4-light brightness-105 shadow-2xl shadow-gray-650">Learn More</button> */}
            </section>
          
          <section className="flex items-center justify-center">    
              {banner.artistSongs.map((song, index) => {
                return (
                  <Image
                    className={`${
                      index % 2 === 0
                        ? "mb-10 mask-parallelogram-3"
                        : "mt-10 mask-parallelogram-4"
                    } mask mx-[2px] w-[120px] h-[180px] border-x-2 border-gray-650 object-cover`}
                    src={song.image}
                    alt="song image"
                    width={240}
                    height={380}
                    key={index}
                  />
                );
              })}
          </section>
        
        {/* <section className="flex items-center justify-center mt-8">
          <section className="flex gap-8">
            {Array.from({ length: quantity }, (_, index) => (
              <button key={index} onClick={() => setActiveBanner(index)}>
                <div
                  className={`${
                    index === bannerIndex ? "bg-green" : "bg-gray-100"
                  } w-4 h-1 rounded-md`}
                ></div>
              </button>
            ))}
          </section>
        </section> */}
      </section>
    </section>
  );
};
