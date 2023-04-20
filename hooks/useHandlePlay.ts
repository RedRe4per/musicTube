import { useContext } from "react";
import { getSortedMusicList } from "@/utils/getSortedMusicList";
import { PlayerContext } from "@/contexts/PlayerContext";
import { PlayAndPauseContext } from "@/contexts/PlayAndPauseContext";
import { AlertContext } from "@/contexts/AlertContext";
import { randomSort } from "@/utils/randomSort";

type PlayType = "playlist" | "album";

export const useHandlePlay = (
  albumOrPlaylistId: number,
  songIndex: number = 0,
  playType: PlayType = "album",
  playlistPage: number = 1
) => {
  const { setPlayerList, setMusicListId, setCachedPlayerList, setQueueInfo } =
    useContext(PlayerContext);
  const { isRandomPlay } = useContext(PlayAndPauseContext);
  const { setAlertBox } = useContext(AlertContext);
  const controller = new AbortController();
  const signal = controller.signal;
  const urlPathway =
    playType === "album"
      ? `album?id=${albumOrPlaylistId}&timestamp=${Date.now()}`
      : `playlist/track/all?limit=20&id=${albumOrPlaylistId}&offset=${
          (playlistPage - 1) * 20
        }&timestamp=${Date.now()}`;

  const handlePlay = async (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${urlPathway}`,
      { signal: signal }
    );
    const albumData = await response.json();

    if (!albumData.songs || !albumData.songs[songIndex].id) {
      setAlertBox({ message: "No song in this Album!" });
      return;
    }
    setQueueInfo(albumData.songs);
    const firstSongResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=${
        albumData.songs[songIndex].id
      }&level=higher&timestamp=${Date.now()}`,
      { signal: signal }
    );
    const firstSongData = await firstSongResponse.json();
    if (!firstSongData.data[0].url) {
      setAlertBox({ message: "No song resource found in this Album!" });
      return;
    } else {
      setMusicListId(albumOrPlaylistId);
      setPlayerList(firstSongData.data);
    }

    const sortedList = await getSortedMusicList(albumData.songs, songIndex);
    setCachedPlayerList(sortedList);
    if (!isRandomPlay) {
      setPlayerList(sortedList);
    } else {
      setPlayerList(randomSort(sortedList));
    }
  };

  return { handlePlay };
};
