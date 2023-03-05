import Image from "next/image";

interface Props {
  page: string;
}

export const PageSwitch = ({ page }: Props) => {
  console.log(page);
  return (
    <div
      className={`flex bg-secondary h-[50px] rounded-[10px] ${
        page === "/likedSongs" ? "invert" : ""
      }`}
    >
      <button className="w-[60px]">
        <Image
          src="/icons/arrow-left.svg"
          alt="last-page"
          className="m-auto"
          width={16}
          height={16}
        />
      </button>
      <button className="w-[60px]">
        <Image
          src="/icons/arrow-right.svg"
          alt="next-page"
          className="m-auto"
          width={16}
          height={16}
        ></Image>
      </button>
    </div>
  );
};
