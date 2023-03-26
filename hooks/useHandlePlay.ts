import { useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";
import { AlertContext } from "@/contexts/AlertContext";
import { IAlbumSong } from "@/interfaces/albumSong";
import { IMusicDetail } from "@/interfaces/music";

type PlayType = "playlist" | "album";

export const useHandlePlay = (
  albumOrPlaylistId: number,
  songIndex: number = 0,
  playType: PlayType = "album",
  playlistPage: number = 1,
) => {
  const { setPlayerList, setMusicListId } = useContext(PlayerContext);
  const { setAlertBox } = useContext(AlertContext);
  const controller = new AbortController();
  const signal = controller.signal;
  const urlPathway =
    playType === "album"
      ? `album?id=${albumOrPlaylistId}`
      : `playlist/track/all?limit=20&id=${albumOrPlaylistId}&offset=${(playlistPage-1)*20}`;

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
    const firstSongResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=${albumData.songs[songIndex].id}&level=higher`,
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

    const songList: number[] = [];
    albumData.songs.forEach((song: IAlbumSong) => {
      songList.push(song.id);
    });
    const sortedSongIdList = [
      ...songList.slice(songIndex),
      ...songList.slice(0, songIndex),
    ];
    const songsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_ADDRESS
      }/song/url/v1?id=${sortedSongIdList.join(",")}&level=higher`,
      { signal: signal }
    );

    const songsData = await songsResponse.json();
    const sortedList = songsData.data.sort(
      (a: IMusicDetail, b: IMusicDetail) => {
        const aIndex = sortedSongIdList.findIndex((id) => id === a.id);
        const bIndex = sortedSongIdList.findIndex((id) => id === b.id);
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
