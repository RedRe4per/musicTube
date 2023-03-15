import { useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";
import { AlertContext } from "@/contexts/AlertContext";
import { IAlbumSong } from "@/interfaces/albumSong";
import { IMusicDetail } from "@/interfaces/music";

export const useHandlePlay = (albumId: number) => {
  const { setPlayerList, setAlbum } = useContext(PlayerContext);
  const { setAlertBox } = useContext(AlertContext);
  const controller = new AbortController();
  const signal = controller.signal;

  const handlePlay = async (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${albumId}`,
      { signal: signal }
    );
    const albumData = await response.json();
    setAlbum(albumData.album);

    if (!albumData.songs[0].id) {
      setAlertBox({ message: "No song in this Album!" });
      return;
    }
    const firstSongResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=${albumData.songs[0].id}&level=higher`,
      { signal: signal }
    );
    const firstSongData = await firstSongResponse.json();
    if (!firstSongData.data[0].url) {
      setAlertBox({ message: "No song resource found in this Album!" });
      return;
    }
    setPlayerList(firstSongData.data);

    const songList: number[] = [];
    albumData.songs.forEach((song: IAlbumSong) => {
      songList.push(song.id);
    });
    const songsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=${songList.join(
        ","
      )}&level=higher`,
      { signal: signal }
    );

    const songsData = await songsResponse.json();
    const sortedList = songsData.data.sort(
      (a: IMusicDetail, b: IMusicDetail) => {
        const aIndex = songList.findIndex((id) => id === a.id);
        const bIndex = songList.findIndex((id) => id === b.id);
        if (aIndex === -1 || bIndex === -1) {
          return aIndex - bIndex;
        }
        return aIndex - bIndex;
      }
    );

    setPlayerList(sortedList);
  };

  return { handlePlay };
};
