interface Props {
    handleSkip: () => void;
    forward: "last" | "next";
}

export const SkipButton = ({ handleSkip, forward }: Props) => {
    return (
        <button onClick={handleSkip} className="w-[40px] h-[40px]">
            {forward === "last" && <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="play-bar-btn"
            >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M8 11.333l10.223-6.815a.5.5 0 0 1 .777.416v14.132a.5.5 0 0 1-.777.416L8 12.667V19a1 1 0 0 1-2 0V5a1 1 0 1 1 2 0v6.333zm9 4.93V7.737L10.606 12 17 16.263z" />
            </svg>}
            {forward === "next" && <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="play-bar-btn"
            >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16 12.667L5.777 19.482A.5.5 0 0 1 5 19.066V4.934a.5.5 0 0 1 .777-.416L16 11.333V5a1 1 0 0 1 2 0v14a1 1 0 0 1-2 0v-6.333zm-9-4.93v8.526L13.394 12 7 7.737z" />
            </svg>}
        </button>
    )
}