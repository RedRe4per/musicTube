import React from "react";

interface Props {
  handleSequence: () => void;
  active: boolean;
  sequence: "loop" | "random";
}

export const SequenceButton = React.memo(
  ({ handleSequence, active, sequence }: Props) => {
    console.log("666666666666666666666");
    return (
      <button onClick={handleSequence} className="w-[40px] h-[40px]">
        {sequence === "random" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`play-bar-btn  ${active ? "fill-green" : ""}`}
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M18 17.883V16l5 3-5 3v-2.09a9 9 0 0 1-6.997-5.365L11 14.54l-.003.006A9 9 0 0 1 2.725 20H2v-2h.725a7 7 0 0 0 6.434-4.243L9.912 12l-.753-1.757A7 7 0 0 0 2.725 6H2V4h.725a9 9 0 0 1 8.272 5.455L11 9.46l.003-.006A9 9 0 0 1 18 4.09V2l5 3-5 3V6.117a7 7 0 0 0-5.159 4.126L12.088 12l.753 1.757A7 7 0 0 0 18 17.883z" />
          </svg>
        )}
        {sequence === "loop" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`play-bar-btn ${active ? "fill-green" : ""}`}
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 20v1.932a.5.5 0 0 1-.82.385l-4.12-3.433A.5.5 0 0 1 3.382 18H18a2 2 0 0 0 2-2V8h2v8a4 4 0 0 1-4 4H8zm8-17.932a.5.5 0 0 1 .82-.385l4.12 3.433a.5.5 0 0 1-.321.884H6a2 2 0 0 0-2 2v8H2V8a4 4 0 0 1 4-4h10V2.068zM11 8h2v8h-2v-6H9V9l2-1z" />
          </svg>
        )}
      </button>
    );
  }
);
