import { IBanner } from "@/interfaces/carousel";
import { IAlbumSong } from "@/interfaces/albumSong";
import { AreaCode } from "@/interfaces/artist";
import { convertToHttps } from "@/utils/convertToHttps";

interface ArtistResults {
  status: "fulfilled" | "rejected";
  value: IBanner;
}

async function getArtist(areaCode: AreaCode) {
  const randomInteger = Math.floor(Math.random() * 100000) + 1;
  const artistRes = await fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER_ADDRESS
    }/artist/list?area=${areaCode}&limit=1&timestamp=${
      Date.now() - randomInteger
    }`
  );
  const artistArray = await artistRes.json();
  const artist = artistArray.artists[0];

  const artistSongRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/artists?id=${
      artist.id
    }&limit=6&order=time&timestamp=${Date.now() - randomInteger}`
  );
  const artistDetails = await artistSongRes.json();
  const artistSongsDetails = artistDetails.hotSongs.slice(0, 6) as IAlbumSong[];
  const artistSongs = artistSongsDetails.map((song) => {
    return {
      name: song.name,
      id: song.id,
      image: song.al.picUrl,
    };
  });

  const colorRes = await fetch(
    `${
      process.env.NEXT_PUBLIC_CLIENT_ADDRESS
    }/api/colorExtract?imageUrl=${convertToHttps(artist.picUrl)}`
  );
  const color = await colorRes.json();

  const banner: IBanner = {
    artistId: artist.id,
    artistName: artist.name,
    artistCover: convertToHttps(artist.picUrl) as string,
    artistAreaCode: areaCode,
    artistAlias: artist.alias,
    bgColor: color.dominantColor,
    artistSongs: artistSongs,
  };
  return banner;
}

export async function fetchArtistsInfo(areas: AreaCode[]) {
  try {
    const promises = areas.map((area: AreaCode) => getArtist(area));
    const results = await Promise.allSettled(promises);
    const filteredResults = results.filter(
      (result) => result.status === "fulfilled"
    ) as ArtistResults[];
    const resultAlbums = filteredResults.map((results: ArtistResults) => {
      return results.value;
    });
    return resultAlbums;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
