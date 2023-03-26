import React from "react";

interface Props {
  handlePlayAndPause: () => void;
  isMusicPlay: boolean;
}

export const PlayerSwitchButton = React.memo(
  ({ handlePlayAndPause, isMusicPlay }: Props) => {
    return (
      <button onClick={handlePlayAndPause} className="w-[58px] h-[58px]" aria-label="play or pause switch button">
        <img
          src={
            isMusicPlay
              ? "/icons/play-circle-fill.svg"
              : "/icons/pause-circle-fill.svg"
          }
          alt="play"
          className="hover:w-[54px] hover:h-[54px] m-auto"
        />
      </button>
    );
  }
);
