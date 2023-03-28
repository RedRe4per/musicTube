import { IMusicDetail } from "@/interfaces/music";

export const getSortedMusicList = async (playerList: IMusicDetail[], songIndex: number) => {
    const songIdList: number[] = [];
      playerList.forEach((song: IMusicDetail) => {
        songIdList.push(song.id);
      });
  
      const sortedSongIdList = [
        ...songIdList.slice(songIndex),
        ...songIdList.slice(0, songIndex),
      ];
      const songsResponse = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_ADDRESS
        }/song/url/v1?id=${sortedSongIdList.join(
          ","
        )}&level=higher&timestamp=${Date.now()}`
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
      return sortedList;
}