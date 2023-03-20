import { useEffect, useContext } from "react";
import { AlertContext } from "@/contexts/AlertContext";
import { IAlbumSong } from "@/interfaces/albumSong";

export const useTrackFinder = (albumId: number, trackId: number, setSongIndex: (newValue: number | ((prevValue: number) => number)) => void, setPlayDisabled: (newValue: boolean | ((prevValue: boolean) => boolean)) => void) => {
    const { setAlertBox } = useContext(AlertContext);

    useEffect(() => {
        const getTrackIndex = async () => {
          if (albumId === 0) {
            setAlertBox({ message: "No song in this Album!" });
            return;
          }
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${albumId}`
          );
          const albumData = await response.json();
          if (!albumData.songs) {
            setAlertBox({ message: "No song in this Album!" });
            return;
          }
          const index = albumData.songs.findIndex(
            (song: IAlbumSong) => song.id === trackId
          );
          setSongIndex(index);
          setPlayDisabled(false);
        };
        getTrackIndex();
      }, [trackId]);
}