import React, { useState, useRef, useEffect } from "react"
import { MusicDetail } from "@/interfaces/music";
import { getRatio, getDraggingRatio } from "@/utils/radioCalc";

interface Props {
    playList: MusicDetail[];
}

export const VolumeBar = React.forwardRef(({ playList }: Props, musicPlayer: any) => {
    const volumeRef = useRef<HTMLDivElement>(null);
    const [showThumb, setShowThumb] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [volumeBarRatio, setVolumeBarRatio] = useState(1);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const volumeBarRect = volumeRef.current?.getBoundingClientRect();
        if (!volumeBarRect) return;
        console.log("mouse move test", musicPlayer.current.volume)
        musicPlayer.current.volume = getDraggingRatio(e, volumeBarRect) / 100;
        setVolumeBarRatio(musicPlayer.current.volume * 100);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement> | MouseEvent
    ) => {
        const volumeBarRect = volumeRef.current?.getBoundingClientRect();
        if (!volumeBarRect) return;
        musicPlayer.current.volume = getDraggingRatio(e, volumeBarRect) / 100;
        e.preventDefault();
        setIsDragging(true);
        setVolumeBarRatio(musicPlayer.current.volume * 100);
    };

    return (
        <aside className="flex items-center justify-around w-[250px]">
            <div className="w-[20%]">
                <svg className={`play-bar-btn fill-green`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="none" d="M0 0h24v24H0z" /><path d="M2 18h10v2H2v-2zm0-7h14v2H2v-2zm0-7h20v2H2V4zm17 11.17V9h5v2h-3v7a3 3 0 1 1-2-2.83zM18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>
            </div>
            <section className="flex items-center gap-2 w-[60%]">
                <div>
                    <img src="/icons/volume-down-fill.svg" alt="volume-down" />
                </div>
                <div
                    className="w-[70%] h-[21px] flex items-center"
                    onMouseOver={() => setShowThumb(true)}
                    onMouseOut={() => setShowThumb(false)}
                    onMouseDown={handleMouseDown}
                >
                    <div
                        className="relative w-full bg-gray-600 rounded-full h-[5px]"
                        ref={volumeRef}
                    >
                        <div
                            className={`bg-gray-200 ${showThumb ? "bg-green" : ""
                                } rounded-full h-[5px]`}
                            style={{ width: `${volumeBarRatio}%` }}
                        ></div>
                        <div
                            className={`absolute top-[1px] ${showThumb ? "" : "hidden"
                                } transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full cursor-pointer`}
                            style={{ left: `${volumeBarRatio}%` }}
                        ></div>
                    </div>
                </div>
            </section>
        </aside>
    )
});