import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  text: string;
  pathname: string;
  icon: string;
}

export const NavPagesItem = ({ text, pathname, icon }: Props) => {
  const router = useRouter();

  return (
    <Link href={pathname}>
      <div
        className={`nav-title ${
          router.pathname === pathname
            ? "bg-green bg-opacity-15"
            : "hover:bg-gray-600"
        }`}
      >
        <div className="ml-[23px] w-[40px]">
          <Image
            src={`/icons/${icon}.svg`}
            alt={icon}
            className="m-auto"
            width={30}
            height={30}
          />
        </div>
        <h3 className="ml-[20px]">{text}</h3>
      </div>
    </Link>
  );
};
