import { IBanner } from "@/interfaces/carousel";
import { IAlbumSong } from "@/interfaces/albumSong";
import { IAlbumList, AlbumArea } from "@/interfaces/album";
import { AreaCode } from "@/interfaces/artist";
import { convertToHttps } from "@/utils/convertToHttps";
import { albumAreaMapper } from "./albumAreaMapper";
import { playlistsGroupTranslator } from "./playlistsGroupTrans";

interface ArtistResults {
  status: "fulfilled" | "rejected";
  value: IBanner;
}

interface AlbumListResults {
  status: "fulfilled" | "rejected";
  value: IAlbumList;
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

async function getAlbumLists(area: AlbumArea) {
  const albumRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/album/list/style?area=${area}&limit=13`
  );
  const rawAlbumLists = await albumRes.json();
  const albumLists = { ...rawAlbumLists, title: albumAreaMapper(area) };
  return albumLists;
}

export async function fetchAlbumListInfo(albumAreas: AlbumArea[]) {
  try {
    const promises = albumAreas.map((albumArea: AlbumArea) =>
      getAlbumLists(albumArea)
    );
    const results = await Promise.allSettled(promises);
    const filteredResults = results.filter(
      (result) => result.status === "fulfilled"
    ) as AlbumListResults[];

    const resultAlbumLists = filteredResults.map(
      (results: AlbumListResults) => {
        return results.value;
      }
    );
    return resultAlbumLists;
  } catch (error) {
    console.error("Error in fetching area album lists data:", error);
    throw error;
  }
}

export async function getPlaylistList(playListType: "/highquality" | "") {
  const topPlaylistListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/top/playlist${playListType}?limit=13`
  );
  const rawTopLists = await topPlaylistListResponse.json();
  const topPlaylistList = await playlistsGroupTranslator(rawTopLists);
  return topPlaylistList;
}
