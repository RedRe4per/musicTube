import { IBanner } from "@/interfaces/carousel";
import Image from "next/image";

interface Props {
  banner: IBanner;
  index: number;
}

export const CarouselSlide = ({ banner, index }: Props) => {
  console.log(banner, index);
  return (
    <section
      className={`w-full relative ${
        index === 0 ? "flex justify-center items-center" : "hidden"
      }`}
    >
      <div className="w-[800px] h-[320px] overflow-hidden">
        <div
          className="w-full h-full blur-3xl"
          style={{ backgroundImage: `url(${banner.artistCover})` }}
        ></div>
      </div>
      <section className="absolute p-8 w-[800px] h-[320px]">
        <section className="flex">
          <div className="flex-1">
            <Image
              className=" object-cover aspect-square rounded-sm shadow-2xl shadow-gray-650"
              src={banner.artistCover}
              alt="Artist cover"
              width={220}
              height={220}
            />
          </div>
          <section className="flex-2 flex flex-col items-center justify-center">
            <h3 className="text-h2-normal text-gray-200 text-center">
              {banner.artistName}
            </h3>
            <div className="flex mt-2 h-[160px]">
              {banner.artistSongs.map((song, index)=>{
                return <Image className={`${index%2 === 0 ? "mask-parallelogram-3" : "mt-10 mask-parallelogram-4"} mask w-[104px] h-[156px] border-x-2 object-cover`} src={song.image} alt="song image" width={200} height={300} key={index}/>
              })}
            </div>
          </section>
        </section>
        <section>slider</section>
      </section>
    </section>
  );
};
