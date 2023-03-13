import { useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";

export const useHandlePlay = (albumId: number) => {
  const { setPlayerList, setAlbum } = useContext(PlayerContext);

  const handlePlay = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${albumId}`, { credentials: 'include' }
    );
    const albumData = await response.json();
    setAlbum(albumData.album);

    /* This part is for reducing 1st song response time. However, API /song/ur;/v1?id=a,b,c returned song urls have different order with id number.
        maybe I can sort in this file?
    // if(!albumData.songs[0].id) return;
    //   const firstSongResponse = await fetch(
    //     `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=${albumData.songs[0].id}&level=higher`, { credentials: 'include' }
    //   );
    //   const firstSongData = await firstSongResponse.json();
    //   setPlayerList(firstSongData.data);
    */

    const songList: any[] = [];
    albumData.songs.forEach((song: any) => {
        songList.push(song.id);
    });
    const songsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=${songList.join(
        ","
      )}&level=higher`, { credentials: 'include' }
    );
    const songsData = await songsResponse.json();
    setPlayerList(songsData.data);
  };

  return { handlePlay };
};
