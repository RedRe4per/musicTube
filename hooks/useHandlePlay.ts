import { useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";

export const useHandlePlay = (albumId: number) => {
  const { setPlayerList, setAlbum } = useContext(PlayerContext);

  const handlePlay = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${albumId}`,
      { credentials: "include" }
    );
    const albumData = await response.json();
    setAlbum(albumData.album);

    if(!albumData.songs[0].id) console.log("no song here!") //process later
    if(!albumData.songs[0].id) return;
      const firstSongResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=${albumData.songs[0].id}&level=higher`, { credentials: 'include' }
      );
      const firstSongData = await firstSongResponse.json();
      if(!firstSongData.data[0].url) console.log("no url here!") //process later
      setPlayerList(firstSongData.data);
    
    const songList: any[] = [];
    albumData.songs.forEach((song: any) => {
      songList.push(song.id);
    });
    const songsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=${songList.join(
        ","
      )}&level=higher`,
      { credentials: "include" }
    );
    const songsData = await songsResponse.json();
    const sortedList = songsData.data.sort((a: any, b: any) => {
        const aIndex = songList.findIndex(id => id === a.id);
        const bIndex = songList.findIndex(id => id === b.id);
        if (aIndex === -1 || bIndex === -1) {
          return aIndex - bIndex;
        }
        return aIndex - bIndex;
      });

    setPlayerList(sortedList);
  };

  return { handlePlay };
};
