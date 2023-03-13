import { useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";

const useHandlePlay = (albumId: number) => {
  const { setPlayerList, setAlbum } = useContext(PlayerContext);

  const handlePlay = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album?id=${albumId}`
    );
    const albumData = await response.json();
    setAlbum(albumData.album);

    const songs: any[] = [];
    albumData.songs.forEach((song: any) => {
      songs.push(song.id);
    });
    const songsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/song/url/v1?id=${songs.join(
        ","
      )}&level=higher`
    );
    const songsData = await songsResponse.json();
    setPlayerList(songsData.data);

    console.log("1111111111111111111111111111111111111");
  };

  return { handlePlay };
};

export default useHandlePlay;
