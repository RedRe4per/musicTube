interface Props {
    page: string;
}

export const PageSwitch = ({ page }: Props) => {
    console.log(page)
    return (
        <div className={`flex bg-secondary h-[50px] rounded-[10px] ${page === "/likedSongs" ? "invert" : ""}`}>
            <button className="w-[60px]">
                <img src="/icons/arrow-left.svg" alt="last-page" className="m-auto" />
            </button>
            <button className="w-[60px]">
                <img src="/icons/arrow-right.svg" alt="next-page" className="m-auto"></img>
            </button>
        </div>
    )
}