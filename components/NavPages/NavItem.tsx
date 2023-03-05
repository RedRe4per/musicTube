import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    text: string;
    pathname: string;
    icon: string;
}

export const NavPagesItem = (props: Props) => {
    const router = useRouter();
    const { text, pathname, icon } = props;

    return (
        <Link href={pathname}>
            <div
                className={`nav-title ${router.pathname === pathname
                    ? "bg-green bg-opacity-15"
                    : "hover:bg-gray-600"
                    }`}
            >
                <div className="ml-[23px] w-[40px]">
                    <img src={`/icons/${icon}.svg`} alt={icon} className="m-auto" />
                </div>
                <h3 className="ml-[20px]">{text}</h3>
            </div>
        </Link>
    );
};
