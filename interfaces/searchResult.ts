import { IAlbumSong } from "./albumSong";
import { IAlbumDetails } from "./album";
import { IPlaylist } from "./playlist";
import { IArtist } from "./artist";

export interface ISearchResult {
  code: number;
  msg?: string;
  result?: Partial<{
    songCount: number;
    songs: IAlbumSong[];
    albumCount: number;
    albums: IAlbumDetails[];
    playlistCount: number;
    playlists: IPlaylist[];
    artistCount: number;
    artists: IArtist[];
    [key: string]: any;
  }>;
}
